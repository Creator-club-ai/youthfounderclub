# 창업가 인터뷰 수집 폼 — 설계 (Design Spec)

- **날짜**: 2026-06-20
- **프로젝트**: youthfounderclub (Next.js 16 / React 19 / App Router / TypeScript)
- **경로**: `youthfounder.club/interview`
- **상태**: 설계 승인됨 → 구현 계획 단계로

## 1. 개요 (Overview)

YouthFounderClub의 창업가들에게 인터뷰 링크를 보내고, 그들이 직접 작성한 답변을
수집해 콘텐츠(인스타/숏폼/웹) 제작에 활용하기 위한 **수집형 폼**.

제출 1건은 Google Sheet에 **한 행**으로 쌓이고, 팀이 시트에서 필터·정렬로
큐레이션해 콘텐츠로 가공한다.

## 2. 목표 / 비목표

**목표 (v1)**
- 기존 홈페이지와 같은 브랜드 톤의 커스텀 폼 (`/interview`)
- 예시 인터뷰의 8개 문항 + 기본정보를 한 페이지에서 작성
- 제출 → Google Sheet에 한 행씩 저장 (Apps Script 웹앱 경유)
- 작성 중 임시저장(localStorage)으로 긴 답변 유실 방지
- 모바일 우선 반응형

**비목표 (나중에)**
- 자동 공개 인터뷰 페이지 생성/발행
- 사진 **파일 업로드** (v1은 링크 입력만)
- 별도 관리자 화면 (Google Sheet가 대체)
- 로그인/인증, 이메일/슬랙 알림

## 3. 아키텍처

```
[브라우저: /interview 폼 (use client)]
   ├─ 입력 상태 관리 + localStorage 임시저장
   ├─ 클라이언트 검증 (필수/이메일/동의)
   └─ POST /api/interview  (JSON)
          │
[서버: app/api/interview/route.ts (Node runtime)]
   ├─ 서버 재검증 + 허니팟 스팸 차단
   ├─ formData → 시트 행(ordered string[]) 매핑
   └─ Apps Script 웹앱으로 POST { row }
          │
[Google Sheet: 인터뷰 1건 = 한 행]
```

- 폼 페이지: `src/app/interview/page.tsx` (+ `interview.module.css`)
- 폼 UI 컴포넌트: `src/components/interview/InterviewForm.tsx` (내부에 `Field` 헬퍼)
- API 라우트: `src/app/api/interview/route.ts`
- 순수 로직(테스트 대상): `src/lib/interview/` 에 분리
  - `validate.ts` — 폼 검증 (순수 함수)
  - `sheet-mapping.ts` — formData → 시트 행(ordered string[]) (순수 함수)
  - `handle-submission.ts` — 허니팟·검증·저장 흐름 (의존성 주입, 순수)
  - `sheets-client.ts` — Apps Script 웹앱 POST 래퍼 (사이드이펙트 격리)

각 유닛은 한 가지 책임만 가지고, 순수 로직은 네트워크와 분리해 독립적으로
테스트한다.

## 4. 폼 스키마 (필드)

### 기본 정보
| 필드 | 키 | 타입 | 필수 | 비고 |
|---|---|---|---|---|
| 이름 | `name` | text | ✅ | |
| 직함/소속 | `role` | text | ⬜ | 예: "카라멜랩 대표, 중앙대 화공 휴학" |
| 아이템/회사명 | `item` | text | ⬜(권장) | 예: "카라멜랩" |
| 이메일 | `email` | email | ✅ | 비공개·후속연락용 |
| 인스타/링크 | `link` | url | ⬜ | |
| 프로필 사진 링크 | `photoUrl` | url | ⬜ | v1은 링크만 |
| 콘텐츠 사용·공개 동의 | `consent` | checkbox | ✅ | 미체크 시 제출 불가 |
| (허니팟) | `website` | hidden text | — | 봇 차단용, 채워지면 무시 |

### 인터뷰 문항 (예시의 8개 그대로, 이모지·질문 동일)
| # | 문항 | 키 | 필수 |
|---|---|---|---|
| 1 | 🙋 자기소개 | `q_intro` | ✅ |
| 2 | 📌 아이템 한 줄 소개 | `q_oneliner` | ✅ |
| 3 | 🔍 창업 배경 (문제 발견) | `q_background` | ⬜(권장) |
| 4 | 🔥 가장 힘들었던 순간 | `q_hardest` | ⬜ |
| 5 | 💡 결정적 터닝 포인트 | `q_turningpoint` | ⬜ |
| 6 | 🚀 제품에 대한 비전 | `q_vision` | ⬜ |
| 7 | 🎯 인생 목표 | `q_lifegoal` | ⬜ |
| 8 | 💬 같은 길을 걷고 싶은 사람들에게 | `q_message` | ⬜ |

각 문항은 여러 줄 textarea + 예시 답변을 **접힌 "예시 보기" 토글**(또는 옅은
placeholder)로 제공해 작성 부담을 낮춘다.

## 5. Google Sheet 데이터 모델

제출 1건 = 한 행. 헤더(1행) 컬럼 순서는 `sheet-mapping.ts`의 `SHEET_COLUMNS`와
정확히 일치해야 한다:

```
제출일시 | 이름 | 직함/소속 | 아이템 | 이메일 | 링크 | 사진 | 공개동의 |
자기소개 | 한줄소개 | 창업배경 | 가장힘들었던순간 | 터닝포인트 | 비전 | 인생목표 | 메시지
```

- `제출일시` ← 서버 시각(ISO)
- `공개동의` ← `동의` / `""` (consent boolean)
- 나머지 ← 해당 필드 문자열 그대로 (미작성은 빈 문자열)
- 시트 셀 길이 한계가 넉넉(5만 자)하므로 긴 답변 청크 분할 불필요
- 전송 경로: 서버 → Apps Script 웹앱(`doPost`) → `sheet.appendRow(row)`

## 6. UX 동작

- **한 페이지 스크롤형**, 섹션 카드로 구분, 모바일 우선
- **임시저장**: 입력 변경 시 debounce로 `localStorage["yfc-interview-draft"]`에 저장,
  페이지 재방문 시 복원, 제출 성공 시 삭제
- **검증**: 제출 시 필수(`name`,`email`,`q_intro`,`q_oneliner`,`consent`) +
  이메일 형식 확인 → 비어있으면 해당 필드에 인라인 에러(한국어)
- **제출 상태**: 버튼 로딩/비활성, 실패 시 에러 메시지, 성공 시 성공 화면
  ("제출 완료! 곧 연락드릴게요 🙌")
- 허니팟 필드는 화면 밖 숨김, 봇이 채우면 서버가 조용히 무시(성공처럼 응답)

## 7. 브랜드 / 스타일

기존 `globals.css` 토큰 재사용:
- 색: `--bg #fff`, `--ink #111`, `--muted #666`, `--accent #FF4F00`,
  `--gradient-energy`(오렌지→핫핑크→퍼플), `--line`
- 폰트: Geist(EN) + Noto Sans KR(KO) — 이미 `layout.tsx`에 로드됨
- 라운드 `--radius-md/lg`, `--shadow`, `.container`, 필름 그레인(전역 적용 중)
- 강조 요소(헤더 타이틀, 제출 버튼)에 그라데이션/액센트 사용

## 8. 설정 / 환경변수

- `.env.local` (이미 `.gitignore`에 `.env*` 포함됨):
  - `SHEETS_WEBHOOK_URL` — Apps Script 웹앱 배포 URL
- 프로덕션: 위 값을 Vercel 환경변수로 등록
- 추가 런타임 의존성 없음 (`fetch`만 사용)

**사용자(운영자)가 해야 할 준비** — 구현 전 1회:
1. Google Sheet 생성, 첫 시트명 `응답`, 1행에 5절 컬럼 순서대로 헤더 입력
2. `확장 프로그램 → Apps Script`에서 `doPost`(JSON `row` append) 코드 배포
3. `배포 → 웹 앱`(실행: 나 / 액세스: 모든 사용자) → 웹 앱 URL 복사
4. URL을 `.env.local`의 `SHEETS_WEBHOOK_URL`에 입력

## 9. 보안 / 프라이버시

- 이메일·연락처는 Google Sheet에 **비공개**로 저장(웹에 노출 안 함)
- 제출 전 **콘텐츠 사용·공개 동의** 체크 필수
- `SHEETS_WEBHOOK_URL`은 서버에서만 사용(클라이언트 노출 금지)
- 허니팟으로 기본 봇 차단(필요 시 추후 rate limit 추가)

## 10. 테스트 전략

- **단위**: `validate.ts`(필수/이메일/동의 케이스), `sheet-mapping.ts`(컬럼 순서·길이·
  동의 표기·빈 답변), `handle-submission.ts`(허니팟/검증실패/저장성공/저장에러)
- **수동**: 폼 작성→제출→Google Sheet에 행 추가 확인, 임시저장 복원, 모바일 레이아웃
  (`route.ts`/`sheets-client.ts`는 수동 e2e로 검증)

## 11. 구현 순서(요약)

1. 순수 로직 (`validate`, `sheet-mapping`, `handle-submission`) + 테스트
2. `sheets-client` 래퍼 + API 라우트
3. 폼 UI 컴포넌트 + `/interview` 페이지 (브랜드 스타일)
4. localStorage 임시저장 / 성공·에러 상태
5. 로컬 e2e 수동 확인 → Vercel 환경변수 등록 → 배포
