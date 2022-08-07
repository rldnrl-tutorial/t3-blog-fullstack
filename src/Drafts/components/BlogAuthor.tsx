import { useSession } from "next-auth/react";
import Avatar from "../../libs/ui/Avatar";

type BlogAuthorProps = {
  date: Date;
  name: string;
};

export default function BlogAuthor(props: BlogAuthorProps) {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  if (loading) {
    return <div>Loading ...</div>;
  }

  return (
    <div className="flex mt-[2px] gap-[2px] items-center">
      <Avatar src={session?.user?.image} alt={session?.user?.name} />
      <span className="font-medium">{props.name}</span>
      <span>—</span>
      <span>{props.date.toLocaleDateString()}</span>
    </div>
  );
}
