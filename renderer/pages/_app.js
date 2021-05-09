import Head from "next/head";
import "../css/styles.css";

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Antphy</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        {/* <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0"
          crossOrigin="anonymous"
        /> */}
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
