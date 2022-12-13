import SingleProduct from '../../components/SingleProduct.js';

export default function SingleProductPage({ query }) {
  return (
    <p>
      <SingleProduct id={query.id} />
    </p>
  );
}
