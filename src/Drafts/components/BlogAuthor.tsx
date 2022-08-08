import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import Avatar from "../../libs/ui/Avatar";

type BlogAuthorProps = {
  date: Date;
  name: string;
  profileImage?: string | null;
};

export default function BlogAuthor(props: BlogAuthorProps) {
  return (
    <div className="flex mt-[20px] gap-[2px] items-center">
      <Avatar src={props.profileImage} alt={props?.name} />
      <span className="font-medium">{props.name}</span>
      <span>—</span>
      <span>{dayjs(props.date).format("YYYY.MM.DD")}</span>
    </div>
  );
}
