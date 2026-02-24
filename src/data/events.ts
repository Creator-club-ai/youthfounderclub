import { KAKAO_INVITE_URL } from "@/constants/links";

export type EventStatus = "upcoming" | "completed";

export type EventArchiveItem = {
  id: string;
  title: string;
  summary: string;
  dateLabel: string;
  location: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition: string;
  imageScale: number;
  status: EventStatus;
  detailUrl?: string; // External join link (e.g. Kakao)

  // Extended Detail Page Fields
  fullDescription?: string;
  agenda?: { time: string; description: string }[];
  gallery?: string[];
  quotes?: { text: string; author: string }[];
};

export const EVENT_ARCHIVE: EventArchiveItem[] = [
  {
    id: "2026-q2-founder-talk",
    title: "Founder Talk",
    summary: "선배 창업가의 실전 의사결정과 시행착오를 깊게 듣는 세션",
    dateLabel: "2026.04.18 (Sat)",
    location: "Seoul",
    imageSrc: "/E1_05628.JPG",
    imageAlt: "Founder Talk",
    imagePosition: "20% center",
    imageScale: 2.0,
    status: "upcoming",
    detailUrl: KAKAO_INVITE_URL,
    fullDescription: "단순히 성공 스토리만을 듣는 자리가 아닙니다. 초기 팀 빌딩부터 프로덕트-마켓 핏(PMF)을 찾기까지, 그리고 데스밸리를 어떻게 버텨냈는지 선배 창업가의 가장 날것의 고민과 의사결정 과정을 파헤쳐 봅니다. 일방적인 강연이 아닌 심도 있는 Q&A 세션이 메인으로 진행됩니다.",
    agenda: [
      { time: "14:00 - 14:15", description: "오프닝 및 모더레이터 소개" },
      { time: "14:15 - 15:00", description: "세션 1: 데스밸리를 견디는 실전 마인드셋" },
      { time: "15:00 - 16:00", description: "AMA (Ask Me Anything) 현장 질문" },
      { time: "16:00 - 17:00", description: "그룹 네트워킹 및 회고" }
    ],
    quotes: [
      { text: "투자 과정의 어려움을 적나라하게 들을 수 있어서 큰 위로와 자극이 되었습니다.", author: "예비 창업가 이O님" },
      { text: "성장 이면의 힘든 의사결정 이야기를 들으며 우리 팀의 방향성을 다잡았습니다.", author: "스타트업 코파운더 최O님" }
    ],
    gallery: [
      "/E1_05628.JPG",
      "/videoframe_3417.png"
    ]
  },
  {
    id: "2026-q2-networking-party",
    title: "Networking Party",
    summary: "창업가, 빌더, 디자이너가 자연스럽게 연결되는 캐주얼 네트워킹",
    dateLabel: "2026.05.23 (Sat)",
    location: "Seoul",
    imageSrc: "/videoframe_3417.png",
    imageAlt: "Networking Party",
    imagePosition: "70% center",
    imageScale: 1.5,
    status: "upcoming",
    detailUrl: KAKAO_INVITE_URL,
    fullDescription: "각자의 점들이 모여 선이 되고, 강력한 모멘텀이 되는 네트워킹 파티입니다. YFC 멤버뿐만 아니라 예비 창업가, 개발자, 마케터 등 다양한 씬의 빌더들이 모여 자연스럽게 영감을 주고받는 시간을 가집니다. 성장을 열망하는 사람들과의 밀도 높은 대화가 기다립니다.",
    agenda: [
      { time: "19:00 - 19:30", description: "입장 및 아이스브레이킹" },
      { time: "19:30 - 20:30", description: "랜덤 매칭 1:1 토크 라운드" },
      { time: "20:30 - 22:00", description: "프리 네트워킹 및 피자 파티" }
    ],
    quotes: [
      { text: "이곳에서 만난 인연으로 사이드 프로젝트를 시작하게 되었습니다!", author: "프론트엔드 개발자 박O님" },
      { text: "다양한 분야의 열정 넘치는 사람들과 대화하며 큰 에너지를 얻었어요.", author: "프로덕트 디자이너 정O님" }
    ],
    gallery: [
      "/videoframe_3417.png",
      "/P20260101_093613000_8B8FAF6B-8412-4887-A666-5956E166A896.PNG",
      "/E1_05628.JPG"
    ]
  },
  {
    id: "2026-q1-theme-workshop",
    title: "Theme Workshop",
    summary: "브랜딩, 마케팅, 초기 고객 확보를 실무 중심으로 다루는 워크숍",
    dateLabel: "2026.01.20 (Tue)",
    location: "Seoul",
    imageSrc: "/P20260101_093613000_8B8FAF6B-8412-4887-A666-5956E166A896.PNG",
    imageAlt: "Theme Workshop",
    imagePosition: "center",
    imageScale: 1.1,
    status: "completed",
    fullDescription: "제품은 완성되었지만, 어떻게 알려야 할지 막막했던 초기 창업가들을 위해 기획된 실천형 워크숍입니다. 첫 고객 100명을 만들기 위한 린(Lean) 마케팅 전략과, 한정된 리소스로 가장 매력적인 브랜딩을 구축하는 방법을 실습 위주로 밀도 있게 진행했습니다. 탁상공론이 아닌 현장 적용에 집중합니다.",
    agenda: [
      { time: "13:00 - 14:00", description: "섹션 1: 제로 투 원(0 to 1) 고객 획득 모델 세우기" },
      { time: "14:00 - 16:00", description: "그룹 실습: 타겟 페르소나 설계 및 광고 문구 도출" },
      { time: "16:00 - 17:00", description: "상호 피드백 및 리소스 공유" }
    ],
    quotes: [
      { text: "막연했던 초기 고객 유입 전략을 실질적인 액션 플랜으로 쪼개볼 수 있었습니다.", author: "SaaS 스타트업 대표 김O님" },
      { text: "우리 서비스만의 '워우(Wow) 모먼트'를 정의하는 세션이 큰 도움이 되었어요.", author: "앱 기획자 조O님" }
    ],
    gallery: [
      "/P20260101_093613000_8B8FAF6B-8412-4887-A666-5956E166A896.PNG",
      "/E1_05647.JPG",
      "/E1_05628.JPG",
      "/E1_05706.JPG",
      "/videoframe_3417.png",
      "/E1_05784.JPG",
      "/E1_05647.JPG",
      "/E1_05628.JPG",
      "/P20260101_093613000_8B8FAF6B-8412-4887-A666-5956E166A896.PNG",
      "/E1_05706.JPG",
      "/E1_05628.JPG",
      "/videoframe_3417.png",
      "/E1_05784.JPG",
      "/E1_05647.JPG",
      "/P20260101_093613000_8B8FAF6B-8412-4887-A666-5956E166A896.PNG"
    ]
  },
];
