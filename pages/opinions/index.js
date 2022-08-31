import Layout from "../../components/layout";
import { getAllCryptoNews } from "../../lib/api";
import Opinions from "../../assets/images/opinions.svg";
import Hero from "../../components/hero";
import EntriesList from "../../components/entries-list";
import Container from "../../components/container";

function OpinionsCollection({ allCryptoNews }) {
  return (
    <Layout>
      <Container>
        <Hero
          title={"Opinion Piece"}
          description={
            "Adipisicing proident enim mollit fugiat nostrud quis est nostrud adipisicing laboris ut laborum minim tempor. Mollit cillum minim aliquip nulla anim consequat irure et nisi ut minim est ad."
          }
          svg={Opinions}
          reverse={true}
        />
        <div>
          {/* <div className="px-24 py-12 bg-red-600">Hello</div> */}
          <EntriesList entries={allCryptoNews} route={"news"} />
        </div>
      </Container>
    </Layout>
  );
}

export default OpinionsCollection;

export async function getStaticProps() {
  const allCryptoNews = (await getAllCryptoNews()) ?? [];
  return {
    props: { allCryptoNews },
  };
}
