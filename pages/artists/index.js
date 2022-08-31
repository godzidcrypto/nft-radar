import Layout from "../../components/layout";
import { getAllCryptoNews } from "../../lib/api";
import Artists from "../../assets/images/artists.svg";
import Hero from "../../components/hero";
import EntriesList from "../../components/entries-list";
import Container from "../../components/container";

function ArtistsCollection({ allCryptoNews }) {
  return (
    <Layout>
      <Container>
        <Hero
          title={"1/1 Artist Feature"}
          description={
            "Fugiat id mollit exercitation culpa mollit laborum nostrud ullamco velit magna aliqua exercitation. Ea laboris elit quis culpa adipisicing exercitation aliquip."
          }
          svg={Artists}
        />
        <div>
          {/* <div className="px-24 py-12 bg-red-600">Hello</div> */}
          <EntriesList entries={allCryptoNews} route={"news"} />
        </div>
      </Container>
    </Layout>
  );
}

export default ArtistsCollection;

export async function getStaticProps() {
  const allCryptoNews = (await getAllCryptoNews()) ?? [];
  return {
    props: { allCryptoNews },
  };
}
