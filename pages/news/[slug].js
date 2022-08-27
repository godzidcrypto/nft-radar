import Layout from "../../components/layout";
import Container from "../../components/container";
import { getAllCryptoNews, getSingleCryptoNews } from "../../lib/api";
import CoverImage from "../../components/cover-image";
import PostBody from "../../components/post-body";

function NewsItem({ cryptoNews }) {
  console.log("HERE", cryptoNews);
  const { sys, title, caption, chain, featuredImage, videoLink, writeUp } =
    cryptoNews[0];
  return (
    <Layout>
      <Container>
        <div className="max-w-8xl mx-auto py-8">
          <h1 className="text-8xl">{title}</h1>
          <p className="text-2xl">{caption}</p>
          <p>{chain}</p>
          <div>
            <CoverImage title={title} url={featuredImage.url} />
          </div>
        </div>
        <PostBody content={writeUp} />
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

  return { props: { cryptoNews } };
}
