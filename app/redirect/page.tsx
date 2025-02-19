import { enkryptLink } from '@/app/template/quiz';
import { redirect } from 'next/navigation';

export default function Page() {
  return <main>{redirect(enkryptLink)}</main>;
}
