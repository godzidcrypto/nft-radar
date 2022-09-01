import Layout from "../../components/layout";
import { getAllOpinionPieces } from "../../lib/api";
import Opinions from "../../assets/images/opinions.svg";
import Hero from "../../components/hero";
import EntriesList from "../../components/entries-list";
import Container from "../../components/container";

function OpinionsCollection({ allOpinionPieces }) {
  return (
    <Layout>
      <Container>
        <Hero
          title={"Opinion Piece"}
          description={
            "Ea aliquip veniam deserunt culpa dolore excepteur dolor culpa veniam eu quis nisi amet."
          }
          svg={Opinions}
          reverse={true}
        />
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