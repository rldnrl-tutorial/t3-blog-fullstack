import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import Button from "../libs/ui/Button";
import { CheckCircleIcon, CloseIcon } from "../libs/ui/Icons";
import Input from "../libs/ui/Input";
import Label from "../libs/ui/Label";
import Layout from "../libs/ui/Layout";
import Textarea from "../libs/ui/Textarea";
import { trpc } from "../utils/trpc";

const Post = () => {
  const router = useRouter();
  const { data: session, status } = useSession({
    required: true,
  });

  const loading = status === "loading";

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const postMutation = trpc.useMutation("protected_post.create", {
    onSuccess: () => {
      router.push("/drafts");
    },
  });

  const createPost = async () => {
    if (session && session.user && session.user.name) {
      await postMutation.mutateAsync({
        title,
        content,
      });
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!session) {
    return (
      <Layout>
        <div className="flex min-h-[80vh] items-center justify-center">
          <div className="flex gap-[8px] mx-auto max-w-lg py-[12px] px-[6px]">
            <div className="flex flex-col items-center">
              <h2 className="text-4xl">Sign in to your account</h2>
              <span className="text-lg text-gray-600 py-2">
                to create posts✌️
              </span>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex gap-[8px]">
        <div className="container mx-auto max-w-5xl">
          <div className="flex items-center">
            <span className="px-2 text-lg text-gray-600">
              Create a new post ✌️
            </span>
          </div>
          <div className="p-[8px]">
            <div className="gap-[4px]">
              <div className="mb-[16px]">
                <Label htmlFor="title" className="text-base">
                  제목
                </Label>
                <Input
                  id="title"
                  autoFocus
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="제목을 입력해주세요."
                  type="text"
                  value={title}
                />
              </div>
              <div className="mb-[16px]">
                <Label htmlFor="content" className="text-base">
                  내용
                </Label>
                <Textarea
                  id="content"
                  cols={50}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="내용을 입력해주세요."
                  rows={8}
                  value={content}
                />
              </div>
              <div className="flex justify-end">
                <div className="flex flex-row gap-[10px]">
                  <Button
                    disabled={!content || !title}
                    type="submit"
                    variant="solid"
                    onClick={() => {
                      createPost();
                      toast("Post created.", {
                        position: "bottom-right",
                        autoClose: 5000,
                        closeOnClick: true,
                      });
                    }}
                  >
                    <CheckCircleIcon />
                    <span className="inline-block px-2">Create</span>
                  </Button>
                  <Link href="/">
                    <Button color="danger" variant="outline">
                      <CloseIcon />
                      <span className="inline-block px-2">Cancel</span>
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Post;
