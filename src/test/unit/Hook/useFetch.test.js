import 'whatwg-fetch';
import { renderHook, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import useFetch from '../../../custom-hooks/useFetch';

const mockData = { data: ['real', 'real-dev'] };
const resolveUrl = 'https://api/resolve';

const server = setupServer(
  rest.get(resolveUrl, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockData));
  })
);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

test('test useFetch Hook with resolve', async () => {
  const { result } = renderHook(useFetch, {
    initialProps: { url: resolveUrl },
  });
  expect(result.current.loading).toBe(true);
  expect(result.current.data).toBe(undefined);
  expect(result.current.error).toBe(undefined);

  waitFor(() => expect(result.current.loading).toBe(false));
  waitFor(() => expect(result.current.data).toStrictEqual(mockData));
  waitFor(() => expect(result.current.error).toBe(undefined));
});

test('test useFetch Hook with reject', async () => {
  const rejectUrl = 'https://api/reject';
  server.use(
    rest.get(rejectUrl, (req, res, ctx) => {
      return res(ctx.status(401));
    })
  );

  const { result } = renderHook(useFetch, {
    initialProps: { url: rejectUrl },
  });
  expect(result.current.loading).toBe(true);
  expect(result.current.data).toBe(undefined);
  expect(result.current.error).toBe(undefined);

  waitFor(() => expect(result.current.loading).toBe(false));
  waitFor(() => expect(result.current.data).toStrictEqual(undefined));
  waitFor(() =>
    expect(result.current.error).toStrictEqual(new Error('Unauthorized'))
  );
});
