import { useUser } from './User';
import SignInPage from '../pages/signin';

export default function PleaseSignIn({ children }) {
  const me = useUser();
  if (!me) return <SignInPage />;
  return children;
}
