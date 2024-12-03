const ProfileForm = () => {
  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm">Name</label>
        <input
          type="text"
          className="mt-1 p-2 w-full bg-gray-800 text-white rounded"
        />
      </div>
      <div>
        <label className="block text-sm">Email</label>
        <input
          type="email"
          className="mt-1 p-2 w-full bg-gray-800 text-white rounded"
        />
      </div>
      <button
        type="submit"
        className="mt-4 p-2 bg-green-600 text-white rounded"
      >
        Save Changes
      </button>
    </form>
  );
};

export default ProfileForm;
