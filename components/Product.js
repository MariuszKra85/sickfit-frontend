import Link from 'next/link';
import { PropTypes } from 'prop-types';
import ItemStyle from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTag from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';
import DeleteProduct from './DeleteProduct';

const Product = ({ product }) => (
  <ItemStyle>
    <img src={product?.photo?.image?.publicUrlTransformed} alt="product.name" />
    <PriceTag>{formatMoney(product.price)}</PriceTag>
    <Title>
      <Link href={`/product/${product.id}`}>{product.name}</Link>
    </Title>
    <p>{product.description}</p>
    <div className="buttonList">
      <Link
        href={{
          pathname: 'update',
          query: {
            id: product.id,
          },
        }}
      >
        Edit
      </Link>
      <DeleteProduct id={product.id}>Delete Product</DeleteProduct>
    </div>
  </ItemStyle>
);

Product.propTypes = {
  product: PropTypes.object,
};

export default Product;
