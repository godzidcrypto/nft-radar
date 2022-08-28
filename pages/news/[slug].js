import Layout from "../../components/layout";
import Container from "../../components/container";
import { getAllCryptoNews, getSingleCryptoNews } from "../../lib/api";
import CoverImage from "../../components/cover-image";
import PostBody from "../../components/post-body";
import DateComponent from "../../components/date";
import Solana from "../../assets/images/solana.png";
import Ethereum from "../../assets/images/ethereum.png";
import ContentfulImage from "../../components/contentful-image";
import Avatar from "../../components/avatar";

function NewsItem({ cryptoNews }) {
  const {
    sys,
    title,
    caption,
    chain,
    featuredImage,
    videoLink,
    writeUp,
    author,
  } = cryptoNews[0];

  const { firstPublishedAt: date } = sys;

  const content = writeUp.json.content;
  const headings = content.filter((content) => {
    return content.nodeType.includes("heading");
  });
  return (
    <Layout>
      <div className="grid grid-cols-2 px-24 gap-8 pt-16">
        <div>
          <div className="mb-4 flex justify-between items-center">
            {author && <Avatar name={author.name} picture={author.picture} />}
            <p>
              <DateComponent dateString={date} />
            </p>
          </div>
          <div>
            <CoverImage title={title} url={featuredImage.url} />
          </div>
          {headings.length > 0 && (
            <div className="mt-4 bg-[#F9F9F9] p-6 rounded-md">
              <span className="text-xl">Table of Contents</span>
              {headings.map((heading, index) => {
                const text = heading.content[0].value;
                const headingNumber = heading.nodeType.split("-")[1];
                return (
                  <li
                    key={index}
                    className="py-1 hover:underline"
                    style={{
                      paddingLeft: `${headingNumber - 2}rem`,
                    }}
                  >
                    {/* {". ".repeat(headingNumber)} */}
                    {text}
                  </li>
                );
              })}
            </div>
          )}
        </div>
        <div>
          <div className="flex items-center">
            <h1 className="text-6xl">{title}</h1>
            <div className="ml-6">
              {chain?.length === 1 && chain[0] === "Solana" ? (
                <ContentfulImage src={Solana} width={35} height={35} />
              ) : chain?.length === 1 && chain[0] === "Ethereum" ? (
                <ContentfulImage src={Ethereum} width={35} height={35} />
              ) : chain?.length === 2 ? (
                <>
                  <ContentfulImage src={Solana} width={35} height={35} />
                  <ContentfulImage src={Ethereum} width={35} height={35} />
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          <p className="text-sm">{caption}</p>
          <PostBody content={writeUp} />
        </div>
      </div>
    </Layout>
  );
}

export default NewsItem;

export async function getStaticPaths() {
  const allCryptoNews = (await getAllCryptoNews()) ?? [];

  const paths = allCryptoNews.map((news) => ({
    params: { slug: news.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const cryptoNews = (await getSingleCryptoNews(params.slug)) ?? [];

  return { props: { cryptoNews } };
}
