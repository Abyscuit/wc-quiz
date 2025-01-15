/** @jsxImportSource frog/jsx */

import { Button, Frog } from 'frog';
import { bg, container, fontStyle } from '@/app/styles/styles';
import { Roboto } from '@/app/styles/fonts';
import { Questions, Results } from '.';

export function createApp(path: string, title: string) {
  return new Frog({
    assetsPath: '/',
    basePath: path,
    // Supply a Hub to enable frame verification.
    // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
    title: title,
    imageOptions: {
      // @ts-ignore
      fonts: [...Roboto],
    },
  });
}

const enkryptLink =
  'https://chrome.google.com/webstore/detail/enkrypt/kkpllkodjeloidieedojogacfhpaihoh';

export function createIntro(title: string, bgImage?: string) {
  return {
    image: (
      <div style={container}>
        <img
          alt='background'
          src={bgImage ?? '/background.png'}
          width={'100%'}
          height={'100%'}
          style={bg}
        />
        <div style={fontStyle}>{title}</div>
      </div>
    ),
    intents: [
      <Button value='reset' action='/questions'>
        Let's find out!
      </Button>,
    ],
  };
}

export function createQuestionPage(
  buttonValue: string | undefined,
  questions: Questions,
  questionNum: number,
  storedAnswers: number[]
) {
  if (buttonValue === 'reset') {
    storedAnswers.splice(0, storedAnswers.length);
    questionNum = 0;
  }
  const lastQuestion = questionNum === questions.length - 1;
  const linkAction = lastQuestion ? '/result' : '';
  const currentQuestion = questions[questionNum];
  return {
    image: (
      <div style={container}>
        <img
          alt='background'
          src='/background.png'
          width={'100%'}
          height={'100%'}
          style={bg}
        />
        {buttonValue && buttonValue !== 'reset'
          ? storedAnswers.push(parseInt(buttonValue))
          : ''}
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
  };
}

export function createResultPage(
  buttonValue: string | undefined,
  results: Results,
  storedAnswers: number[]
) {
  if (buttonValue && !isNaN(parseInt(buttonValue))) {
    storedAnswers.push(parseInt(buttonValue));
  }
  const idx = calculateResult(results, storedAnswers);
  const result = results[idx];
  return {
    image: (
      <div style={{ ...container, flexDirection: 'row' }}>
        <img
          alt='background'
          src='/background.png'
          width={'100%'}
          height={'100%'}
          style={bg}
        />
        <img src={result.img} width={380} height={380} alt={result.name} />
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
          >{`You are ${result.name}.\n${result.desc}\n${result.enkryptDesc}`}</div>
        </div>
      </div>
    ),
    intents: [
      <Button.Link href={enkryptLink}>Download Enkrypt</Button.Link>,
      <Button.Reset>Start Over</Button.Reset>,
    ],
  };
}

function calculateResult(results: Results, storedAnswers: number[]): number {
  let sum = 0;
  for (const element of storedAnswers) {
    sum += element;
  }
  sum = Math.floor(sum / 2);
  if (sum > results.length - 1) sum = results.length - 1;
  return sum;
}

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
