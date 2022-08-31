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
            "Dolor ullamco velit id ullamco irure velit nostrud ullamco in aute pariatur. Laboris ullamco laborum eiusmod ut enim amet nulla nostrud. Dolore dolor officia esse quis commodo aliqua pariatur cupidatat officia pariatur eiusmod quis fugiat."
          }
          svg={News}
        />
        <div>
          {/* <div className="px-24 py-12 bg-red-600">Hello</div> */}
          <EntriesList entries={allCryptoNews} route={"news"} />
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
