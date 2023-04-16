async function initMocks() {
  if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
    if (typeof window === 'undefined') {
      const { server } = await import('@mocks/server');
      server.listen();
    } else {
      const { worker } = await import('@mocks/browser');
      worker.start({ onUnhandledRequest: 'bypass' });
    }
  }
}

initMocks();

export {};
