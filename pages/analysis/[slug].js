import Layout from "../../components/layout";
import { getAllAnalysis, getSingleAnalysis } from "../../lib/api";
import Container from "../../components/container";
import EntryView from "../../components/entry-view";

function AnalysisItem({ analysis, allAnalysis }) {
  const {
    sys,
    title,
    caption,
    chain,
    featuredImage,
    videoLink,
    writeUp,
    author,
  } = analysis[0];

  const otherAnalysis = allAnalysis.filter((analysisObject) => {
    return analysisObject.title !== analysis[0].title;
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
          otherEntries={otherAnalysis}
          route={"analysis"}
        ></EntryView>
      </Container>
    </Layout>
  );
}

export default AnalysisItem;

export async function getStaticPaths() {
  const allAnalysis = (await getAllAnalysis()) ?? [];

  const paths = allAnalysis.map((analysis) => ({
    params: { slug: analysis.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const analysis = (await getSingleAnalysis(params.slug)) ?? [];
  const allAnalysis = (await getAllAnalysis()) ?? [];

  return { props: { analysis, allAnalysis } };
}
