import Layout from "../../components/layout";
import { getAllProjects } from "../../lib/api";
import CoverImage from "../../components/cover-image";
import Link from "next/link";
import Projects from "../../assets/images/projects.svg";
import DateComponent from "../../components/date";
import Solana from "../../assets/images/solana.png";
import Ethereum from "../../assets/images/ethereum.png";
import ContentfulImage from "../../components/contentful-image";
import Avatar from "../../components/avatar";
import Hero from "../../components/hero";

function NewsCollection({ allProjects }) {
  return (
    <Layout>
      <Hero
        title={"Projects"}
        description={
          "Dolor enim ea cupidatat eu fugiat nostrud quis id labore. Consectetur ipsum consectetur laborum id consequat commodo."
        }
        svg={Projects}
        reverse={true}
      />
      <div
        style={{
          backgroundImage: "radial-gradient(#d1d5db 1.15px, #faf5ff 1.15px)",
          backgroundSize: "20px 20px",
        }}
      >
        {/* <div className="px-24 py-12 bg-red-600">Hello</div> */}
        <div className="grid grid-cols-3 gap-8 py-8 px-24">
          {allProjects.map((project, index) => {
            const { title, slug, caption, chain, featuredImage, sys, author } =
              project;
            return (
              <div
                key={index}
                className="shadow-md p-4 rounded-lg relative bg-white hover:bg-[#111827] hover:text-white transition-colors duration-300"
              >
                <CoverImage
                  title={title}
                  url={featuredImage.url}
                  slug={slug}
                  route={"projects"}
                />
                <h2 className="my-2">
                  <Link href={`/news/${slug}`}>
                    <a className="text-xl hover:underline hover:cursor-pointer font-semibold">
                      {title}
                    </a>
                  </Link>
                </h2>
                <p className="text-sm my-2">{caption}</p>
                <div className="flex justify-between mt-4 items-center">
                  {author && (
                    <Avatar name={author.name} picture={author.picture} />
                  )}
                  <div>
                    {chain?.length === 1 && chain[0] === "Solana" ? (
                      <ContentfulImage src={Solana} width={35} height={35} />
                    ) : chain?.length === 1 && chain[0] === "Ethereum" ? (
                      <ContentfulImage src={Ethereum} width={35} height={35} />
                    ) : chain?.length === 2 ? (
                      <>
                        <ContentfulImage src={Solana} width={35} height={35} />
                        <ContentfulImage
                          src={Ethereum}
                          width={35}
                          height={35}
                        />
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <p>
                    <DateComponent dateString={sys.firstPublishedAt} />
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export default NewsCollection;

export async function getStaticProps() {
  const allProjects = (await getAllProjects()) ?? [];
  return {
    props: { allProjects },
  };
}
