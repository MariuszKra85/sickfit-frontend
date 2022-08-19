import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Router from 'next/router';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';
import { ALL_PRODUCTS_QUERY } from './Products';

const CREATE_PRODUCT_MUTATION = gql`
  mutation CREATE_PRODUCT_MUTATION(
    #variable passed in
    $name: String!
    $description: String!
    $price: Int!
    $image: Upload
  ) {
    createProduct(
      data: {
        name: $name
        description: $description
        price: $price
        status: "AVAILABLE"
        photo: { create: { image: $image, altText: $name } }
      }
    ) {
      id
      price
      description
      name
      status
    }
  }
`;

const CreateProduct = () => {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    name: 'nice shouse',
    price: 9999,
    image: '',
    description: '',
  });

  const [createProduct, { data, error, loading }] = useMutation(
    CREATE_PRODUCT_MUTATION,
    {
      variables: inputs,
      refetchQueries: [{ query: ALL_PRODUCTS_QUERY }],
    }
  );

  async function handleSubmit(e) {
    e.preventDefault();

    // submit to back end

    const res = await createProduct();
    clearForm();
    Router.push({
      pathname: `/product/${res.data.createProduct.id}`,
    });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <ErrorMessage error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="image">
          image:
          <input type="file" id="image" name="image" onChange={handleChange} />
        </label>
        <label htmlFor="name">
          Name:
          <input
            required
            type="text"
            id="name"
            name="name"
            placeholder="name of product"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          price:
          <input
            required
            type="number"
            id="price"
            name="price"
            placeholder="price of product"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          description:
          <textarea
            type="number"
            id="description"
            name="description"
            placeholder="description of product"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit"> + Add Product</button>
      </fieldset>
    </Form>
  );
};

export default CreateProduct;
