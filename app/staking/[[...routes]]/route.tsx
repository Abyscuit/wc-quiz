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
} from '@/app/template/quiz';
import { Questions, Results } from '@/app/template';

const title = 'Which crypto should you stake?';
const app = createApp('/staking', title, '/redirect');

const questions: Questions = [
  {
    question: 'Do you prefer delegating, pooling your stake, or self staking?',
    answers: [
      { answer: 'Delegating', value: '0' },
      { answer: 'Pooling', value: '1' },
      { answer: 'Self', value: '2' },
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

const enkryptDesc =
  'Start staking your {crypto} with our multichain browser wallet Enkrypt!';
const crypto: Results = [
  {
    name: 'Polkadot',
    desc: "It's giving fun to be around.",
    enkryptDesc: enkryptDesc.replace('{crypto}', 'Polkadot'),
    img: '/images/crypto/Polkadot.png',
  },
  {
    name: 'Polygon',
    desc: 'Basically very based.',
    enkryptDesc: enkryptDesc.replace('{crypto}', 'Polygon'),
    img: '/images/crypto/Polygon.png',
  },
  {
    name: 'Ethereum',
    desc: 'You adapt to challenges and are not afraid to try new things.',
    enkryptDesc: enkryptDesc.replace('{crypto}', 'Ethereum'),
    img: '/images/crypto/Ethereum.png',
  },
  {
    name: 'Arthera',
    desc: 'A reliable leader, the people love you!',
    enkryptDesc: enkryptDesc.replace('{crypto}', 'Arthera'),
    img: '/images/crypto/Arthera.png',
  },
  {
    name: 'Solana',
    desc: 'Not afraid to embrace your silly side!',
    enkryptDesc: enkryptDesc.replace('{crypto}', 'Solana'),
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
  questionNum++;
  return c.res(
    createQuestionPage(buttonValue, questions, questionNum, storedAnswers)
  );
});

app.frame('/result', c => {
  const { buttonValue } = c;
  return c.res(createResultPage(buttonValue, crypto, storedAnswers));
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
