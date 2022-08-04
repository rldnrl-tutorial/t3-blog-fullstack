import React, { ReactNode } from "react";

type NavListProps = {
  children?: ReactNode;
};

export default function NavList(props: NavListProps) {
  return (
    <ul className="flex flex-col bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      {props.children}
    </ul>
  );
}
