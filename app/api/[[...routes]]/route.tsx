/** @jsxImportSource frog/jsx */

import { devtools } from 'frog/dev';
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next';
import { serveStatic } from 'frog/serve-static';
import {
  createApp,
  createIntro,
  createMultiResultPage,
  createQuestionPage,
} from '@/app/template/quiz';
import { Questions, Results } from '@/app/template';

const title = 'What crypto conference should you go to in 2025?';
const app = createApp('/api', title, '/redirect');

const questions: Questions = [
  {
    question: 'Which of these blockchains are you most interested in?',
    answers: [
      { answer: 'Ethereum', value: 'ETH' },
      { answer: 'Bitcoin', value: 'BTC' },
      { answer: 'Solana', value: 'SOL' },
    ],
  },
  {
    question: 'What time of the year would you want to go?',
    answers: [
      { answer: 'Feb - Mar', value: 'Beginning' },
      { answer: 'Apr - May', value: 'Middle' },
      { answer: 'Anytime', value: 'Anytime' },
    ],
  },
  {
    question: 'Would you have spent 10,000 Bitcoin on 2 large pizzas?',
    answers: [
      { answer: 'Hell Nah', value: 'No-Pizza' },
      { answer: 'Yezzir', value: 'Yes-Pizza' },
      { answer: '+ wings', value: 'Wings' },
    ],
  },
  {
    question: 'Which location would you prefer to go?',
    answers: [
      { answer: 'America', value: 'America' },
      { answer: 'Asia', value: 'Asia' },
      { answer: 'Europe', value: 'Europe' },
    ],
  },
  {
    question: 'What is the main thing you look for in a conference?',
    answers: [
      { answer: 'Networking', value: 'Network' },
      { answer: 'New Tech', value: 'Tech' },
      { answer: 'Investing', value: 'Invest' },
    ],
  },
];

const results: Results = [
  {
    name: 'Consensus Hong Kong',
    desc: 'This is the latest edition of the Consensus conference.',
    values: [
      'ETH',
      'BTC',
      'SOL',
      'Beginning',
      'Anytime',
      'No-Pizza',
      'Asia',
      'Invest',
      'Network',
    ],
  },
  {
    name: 'ETHDenver',
    desc: 'Must-attend event for blockchain enthusiasts.',
    values: [
      'ETH',
      'Beginning',
      'Anytime',
      'No-Pizza',
      'Yes-Pizza',
      'Wings',
      'America',
      'Network',
      'Tech',
      'Invest',
    ],
  },
  {
    name: 'Paris Blockchain Week',
    desc: 'One of the largest crypto events in the world.',
    values: [
      'ETH',
      'BTC',
      'SOL',
      'Middle',
      'Anytime',
      'Yes-Pizza',
      'Wings',
      'Europe',
      'Invest',
      'Tech',
    ],
  },
  {
    name: 'Consensus Toronto',
    desc: 'This is the latest installment of the Consensus conference.',
    values: [
      'ETH',
      'BTC',
      'SOL',
      'Middle',
      'Anytime',
      'No-Pizza',
      'America',
      'Invest',
      'Network',
    ],
  },
  {
    name: 'Bitcoin 2025',
    desc: 'This is the largest Bitcoin conference in the world.',
    values: [
      'BTC',
      'Middle',
      'Anytime',
      'No-Pizza',
      'Yes-Pizza',
      'Wings',
      'America',
      'Network',
      'Tech',
      'Invest',
    ],
  },
  {
    name: 'Token2049 Singapore',
    desc: 'A premier crypto conference event held annually.',
    values: [
      'ETH',
      'BTC',
      'SOL',
      'Anytime',
      'Wings',
      'Asia',
      'Tech',
      'Network',
    ],
  },
  {
    name: 'Solana Breakpoint',
    desc: "Solana's flagship annual conference.",
    values: [
      'SOL',
      'Anytime',
      'Yes-Pizza',
      'Wings',
      'Asia',
      'Tech',
      'Network',
      'Invest',
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
  return c.res(createMultiResultPage(buttonValue, results, storedAnswers));
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
