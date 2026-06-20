export type QuestionKey =
  | "q_intro"
  | "q_oneliner"
  | "q_background"
  | "q_hardest"
  | "q_turningpoint"
  | "q_vision"
  | "q_lifegoal"
  | "q_message";

export type InterviewSubmission = {
  name: string;
  role: string;
  item: string;
  email: string;
  link: string;
  photoUrl: string;
  consent: boolean;
  website: string; // honeypot (봇 차단용, 사람은 비워둠)
} & Record<QuestionKey, string>;
