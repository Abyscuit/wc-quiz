import { redirect } from 'next/navigation';
import { mewMobileLink } from '../template/quiz';

export default function Page() {
  return <main>{redirect(mewMobileLink)}</main>;
}
