import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import { PropTypes } from 'prop-types';
import Head from 'next/head';
import styled from 'styled-components';
import ErrorMessage from './ErrorMessage';

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      name
      price
      description
      photo {
        altText
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const ProductStyled = styled.div`
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 700px;
  max-width: var(--maxWidth);
  justify-content: center;
  align-items: top;
  gap: 2rem;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

const SingleProduct = ({ id }) => {
  const { data, loading, error } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: {
      id,
    },
  });

  if (loading) return <p>loading...</p>;
  if (error) return <ErrorMessage error={error} />;
  const { Product } = data;
  return (
    <ProductStyled>
      <Head>
        <title>Sick tits | {Product.name}</title>
      </Head>
      <img
        src={Product.photo.image.publicUrlTransformed}
        alt={Product.photo.altText}
      />
      <div>
        <h1>{Product.name}</h1>
        <p>{Product.description}</p>
      </div>
    </ProductStyled>
  );
};

SingleProduct.propTypes = {
  id: PropTypes.object,
};

export default SingleProduct;
