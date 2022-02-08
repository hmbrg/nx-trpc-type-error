import { withTRPC as withOriginalTRPC } from '@trpc/next';
import superjson from 'superjson';
import { AppRouter } from '../server/router';

export const withTRPC = withOriginalTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = process.env['WEB_ENDPOINT']
      ? `https://${process.env['WEB_ENDPOINT']}/api/trpc`
      : 'http://localhost:4200/api/trpc';

    return {
      url,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
      transformer: superjson,
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false,
});
