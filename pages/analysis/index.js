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
          description={"Dolore nisi anim culpa cillum ullamco cillum."}
          svg={Analysis}
        />
        <div>
          {/* <div className="px-24 py-12 bg-red-600">Hello</div> */}
          <EntriesList
            featured={allAnalysis[0]}
            entries={allAnalysis.slice(1)}
            route={"analysis"}
          />
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
