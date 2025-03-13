export type Questions = {
  question: string;
  answers: Answer[];
  prevAnswers?: string[];
}[];

type Answer = {
  answer: string;
  value: string;
};

export type Results = {
  name: string;
  desc: string;
  enkryptDesc?: string;
  img?: string;
  values?: string[];
}[];

export type Link = {
  text: string;
  url: string;
};
