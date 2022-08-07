import { useSession } from "next-auth/react";
import Layout from "../../ui/Layout";

type AuthProps = {
  fallback: JSX.Element;
  failure: JSX.Element;
  children: JSX.Element;
};

export default function Auth({ fallback, failure, children }: AuthProps) {
  const { data: session, status } = useSession();

  const isUnauthorized = session === null;

  if (status === "loading") {
    return <Layout>{fallback}</Layout>;
  }

  if (isUnauthorized) {
    return <Layout>{failure}</Layout>;
  }

  return <Layout>{children}</Layout>;
}
