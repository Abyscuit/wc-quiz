import { redirect } from 'next/navigation';

export default function Page() {
  return <main>{redirect('https://download.mewwallet.com/')}</main>;
}
