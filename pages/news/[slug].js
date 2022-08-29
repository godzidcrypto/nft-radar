import Layout from "../../components/layout";
import Link from "next/link";
import { getAllCryptoNews, getSingleCryptoNews } from "../../lib/api";
import CoverImage from "../../components/cover-image";
import PostBody from "../../components/post-body";
import DateComponent from "../../components/date";
import Solana from "../../assets/images/solana.png";
import Ethereum from "../../assets/images/ethereum.png";
import ContentfulImage from "../../components/contentful-image";
import Avatar from "../../components/avatar";
import TableOfContents from "../../components/table-of-contents";

function NewsItem({ cryptoNews, allCryptoNews }) {
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

  const otherNews = allCryptoNews.filter((news) => {
    return news.title !== cryptoNews[0].title;
  });

  const { firstPublishedAt: date } = sys;

  const content = writeUp.json.content;
  const headings = content.filter((content) => {
    return content.nodeType.includes("heading");
  });
  return (
    <Layout>
      <article className="grid grid-cols-2 px-24 gap-8 py-16">
        <div>
          <div className="mb-4 flex justify-between items-center">
            <Link href={"/news"}>
              <p className="hover:underline hover:cursor-pointer">
                &#8592; Other News
              </p>
            </Link>
            <p>
              <DateComponent dateString={date} />
            </p>
          </div>
          <div>
            <CoverImage title={title} url={featuredImage.url} />
          </div>
          <TableOfContents headings={headings} />
          {otherNews.length > 0 && (
            <div className="mt-4">
              <span className="text-xl font-semibold">
                Check Out Other News
              </span>
              {otherNews.slice(0, 5).map((news, index) => {
                const { title, slug, caption, featuredImage, sys } = news;

                return (
                  <div
                    key={index}
                    className="mb-4 grid grid-cols-2 p-4 border-b-2 items-center"
                  >
                    <Link href={`/news/${slug}`}>
                      <ContentfulImage
                        src={featuredImage.url}
                        width={250}
                        height={150}
                        className="rounded-sm hover:cursor-pointer"
                      />
                    </Link>
                    <div className="ml-4">
                      <div className="font-light text-sm">
                        <DateComponent dateString={sys.firstPublishedAt} />
                      </div>
                      <Link href={`/news/${slug}`}>
                        <p className="hover:underline hover:cursor-pointer font-semibold">
                          {title}
                        </p>
                      </Link>
                      <p className="">{caption}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="bg-[#F9F9F9] p-6 rounded-md">
          <h1 className="text-6xl font-bold">{title}</h1>
          <p className="text-sm font-medium">{caption}</p>
          <div className="mt-4 flex items-center">
            {author && <Avatar name={author.name} picture={author.picture} />}
            <div className="ml-8">
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
          <PostBody content={writeUp} />
        </div>
      </article>
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
  const allCryptoNews = (await getAllCryptoNews()) ?? [];

  return { props: { cryptoNews, allCryptoNews } };
}
