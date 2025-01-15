/** @jsxImportSource frog/jsx */

import { Button } from 'frog';
import { devtools } from 'frog/dev';
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next';
import { serveStatic } from 'frog/serve-static';
import { bg, container, fontStyle } from '@/app/styles/styles';
import { createApp } from '@/app/template/quiz';

const title = 'Which crypto founder are you?';
const app = createApp('/founder', title);

const enkryptLink =
  'https://chrome.google.com/webstore/detail/enkrypt/kkpllkodjeloidieedojogacfhpaihoh';

const questions = [
  {
    question: 'Which wallet do you hold your crypto in?',
    answers: [
      { answer: 'Exchange', weight: '0' },
      { answer: 'Self-Custody', weight: '1' },
    ],
  },
  {
    question: 'Do you use DeFi lending?',
    answers: [
      { answer: 'APR >100%', weight: '0' },
      { answer: 'Yezzir', weight: '1' },
      { answer: 'Wut', weight: '2' },
    ],
  },
  {
    question: 'Which best describes crypto?',
    answers: [
      { answer: 'Depends', weight: '0' },
      { answer: 'Private', weight: '1' },
      { answer: 'Transparent', weight: '2' },
    ],
  },
  {
    question: 'Have you ever traded crypto on leverage?',
    answers: [
      { answer: 'Absolutely', weight: '0' },
      { answer: 'What??', weight: '1' },
      { answer: 'Nope. Never', weight: '2' },
    ],
  },
  {
    question: 'Do you participate in liquidity pools?',
    answers: [
      { answer: 'Huh?', weight: '0' },
      { answer: 'Nahh', weight: '1' },
      { answer: 'Yeah', weight: '2' },
    ],
  },
];

const founders = [
  {
    name: 'Sam Bankman-Fried',
    desc: "It's giving we could be cellies.",
    enkryptDesc:
      'And he/you should have used a self custody wallet like Enkrypt!',
  },
  {
    name: 'Do Kwon',
    desc: 'Not afraid to try new things!',
    enkryptDesc:
      'And he/you should have used a self custody wallet like Enkrypt!',
  },
  {
    name: 'CZ',
    desc: "You're quick to act and overcome any challenges.",
    enkryptDesc:
      "And he/you'd use a self custody multichain wallet like Enkrypt!",
  },
  {
    name: 'Vitalik Buterin',
    desc: "You used to play WoW, now you're an onchain hero and animal lover.",
    enkryptDesc:
      "And he/you'd use a self custody multichain wallet like Enkrypt!",
  },
  {
    name: 'Satoshi Nakamoto',
    desc: 'Very calculated. Very based.',
    enkryptDesc:
      "And he/you'd use a self custody multichain wallet like Enkrypt!",
  },
];

const storedAnswers: number[] = [];
let questionNum = 0;

app.frame('/', c => {
  return c.res({
    image: (
      <div style={container}>
        <img
          alt='background'
          src='/images/founder-background.png'
          width={'100%'}
          height={'100%'}
          style={bg}
        />
        <div style={fontStyle}>{app.title}</div>
      </div>
    ),
    intents: [
      <Button value='reset' action='/questions'>
        Let's find out!
      </Button>,
    ],
  });
});

function incrementQuestion(value: string) {
  questionNum++;
  if (value !== 'reset') storedAnswers.push(parseInt(value));
}

app.frame('/questions', c => {
  const { buttonValue } = c;
  if (buttonValue === 'reset') {
    storedAnswers.splice(0, storedAnswers.length);
    questionNum = 0;
  }
  const lastQuestion = questionNum === questions.length - 1;
  const linkAction = lastQuestion ? '/result' : '';
  const currentQuestion = questions[questionNum];
  return c.res({
    image: (
      <div style={container}>
        <img
          alt='background'
          src='/background.png'
          width={'100%'}
          height={'100%'}
          style={bg}
        />
        {incrementQuestion(buttonValue ?? '')}
        <div style={{ ...fontStyle, textShadow: '0px 0px' }}>
          {currentQuestion.question}
        </div>
      </div>
    ),
    intents: [
      ...currentQuestion.answers.map(answer => {
        return (
          <Button value={answer.weight} action={linkAction}>
            {answer.answer}
          </Button>
        );
      }),
      <Button.Reset>Start Over</Button.Reset>,
    ],
  });
});

app.frame('/result', c => {
  const { buttonValue } = c;
  if (buttonValue && !isNaN(parseInt(buttonValue))) {
    storedAnswers.push(parseInt(buttonValue));
  }
  const result = calculateResult();
  const founder = founders[result];
  const founderImg = `/images/founders/${founder.name.replace(' ', '-')}.png`;
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
        <img src={founderImg} width={380} height={380} alt={founder.name} />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignText: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            width: '60%',
          }}
        >
          <div
            style={{ ...fontStyle, fontSize: 45, textShadow: '0px 0px' }}
          >{`You are ${founder.name}.\n${founder.desc}\n${founder.enkryptDesc}`}</div>
        </div>
      </div>
    ),
    intents: [
      <Button.Link href={enkryptLink}>Download Enkrypt</Button.Link>,
      <Button.Reset>Start Over</Button.Reset>,
    ],
  });
});

function calculateResult(): number {
  let sum = 0;
  for (const element of storedAnswers) {
    sum += element;
  }
  sum = Math.floor(sum / 2);
  if (sum > founders.length - 1) sum = founders.length - 1;
  return sum;
}

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
