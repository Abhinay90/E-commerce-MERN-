import Navbar from "../features/nav-bar/Navbar";
import UserProfile from "../features/user/components/UserProfile";

const UserProfilePage = () => {
  return (
    <Navbar>
      <h1 className="mx-auto text-4xl font-bold">My Profile</h1>
      <UserProfile></UserProfile>
    </Navbar>
  );
};

export default UserProfilePage;
