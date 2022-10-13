import Layout from "../../components/layout";
import { getAllEducationalContent } from "../../lib/api";
import Education from "../../assets/images/education.svg";
import Hero from "../../components/hero";
import EntriesList from "../../components/entries-list";
import Container from "../../components/container";

function EducationCollection({ allEducationalContent }) {
  return (
    <Layout title={"NFT Radar | Educational Content"}>
      <Container>
        <Hero
          title={"Educational Content"}
          description={"Easy-to-use guides for beginners and veterans alike"}
          svg={Education}
          reverse={true}
        />
        <div>
          {/* <div className="px-24 py-12 bg-red-600">Hello</div> */}
          <EntriesList
            featured={allEducationalContent[0]}
            entries={allEducationalContent.slice(1)}
            route={"education"}
          />
        </div>
      </Container>
    </Layout>
  );
}

export default EducationCollection;

export async function getStaticProps() {
  const allEducationalContent = (await getAllEducationalContent()) ?? [];
  return {
    props: { allEducationalContent },
  };
}
