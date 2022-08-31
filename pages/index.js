import Layout from "../components/layout";
import Hero from "../components/hero";
import Space from "../assets/images/space.svg";
import Container from "../components/container";

export default function Index({}) {
  return (
    <>
      <Layout>
        <Container>
          <Hero
            title={"Welcome to NFT Radar"}
            description={
              "Exercitation duis adipisicing consequat mollit sunt id in consectetur. Laboris est eiusmod aute eu dolor in deserunt cupidatat dolor enim et incididunt ullamco eu dolore. Magna deserunt velit eiusmod irure cillum labore nisi commodo occaecat aute elit laborum."
            }
            svg={Space}
            reverse={true}
          />
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
