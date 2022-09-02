import Layout from "../../components/layout";
import { getAllArtistFeatures, getSingleArtistFeature } from "../../lib/api";
import Container from "../../components/container";
import EntryView from "../../components/entry-view";

function ArtistFeatureItem({ artistFeature, allAristFeatures }) {
  const {
    sys,
    title,
    caption,
    chain,
    featuredImage,
    videoLink,
    writeUp,
    author,
  } = artistFeature[0];

  const otherArtistFeatures = allAristFeatures.filter((otherArtistFeature) => {
    return otherArtistFeature.title !== artistFeature[0].title;
  });

  const { firstPublishedAt: date } = sys;

  const content = writeUp.json.content;
  const headings = content.filter((content) => {
    return content.nodeType.includes("heading");
  });

  return (
    <Layout>
      <Container>
        <EntryView
          title={title}
          featuredImage={featuredImage}
          author={author}
          chain={chain}
          writeUp={writeUp}
          date={date}
          headings={headings}
          otherEntries={otherArtistFeatures}
          route={"artists"}
        ></EntryView>
      </Container>
    </Layout>
  );
}

export default ArtistFeatureItem;

export async function getStaticPaths() {
  const allAristFeatures = (await getAllArtistFeatures()) ?? [];

  const paths = allAristFeatures.map((artistFeature) => ({
    params: { slug: artistFeature.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const artistFeature = (await getSingleArtistFeature(params.slug)) ?? [];
  const allAristFeatures = (await getAllArtistFeatures()) ?? [];

  return { props: { artistFeature, allAristFeatures } };
}
