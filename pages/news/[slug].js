import Layout from "../../components/layout";
import { getAllCryptoNews, getSingleCryptoNews } from "../../lib/api";
import Container from "../../components/container";
import EntryView from "../../components/entry-view";
import YoutubeEmbed from "../../components/youtube-embed";

function NewsItem({ cryptoNews, allCryptoNews }) {
  const {
    sys,
    title,
    chain,
    featuredImage,
    videoLink,
    writeUp,
    author,
    caption,
  } = cryptoNews[0];

  const videoId = videoLink?.split("=").slice(-1)[0];

  const otherNews = allCryptoNews.filter((news) => {
    return news.title !== cryptoNews[0].title;
  });

  const { firstPublishedAt: date } = sys;

  const content = writeUp.json.content;
  const headings = content.filter((content) => {
    return content.nodeType.includes("heading");
  });

  return (
    <Layout title={title} description={caption} image={featuredImage}>
      <Container>
        <EntryView
          title={title}
          caption={caption}
          featuredImage={featuredImage}
          author={author}
          chain={chain}
          writeUp={writeUp}
          date={date}
          headings={headings}
          otherEntries={otherNews}
          route={"news"}
        >
          {videoLink && (
            <div className="mt-6 bg-gray-800 p-6 rounded-md">
              <span className="text-2xl font-bold uppercase">
                Video Summary
              </span>
              <YoutubeEmbed videoId={videoId} videoLink={videoLink} />
            </div>
          )}
        </EntryView>
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
