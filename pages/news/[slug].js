import Layout from "../../components/layout";
import Link from "next/link";
import { getAllCryptoNews, getSingleCryptoNews } from "../../lib/api";
import CoverImage from "../../components/cover-image";
import DateComponent from "../../components/date";
import TableOfContents from "../../components/table-of-contents";
import OtherEntries from "../../components/other-entries";
import EntryContent from "../../components/entry-content";

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
      <article className="grid grid-cols-[1fr_2fr] px-24 gap-8 py-16">
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
          <OtherEntries otherEntries={otherNews} route={"news"} />
        </div>
        <EntryContent
          title={title}
          caption={caption}
          author={author}
          chain={chain}
          writeUp={writeUp}
        />
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
