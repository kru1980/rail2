import React from "react";
import Link from "next/link";
import "../../styles/main.scss";

const Header = () => {
  return (
    <nav>
      <ul className="menu-ul">
        <li className="menu-items">
          <Link prefetch href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link prefetch href="/about">
            <a>About</a>
          </Link>
        </li>
        <li>
          <Link prefetch href="/contacts">
            <a>Contact</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
