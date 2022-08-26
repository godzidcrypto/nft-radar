import Layout from "../../components/layout";
import Container from "../../components/container";
import { getAllCryptoNews } from "../../lib/api";
import CoverImage from "../../components/cover-image";

function NewsCollection({ allCryptoNews }) {
  console.log(allCryptoNews);
  return (
    <Layout>
      <Container>
        <h1 className="text-4xl py-4">NFT/Crypto News</h1>
        <div className="grid grid-cols-2 gap-8 py-8">
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
              <div key={index}>
                <div>
                  <CoverImage
                    title={title}
                    url={featuredImage.url}
                    slug={slug}
                    route={"news"}
                  />
                </div>
                <h2 className="text-xl">{title}</h2>
                <p>{caption}</p>
                <p>{chain}</p>
                <p>{sys.firstPublishedAt}</p>
              </div>
            );
          })}
        </div>
      </Container>
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
