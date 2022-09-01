import Layout from "../components/layout";
import Hero from "../components/hero";
import Space from "../assets/images/space.svg";
import Container from "../components/container";

export default function Index({}) {
  return (
    <>
      <Layout>
        <Container>
          {/* <Hero
            title={"Welcome to NFT Radar"}
            description={
              "Fugiat ea amet minim pariatur sint do adipisicing laborum nisi."
            }
            svg={Space}
            reverse={true}
          /> */}
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
