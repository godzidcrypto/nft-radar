import Layout from "../../components/layout";
import { getAllProjects, getSingleProject } from "../../lib/api";
import Container from "../../components/container";
import EntryView from "../../components/entry-view";

function ProjectItem({ project, allProjects }) {
  const {
    sys,
    title,
    caption,
    chain,
    featuredImage,
    videoLink,
    writeUp,
    author,
  } = project[0];

  const otherProjects = allProjects.filter((otherProject) => {
    return otherProject.title !== project[0].title;
  });

  const { firstPublishedAt: date } = sys;

  const content = writeUp.json.content;
  const headings = content.filter((content) => {
    return content.nodeType.includes("heading");
  });
  return (
    <Layout>
      <Container>
        <EntryView
          title={title}
          featuredImage={featuredImage}
          author={author}
          chain={chain}
          writeUp={writeUp}
          date={date}
          headings={headings}
          otherEntries={otherProjects}
          route={"projects"}
        ></EntryView>
      </Container>
    </Layout>
  );
}

export default ProjectItem;

export async function getStaticPaths() {
  const allProjects = (await getAllProjects()) ?? [];

  const paths = allProjects.map((project) => ({
    params: { slug: project.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const project = (await getSingleProject(params.slug)) ?? [];
  const allProjects = (await getAllProjects()) ?? [];

  return { props: { project, allProjects } };
}
