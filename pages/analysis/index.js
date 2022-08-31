import Layout from "../../components/layout";
import { getAllAnalysis } from "../../lib/api";
import Analysis from "../../assets/images/analysis.svg";
import Hero from "../../components/hero";
import EntriesList from "../../components/entries-list";
import Container from "../../components/container";

function AnalysisCollection({ allAnalysis }) {
  return (
    <Layout>
      <Container>
        <Hero
          title={"Analysis"}
          description={
            "Excepteur dolore culpa sunt in proident laborum adipisicing irure anim consequat consequat officia proident dolore. Anim ea incididunt occaecat laboris mollit irure anim non ut ad cupidatat aute laboris."
          }
          svg={Analysis}
        />
        <div>
          {/* <div className="px-24 py-12 bg-red-600">Hello</div> */}
          <EntriesList entries={allAnalysis} route={"analysis"} />
        </div>
      </Container>
    </Layout>
  );
}

export default AnalysisCollection;

export async function getStaticProps() {
  const allAnalysis = (await getAllAnalysis()) ?? [];
  return {
    props: { allAnalysis },
  };
}
