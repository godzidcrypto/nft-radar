import Layout from "../../components/layout";
import Link from "next/link";
import {
  getAllEducationalContent,
  getSingleEducationalContent,
} from "../../lib/api";
import CoverImage from "../../components/cover-image";
import DateComponent from "../../components/date";
import TableOfContents from "../../components/table-of-contents";
import OtherEntries from "../../components/other-entries";
import EntryContent from "../../components/entry-content";
import Container from "../../components/container";

function EducationalContentItem({ educationalContent, allEducationalContent }) {
  const {
    sys,
    title,
    caption,
    chain,
    featuredImage,
    videoLink,
    writeUp,
    author,
  } = educationalContent[0];

  const otherEducationalContent = allEducationalContent.filter(
    (otherEducation) => {
      return otherEducation.title !== educationalContent[0].title;
    }
  );

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
              <Link href={"/education"}>
                <p className="hover:underline hover:cursor-pointer">
                  &#8592; Other Educational Content
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
                otherEntries={otherEducationalContent}
                route={"education"}
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
              otherEntries={otherEducationalContent}
              route={"education"}
            />
          </div>
        </article>
      </Container>
    </Layout>
  );
}

export default EducationalContentItem;

export async function getStaticPaths() {
  const allEducationalContent = (await getAllEducationalContent()) ?? [];

  const paths = allEducationalContent.map((educationalContent) => ({
    params: { slug: educationalContent.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const educationalContent =
    (await getSingleEducationalContent(params.slug)) ?? [];
  const allEducationalContent = (await getAllEducationalContent()) ?? [];

  return { props: { educationalContent, allEducationalContent } };
}
