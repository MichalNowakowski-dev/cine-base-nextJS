export default function AuthPageContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className=" bg-signupBg bg-center mx-auto pt-20 lg:pt-28 lg:px-4 max-w-s  flex justify-center items-center gap-20 h-screen">
      <div className="flex  items-center justify-center text-white max-w-[1400px] gap-8 lg:gap-20 w-full px-4">
        <div className="hidden md:flex flex-col md:gap-2 lg:gap-10 text-center basis-1/2">
          <h1 className="text-4xl font-extrabold text-gray-900 leading-relaxed">
            Odkryj tysiące tytułów na wyciągnięcie ręki.
          </h1>
          <p className="mt-4 text-2xl font-bold text-gray-800 leading-relaxed">
            Zaloguj się, aby stworzyć swoją osobistą listę ulubionych produkcji,
            otrzymywać rekomendacje i nigdy nie przegapić hitów na ekranie.
          </p>
        </div>
        <div className="flex w-full bg-black/70 rounded-xl max-w-[500px]  justify-center gap-10 p-10 md:basis-1/2 lg:h-[80vh]">
          <div className=" w-full flex flex-col items-center justify-between gap-12 md:gap-6 ">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
