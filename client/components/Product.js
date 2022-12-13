import Link from 'next/link';
import ItemStyles from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteProduct from './DeleteProduct';
import AddToCart from './AddToCart';
import { useUser } from './User';

const Product = ({ product }) => {
  const user = useUser();
  return (
    <ItemStyles>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTag>{formatMoney(product.price)}</PriceTag>
      <p>{product.description}</p>
      <div className="buttonList">
        {user?.id === product?.user?.id ||
        user?.role?.name === 'Admin' ||
        user?.role?.name === 'Editor' ? (
          <Link href={{ pathname: '/update', query: { id: product.id } }}>
            Edit ✏️
          </Link>
        ) : (
          ''
        )}
        {user?.id !== product?.user?.id || !user ? (
          <AddToCart id={product.id} />
        ) : (
          ''
        )}
        {user?.role?.name === 'Editor' ||
        user?.role?.name === 'Admin' ||
        user?.id === product?.user?.id ? (
          <DeleteProduct id={product.id}>🚮 Delete Product</DeleteProduct>
        ) : (
          ''
        )}
      </div>
    </ItemStyles>
  );
};

export { Product };
