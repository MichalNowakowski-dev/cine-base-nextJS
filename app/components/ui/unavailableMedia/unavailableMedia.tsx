const UnavailableMedia = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white ">
      <div className="text-center rounded-xl bg-black/30 py-12 px-6 border border-secondary border-dashed ">
        <h1 className="text-4xl font-bold mb-4">
          🎬 Koniec drogi, Kinomaniaku!
        </h1>
        <p className="text-lg mb-6">
          Wygląda na to, że ten film utknął w krainie niedostępnych materiałów.
          Może Hollywood nie zdążyło go jeszcze skończyć, a może to my coś
          pokręciliśmy. 🤔
        </p>
        <p className="mb-8 text-zinc-200">
          CineBase dziękuje za wspólną podróż! Zajrzyj na inne strony — tam na
          pewno coś znajdziesz.
        </p>
      </div>
    </div>
  );
};

export default UnavailableMedia;
