import Layout from "../../components/layout";
import Link from "next/link";
import { getAllProjects, getSingleProject } from "../../lib/api";
import CoverImage from "../../components/cover-image";
import PostBody from "../../components/post-body";
import DateComponent from "../../components/date";
import Solana from "../../assets/images/solana.png";
import Ethereum from "../../assets/images/ethereum.png";
import ContentfulImage from "../../components/contentful-image";
import Avatar from "../../components/avatar";
import TableOfContents from "../../components/table-of-contents";

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

  const otherNews = allProjects.filter((news) => {
    return news.title !== project[0].title;
  });

  const { firstPublishedAt: date } = sys;

  const content = writeUp.json.content;
  const headings = content.filter((content) => {
    return content.nodeType.includes("heading");
  });
  return (
    <Layout>
      <article className="grid grid-cols-2 px-24 gap-8 py-16">
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
          {otherNews.length > 0 && (
            <div className="mt-4">
              <span className="text-xl font-semibold">
                Check Out Other Projects
              </span>
              {otherNews.slice(0, 5).map((news, index) => {
                const { title, slug, caption, featuredImage, sys } = news;

                return (
                  <div
                    key={index}
                    className="mb-4 grid grid-cols-2 p-4 border-b-2 items-center"
                  >
                    <Link href={`/projects/${slug}`}>
                      <ContentfulImage
                        src={featuredImage.url}
                        width={250}
                        height={150}
                        className="rounded-sm hover:cursor-pointer"
                      />
                    </Link>
                    <div className="ml-4">
                      <div className="font-light text-sm">
                        <DateComponent dateString={sys.firstPublishedAt} />
                      </div>
                      <Link href={`/news/${slug}`}>
                        <p className="hover:underline hover:cursor-pointer font-semibold">
                          {title}
                        </p>
                      </Link>
                      <p className="">{caption}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="bg-[#F9F9F9] p-6 rounded-md">
          <h1 className="text-6xl font-bold">{title}</h1>
          <p className="text-sm font-medium">{caption}</p>
          <div className="mt-4 flex items-center">
            {author && <Avatar name={author.name} picture={author.picture} />}
            <div className="ml-8">
              {chain?.length === 1 && chain[0] === "Solana" ? (
                <ContentfulImage src={Solana} width={35} height={35} />
              ) : chain?.length === 1 && chain[0] === "Ethereum" ? (
                <ContentfulImage src={Ethereum} width={35} height={35} />
              ) : chain?.length === 2 ? (
                <>
                  <ContentfulImage src={Solana} width={35} height={35} />
                  <ContentfulImage src={Ethereum} width={35} height={35} />
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          <PostBody content={writeUp} />
        </div>
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
