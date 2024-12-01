const Stats = ({
  stats,
}: {
  stats: { favorites: number; watchlist: number; watched: number };
}) => {
  return (
    <div className="bg-gray-900 p-4 rounded-md flex justify-between items-center">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white">{stats.favorites}</h3>
        <p className="text-gray-400">Ulubione</p>
      </div>
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white">{stats.watchlist}</h3>
        <p className="text-gray-400">Do obejrzenia</p>
      </div>
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white">{stats.watched}</h3>
        <p className="text-gray-400">Obejrzane</p>
      </div>
    </div>
  );
};

export default Stats;
