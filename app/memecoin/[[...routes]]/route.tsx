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
  mewMobileLink,
} from '@/app/template/quiz';
import { Questions, Results } from '@/app/template';

const title = 'Which Season 9 MEW Universe NFT are you?';
const app = createApp('/memecoin', title, mewMobileLink);

const questions: Questions = [
  {
    question: 'John Pork, Sal or Freakbob?',
    answers: [
      { answer: 'John Pork', value: '0' },
      { answer: 'Sal', value: '1' },
      { answer: 'Freakbob', value: '2' },
    ],
  },
  {
    question: 'How often u moggin?',
    answers: [
      { answer: 'wut dat', value: '0' },
      { answer: 'errday', value: '1' },
      { answer: 'yes', value: '2' },
    ],
  },
  {
    question: 'BBQ BACON BURGER or BHOCOLATE BHIP BOOKIES?',
    answers: [
      { answer: 'BBQ', value: '0' },
      { answer: 'BOOKIES', value: '2' },
    ],
  },
  {
    question: 'fr fr, no cap or no cap fr ong?',
    answers: [
      { answer: 'fr fr', value: '0' },
      { answer: 'no cap', value: '1' },
      { answer: 'fr ong', value: '2' },
    ],
  },
  {
    question: 'Type beat, type shii, ty shii?',
    answers: [
      { answer: 'type beat', value: '0' },
      { answer: 'type shii', value: '1' },
      { answer: 'ty shii', value: '2' },
    ],
  },
  {
    question: 'run a fade or elote buffet?',
    answers: [
      { answer: 'fade', value: '0' },
      { answer: 'buffet', value: '1' },
      { answer: 'sure', value: '2' },
    ],
  },
];

const nftDesc = 'You can get {NFT} NFT by downloading the MEW Mobile app!';

const results: Results = [
  {
    name: 'Much Efficient Dog',
    desc: 'Much Efficient! Much Based!',
    enkryptDesc: nftDesc.replace('{NFT}', 'Much Efficient Dog'),
    img: `/images/nfts/season-9/Much-Efficient-Dog.png`,
  },
  {
    name: 'Sir Moggington',
    desc: 'U r maxmogging rn fr.',
    enkryptDesc: nftDesc.replace('{NFT}', 'Sir Moggington'),
    img: `/images/nfts/season-9/Sir-Moggington.png`,
  },
  {
    name: 'Tales Inu',
    desc: 'Gotta go fast!',
    enkryptDesc: nftDesc.replace('{NFT}', 'Tales Inu'),
    img: `/images/nfts/season-9/Tales-Inu.png`,
  },
  {
    name: 'Froggo',
    desc: 'Feels good man.',
    enkryptDesc: nftDesc.replace('{NFT}', 'Froggo'),
    img: `/images/nfts/season-9/Froggo.png`,
  },
  {
    name: 'PeggyWifHat',
    desc: 'Peggy! But wif a hat!',
    enkryptDesc: nftDesc.replace('{NFT}', 'PeggyWifHat'),
    img: `/images/nfts/season-9/PeggyWifHat.png`,
  },
  {
    name: 'Waifu6900',
    desc: 'Level 6900 Waifu UwU!',
    enkryptDesc: nftDesc.replace('{NFT}', 'Waifu6900'),
    img: `/images/nfts/season-9/Waifu6900.png`,
  },
];

const storedAnswers: string[] = [];
let questionNum = -1;

app.frame('/', c => {
  questionNum = -1;
  return c.res(createIntro(title, '/images/nft9-background.png'));
});
const backgrounds = ['/images/brainrot-background.png'];
app.frame('/questions', c => {
  const { buttonValue } = c;
  questionNum++;
  return c.res(
    createQuestionPage(
      buttonValue,
      questions,
      questionNum,
      storedAnswers,
      backgrounds[questionNum]
    )
  );
});

app.frame('/result', c => {
  const { buttonValue } = c;
  return c.res(createResultPage(buttonValue, results, storedAnswers, true));
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
