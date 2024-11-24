export const navigationStyles = {
  nav: (isDisplayed: boolean) =>
    `w-full h-20 fixed flex items-center py-3 z-50 transition-transform duration-300 ${
      isDisplayed ? "translate-y-0" : "-translate-y-full"
    }`,
  navBackground: (isOpen: boolean) =>
    isOpen ? "bg-black" : "bg-[#00000070] backdrop-blur-sm",
  logo: "w-[17vw] max-w-28",
  desktopNav: "hidden md:flex gap-2 border-2 border-gray-600 p-2 rounded-md",
  navItem: (isActive: boolean) =>
    `${isActive ? "text-white bg-backgroundLight" : "text-secondary bg-none"} 
       rounded-md flex items-center hover:bg-backgroundLight`,
  mobileNav: (isOpen: boolean) =>
    `flex flex-col rounded-lg w-max p-4 justify-start space-y-4 bg-[#1E212690] backdrop-blur-sm 
       w-1/2 text-center transform transition-transform duration-500 ease-in-out ${
         isOpen ? "translate-y-0" : "-translate-y-[110%]"
       }`,
  mobileNavItem: (isActive: boolean) =>
    `${
      isActive
        ? "text-white bg-gradient-to-r from-gray-700 via-gray-800 to-black shadow-lg"
        : "text-white hover:bg-gradient-to-r hover:from-gray-800 hover:to-black hover:shadow-lg"
    } 
       p-2 rounded-lg text-md font-semibold transition-all duration-300`,
  mobileButton:
    "p-3 bg-backgroundLight border-2 border-gray-600 rounded-md flex items-center justify-center md:hidden",
};
