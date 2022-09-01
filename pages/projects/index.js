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
          title={"Project Write-Up"}
          description={"Eiusmod ad qui qui cillum."}
          svg={Projects}
          reverse={true}
        />
        <div>
          {/* <div className="px-24 py-12 bg-red-600">Hello</div> */}
          <EntriesList
            featured={allProjects[0]}
            entries={allProjects.slice(1)}
            route={"projects"}
          />
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
