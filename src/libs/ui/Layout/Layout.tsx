import { ReactNode } from "react";
import Header from "./Header";

type LayoutProps = {
  children?: ReactNode;
};

export default function Layout(props: LayoutProps) {
  return (
    <>
      <Header />
      <main className="p-10">{props.children}</main>
    </>
  );
}
