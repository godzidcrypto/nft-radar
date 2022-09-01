import Layout from "../../components/layout";
import { getAllCryptoNews } from "../../lib/api";
import News from "../../assets/images/news.svg";
import Hero from "../../components/hero";
import EntriesList from "../../components/entries-list";
import Container from "../../components/container";

function NewsCollection({ allCryptoNews }) {
  return (
    <Layout>
      <Container>
        <Hero
          title={"NFT/Crypto News"}
          description={
            "Labore fugiat sint velit cillum quis nostrud dolor commodo exercitation voluptate."
          }
          svg={News}
        />
        <div>
          {/* <div className="px-24 py-12 bg-red-600">Hello</div> */}
          <EntriesList
            featured={allCryptoNews[0]}
            entries={allCryptoNews.slice(1)}
            route={"news"}
          />
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
