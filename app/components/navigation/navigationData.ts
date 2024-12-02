export const navLinks: { label: string; href: string }[] = [
  { label: "Strona główna", href: "/" },
  { label: "Filmy & Seriale", href: "/movies&series" },
  { label: "Pomoc", href: "/support" },
  { label: "Subskrypcje", href: "/plans" },
];
export const accountLinks: { label: string; href: string; private: boolean }[] =
  [
    { label: "Zaloguj", href: "/sign-in", private: false },
    { label: "Utwórz konto", href: "/sign-up", private: false },
    { label: "Twój profil", href: "/dashboard", private: true },
  ];
