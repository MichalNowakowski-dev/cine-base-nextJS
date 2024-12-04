import AvatarPicker from "../components/AvatarPicker";
import ProfileForm from "../components/ProfileForm";

const Profile = async () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Edit Your Profile</h2>
      <ProfileForm />
      <h2 className="text-2xl font-semibold mb-4">Zmien swój awatar</h2>
      <AvatarPicker />
    </div>
  );
};

export default Profile;
