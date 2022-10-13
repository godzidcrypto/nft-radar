import Layout from "../../components/layout";
import { getAllArtistFeatures } from "../../lib/api";
import Artists from "../../assets/images/artists.svg";
import Hero from "../../components/hero";
import EntriesList from "../../components/entries-list";
import Container from "../../components/container";

function ArtistsCollection({ allArtistFeatures }) {
  return (
    <Layout title={"NFT Radar | Artist Features"}>
      <Container>
        <Hero
          title={"1/1 Artist Features"}
          description={
            "Showcasing some of the best and underrated artists in the space"
          }
          svg={Artists}
        />
        <div>
          {/* <div className="px-24 py-12 bg-red-600">Hello</div> */}
          <EntriesList
            featured={allArtistFeatures[0]}
            entries={allArtistFeatures.slice(1)}
            route={"artists"}
          />
        </div>
      </Container>
    </Layout>
  );
}

export default ArtistsCollection;

export async function getStaticProps() {
  const allArtistFeatures = (await getAllArtistFeatures()) ?? [];
  return {
    props: { allArtistFeatures },
  };
}
