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

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = () => {
    logout();
  };

  const t = locales[language];

  // Ref to handle clicks outside the menu
  const menuRef = useRef(null);

  // Close the menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false); // Close the menu if click is outside
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
      action: undefined,
    },
    Services: {
      href: "/appointments",
      className: styles.navLink,
      name: t.appointments,
      action: undefined,
    },
    Staff: {
      href: "/staff",
      className: styles.navLink,
      name: t.staff,
      action: undefined,
    },
    Blog: {
      href: "/blog",
      className: styles.navLink,
      name: t.blog,
      action: undefined,
    },
    Contact: {
      href: "/contact",
      className: styles.navLink,
      name: t.contact,
      action: undefined,
    },
    Profile: {
      href: "/profile",
      className: styles.navLink,
      name: t.profile,
      action: undefined,
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

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.navbarContent}>
          <div className={styles.logo}>
            <Link href="/">{t.logo}</Link>
          </div>
          <div className={styles.navLinks}>
            <GenerateLinks links={MENU_LINKS} />
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
        <div className={styles.mobileMenuLinks}>
          <GenerateLinks links={MENU_LINKS} setIsOpen={setIsOpen} />
        </div>
      </div>
    </nav>
  );
}

function GenerateLinks({ links, setIsOpen }) {
  return Object.keys(links).map((key) => {
    const { href, className, name, action, icon, title } = links[key];

    const handleClick = (e) => {
      if (action) {
        e.stopPropagation();
        action(); // Wykonaj akcję, np. logout
      }
      setIsOpen(false); // Zamyka menu po kliknięciu w link
    };

    return (
      <Link
        key={key}
        href={href}
        className={className}
        onClick={handleClick} // Używamy onClick zamiast onclick
        title={title}
      >
        {icon != undefined ? icon : name}
      </Link>
    );
  });
}
