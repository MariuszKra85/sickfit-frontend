import { gql, useMutation, useQuery } from '@apollo/client';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import { CURRENT_USER_QUERY } from './User';
import ErrorMessage from './ErrorMessage';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

export default function SighIn() {
  const { inputs, handleChange, clearForm } = useForm({
    email: '',
    password: '',
  });

  const [signIn, { data, error, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await signIn();
    console.log(res);
    clearForm();
  }

  const errorMessage =
    data?.authenticateUserWithPassword?.__typename ===
    'UserAuthenticationWithPasswordFailure'
      ? data?.authenticateUserWithPassword
      : undefined;

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Sign In to Your Account </h2>

      <ErrorMessage error={errorMessage} />

      <fieldset>
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
      <button type="submit">Log in!</button>
    </Form>
  );
}
