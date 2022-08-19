import styled from 'styled-components';
import Reset from '../components/Reset';
import SighIn from '../components/SignIn';
import SighUp from '../components/SignUp';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  grid-gap: 2rem;
`;

export default function signInPage() {
  return (
    <Grid>
      <SighIn />
      <SighUp />
      <Reset />
    </Grid>
  );
}
