import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Link from 'next/link';
import PaginationStyles from './styles/PaginationStyles';
import { perPage } from '../config';

export const PAGINATION_QUERY = gql`
  query {
    _allProductsMeta {
      count
    }
  }
`;

export default function Pagination({ page }) {
  const { data, loading, error } = useQuery(PAGINATION_QUERY);
  if (loading) return <p>loading...</p>;
  const { count } = data._allProductsMeta;
  const pageCount = Math.ceil(count / perPage);
  console.log(pageCount);
  console.log(page);
  return (
    <PaginationStyles>
      <Head>
        <title>Sick Fits - {page} of ___</title>
      </Head>
      <Link href={`/products/${page - 1}`} data-cool="true">
        <a aria-disabled={page <= 1}>Prev</a>
      </Link>
      <p>
        page {page} of {pageCount}
      </p>
      <p>{count} items total</p>
      <Link href={`/products/${parseInt(page) + 1}`} data-cool="fal">
        <a aria-disabled={page >= pageCount}>Next</a>
      </Link>
    </PaginationStyles>
  );
}
