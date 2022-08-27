import Layout from "../../components/layout";
import Container from "../../components/container";
import { getAllCryptoNews } from "../../lib/api";
import CoverImage from "../../components/cover-image";
import Link from "next/link";
import News from "../../assets/images/news.svg";
import Image from "next/image";
import DateComponent from "../../components/date";
import Solana from "../../assets/images/solana.png";
import Ethereum from "../../assets/images/ethereum.png";

function NewsCollection({ allCryptoNews }) {
  console.log(allCryptoNews);
  const myLoader = ({ src }) => {
    return `${src}`;
  };
  return (
    <Layout>
      <div className="bg-[#8C50EE] text-black px-24 mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-4xl py-4">NFT/Crypto News</h1>
          <p className="max-w-xl text-justify pb-8">
            Dolor ullamco velit id ullamco irure velit nostrud ullamco in aute
            pariatur. Laboris ullamco laborum eiusmod ut enim amet nulla
            nostrud. Dolore dolor officia esse quis commodo aliqua pariatur
            cupidatat officia pariatur eiusmod quis fugiat.
          </p>
        </div>
        <Image src={News} width={500} height={500} loader={myLoader} />
      </div>
      <div
        className="grid grid-cols-3 gap-8 py-8 bg-[#faf5ff] px-24"
        style={{
          backgroundImage: "radial-gradient(#d1d5db 1.15px, #faf5ff 1.15px)",
          backgroundSize: "20px 20px",
        }}
      >
        {allCryptoNews.map((news, index) => {
          const {
            title,
            slug,
            caption,
            chain,
            featuredImage,
            videoLink,
            writeUp,
            sys,
          } = news;
          return (
            <div
              key={index}
              className="shadow-md p-4 rounded-lg relative bg-white hover:bg-[#111827] hover:text-white transition-colors duration-300"
            >
              <CoverImage
                title={title}
                url={featuredImage.url}
                slug={slug}
                route={"news"}
              />
              <h2 className="my-2">
                <Link href={`/news/${slug}`}>
                  <a className="text-xl hover:underline hover:cursor-pointer">
                    {title}
                  </a>
                </Link>
              </h2>
              <p className="text-sm my-2">{caption}</p>
              <div className="flex justify-between mt-4">
                <p>
                  {chain === "Solana" ? (
                    <Image
                      src={Solana}
                      width={35}
                      height={35}
                      loader={myLoader}
                    />
                  ) : (
                    <Image
                      src={Ethereum}
                      width={35}
                      height={35}
                      loader={myLoader}
                    />
                  )}
                </p>
                <p>
                  <DateComponent dateString={sys.firstPublishedAt} />
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}

export default NewsCollection;

export async function getStaticProps() {
  const allCryptoNews = (await getAllCryptoNews()) ?? [];
  return {
    props: { allCryptoNews },
  };
}
