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
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Navbar />
      <div
        className="min-h-screen"
        style={{
          backgroundImage: "radial-gradient(#d1d5db 1.15px, #faf5ff 1.15px)",
          backgroundSize: "20px 20px",
        }}
      >
        {/* <Alert preview={preview} /> */}
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
