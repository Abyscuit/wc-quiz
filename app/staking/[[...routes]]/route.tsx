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
import { Button } from 'frog';
import { bg, container, fontStyle } from '@/app/styles/styles';
import { redirect } from 'next/navigation';

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

const answerText = [
  [
    'Good news - absolutely anyone who has SOL can stake and receive rewards!',
    "That's right! All you need to get started is some SOL and a wallet.",
  ],
  ['', ''], // Are there risks?
  ['', ''], // where rewards issued?
  ['', ''], // validator controls stake?
  ['', ''], // How often rewards issued?
];

const resultText = [
  'You are joking right?',
  'You need to study!',
  'Wow you gotta study more!',
  'Gotta do better!',
  'Oof just 1 off!',
  `You're based!`,
];

const storedAnswers: string[] = [];
let questionNum = -1;

app.frame('/', c => {
  questionNum = -1;
  return c.res(createIntro(title));
});

app.frame('/questions', c => {
  const { buttonValue } = c;
  if (questionNum === -1) storedAnswers.splice(0, storedAnswers.length);
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
      storedAnswers,
      undefined,
      '/check-answer'
    )
  );
});

app.frame('/check-answer', c => {
  const { buttonValue, status } = c;
  if (status !== 'response') redirect('/');
  storeAnswer(storedAnswers, buttonValue, questionNum);

  const correct = buttonValue === '1';
  const response = correct ? { text: '✅' } : { text: '❌' };

  const idx = parseInt(buttonValue ?? '0');

  return c.res({
    image: (
      <div style={{ ...container, flexDirection: 'row' }}>
        <img
          alt='background'
          src='/background.png'
          width={'100%'}
          height={'100%'}
          style={bg}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignText: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80%',
          }}
        >
          <div
            style={{
              ...fontStyle,
              fontSize: 60,
            }}
          >
            {`${response.text}\n${answerText[questionNum][idx]}`}
          </div>
        </div>
      </div>
    ),
    intents: [
      <Button action='/questions'>Next</Button>,
      <Button.Reset>Start Over</Button.Reset>,
    ],
  });
});

app.frame('/result', c => {
  const { buttonValue } = c;
  let score = parseInt(buttonValue ?? '0');
  for (const element of storedAnswers) {
    score += parseInt(element);
  }
  if (score > questions.length) score = questions.length;

  return c.res(
    createResultPage(
      buttonValue,
      crypto,
      storedAnswers,
      { text: 'Stake on Enkrypt', url: stakingLink },
      `${score}/5 - ${resultText[score]}`
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
