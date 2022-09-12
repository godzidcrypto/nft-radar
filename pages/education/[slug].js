import Layout from "../../components/layout";
import {
  getAllEducationalContent,
  getSingleEducationalContent,
} from "../../lib/api";
import Container from "../../components/container";
import EntryView from "../../components/entry-view";

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
    <Layout title={title}>
      <Container>
        <EntryView
          title={title}
          featuredImage={featuredImage}
          author={author}
          chain={chain}
          writeUp={writeUp}
          date={date}
          headings={headings}
          otherEntries={otherEducationalContent}
          route={"education"}
        ></EntryView>
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
