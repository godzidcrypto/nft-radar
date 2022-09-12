import Layout from "../../components/layout";
import { getAllInterviews, getSingleInterview } from "../../lib/api";
import Container from "../../components/container";
import EntryView from "../../components/entry-view";

function InterviewItem({ interview, allInterviews }) {
  const {
    sys,
    title,
    caption,
    chain,
    featuredImage,
    videoLink,
    writeUp,
    author,
  } = interview[0];

  const otherInterviews = allInterviews.filter((otherInterview) => {
    return otherInterview.title !== interview[0].title;
  });

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
          otherEntries={otherInterviews}
          route={"interviews"}
        ></EntryView>
      </Container>
    </Layout>
  );
}

export default InterviewItem;

export async function getStaticPaths() {
  const allInterviews = (await getAllInterviews()) ?? [];

  const paths = allInterviews.map((interview) => ({
    params: { slug: interview.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const interview = (await getSingleInterview(params.slug)) ?? [];
  const allInterviews = (await getAllInterviews()) ?? [];

  return { props: { interview, allInterviews } };
}
