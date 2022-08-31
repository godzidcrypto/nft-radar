import Layout from "../../components/layout";
import { getAllEducationalContent } from "../../lib/api";
import Education from "../../assets/images/education.svg";
import Hero from "../../components/hero";
import EntriesList from "../../components/entries-list";
import Container from "../../components/container";

function EducationCollection({ allEducationalContent }) {
  return (
    <Layout>
      <Container>
        <Hero
          title={"Educational Content"}
          description={
            "Eiusmod reprehenderit in aliquip duis culpa id mollit sit elit commodo ea sit incididunt sit. Eu Lorem esse proident. Qui ipsum id officia minim voluptate occaecat reprehenderit qui nulla ad aliqua sint."
          }
          svg={Education}
          reverse={true}
        />
        <div>
          {/* <div className="px-24 py-12 bg-red-600">Hello</div> */}
          <EntriesList entries={allEducationalContent} route={"education"} />
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
