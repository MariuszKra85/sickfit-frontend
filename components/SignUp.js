import { gql, useMutation, useQuery } from '@apollo/client';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import { CURRENT_USER_QUERY } from './User';
import ErrorMessage from './ErrorMessage';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION(
    $email: String!
    $password: String!
    $name: String!
  ) {
    createUser(data: { name: $name, email: $email, password: $password }) {
      id
      email
      name
    }
  }
`;

export default function SighUp() {
  const { inputs, handleChange, clearForm } = useForm({
    email: '',
    password: '',
    name: '',
  });

  const [signUp, { data, error, loading }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await signUp();
    console.log(res);
    clearForm();
  }
  console.log(data);

  const errorMessage =
    data?.authenticateUserWithPassword?.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;

  if (data?.createUser) {
    return (
      <p>Signed Up with {data.createUser.email} - please Go Head and Shop!!!</p>
    );
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

      <ErrorMessage error={errorMessage} />

      <fieldset>
        <label htmlFor="name">
          Name:
          <input
            type="name"
            placeholder="name"
            name="name"
            id="name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            placeholder="email"
            name="email"
            id="email"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="password">
          Password:
          <input
            type="password"
            placeholder="password"
            name="password"
            id="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
      </fieldset>
      <button type="submit">Sign up</button>
    </Form>
  );
}
