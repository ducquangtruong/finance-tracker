import React from "react";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.link}>
        Finance App
      </Link>
      <Link to="/" className={styles.link}>
        Overview
      </Link>
      <Link to="/transactions" className={styles.link}>
        Transactions
      </Link>
      <SignedIn>
        <UserButton className={styles.userButton} />
      </SignedIn>
    </nav>
  );
}

export default NavBar;
