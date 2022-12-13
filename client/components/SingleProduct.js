import gql from 'graphql-tag';
import styled from 'styled-components';
import { useQuery } from '@apollo/client';
import Head from 'next/head';
import DisplayError from './ErrorMessage';

const ProductStyles = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  max-width: var(--maxWidth);
  align-items: top;
  justify-content: center;
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

export const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    product(where: { id: $id }) {
      name
      price
      description
      id
      user {
        id
      }
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

export default function SingleProduct({ id }) {
  const { loading, error, data } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;

  const { product } = data;

  return (
    <ProductStyles data-testid="singleProduct">
      <Head>
        <title>Sick Fits | {product.name}</title>
      </Head>
      <img
        src={product.photo.image.publicUrlTransformed}
        alt={product.photo.altText}
      />
      <div className="details">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
      </div>
    </ProductStyles>
  );
}
