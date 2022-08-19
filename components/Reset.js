import { gql, useMutation, useQuery } from '@apollo/client';
import useForm from '../lib/useForm';
import Form from './styles/Form';
import ErrorMessage from './ErrorMessage';

const RESET_MUTATION_QUERY = gql`
  mutation RESET_MUTATION_QUERY($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function Reset() {
  const { inputs, handleChange, clearForm } = useForm({
    email: '',
    password: '',
    name: '',
  });

  const [reset, { data, error, loading }] = useMutation(RESET_MUTATION_QUERY, {
    variables: inputs,
    // refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await reset();
    console.log(res);
    clearForm();
  }
  console.log(data?.sendUserPasswordResetLink);

  if (data) {
    return <p>request was send to Your email</p>;
  }

  return (
    <Form method="POST" onSubmit={handleSubmit}>
      <h2>Reset password request</h2>

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
      </fieldset>
      <button type="submit">Reset Request</button>
    </Form>
  );
}
