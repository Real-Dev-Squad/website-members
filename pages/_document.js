import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="UTF-8" />
          <meta property="og:title" content="Members Page:RDS" />
          <meta property="og:image" content="/images/Real-Dev-Squad@1x.png" />
          <meta property="og:description" content="The members of Real Dev Squad" />
          <link rel="shortcut icon" href="/icons/favicon.ico" type="image/x-icon" />
          <link rel="icon" href="/icons/favicon.ico" type="image/x-icon" />
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
