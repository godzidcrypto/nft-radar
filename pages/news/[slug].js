import Layout from "../../components/layout";
import { getAllCryptoNews, getSingleCryptoNews } from "../../lib/api";
import Container from "../../components/container";
import EntryView from "../../components/entry-view";

function NewsItem({ cryptoNews, allCryptoNews }) {
  const { sys, title, chain, featuredImage, videoLink, writeUp, author } =
    cryptoNews[0];

  const otherNews = allCryptoNews.filter((news) => {
    return news.title !== cryptoNews[0].title;
  });

  const { firstPublishedAt: date } = sys;

  const content = writeUp.json.content;
  const headings = content.filter((content) => {
    return content.nodeType.includes("heading");
  });

  return (
    <Layout title={title}>
      <Container>
        <EntryView
          title={title}
          featuredImage={featuredImage}
          author={author}
          chain={chain}
          writeUp={writeUp}
          date={date}
          headings={headings}
          otherEntries={otherNews}
          route={"news"}
        ></EntryView>
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
