import Layout from "../../components/layout";
import { getAllOpinionPieces, getSingleOpinionPiece } from "../../lib/api";
import Container from "../../components/container";
import EntryView from "../../components/entry-view";

function OpinionPieceItem({ opinionPiece, allOpinionPieces }) {
  const {
    sys,
    title,
    caption,
    chain,
    featuredImage,
    videoLink,
    writeUp,
    author,
  } = opinionPiece[0];

  const otherOpinionPieces = allOpinionPieces.filter((otherOpinionPiece) => {
    return otherOpinionPiece.title !== opinionPiece[0].title;
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
          otherEntries={otherOpinionPieces}
          route={"opinions"}
        ></EntryView>
      </Container>
    </Layout>
  );
}

export default OpinionPieceItem;

export async function getStaticPaths() {
  const allOpinionPieces = (await getAllOpinionPieces()) ?? [];

  const paths = allOpinionPieces.map((opinionPiece) => ({
    params: { slug: opinionPiece.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const opinionPiece = (await getSingleOpinionPiece(params.slug)) ?? [];
  const allOpinionPieces = (await getAllOpinionPieces()) ?? [];

  return { props: { opinionPiece, allOpinionPieces } };
}
