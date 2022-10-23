import Alert from "../components/alert";
import Footer from "../components/footer";
import Meta from "../components/meta";
import Head from "next/head";
import Navbar from "./navbar";
import Script from "next/script";
import { HOME_OG_IMAGE_URL } from "../lib/constants";

export default function Layout({
  hide = false,
  children,
  title,
  description,
  image,
}) {
  return (
    <>
      {/* <Meta /> */}
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
      />

      <Script strategy="lazyOnload" id="google-analytics">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
        page_path: window.location.pathname,
        });
    `}
      </Script>
      <Head>
        <title>{title ? title : "NFT Radar"}</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#000" />
        <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
        <meta
          name="description"
          content={`${
            description ? description : "The premier source for all things NFTs"
          }`}
        />
        <meta property="og:image" content={image ? image : HOME_OG_IMAGE_URL} />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8160193017744513"
          crossorigin="anonymous"
        ></Script>
      </Head>
      {!hide && <Navbar />}
      <div
        className={`bg-[#8C50EE] text-[#E7E9EA] ${hide ? "" : "pt-24"}`}
        // style={{
        //   backgroundImage: "radial-gradient(#d1d5db 1.15px, #faf5ff 1.15px)",
        //   backgroundSize: "20px 20px",
        // }}
      >
        {/* <Alert preview={preview} /> */}
        <main className="bg-black min-h-screen ">{children}</main>
      </div>
      {!hide && <Footer />}
    </>
  );
}
