import Layout from "../../components/layout";
import Link from "next/link";
import { getAllCryptoNews, getSingleCryptoNews } from "../../lib/api";
import CoverImage from "../../components/cover-image";
import DateComponent from "../../components/date";
import TableOfContents from "../../components/table-of-contents";
import OtherEntries from "../../components/other-entries";
import EntryContent from "../../components/entry-content";
import Container from "../../components/container";
import Avatar from "../../components/avatar";
import ContentfulImage from "../../components/contentful-image";
import Solana from "../../assets/images/solana.png";
import Ethereum from "../../assets/images/ethereum.png";

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
      {/* <Container>
        <article className="grid lg:grid-cols-[1fr_2fr] gap-8 py-16">
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
            <div className="hidden lg:block">
              <OtherEntries otherEntries={otherNews} route={"news"} />
            </div>
          </div>
          <EntryContent
            title={title}
            caption={caption}
            author={author}
            chain={chain}
            writeUp={writeUp}
          />
          <div className="block lg:hidden">
            <OtherEntries otherEntries={otherNews} route={"news"} />
          </div>
        </article>
      </Container> */}
      <Container>
        <h1 className="text-center py-12 text-4xl font-bold">{title}</h1>
        <div className="relative">
          <CoverImage title={title} url={featuredImage.url} height={"550"} />
          <div className="mx-48 py-24 -mt-48 relative z-10">
            <EntryContent
              title={title}
              caption={caption}
              author={author}
              chain={chain}
              writeUp={writeUp}
              date={date}
              headings={headings}
            />
          </div>
        </div>
        <OtherEntries otherEntries={otherNews} route={"news"} />
      </Container>
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
