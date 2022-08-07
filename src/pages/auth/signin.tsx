import { InferGetServerSidePropsType } from "next";
import { getProviders, signIn } from "next-auth/react";
import GithubSignIn from "../../libs/ui/GithubSignIn";

export const getServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const githubProvider = providers?.github;
  console.log(githubProvider);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="border rounded px-12 py-8 border-gray-600">
        <GithubSignIn
          onClick={() =>
            signIn(githubProvider?.id, {
              callbackUrl: "/",
            })
          }
        />
      </div>
    </div>
  );
}
