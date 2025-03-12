export type Questions = {
  question: string;
  answers: {
    answer: string;
    value: string;
  }[];
  prevAnswers?: string[];
}[];

export type Results = {
  name: string;
  desc: string;
  enkryptDesc?: string;
  img?: string;
  values?: string[];
}[];
