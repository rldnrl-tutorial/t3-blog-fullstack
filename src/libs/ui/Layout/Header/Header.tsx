import { useRef, useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import clsx from "clsx";

import { CopyIcon, LockIcon, PlusIcon, UnlockIcon } from "../../Icons";
import Button from "../../Button";
import Avatar from "../../Avatar";
import NavList from "./NavList";
import NavItem from "./NavItem";
import { useMediaQuery, useOnClickOutside } from "../../../hooks";
import Dropdown, { DropdownItem } from "../../Dropdown";
import MenuButton from "../../MenuButton";
import { useRouter } from "next/router";

export default function Header() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [showMenuList, setShowMenuList] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleOutsideClick = () => {
    setShowMenuList(false);
  };

  useOnClickOutside(ref, handleOutsideClick);

  const renderSessionMobileMenu = (
    <>
      <MenuButton
        onClick={() => setShowMenuList((prevShowMenuList) => !prevShowMenuList)}
      />
      <Dropdown showMenuList={showMenuList}>
        <DropdownItem to="/drafts">Draft</DropdownItem>
        <DropdownItem to="/create">New Post</DropdownItem>
      </Dropdown>
    </>
  );

  const renderSessionDesktopMenu = (
    <>
      <NavItem to="/drafts">
        <Button size="sm" color="success" variant="outline">
          <CopyIcon />
          <span className="inline-block px-2">Draft</span>
        </Button>
      </NavItem>
      <NavItem to="/create">
        <Button size="sm" color="success" variant="outline">
          <PlusIcon />
          <span className="inline-block px-2">New Post</span>
        </Button>
      </NavItem>
    </>
  );

  const renderSessionMenu = () => {
    if (isMobile) {
      return renderSessionMobileMenu;
    }

    return renderSessionDesktopMenu;
  };

  return (
    <div className="sticky top-0 z-50 bg-white h-[8vh] py-4 px-6 flex items-center justify-between border-b-2">
      <NavList>
        <div className={clsx(!isMobile && "flex items-center gap-4")} ref={ref}>
          {session ? renderSessionMenu() : null}
        </div>
      </NavList>
      {session ? (
        <div className="flex items-center">
          <Button
            className="mr-4 font-semibold"
            size="sm"
            color="success"
            onClick={() => {
              router.push("/");
              signOut();
            }}
          >
            <LockIcon />
            <span className="inline-block px-2">Logout</span>
          </Button>
          <Avatar src={session.user?.image} />
        </div>
      ) : (
        <div className="flex flex-1 justify-end gap-6">
          <Link passHref href="/auth/signin">
            <Button
              className="font-semibold"
              size="sm"
              variant="outline"
              color="success"
            >
              <UnlockIcon />
              <span className="inline-block px-2">Sign In</span>
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
