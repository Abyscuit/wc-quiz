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

const title = 'Which crypto should you stake?';
const app = createApp('/staking', title, stakingLink);

const questions: Questions = [
  {
    question: 'Do you prefer delegating, pooling your stake, or self staking?',
    answers: [
      { answer: 'Delegating', value: 'delegate' },
      { answer: 'Pooling', value: 'pooling' },
      { answer: 'Self', value: 'self' },
    ],
  },
  {
    question: 'Would you stake on a centralized exchange or dApp?',
    answers: [
      { answer: 'Exchange', value: 'exchange' },
      { answer: 'dApp', value: 'dapp' },
    ],
    prevAnswers: ['delegate', 'pooling'],
  },
  {
    question: 'Do you prefer maintaining your own validator?',
    answers: [
      { answer: 'Nah', value: 'nah' },
      { answer: 'Yeah', value: 'yeah' },
      { answer: 'Why?', value: 'why' },
    ],
    prevAnswers: ['self'],
  },
  {
    question:
      'Which would you choose high APR but volatile blockchain or lower APR and stable blockchain?',
    answers: [
      { answer: 'High APR', value: 'apr' },
      { answer: 'Stablility', value: 'stability' },
    ],
  },
  {
    question: 'Would you want newest tech or older but proven tech?',
    answers: [
      { answer: 'idc', value: 'idc' },
      { answer: 'Proven', value: 'proven' },
      { answer: 'Newest', value: 'newest' },
    ],
  },
];

const enkryptDesc =
  'Start staking your {crypto} with our multichain browser wallet Enkrypt!';
const crypto: Results = [
  {
    name: 'Ethereum',
    desc: 'You have many options on staking ETH!',
    enkryptDesc: enkryptDesc.replace('{crypto}', 'ETH'),
    img: '/images/crypto/Ethereum.png',
    values: [
      'delegate',
      'self',
      'pooling',
      'dapp',
      'node',
      'exchange',
      'nah',
      'why',
      'yeah',
      'stability',
      'idc',
      'proven',
    ],
  },
  {
    name: 'Solana',
    desc: 'Solana staking in now available on Enkrypt!',
    enkryptDesc: enkryptDesc.replace('{crypto}', 'SOL'),
    img: '/images/crypto/Solana.png',
    values: [
      'delegate',
      'pooling',
      'dapp',
      'exchange',
      'nah',
      'why',
      'apr',
      'idc',
      'newest',
    ],
  },
  {
    name: 'Aptos',
    desc: 'Aptos staking in now available on Enkrypt!',
    enkryptDesc: enkryptDesc.replace('{crypto}', 'APT'),
    img: '/images/crypto/Aptos.png',
    values: [
      'delegate',
      'self',
      'pooling',
      'dapp',
      'node',
      'exchange',
      'nah',
      'why',
      'yeah',
      'apr',
      'stability',
      'idc',
      'newest',
      'proven',
    ],
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
  return c.res(
    createResultPage(
      buttonValue,
      crypto,
      storedAnswers,
      { text: 'Stake on Enkrypt', url: stakingLink },
      'You should stake {name}!'
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
