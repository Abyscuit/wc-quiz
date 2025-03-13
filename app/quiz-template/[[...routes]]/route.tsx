/** @jsxImportSource frog/jsx */

import { devtools } from 'frog/dev';
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next';
import { serveStatic } from 'frog/serve-static';
import {
  createApp,
  createIntro,
  createQuestionPage,
  createResultPage,
  enkryptLink,
} from '@/app/template/quiz';
import { Questions, Results } from '@/app/template';

const title = 'Quiz Template';
const app = createApp('/quiz-template', title);

const questions: Questions = [
  {
    question: 'Question 1',
    answers: [
      { answer: 'Answer 1', value: '0' },
      { answer: 'Answer 2', value: '1' },
      { answer: 'Answer 3', value: '2' },
    ],
  },
  {
    question: 'Question 2',
    answers: [
      { answer: 'Answer 1', value: '0' },
      { answer: 'Answer 2', value: '1' },
      { answer: 'Answer 3', value: '2' },
    ],
  },
  {
    question: 'Question 3',
    answers: [
      { answer: 'Answer 1', value: '0' },
      { answer: 'Answer 2', value: '1' },
      { answer: 'Answer 3', value: '2' },
    ],
  },
  {
    question: 'Question 4',
    answers: [
      { answer: 'Answer 1', value: '0' },
      { answer: 'Answer 2', value: '1' },
      { answer: 'Answer 3', value: '2' },
    ],
  },
  {
    question: 'Question 5',
    answers: [
      { answer: 'Answer 1', value: '0' },
      { answer: 'Answer 2', value: '1' },
      { answer: 'Answer 3', value: '2' },
    ],
  },
];

const results: Results = [
  {
    name: 'Sam Bankman-Fried',
    desc: "It's giving we could be cellies.",
    enkryptDesc:
      'And he/you should have used a self custody wallet like Enkrypt!',
    img: `/images/founders/Sam-Bankman-Fried.png`,
  },
  {
    name: 'Do Kwon',
    desc: 'Not afraid to try new things!',
    enkryptDesc:
      'And he/you should have used a self custody wallet like Enkrypt!',
    img: `/images/founders/Do-Kwan.png`,
  },
  {
    name: 'CZ',
    desc: "You're quick to act and overcome any challenges.",
    enkryptDesc:
      "And he/you'd use a self custody multichain wallet like Enkrypt!",
    img: `/images/founders/CZ.png`,
  },
  {
    name: 'Vitalik Buterin',
    desc: "You used to play WoW, now you're an onchain hero and animal lover.",
    enkryptDesc:
      "And he/you'd use a self custody multichain wallet like Enkrypt!",
    img: `/images/founders/Vitalik-Buterin.png`,
  },
  {
    name: 'Satoshi Nakamoto',
    desc: 'Very calculated. Very based.',
    enkryptDesc:
      "And he/you'd use a self custody multichain wallet like Enkrypt!",
    img: `/images/founders/Satoshi-Nakamoto.png`,
  },
];

const storedAnswers: string[] = [];
let questionNum = -1;

app.frame('/', c => {
  questionNum = -1;
  return c.res(createIntro(title));
});

app.frame('/questions', c => {
  const { buttonValue } = c;
  questionNum++;
  return c.res(
    createQuestionPage(true, buttonValue, questions, questionNum, storedAnswers)
  );
});

app.frame('/result', c => {
  const { buttonValue } = c;
  return c.res(
    createResultPage(buttonValue, results, storedAnswers, {
      text: 'Download Enkrypt',
      url: enkryptLink,
    })
  );
});

devtools(app, { serveStatic });

export const GET = handle(app);
export const POST = handle(app);

// NOTE: That if you are using the devtools and enable Edge Runtime, you will need to copy the devtools
// static assets to the public folder. You can do this by adding a script to your package.json:
// ```json
// {
//   scripts: {
//     "copy-static": "cp -r ./node_modules/frog/_lib/ui/.frog ./public/.frog"
//   }
// }
// ```
// Next, you'll want to set up the devtools to use the correct assets path:
// ```ts
// devtools(app, { assetsPath: '/.frog' })
// ```
