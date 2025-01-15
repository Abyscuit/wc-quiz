import { getFrameMetadata } from 'frog/web';
import type { Metadata } from 'next';

import styles from './page.module.css';

export async function generateMetadata(): Promise<Metadata> {
  const frameTags = await getFrameMetadata(
    `${process.env.VERCEL_URL || 'http://localhost:3000'}/api`
  );
  return {
    other: frameTags,
  };
}

const paths = [
  { path: '/api', title: 'Template Quiz', desc: 'Template for Quizzes' },
  {
    path: '/founder',
    title: 'Crypto Founder Quiz',
    desc: 'Which crypto founder are you?',
  },
  {
    path: '/blockchain',
    title: 'Blockchain Quiz',
    desc: 'What blockchain are you?',
  },
];

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.grid}>
        {paths.map(data => {
          return (
            <a
              href={data.path}
              className={styles.card}
              target='_blank'
              rel='noopener noreferrer'
              key={data.path}
            >
              <h2>
                {data.title} <span>-&gt;</span>
              </h2>
              <p>{data.desc}</p>
            </a>
          );
        })}
      </div>
    </main>
  );
}
