export const styles = {
  headerSection:
    "flex flex-col justify-end items-center gap-y-4 h-[70vh] w-full relative after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(to_top,_#141414_0%,_transparent_100%),_linear-gradient(to_top,_#141414_0%,_transparent_50%)] mb-6",
};

export const navigationStyles = {
  nav: (isDisplayed: boolean) =>
    `w-full h-20 fixed flex items-center py-3 z-50 transition-transform duration-300 ${
      isDisplayed ? "translate-y-0" : "-translate-y-full"
    }`,
  navBackground: "bg-fade-to-transparent backdrop-blur-sm",
  logo: "w-[17vw] max-w-28",
  desktopNav: "hidden lg:flex gap-2 p-2 rounded-md",
  navItem: (isActive: boolean) =>
    `${isActive ? "text-white bg-white/10" : "text-secondary bg-none"} 
         rounded-md flex items-center hover:bg-zinc-600`,
  mobileNav: (isOpen: boolean) =>
    `flex flex-col w-[50vw] rounded-lg w-max p-4 justify-start space-y-4 bg-[#1E212690] backdrop-blur-sm 
          text-center transform transition-transform duration-500 ease-in-out ${
            isOpen ? "translate-y-0" : "-translate-y-[110%]"
          }`,
  mobileNavItem: (isActive: boolean) =>
    `${isActive && "text-white underline underline-offset-4"} 
         p-2 rounded-lg text-md font-semibold `,
  mobileButton:
    "p-3 bg-backgroundLight border-2 border-gray-600 rounded-md flex items-center justify-center md:hidden",
};
