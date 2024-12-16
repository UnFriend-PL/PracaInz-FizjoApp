import { useState, useContext, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./navbar.module.scss";
import { AuthContext } from "@/app/contexts/auth/authContext";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { IoIosLogIn } from "react-icons/io";
import { LanguageContext } from "@/app/contexts/lang/langContext";
import en from "./locales/en.json";
import pl from "./locales/pl.json";

const locales = { en, pl };

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);
  const { changeLanguage, language } = useContext(LanguageContext);

  const [isAnimating, setIsAnimating] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogOut = () => {
    logout();
  };

  const t = locales[language];

  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false); // Zamknij menu, jeśli kliknięcie było poza obszarem menu
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const MENU_LINKS = {
    Home: {
      href: "/home",
      className: styles.navLink,
      name: t.home,
    },
    Services: {
      href: "/appointments",
      className: styles.navLink,
      name: t.appointments,
    },
    Staff: {
      href: "/staff",
      className: styles.navLink,
      name: t.staff,
    },
    Blog: {
      href: "/blog",
      className: styles.navLink,
      name: t.blog,
    },
    Contact: {
      href: "/contact",
      className: styles.navLink,
      name: t.contact,
    },
    Profile: {
      href: "/profile",
      className: styles.navLink,
      name: t.profile,
      icon: <CgProfile />,
    },
    SignIn: {
      href: "/auth",
      className: `${styles.navLink} ${styles.signinLink}`,
      name: isAuthenticated ? t.logOut : t.signIn,
      action: handleLogOut,
      icon: isAuthenticated ? <IoIosLogOut /> : <IoIosLogIn />,
      title: isAuthenticated ? t.logOut : t.signIn,
    },
  };

  const orderedLinksLoggedIn = [
    "Home",
    "Services",
    "Staff",
    "Blog",
    "Contact",
    "Profile",
    "SignIn",
  ];

  const orderedLinksLoggedOut = [
    "Home",
    "Blog",
    "Contact",
    "Profile",
    "SignIn",
  ];

  const orderedLinks = isAuthenticated
    ? orderedLinksLoggedIn
    : orderedLinksLoggedOut;

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.navbarContent}>
          <div className={styles.logo}>
            <Link href="/">{t.logo}</Link>
          </div>

          <div className={styles.navLinks}>
            <GenerateLinks links={orderedLinks.map((key) => MENU_LINKS[key])} />
          </div>

          <div className={styles.languages}>
            <button
              className={styles.languageButton}
              onClick={() => changeLanguage("en")}
            >
              EN
            </button>
            <button
              className={styles.languageButton}
              onClick={() => changeLanguage("pl")}
            >
              PL
            </button>
          </div>

          <div className={styles.menuButton}>
            <button
              type="button"
              aria-controls="mobileMenu"
              aria-expanded={isOpen}
              onClick={toggleMenu}
            >
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}
        id="mobileMenu"
      >
        <div className={styles.mobileMenuLinks} ref={menuRef}>
          <GenerateLinks
            links={orderedLinks.map((key) => MENU_LINKS[key])}
            setIsOpen={setIsOpen}
          />
        </div>
      </div>
    </nav>
  );
}

function GenerateLinks({ links, setIsOpen }) {
  return links.map(({ href, className, name, action, icon, title }, index) => {
    const handleClick = (e) => {
      if (action) {
        e.stopPropagation(); // Obsługa dodatkowych akcji (np. logout)
        action();
      }
      if (typeof setIsOpen === "function") {
        setIsOpen(false); // Zamykanie menu mobilnego po kliknięciu linku
      }
    };

    return (
      <Link
        key={index}
        href={href}
        className={className}
        onClick={handleClick}
        title={title}
      >
        {icon ? icon : name}
      </Link>
    );
  });
}
