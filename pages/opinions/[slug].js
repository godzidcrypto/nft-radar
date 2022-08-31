import Layout from "../../components/layout";
import Link from "next/link";
import { getAllOpinionPieces, getSingleOpinionPiece } from "../../lib/api";
import CoverImage from "../../components/cover-image";
import DateComponent from "../../components/date";
import TableOfContents from "../../components/table-of-contents";
import OtherEntries from "../../components/other-entries";
import EntryContent from "../../components/entry-content";
import Container from "../../components/container";

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
        <article className="grid lg:grid-cols-[1fr_2fr] gap-8 py-16">
          <div>
            <div className="mb-4 flex justify-between items-center">
              <Link href={"/opinions"}>
                <p className="hover:underline hover:cursor-pointer">
                  &#8592; Other Opinion Pieces
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
                otherEntries={otherOpinionPieces}
                route={"opinions"}
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
            <OtherEntries
              otherEntries={otherOpinionPieces}
              route={"opinions"}
            />
          </div>
        </article>
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
