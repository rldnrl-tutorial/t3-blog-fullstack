import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { ChatIcon, CopyIcon, LockIcon, PlusIcon, UnlockIcon } from "../Icons";
import Button from "../Button";
import Avatar from "../Avatar";

export default function Header() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  const router = useRouter();

  const isActive = (pathname: string) => router.pathname === pathname;

  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="sticky top-0 z-50 bg-white h-20 py-4 px-6 flex items-center border-b-2">
      <div className="h-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link href="/">
            <Button
              disabled={!isActive("/")}
              color="success"
              variant="solid"
              size="sm"
            >
              <ChatIcon />
              <span className="inline-block px-2">Posts</span>
            </Button>
          </Link>
          {session ? (
            <>
              <Link passHref href="/drafts">
                <Button
                  size="sm"
                  color="success"
                  variant="outline"
                  disabled={!isActive("/drafts")}
                >
                  <CopyIcon />
                  Draft
                </Button>
              </Link>
              <Link passHref href="/create">
                <Button
                  size="sm"
                  color="success"
                  variant="outline"
                  disabled={!isActive("/create")}
                >
                  <PlusIcon />
                  New post
                </Button>
              </Link>
            </>
          ) : null}
        </div>
      </div>
      {session ? (
        <div className="flex items-center">
          <Button
            className="mr-4 font-semibold"
            size="sm"
            color="success"
            leftIcon={<LockIcon />}
          >
            Logout
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
