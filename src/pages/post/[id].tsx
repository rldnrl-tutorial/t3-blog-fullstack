import { useRouter } from "next/router";
import React from "react";
import BlogAuthor from "../../Drafts/components/BlogAuthor";
import Layout from "../../libs/ui/Layout";
import { trpc } from "../../utils/trpc";

export default function PostId() {
  const router = useRouter();
  const postId = router.query.id as string;

  const postByIdQuery = trpc.useQuery(["post.getById", postId]);

  if (postByIdQuery.isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <h1 className="text-4xl font-semibold">{postByIdQuery.data?.title}</h1>
      <p className="mt-4">{postByIdQuery.data?.content}</p>
      <BlogAuthor
        name={postByIdQuery.data?.author.name as string}
        date={postByIdQuery.data?.createdAt as Date}
        profileImage={postByIdQuery.data?.author.image}
      />
    </Layout>
  );
}
