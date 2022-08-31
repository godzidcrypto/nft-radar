import Layout from "../../components/layout";
import Link from "next/link";
import { getAllArtistFeatures, getSingleArtistFeature } from "../../lib/api";
import CoverImage from "../../components/cover-image";
import DateComponent from "../../components/date";
import TableOfContents from "../../components/table-of-contents";
import OtherEntries from "../../components/other-entries";
import EntryContent from "../../components/entry-content";
import Container from "../../components/container";

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

  const otherArtistFeature = allAristFeatures.filter((otherArtistFeature) => {
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
        <article className="grid lg:grid-cols-[1fr_2fr] gap-8 py-16">
          <div>
            <div className="mb-4 flex justify-between items-center">
              <Link href={"/artists"}>
                <p className="hover:underline hover:cursor-pointer">
                  &#8592; Other Artists
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
            <div className="hidden lg:block">
              <OtherEntries
                otherEntries={otherArtistFeature}
                route={"artists"}
              />
            </div>
          </div>
          <EntryContent
            title={title}
            caption={caption}
            author={author}
            chain={chain}
            writeUp={writeUp}
          />
          <div className="block lg:hidden">
            <OtherEntries otherEntries={otherArtistFeature} route={"artists"} />
          </div>
        </article>
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
