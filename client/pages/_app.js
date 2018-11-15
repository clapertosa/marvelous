import App, { Container } from "next/app";
import Head from "next/head";
import React from "react";
import withApolloClient from "../lib/with-apollo-client";
import { ApolloProvider } from "react-apollo";
import Layout from "../hoc/Layout/Layout";
import "../static/styles/main.scss";

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props;

    return (
      <Container>
        <ApolloProvider client={apolloClient}>
          <Head>
            <title>Marvelous 🚀</title>
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
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
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
