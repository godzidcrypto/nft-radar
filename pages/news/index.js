import Layout from "../../components/layout";
import Container from "../../components/container";
import { getAllCryptoNews } from "../../lib/api";
import CoverImage from "../../components/cover-image";
import Link from "next/link";
import News from "../../assets/images/news.svg";
import DateComponent from "../../components/date";
import Solana from "../../assets/images/solana.png";
import Ethereum from "../../assets/images/ethereum.png";
import ContentfulImage from "../../components/contentful-image";
import Avatar from "../../components/avatar";
import Hero from "../../components/hero";

function NewsCollection({ allCryptoNews }) {
  return (
    <Layout>
      <Hero
        title={"NFT/Crypto News"}
        description={
          "Dolor ullamco velit id ullamco irure velit nostrud ullamco in aute pariatur. Laboris ullamco laborum eiusmod ut enim amet nulla nostrud. Dolore dolor officia esse quis commodo aliqua pariatur cupidatat officia pariatur eiusmod quis fugiat."
        }
        svg={News}
      />
      <div>
        {/* <div className="px-24 py-12 bg-red-600">Hello</div> */}
        <div className="grid grid-cols-3 gap-8 py-8 px-24">
          {allCryptoNews.map((news, index) => {
            const { title, slug, caption, chain, featuredImage, sys, author } =
              news;
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
                    <a className="text-xl hover:underline hover:cursor-pointer font-semibold">
                      {title}
                    </a>
                  </Link>
                </h2>
                <p className="text-sm my-2">{caption}</p>
                <div className="flex justify-between mt-4 items-center">
                  {author && (
                    <Avatar name={author.name} picture={author.picture} />
                  )}
                  <div>
                    {chain?.length === 1 && chain[0] === "Solana" ? (
                      <ContentfulImage src={Solana} width={35} height={35} />
                    ) : chain?.length === 1 && chain[0] === "Ethereum" ? (
                      <ContentfulImage src={Ethereum} width={35} height={35} />
                    ) : chain?.length === 2 ? (
                      <>
                        <ContentfulImage src={Solana} width={35} height={35} />
                        <ContentfulImage
                          src={Ethereum}
                          width={35}
                          height={35}
                        />
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <p>
                    <DateComponent dateString={sys.firstPublishedAt} />
                  </p>
                </div>
              </div>
            );
          })}
        </div>
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
