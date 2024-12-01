import Image from "next/image";

const ProfileCard = ({
  user,
}: {
  user: { firstName: string; avatarUrl: string };
}) => {
  return (
    <div className="flex items-center space-x-4 bg-gray-800 p-4 rounded-md">
      <Image
        src={user.avatarUrl || "/default-avatar.png"}
        alt="User Avatar"
        width={64}
        height={64}
        className="rounded-full"
      />
      <div>
        <h2 className="text-lg font-semibold text-white">
          Witaj, {user.firstName}!
        </h2>
        <button className="text-sm text-blue-400 hover:underline">
          Edytuj profil
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
