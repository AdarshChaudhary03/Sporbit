import * as Sentry from '@sentry/react-native';

export const routingInstrumentation =
  new Sentry.ReactNavigationV5Instrumentation();

export const init = () => {
  Sentry.init({
    dsn: 'https://c197a43ec79b4fe48c8290464bd84138@o560858.ingest.sentry.io/5696834',
    integrations: [
      new Sentry.ReactNativeTracing({
        tracingOrigins: ['localhost', 'lastpage', /^\//],
        routingInstrumentation,
        // ... other options
      }),
    ],
    tracesSampleRate: 1.0,
  });
};
