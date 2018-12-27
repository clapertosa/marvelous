import Document, { Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <html>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta property="og:site_name" content="Marvelous 🚀" />
          <meta property="og:title" content="🕸 Marvelous 🚀" />
          <meta
            property="og:description"
            content="Check latest Comics and Heroes in the Marvel Universe"
          />
          <meta
            property="og:url"
            content="https://marvelous-webapp.herokuapp.com"
          />
          <meta
            property="og:image:secure_url"
            itemProp="image"
            content="https://marvelous-webapp.herokuapp.com/static/backgrounds/2.jpg"
          />
          <meta property="og:type" content="website" />
          <link
            rel="shortcut icon"
            href="/static/favicon.ico"
            type="image/x-icon"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="/static/fonts/fontello/css/fontello.css"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
