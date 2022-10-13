import Layout from "../../components/layout";
import { getAllInterviews } from "../../lib/api";
import Interviews from "../../assets/images/interviews.svg";
import Hero from "../../components/hero";
import EntriesList from "../../components/entries-list";
import Container from "../../components/container";

function InterviewsCollection({ allInterviews }) {
  return (
    <Layout title={"NFT Radar | Interviews"}>
      <Container>
        <Hero
          title={"Interviews/AMAs"}
          description={
            "Conversations with some of the brightest and sharpest minds in the space"
          }
          svg={Interviews}
        />
        <div>
          {/* <div className="px-24 py-12 bg-red-600">Hello</div> */}
          <EntriesList
            featured={allInterviews[0]}
            entries={allInterviews.slice(1)}
            route={"interviews"}
          />
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
