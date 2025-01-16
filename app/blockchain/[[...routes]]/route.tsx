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

const title = 'What blockchain are you?';
const app = createApp('/blockchain', title);

const questions: Questions = [
  {
    question: 'On chain, on-chain or onchain?',
    answers: [
      { answer: 'On Chain', value: '0' },
      { answer: 'On-Chain', value: '1' },
      { answer: 'Onchain', value: '2' },
    ],
  },
  {
    question: 'Memecoins or DeFi?',
    answers: [
      { answer: 'Memecoins', value: '0' },
      { answer: 'DeFi', value: '1' },
      { answer: '1) What', value: '2' },
    ],
  },
  {
    question: "I'm in it for the…",
    answers: [
      { answer: 'Memes', value: '0' },
      { answer: 'Money', value: '1' },
      { answer: 'Tech', value: '2' },
    ],
  },
  {
    question: 'When did you start in crypto?',
    answers: [
      { answer: 'Post 2020', value: '0' },
      { answer: '2017-2020', value: '1' },
      { answer: 'Pre 2017', value: '2' },
    ],
  },
  {
    question: 'Are you currently staking any crypto?',
    answers: [
      { answer: 'Maybe?', value: '0' },
      { answer: 'No', value: '1' },
      { answer: 'Yes', value: '2' },
    ],
  },
];
const crypto: Results = [
  {
    name: 'Dogecoin',
    desc: "It's giving fun to be around.",
    enkryptDesc:
      'Easily manage your Dogecoin with our multichain browser wallet Enkrypt!',
    img: '/images/crypto/Dogecoin.png',
  },
  {
    name: 'Solana',
    desc: 'Not afraid to embrace your silly side!',
    enkryptDesc:
      'Easily manage your Solana with our multichain browser wallet Enkrypt!',
    img: '/images/crypto/Solana.png',
  },
  {
    name: 'Ethereum',
    desc: 'You adapt to challenges and are not afraid to try new things.',
    enkryptDesc:
      'Easily manage your Ethereum with our multichain browser wallet Enkrypt!',
    img: '/images/crypto/Ethereum.png',
  },
  {
    name: 'Bitcoin',
    desc: 'A reliable leader, the people love you!',
    enkryptDesc:
      'Easily manage your Bitcoin with our multichain browser wallet Enkrypt!',
    img: '/images/crypto/Bitcoin.png',
  },
  {
    name: 'Base',
    desc: 'Basically very based.',
    enkryptDesc:
      'Easily manage your Ethereum on Base with our multichain browser wallet Enkrypt!',
    img: '/images/crypto/Base.png',
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
