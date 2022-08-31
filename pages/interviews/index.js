import Layout from "../../components/layout";
import { getAllInterviews } from "../../lib/api";
import Interviews from "../../assets/images/interviews.svg";
import Hero from "../../components/hero";
import EntriesList from "../../components/entries-list";
import Container from "../../components/container";

function InterviewsCollection({ allInterviews }) {
  return (
    <Layout>
      <Container>
        <Hero
          title={"Interview/AMA"}
          description={
            "Do sint irure laboris eu occaecat cillum nostrud sint incididunt. Nostrud ipsum Lorem irure non eiusmod. Reprehenderit eu consectetur mollit excepteur occaecat minim mollit et ut."
          }
          svg={Interviews}
        />
        <div>
          {/* <div className="px-24 py-12 bg-red-600">Hello</div> */}
          <EntriesList entries={allInterviews} route={"interviews"} />
        </div>
      </Container>
    </Layout>
  );
}

export default InterviewsCollection;

export async function getStaticProps() {
  const allInterviews = (await getAllInterviews()) ?? [];
  return {
    props: { allInterviews },
  };
}
