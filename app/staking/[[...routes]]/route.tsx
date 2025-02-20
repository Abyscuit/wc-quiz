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
    question: 'Would you stake on a centralized exchange, dApp or on a node?',
    answers: [
      { answer: 'Exchange', value: '0' },
      { answer: 'dApp', value: '1' },
      { answer: 'Node', value: '2' },
    ],
  },
  {
    question: 'Do you prefer maintaining your own validator?',
    answers: [
      { answer: 'Nah', value: '0' },
      { answer: 'Yeah', value: '1' },
      { answer: 'Why?', value: '2' },
    ],
  },
  {
    question:
      'Which would you choose high APR but volatile blockchain or lower APR and stable blockchain?',
    answers: [
      { answer: 'High APR', value: '0' },
      { answer: 'Stablility', value: '1' },
    ],
  },
  {
    question: 'Would you want newest tech or older but proven tech?',
    answers: [
      { answer: 'idc', value: '0' },
      { answer: 'Proven', value: '1' },
      { answer: 'Newest', value: '2' },
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
  },
  {
    name: 'Polygon',
    desc: 'Native staking is pretty simple but only available on Ethereum.',
    enkryptDesc: enkryptDesc.replace('{crypto}', 'POL'),
    img: '/images/crypto/Polygon.png',
  },
  {
    name: 'Arthera',
    desc: 'Really straightforward using the Arthera Dashboard.',
    enkryptDesc: enkryptDesc.replace('{crypto}', 'AA'),
    img: '/images/crypto/Arthera.png',
  },
  {
    name: 'Ethereum',
    desc: 'You have many options on staking ETH!',
    enkryptDesc: enkryptDesc.replace('{crypto}', 'ETH'),
    img: '/images/crypto/Ethereum.png',
  },
  {
    name: 'Solana',
    desc: 'Solana staking in now available on Enkrypt!',
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
