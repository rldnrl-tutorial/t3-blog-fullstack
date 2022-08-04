import Link from "next/link";
import React, { ReactNode } from "react";

type NavItemProps = {
  to: string;
  children?: ReactNode;
};

export default function NavItem(props: NavItemProps) {
  return (
    <li>
      <Link
        href={props.to}
        className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
        aria-current="page"
      >
        {props.children}
      </Link>
    </li>
  );
}
