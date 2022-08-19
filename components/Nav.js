import Link from 'next/link';
import SignOut from './SignOut';
import NavStyle from './styles/NavStyles';
import { useUser } from './User';

const Nav = () => {
  const user = useUser();
  console.log(user);
  return (
    <NavStyle>
      <Link href="/products">Products</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/account">Account</Link>
          <SignOut />
        </>
      )}
      {!user && <Link href="/signIn"> Sign In</Link>}
    </NavStyle>
  );
};
export default Nav;
