import Alert from "../components/alert";
import Footer from "../components/footer";
import Meta from "../components/meta";
import Head from "next/head";
import Navbar from "./navbar";

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <Head>
        <title>NFT Radar</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      <div className="min-h-screen">
        {/* <Alert preview={preview} /> */}
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
