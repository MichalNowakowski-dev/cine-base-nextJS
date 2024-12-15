export const homeStyles = {
  headerSection:
    "flex flex-col justify-end items-center gap-y-4 h-[70vh] w-full relative after:content-[''] after:absolute after:inset-0 after:bg-[linear-gradient(to_top,_#141414_0%,_transparent_100%),_linear-gradient(to_top,_#141414_0%,_transparent_50%)] mb-6",
  headingHome: `text-5xl uppercase tracking-wider text-center 
    [text-shadow:0_0_10px_rgba(102,204,255,0.8),0_0_20px_rgba(102,204,255,0.6),0_0_30px_rgba(102,204,255,0.4)]`,
  headingSupport: `text-lg bg-gradient-to-r from-blue-300 via-pink-300 to-purple-400 
           text-transparent bg-clip-text w-2/3  mb-5`,
};
export const FormStyles = {
  inputText:
    "w-full px-4 py-2 rounded-md bg-black/70 border border-gray-600 text-white focus:ring-2 focus:ring-indigo-500 outline-none",
  submitButton:
    "w-full py-2 bg-indigo-700 hover:bg-indigo-600 text-white font-semibold rounded-lg shadow-md transition duration-300 flex justify-center items-center gap-4",
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
    `${isActive ? "text-white " : "text-secondary bg-none"} 
         rounded-md flex items-center  hover:text-white`,
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
