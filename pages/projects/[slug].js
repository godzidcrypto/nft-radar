import Layout from "../../components/layout";
import { getAllProjects, getSingleProject } from "../../lib/api";
import Container from "../../components/container";
import EntryView from "../../components/entry-view";
import Twitter from "../../components/twitter";
import Discord from "../../components/discord";
import Website from "../../components/website";
import DateComponent from "../../components/date";

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
    projectName,
    projectTwitter,
    projectDiscord,
    projectWebsite,
    mintDate,
    publicMintPrice,
    wlMintPrice,
    projectSupply,
    mintSite,
    marketplaceLink,
    willMint,
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
    <Layout title={title}>
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
        >
          <div className="mt-6 bg-gray-800 p-6 rounded-md relative">
            {willMint && (
              <span
                className={`md:absolute right-4 top-6 rounded-full px-3 py-1.5 ${
                  willMint === "Yes"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                } font-medium text-xs`}
              >
                Will Mint: {willMint}
              </span>
            )}
            <div className="mt-4 md:mt-0 flex md:items-center gap-4 flex-col-reverse md:flex-row">
              <h2 className="text-xl font-bold">{projectName}</h2>
              <div className="flex items-center">
                <a
                  className="mr-2 hover:scale-125 duration-200"
                  href={projectTwitter}
                  target="_blank"
                >
                  <Twitter fill={"#ffffff"} width={16} />
                </a>
                <a
                  className="mx-2 scale-125 hover:scale-150 duration-200"
                  href={projectDiscord}
                  target="_blank"
                >
                  <Discord fill={"#ffffff"} width={16} />
                </a>
                <a
                  className="mx-2 scale-125 hover:scale-150 duration-200"
                  href={projectWebsite}
                  target="_blank"
                >
                  <Website fill={"#ffffff"} width={16} />
                </a>
              </div>
            </div>
            <div>
              <dl className="mt-4 grid gap-4 md:grid-cols-2">
                <div className="flex flex-col py-2 text-center border border-gray-100 rounded-lg">
                  <dt className="order-last text-xs font-medium text-gray-500">
                    Mint Price
                  </dt>

                  <dd className="text-md font-extrabold text-gray-300">
                    {publicMintPrice ?? "-"}
                  </dd>
                </div>

                <div className="flex flex-col py-2 text-center border border-gray-100 rounded-lg">
                  <dt className="order-last text-xs font-medium text-gray-500">
                    WL Mint Price
                  </dt>

                  <dd className="text-md font-extrabold text-gray-300">
                    {wlMintPrice ?? "-"}
                  </dd>
                </div>

                <div className="justify-center flex flex-col py-2 text-center border border-gray-100 rounded-lg">
                  <dt className="order-last text-xs font-medium text-gray-500">
                    Quantity
                  </dt>

                  <dd className="text-md font-extrabold text-gray-300">
                    {projectSupply ?? "-"}
                  </dd>
                </div>

                <div className="flex flex-col py-2 text-center border border-gray-100 rounded-lg">
                  <dt className="order-last text-xs font-medium text-gray-500">
                    Mint Time
                  </dt>

                  <dd className="text-md font-extrabold text-gray-300">
                    {mintDate ? <DateComponent dateString={mintDate} /> : "-"}
                  </dd>
                </div>
              </dl>
            </div>
            <div
              className={`grid ${
                marketplaceLink && mintSite ? "grid-cols-2" : "grid-cols-1"
              } mt-4 gap-4`}
            >
              {marketplaceLink && (
                <a
                  className="relative block p-4 px-8 border border-gray-100 shadow-xl rounded-xl hover:scale-105 duration-200"
                  href={marketplaceLink}
                  target="_blank"
                >
                  <div className="text-gray-500 sm:pr-8">
                    <svg
                      className="w-8 h-8 sm:w-10 sm:h-10"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.79166 2H1V4H4.2184L6.9872 16.6776H7V17H20V16.7519L22.1932 7.09095L22.5308 6H6.6552L6.08485 3.38852L5.79166 2ZM19.9869 8H7.092L8.62081 15H18.3978L19.9869 8Z"
                        fill="currentColor"
                      />
                      <path
                        d="M10 22C11.1046 22 12 21.1046 12 20C12 18.8954 11.1046 18 10 18C8.89543 18 8 18.8954 8 20C8 21.1046 8.89543 22 10 22Z"
                        fill="currentColor"
                      />
                      <path
                        d="M19 20C19 21.1046 18.1046 22 17 22C15.8954 22 15 21.1046 15 20C15 18.8954 15.8954 18 17 18C18.1046 18 19 18.8954 19 20Z"
                        fill="currentColor"
                      />
                    </svg>

                    <h3 className="mt-4 text-xl font-bold">Marketplace</h3>
                  </div>
                </a>
              )}
              {mintSite && (
                <a
                  className="relative block p-4 px-8 border border-gray-100 shadow-xl rounded-xl hover:scale-105 duration-200"
                  href={mintSite}
                  target="_blank"
                >
                  <div className="text-gray-500 sm:pr-8">
                    <svg
                      className="w-8 h-8 sm:w-10 sm:h-10"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9 14H4V4H14V9H19V19H9V14ZM6 6H12V12H6V6Z"
                        fill="currentColor"
                      />
                    </svg>

                    <h3 className="mt-4 text-xl font-bold">Mint Site</h3>
                  </div>
                </a>
              )}
            </div>
          </div>
        </EntryView>
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
