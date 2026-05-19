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
    id: "why-youth-cau",
    title: "Why Youth? 왜 청년 창업가인가",
    summary: "정부지원사업부터 100억 연매출 스타트업 창업가까지, 청년 창업 인사이트 컨퍼런스",
    dateLabel: "2026.03.28 (Sat)",
    location: "중앙대학교 서울캠퍼스 B5층 우리은행홀",
    imageSrc: "/whyyouth/cover.png",
    imageAlt: "Why Youth? 왜 청년 창업가인가 — 중앙대학교",
    imagePosition: "center center",
    imageScale: 1.0,
    status: "completed",
    fullDescription: "중앙대학교 서울캠퍼스 우리은행홀에서 열린 'Why Youth? 왜 청년 창업가인가' 컨퍼런스. 정부지원사업 활용 노하우부터 연매출 100억 규모 스타트업을 일군 창업가의 실전 인사이트까지, 청년 창업가들이 다음 단계로 도약하기 위해 알아야 할 이야기를 한자리에 모았습니다.",
    gallery: [
      "/whyyouth/speaker1.png",
      "/whyyouth/speaker2.png",
      "/whyyouth/DSC01339.JPG",
      "/whyyouth/DSC01256.JPG",
      "/whyyouth/DSC01322.JPG",
      "/whyyouth/DSC01840.JPG"
    ]
  },
  {
    id: "ambition-night",
    title: "Ambition Night",
    summary: "야망 있는 창업가들의 밀도 높은 네트워킹 밤",
    dateLabel: "2025.12.30 (Tue)",
    location: "Seoul",
    imageSrc: "/ambitionnight/앰비션나잇표지.png",
    imageAlt: "Ambition Night",
    imagePosition: "5% center",
    imageScale: 1.0,
    status: "completed",
    fullDescription: "성장을 갈망하고 세상을 바꾸고자 하는 창업가들이 모여 서로의 비전을 공유하고 연결되는 시간, Ambition Night입니다. 가벼운 담소를 넘어 각자의 고민과 야망을 나누며 새로운 인사이트를 얻는 밀도 높은 시간이 진행되었습니다.",
    gallery: [
      "/ambitionnight/IMG_0773.png",
      "/ambitionnight/IMG_3350.png",
      "/ambitionnight/IMG_3354.png",
      "/ambitionnight/IMG_3362.png",
      "/ambitionnight/IMG_3375.png",
      "/ambitionnight/IMG_3383.png",
      "/ambitionnight/IMG_3390.png"
    ]
  },
  {
    id: "momentum-night",
    title: "Momentum Night",
    summary: "청년 창업가들의 성장과 모멘텀을 응원하는 네트워킹 행사",
    dateLabel: "2025.01.20 (Mon)",
    location: "Seoul",
    imageSrc: "/momentumnight/모멘텀 나잇 ppt.png",
    imageAlt: "Momentum Night",
    imagePosition: "10% center",
    imageScale: 1.0,
    status: "completed",
    fullDescription: "초기 창업가들이 서로의 고민을 나누고 새로운 도약의 모멘텀을 찾는 네트워킹 행사입니다. 열정적인 빌더들이 모여 인사이트를 공유하고 의미 있는 연결을 만들어갔습니다.",
    gallery: [
      "/momentumnight/모멘텀 나잇 ppt (1).png",
      "/momentumnight/모멘텀 나잇 ppt (2).png",
      "/momentumnight/E1_05422.JPG",
      "/momentumnight/E1_05553.JPG",
      "/momentumnight/E1_05564.JPG",
      "/momentumnight/E1_05674.JPG",
      "/momentumnight/E1_05720.JPG",
      "/momentumnight/E1_05644.JPG",
      "/momentumnight/E1_05773.JPG"
    ]
  }
];

