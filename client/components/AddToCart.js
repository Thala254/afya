import { useMutation, gql } from '@apollo/client';
import DisplayError from './ErrorMessage';
import { CURRENT_USER_QUERY, useUser } from './User';

const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($id: ID!) {
    addToCart(productId: $id) {
      id
    }
  }
`;

export default function AddToCart({ id }) {
  const user = useUser();
  const [addToCart, { loading, error }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const handleClick = async () => {
    await addToCart().catch((e) => console.log(e.message));
  };

  if (!user && error)
    return <DisplayError error={{ message: 'Sign in to make purchases' }} />;
  return (
    <button disabled={loading} type="button" onClick={handleClick}>
      Add{loading && 'ing'} To Cart 🛒
    </button>
  );
}
