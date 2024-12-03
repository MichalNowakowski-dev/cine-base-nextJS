import MediaList from "../components/MediaList";

const Lists = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">My Lists</h2>
      <MediaList listType="favorites" mediaType={"movie"} />
      <MediaList listType="watchlist" mediaType={"movie"} />
    </div>
  );
};

export default Lists;
