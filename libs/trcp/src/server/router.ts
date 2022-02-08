import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import superjson from 'superjson';
import { z } from 'zod';

const appRouter = trpc
  .router()
  .transformer(superjson)
  .query('hello', {
    input: z
      .object({
        textInput: z.string().nullish(),
      })
      .nullish(),
    resolve({ input }) {
      return {
        greeting: `hello ${input?.textInput ?? 'world'}`,
      };
    },
  });

// export type definition of API
export type AppRouter = typeof appRouter;

type Test = AppRouter['query'];

// export API handler
export const nextApiHandler = trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
