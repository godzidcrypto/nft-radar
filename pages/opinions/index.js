import Layout from "../../components/layout";
import { getAllOpinionPieces } from "../../lib/api";
import Opinions from "../../assets/images/opinions.svg";
import Hero from "../../components/hero";
import EntriesList from "../../components/entries-list";
import Container from "../../components/container";
import Link from "next/link";

function OpinionsCollection({ allOpinionPieces }) {
  return (
    <Layout title={"NFT Radar | Opinion Pieces"}>
      <Container>
        <Hero
          title={"Opinion Pieces"}
          description={"These are our thoughts on things"}
          svg={Opinions}
          reverse={true}
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
            featured={allOpinionPieces[0]}
            entries={allOpinionPieces.slice(1)}
            route={"opinions"}
          />
        </div>
      </Container>
    </Layout>
  );
}

export default OpinionsCollection;

export async function getStaticProps() {
  const allOpinionPieces = (await getAllOpinionPieces()) ?? [];
  return {
    props: { allOpinionPieces },
  };
}
