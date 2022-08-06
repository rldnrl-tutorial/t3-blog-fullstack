# T3 Blog Fullstack

## Tech Stack
- TypeScript
- Next.js
- TailwindCSS
- Next Auth

## 문제 상황
- Protected Router를 이용해서 인증이 요구되는 요청을 하는데, 새로고침 시, `session`이 `undefined`가 된다.

### 기존 코드

```ts
export const postProtectedRouter = createProtectedRouter()
  .mutation("create", {
    input: z.object({
      title: z.string(),
      content: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (!ctx.session || !ctx.session.user || !ctx.session.user.email) return;
      await ctx.prisma.post.create({
        data: {
          ...input,
          author: {
            connect: {
              email: ctx.session.user.email,
            },
          },
        },
      });
    },
  })
  .query("getDrafts", {
    async resolve({ ctx }) {
      return await ctx.prisma.post.findMany({
        where: {
          author: {
            email: ctx.session.user.email,
          },
        },
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
      });
    },
  });
```

### 수정 코드

```ts
export const postProtectedRouter = createRouter()
  .mutation("create", {
    input: z.object({
      title: z.string(),
      content: z.string(),
    }),
    async resolve({ ctx, input }) {
      if (!ctx.session || !ctx.session.user || !ctx.session.user.email) return;
      await ctx.prisma.post.create({
        data: {
          ...input,
          author: {
            connect: {
              email: ctx.session.user.email,
            },
          },
        },
      });
    },
  })
  .query("getDrafts", {
    async resolve({ ctx }) {
      if (!ctx.session || !ctx.session.user || !ctx.session.user.email) return;
      return await ctx.prisma.post.findMany({
        where: {
          author: {
            email: ctx.session.user.email,
          },
        },
        include: {
          author: {
            select: {
              name: true,
            },
          },
        },
      });
    },
  });
```

`createProtectedRouter`의 동작을 보면 다음과 같다.

```ts
인증 됨 → 다음 동작
인증 안 됨 → throw new trpc.TRPCError({ code: "UNAUTHORIZED" });
```

새로고침을 하게 되면, `session`이 `undefined`로 나와 "인증 안 됨" 로직을 타버려서 아무 것도 나오지 않게 된다. 개발 경험이 좋았는데 가장 아쉬운 부분이다.

버그가 아니라 Next-Auth 라이브러리의 기능이다.

`useSession()` 두 개의 값을 object 형태로 리턴한다: data and status:

- data: 세 개의 값이 있다: `Session` / `undefined` / `null`.
  - session이 아직 fetch가 끝나지 않았을 때 → `undefined`
  - session 검색이 실패한 경우 → `null`
  - session 검색이 성공한 경우 → `Session`.
- status: 세 개의 가능한 state가 있다: `"loading" | "authenticated" | "unauthenticated"`

그러면 인증이 요구되는 요청은 어떻게 해야하는 걸까?
- 처음에는 T3에서 만들어놓은 `protected-router.ts`를 사용해보려고 했다. 그러나 새로고침 시 `useSession`이 fetch가 끝나지 않아서 `undefined`로 `Unauthorized`가 되어버린다.
- Next-Auth에서 인증이 필요한 요청에 대해서 찾아보니, `getServerSideProps` 여기서 하는 것은 서버 부하가 증가할 수 있으니, 클라이언트 요청으로 처리하는 방법을 제공한다.

> Next.js가 `getServerSideProps` 및 `getInitialProps`를 처리하는 방식으로 인해 모든 Protected Page 로드는 세션이 유효한지 확인한 다음 요청된 페이지(SSR)를 생성하기 위해 서버 측 요청을 수행해야 합니다. 이렇게 하면 서버 부하가 증가하고 클라이언트의 요청에 능숙하다면 대안이 있습니다.