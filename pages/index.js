import Layout from "../components/layout";
// import { getAllPostsForHome, getAllProjects } from "../lib/api";
import Hero from "../components/hero";
import Space from "../assets/images/space.svg";

export default function Index({}) {
  return (
    <>
      <Layout>
        <Hero
          title={"Welcome to NFT Radar"}
          description={
            "Exercitation duis adipisicing consequat mollit sunt id in consectetur. Laboris est eiusmod aute eu dolor in deserunt cupidatat dolor enim et incididunt ullamco eu dolore. Magna deserunt velit eiusmod irure cillum labore nisi commodo occaecat aute elit laborum."
          }
          svg={Space}
        />
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {},
  };
}
