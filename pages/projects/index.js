import Layout from "../../components/layout";
import { getAllProjects } from "../../lib/api";
import Projects from "../../assets/images/projects.svg";
import Hero from "../../components/hero";
import EntriesList from "../../components/entries-list";
import Container from "../../components/container";

function ProjectsCollection({ allProjects }) {
  return (
    <Layout>
      <Container>
        <Hero
          title={"Projects"}
          description={
            "Dolor enim ea cupidatat eu fugiat nostrud quis id labore. Consectetur ipsum consectetur laborum id consequat commodo."
          }
          svg={Projects}
          reverse={true}
        />
        <div>
          {/* <div className="px-24 py-12 bg-red-600">Hello</div> */}
          <EntriesList entries={allProjects} route={"projects"} />
        </div>
      </Container>
    </Layout>
  );
}

export default ProjectsCollection;

export async function getStaticProps() {
  const allProjects = (await getAllProjects()) ?? [];
  return {
    props: { allProjects },
  };
}
