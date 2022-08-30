import Layout from "../../components/layout";
import Link from "next/link";
import { getAllProjects, getSingleProject } from "../../lib/api";
import CoverImage from "../../components/cover-image";
import DateComponent from "../../components/date";
import TableOfContents from "../../components/table-of-contents";
import EntryContent from "../../components/entry-content";
import OtherEntries from "../../components/other-entries";

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
      <article className="grid grid-cols-[1fr_2fr] px-24 gap-8 py-16">
        <div>
          <div className="mb-4 flex justify-between items-center">
            <Link href={"/projects"}>
              <p className="hover:underline hover:cursor-pointer">
                &#8592; Other Projects
              </p>
            </Link>
            <p>
              <DateComponent dateString={date} />
            </p>
          </div>
          <div>
            <CoverImage title={title} url={featuredImage.url} />
          </div>
          <TableOfContents headings={headings} />
          <OtherEntries otherEntries={otherProjects} route={"projects"} />
        </div>
        <EntryContent
          title={title}
          caption={caption}
          author={author}
          chain={chain}
          writeUp={writeUp}
        />
      </article>
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
