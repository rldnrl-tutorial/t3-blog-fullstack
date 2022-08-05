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