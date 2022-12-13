import { gql, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { CURRENT_USER_QUERY } from './User';

const SIGN_OUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

export default function SignOut() {
  const router = useRouter();
  const [signout] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const handleSignout = async () => {
    await signout();
    router.push('/signin');
  };

  return (
    <button type="button" onClick={handleSignout}>
      Sign Out
    </button>
  );
}
