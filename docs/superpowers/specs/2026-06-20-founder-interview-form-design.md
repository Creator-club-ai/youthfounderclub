# 창업가 인터뷰 수집 폼 — 설계 (Design Spec)

- **날짜**: 2026-06-20
- **프로젝트**: youthfounderclub (Next.js 16 / React 19 / App Router / TypeScript)
- **경로**: `youthfounder.club/interview`
- **상태**: 설계 승인됨 → 구현 계획 단계로

## 1. 개요 (Overview)

YouthFounderClub의 창업가들에게 인터뷰 링크를 보내고, 그들이 직접 작성한 답변을
수집해 콘텐츠(인스타/숏폼/웹) 제작에 활용하기 위한 **수집형 폼**.

제출 1건은 Notion DB에 **읽기 좋은 인터뷰 페이지 1개**로 쌓이고, 팀이 보드/갤러리
뷰로 큐레이션해 콘텐츠로 가공한다.

## 2. 목표 / 비목표

**목표 (v1)**
- 기존 홈페이지와 같은 브랜드 톤의 커스텀 폼 (`/interview`)
- 예시 인터뷰의 8개 문항 + 기본정보를 한 페이지에서 작성
- 제출 → Notion DB 저장 (긴 답변은 페이지 본문 블록으로)
- 작성 중 임시저장(localStorage)으로 긴 답변 유실 방지
- 모바일 우선 반응형

**비목표 (나중에)**
- 자동 공개 인터뷰 페이지 생성/발행
- 사진 **파일 업로드** (v1은 링크 입력만)
- 별도 관리자 화면 (Notion이 대체)
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
   ├─ formData → Notion 매핑 (속성 + 본문 블록, 긴 답변 청크 분할)
   └─ @notionhq/client → pages.create(parent=DATABASE_ID)
          │
[Notion DB: 인터뷰 1건 = 페이지 1개]
```

- 폼 페이지: `src/app/interview/page.tsx` (+ `interview.module.css`)
- 폼 UI 컴포넌트: `src/components/interview/` (예: `InterviewForm.tsx`, `Field.tsx`, `SectionCard.tsx`)
- API 라우트: `src/app/api/interview/route.ts`
- 순수 로직(테스트 대상): `src/lib/interview/` 에 분리
  - `validate.ts` — 폼 검증 (순수 함수)
  - `notion-mapping.ts` — formData → Notion properties + children blocks (순수 함수, 청크 분할 포함)
  - `notion-client.ts` — Notion SDK 호출 래퍼 (사이드이펙트 격리)

각 유닛은 한 가지 책임만 가지고, 순수 로직은 SDK/네트워크와 분리해 독립적으로
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

## 5. Notion 데이터 모델

**DB 속성 (Properties)** — 큐레이션/필터용 메타데이터
- `이름` (Title) ← `name`
- `아이템` (Rich text) ← `item`
- `직함/소속` (Rich text) ← `role`
- `이메일` (Email) ← `email`
- `링크` (URL) ← `link`
- `사진` (URL) ← `photoUrl`
- `공개동의` (Checkbox) ← `consent`
- `상태` (Select): `신규` / `검토중` / `콘텐츠제작` / `발행완료` / `보류` (기본 `신규`)
- `제출일시` (Date) ← 서버 시각

**페이지 본문 (children blocks)** — 읽기 좋은 인터뷰 문서
- 문항마다: `Heading 2`(이모지+질문) + `Paragraph`(답변)
- 답변이 Notion rich_text 한계(블록당 ~2000자)를 넘으면 **여러 단락 블록으로 청크
  분할**. `notion-mapping.ts`가 처리.

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
  - `NOTION_TOKEN` — Notion 내부 인테그레이션 토큰
  - `NOTION_DATABASE_ID` — 대상 DB ID
- 프로덕션: 위 두 값을 Vercel 환경변수로 등록
- 의존성 추가: `@notionhq/client`

**사용자(운영자)가 해야 할 Notion 준비** — 구현 전 1회:
1. notion.so/my-integrations → 내부 인테그레이션 생성 → 토큰 복사
2. Notion에 데이터베이스(표) 1개 생성, 5절의 속성 추가
3. 그 DB의 `⋯ → 연결(Connections)`에 위 인테그레이션 추가(공유)
4. DB URL에서 database ID 복사
5. 토큰 + DB ID를 `.env.local`에 입력
   *(원하면 구현 시 스키마 세팅을 일부 자동화 가능)*

## 9. 보안 / 프라이버시

- 이메일·연락처는 Notion에 **비공개**로 저장(웹에 노출 안 함)
- 제출 전 **콘텐츠 사용·공개 동의** 체크 필수
- `NOTION_TOKEN`은 서버에서만 사용(클라이언트 노출 금지)
- 허니팟으로 기본 봇 차단(필요 시 추후 rate limit 추가)

## 10. 테스트 전략

- **단위**: `validate.ts`(필수/이메일/동의 케이스), `notion-mapping.ts`(속성 매핑 +
  긴 답변 청크 분할 경계값)
- **API**: `/api/interview` 라우트 — Notion 클라이언트 목킹, 정상/검증실패/Notion에러
  응답 검증
- **수동**: 폼 작성→제출→Notion에 페이지 생성 확인, 임시저장 복원, 모바일 레이아웃

## 11. 구현 순서(요약)

1. 순수 로직 (`validate`, `notion-mapping`) + 테스트
2. `notion-client` 래퍼 + API 라우트
3. 폼 UI 컴포넌트 + `/interview` 페이지 (브랜드 스타일)
4. localStorage 임시저장 / 성공·에러 상태
5. 로컬 e2e 수동 확인 → Vercel 환경변수 등록 → 배포
