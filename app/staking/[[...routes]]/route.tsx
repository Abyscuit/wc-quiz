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
      { answer: 'Delegating', value: 'delegate' },
      { answer: 'Pooling', value: 'pooling' },
      { answer: 'Self', value: 'self' },
    ],
  },
  {
    question: 'Would you stake on a centralized exchange, dApp or on a node?',
    answers: [
      { answer: 'Exchange', value: 'exchange' },
      { answer: 'dApp', value: 'dapp' },
      { answer: 'Node', value: 'node' },
    ],
  },
  {
    question: 'Do you prefer maintaining your own validator?',
    answers: [
      { answer: 'Nah', value: 'nah' },
      { answer: 'Yeah', value: 'yeah' },
      { answer: 'Why?', value: 'why' },
    ],
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
    name: 'Polkadot',
    desc: 'It can be a bit technical but Enkrypt makes it easy!',
    enkryptDesc: enkryptDesc.replace('{crypto}', 'DOT'),
    img: '/images/crypto/Polkadot.png',
    values: [
      'delegate',
      'pooling',
      'dapp',
      'exchange',
      'nah',
      'why',
      'apr',
      'stability',
      'idc',
      'newest',
    ],
  },
  {
    name: 'Polygon',
    desc: 'Native staking is pretty simple but only available on Ethereum.',
    enkryptDesc: enkryptDesc.replace('{crypto}', 'POL'),
    img: '/images/crypto/Polygon.png',
    values: [
      'delegate',
      'self',
      'dapp',
      'node',
      'nah',
      'why',
      'yeah',
      'apr',
      'idc',
      'proven',
    ],
  },
  {
    name: 'Arthera',
    desc: 'Really straightforward using the Arthera Dashboard.',
    enkryptDesc: enkryptDesc.replace('{crypto}', 'AA'),
    img: '/images/crypto/Arthera.png',
    values: [
      'delegate',
      'self',
      'dapp',
      'node',
      'nah',
      'why',
      'yeah',
      'stability',
      'idc',
      'newest',
    ],
  },
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
      'dapp',
      'exchange',
      'nah',
      'why',
      'apr',
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
  questionNum++;
  return c.res(
    createQuestionPage(buttonValue, questions, questionNum, storedAnswers)
  );
});

app.frame('/result', c => {
  const { buttonValue } = c;
  return c.res(
    createResultPage(
      buttonValue,
      crypto,
      storedAnswers,
      false,
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
