"use client";
import { useState, useContext } from "react";
import Link from "next/link";
import styles from "./navbar.module.scss";
import { AuthContext } from "@/app/contexts/auth/authContext";
import { CgProfile } from "react-icons/cg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = () => {
    logout();
  };

  const MENU_LINKS = {
    Home: {
      href: "/",
      className: styles["nav-link"],
      name: "Home",
      action: undefined,
    },
    Services: {
      href: "/services",
      className: styles["nav-link"],
      name: "Services",
      action: undefined,
    },
    Contact: {
      href: "/contact",
      className: styles["nav-link"],
      name: "Contact",
      action: undefined,
    },
    Profile: {
      href: "/profile",
      className: styles["nav-link"],
      name: "Profile",
      action: undefined,
      icon: <CgProfile />,
    },
    SignIn: {
      href: "/auth",
      className: `${styles["nav-link"]} ${styles["signin-link"]}`,
      name: isAuthenticated ? "Log out" : "Sign In",
      action: handleLogOut,
    },
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles["navbar-content"]}>
          <div className={styles["menu-button"]}>
            <button
              type="button"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
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
          <div className={styles.logo}>
            <Link href="/">Logo</Link>
          </div>
          <div className={styles["nav-links"]}>
            <GenerateLinks links={MENU_LINKS} />
          </div>
        </div>
      </div>

      <div
        className={`${styles["mobile-menu"]} ${isOpen ? "block" : "hidden"}`}
        id="mobile-menu"
      >
        <div className={styles["mobile-menu-links"]}>
          <GenerateLinks links={MENU_LINKS} />
        </div>
      </div>
    </nav>
  );
}

function GenerateLinks({ links }) {
  return Object.keys(links).map((key) => {
    const { href, className, name, action, icon } = links[key];
    return (
      <Link key={key} href={href} className={className} onClick={action}>
        {icon != undefined ? icon : name}
      </Link>
    );
  });
}
