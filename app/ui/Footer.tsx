import { FaFacebookF } from "react-icons/fa";
import { FaInstagram, FaLinkedin } from "react-icons/fa6";
import { RiTwitterXFill } from "react-icons/ri";
import Link from "next/link";

const footerLinks = [
  { name: "Strona główna", url: "/" },
  { name: "O nas", url: "/about" },
  { name: "Kontakt", url: "/contact" },
];

const footerSocials = [
  { name: "Facebook", url: "https://facebook.com", icon: <FaFacebookF /> },
  { name: "Twitter", url: "https://twitter.com", icon: <RiTwitterXFill /> },
  { name: "Instagram", url: "https://instagram.com", icon: <FaInstagram /> },
  { name: "LinkedIn", url: "https://linkedin.com", icon: <FaLinkedin /> },
];

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-between w-full min-h-[25vh] bg-backgroundFooter py-8">
      <ul className="flex justify-between w-[clamp(15rem,80%,300px)] mb-4">
        {footerLinks.map((link) => (
          <li key={link.name}>
            <Link
              href={link.url}
              className="flex items-center justify-center text-white font-semibold font-secondary text-sm hover:text-blue-400"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      <p className="text-center text-gray-400 text-sm font-secondary leading-6 w-[clamp(15rem,80%,600px)] mb-4">
        Odkrywaj świat kina z naszą stroną! Znajdziesz tutaj najnowsze filmy,
        klasyki oraz rekomendacje. Poczuj magię kina i podziel się ulubionymi
        produkcjami z innymi miłośnikami filmów. Filmowa podróż z nami — zawsze
        coś dla każdego kinomaniaka!
      </p>

      <ul className="flex justify-between w-[clamp(15rem,80%,300px)] mb-5">
        {footerSocials.map((social) => (
          <li key={social.name} className="flex items-center justify-center">
            <Link
              href={social.url}
              className="text-gray-200 p-3 bg-gray-700 rounded-full text-lg transition-transform duration-150 hover:scale-110"
            >
              {social.icon}
            </Link>
          </li>
        ))}
      </ul>
      <p className="text-sm text-center py-4 border-t border-gray-600 w-full max-w-screen-xl">
        &copy;2024 CineBase, All Rights Reserved
      </p>
    </footer>
  );
};

export default Footer;
