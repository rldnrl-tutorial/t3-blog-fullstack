import { Post } from "@prisma/client";
import Auth from "../libs/components/Auth";
import Card from "../libs/ui/Card";
import Layout from "../libs/ui/Layout";
import { trpc } from "../utils/trpc";

const Loading = () => <p>Loading...</p>;

const Unathorization = () => (
  <div className="flex min-h-[80vh] items-center justify-center">
    <div className="gap-[8px] mx-auto max-w-[512px] py-[12px] px-[6px]">
      <div className="flex flex-col items-center">
        <h2 className="text-[36px]">Sign in to your account</h2>
        <span className="text-[18px]">to see drafts✌️</span>
      </div>
    </div>
  </div>
);

type SuccessProps = {
  posts?: Post[];
};

const Success = ({ posts }: SuccessProps) => (
  <>
    <div className="container mx-auto max-w-5xl mb-5">
      <span className="text-blue-400 font-semibold text-sm bg-blue-50 p-[2px] self-start rounded-md px-2 py-1">
        {posts?.length !== 0 ? "My Drafts" : "No Drafts"}
      </span>
    </div>

    <div className="container mx-auto max-w-5xl">
      <div className="grid justify-center grid-cols-1 gap-5">
        {posts?.map((post) => (
          <Card key={post.id} to={`/post/${post.id}`}>
            <div className="p-5">
              <Card.Title>{post.title}</Card.Title>
              <Card.Description>{post.content}</Card.Description>
              <Card.ReadMoreButton />
            </div>
          </Card>
        ))}
      </div>
    </div>
  </>
);

export default function Drafts() {
  const draftsPostQuery = trpc.useQuery(["protected_post.getDrafts"]);

  return (
    <Auth fallback={<Loading />} failure={<Unathorization />}>
      <Success posts={draftsPostQuery.data} />
    </Auth>
  );
}
