import Layout from "../../components/layout";
import { getAllInterviews } from "../../lib/api";
import Interviews from "../../assets/images/interviews.svg";
import Hero from "../../components/hero";
import EntriesList from "../../components/entries-list";
import Container from "../../components/container";
import Link from "next/link";

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
        <p className="py-6 underline font-bold flex gap-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.02698 11.9929L5.26242 16.2426L6.67902 14.8308L4.85766 13.0033L22.9731 13.0012L22.9728 11.0012L4.85309 11.0033L6.6886 9.17398L5.27677 7.75739L1.02698 11.9929Z"
              fill="currentColor"
            />
          </svg>
          <Link href={"/news"}>Back to News</Link>
        </p>
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
