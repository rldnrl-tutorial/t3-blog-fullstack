import React, { ReactNode } from "react";

type DropdownItemProps = {
  to?: string;
  children?: ReactNode;
};

export default function DropdownItem(props: DropdownItemProps) {
  return (
    <li>
      <a
        href={props.to}
        className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
      >
        {props.children}
      </a>
    </li>
  );
}
