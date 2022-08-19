import { useMutation, useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import useForm from '../lib/useForm';
import ErrorMessage from './ErrorMessage';
import Form from './styles/Form';

const SINGLE_PRODUCT_UPDATE = gql`
  query SINGLE_PRODUCT_UPDATE($id: ID!) {
    Product(where: { id: $id }) {
      name
      description
      price
      photo {
        image {
          publicUrlTransformed
        }
      }
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      id
      name
      description
      price
    }
  }
`;

export default function UpdateProduct({ id }) {
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_UPDATE, {
    variables: {
      id,
    },
  });

  const { inputs, handleChange, clearForm, resetForm } = useForm(data?.Product);

  const [
    updateProduct,
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION, {
    variables: {
      id,
      name: inputs.name,
      price: inputs.price,
      description: inputs.description,
    },
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await updateProduct();
  };
  if (loading) return <p>loading...</p>;
  return (
    <div>
      <Form action="submit" onSubmit={handleSubmit}>
        <fieldset disabled={updateLoading} aria-busy={updateLoading}>
          <ErrorMessage error={error} />
          <label htmlFor="name">
            Name:
            <input
              type="text"
              name="name"
              id="name"
              value={inputs.name}
              onChange={handleChange}
            />
          </label>
          <label htmlFor="price">
            Price:
            <input
              type="number"
              name="price"
              id="price"
              onChange={handleChange}
              value={inputs.price}
            />
          </label>
          <label htmlFor="description">
            description:
            <input
              type="text"
              name="description"
              id="description"
              value={inputs.description}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Change Product</button>
        </fieldset>
      </Form>
    </div>
  );
}
