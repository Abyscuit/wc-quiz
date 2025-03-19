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
  stakingLink,
  storeAnswer,
} from '@/app/template/quiz';
import { Questions, Results } from '@/app/template';

const title = 'What do you know about SOL staking?';
const app = createApp('/staking', title, stakingLink);

const questions: Questions = [
  {
    question: 'Who can stake?',
    answers: [
      { answer: 'Approved users', value: '0' },
      { answer: 'Anyone with SOL', value: '1' },
    ],
  },
  {
    question: 'Are there risks to staking?',
    answers: [
      { answer: 'No', value: '0' },
      { answer: 'Yes', value: '1' },
    ],
  },
  {
    question: 'Where are staking rewards issued?',
    answers: [
      { answer: 'Redelegated', value: '1' },
      { answer: 'Into your wallet', value: '0' },
    ],
  },
  {
    question:
      'True or False: Delegating your tokens gives the validator control of your tokens.',
    answers: [
      { answer: 'False', value: '1' },
      { answer: 'True', value: '0' },
    ],
  },
  {
    question: 'How often are rewards issued?',
    answers: [
      { answer: 'Every block', value: '0' },
      { answer: 'Every epoch', value: '1' },
    ],
  },
];

const enkryptDesc =
  'Start staking your {crypto} with our multichain browser wallet Enkrypt!';
const crypto: Results = [
  {
    name: 'Solana',
    desc: 'Solana staking is now available on Enkrypt!',
    enkryptDesc: enkryptDesc.replace('{crypto}', 'SOL'),
    img: '/images/crypto/Solana.png',
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
  storeAnswer(storedAnswers, buttonValue, questionNum);
  questionNum++;
  let currentQuestion = questions[questionNum];
  while (
    currentQuestion.prevAnswers &&
    !storedAnswers.some(answer => currentQuestion.prevAnswers?.includes(answer))
  ) {
    questionNum++;
    currentQuestion = questions[questionNum];
  }
  return c.res(
    createQuestionPage(
      false,
      buttonValue,
      questions,
      questionNum,
      storedAnswers
    )
  );
});

app.frame('/result', c => {
  const { buttonValue } = c;
  let score = parseInt(buttonValue ?? '0');
  for (const element of storedAnswers) {
    score += parseInt(element);
  }

  return c.res(
    createResultPage(
      buttonValue,
      crypto,
      storedAnswers,
      { text: 'Stake on Enkrypt', url: stakingLink },
      `You scored a ${score}/5!`
    )
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
