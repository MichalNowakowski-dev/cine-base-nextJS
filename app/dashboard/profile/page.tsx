import { fetchMediaCast } from "@/app/lib/data";
import AvatarPicker from "../components/AvatarPicker";
import ProfileForm from "../components/ProfileForm";

const Profile = async () => {
  const testAvatars = await fetchMediaCast("278", "movie");
  const avatars = await testAvatars.cast
    .filter((item) => item.profile_path)
    .map((item) => item.profile_path)
    .slice(0, 10);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Edit Your Profile</h2>
      <ProfileForm />
      <h2 className="text-2xl font-semibold mb-4">Zmien swój awatar</h2>
      <AvatarPicker avatarList={avatars} />
    </div>
  );
};

export default Profile;
