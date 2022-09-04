import Layout from "../components/layout";
import Hero from "../components/hero";
import { getAllContentForHome } from "../lib/api";
import Container from "../components/container";
import CoverImage from "../components/cover-image";
import DateComponent from "../components/date";
import Link from "next/link";
import Discord from "../components/discord";
import Twitter from "../components/twitter";
import Solana from "../assets/images/solana.png";
import Ethereum from "../assets/images/ethereum.png";
import ContentfulImage from "../components/contentful-image";

export default function Index({ allContent }) {
  const {
    cryptoNewsCollection,
    projectWriteUpCollection,
    artistFeatureCollection,
    educationalContentCollection,
    analysisCollection,
    opinionPieceCollection,
    interviewCollection,
  } = allContent;
  const merged = [
    ...cryptoNewsCollection.items,
    ...projectWriteUpCollection.items,
    ...artistFeatureCollection.items,
    ...educationalContentCollection.items,
    ...analysisCollection.items,
    ...opinionPieceCollection.items,
    ...interviewCollection.items,
  ];
  console.log(merged);

  // converts allContent object variable into multiple arrays segmented by category
  const result = Object.keys(allContent).map((key) => [key, allContent[key]]);

  // filters out all objects that have mintdates
  const upcomingProjects = projectWriteUpCollection.items.filter((project) => {
    // still doesn't check if date is after today
    return project.mintDate !== null;
  });

  // sorts the merged array by date
  merged.sort(function (a, b) {
    return new Date(b.sys.firstPublishedAt) - new Date(a.sys.firstPublishedAt);
  });

  // function to check route
  const checkRoute = (item) => {
    let route;
    result.map((items) => {
      const check = items[1].items.indexOf(item);
      if (check !== -1) {
        const objectIndex = result.indexOf(items);
        switch (objectIndex) {
          case 0:
            route = "news";
            break;
          case 1:
            route = "projects";
            break;
          case 2:
            route = "artists";
            break;
          case 3:
            route = "education";
            break;
          case 4:
            route = "analysis";
            break;
          case 5:
            route = "opinions";
            break;
          case 6:
            route = "interviews";
            break;
        }
      }
    });
    return route;
  };

  console.log("result", result);
  result.map((item) => {
    console.log("CATEGORY", item[0]);
    console.log("ITEMS", item[1].items);
  });

  return (
    <>
      <Layout>
        <Container>
          <Hero
            title={"Welcome to NFT Radar"}
            description={
              "Fugiat ea amet minim pariatur sint do adipisicing laborum nisi."
            }
            reverse={true}
          />
          <div className="grid grid-cols-[2fr_1fr] gap-8 py-12 relative">
            {/* <div className="bg-white h-fit sticky top-32">
              <p>twitter most recent tweets</p>
            </div> */}
            <div>
              <div className="pb-4">
                <div className="grid grid-cols-2 gap-4">
                  {merged.slice(0, 3).map((item, index) => {
                    const route = checkRoute(item);
                    const { title, featuredImage, slug, sys, author, caption } =
                      item;
                    return (
                      <div
                        key={index}
                        className={`${
                          index === 0 ? "col-span-2" : ""
                        } relative`}
                      >
                        <CoverImage
                          title={title}
                          url={featuredImage.url}
                          slug={slug}
                          route={route}
                          height={`${index === 0 ? "450" : "300"}`}
                        />
                        <div
                          className="absolute bottom-0 text-white bg-black w-full p-4"
                          style={{
                            background:
                              "linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent)",
                          }}
                        >
                          <div className="flex justify-between mt-4 items-center">
                            <p className="text-sm font-extralight flex">
                              <DateComponent
                                dateString={sys.firstPublishedAt}
                              />
                              <span className="mx-2 font-extrabold">
                                &#183;
                              </span>
                              <p>{author.name}</p>
                            </p>
                          </div>
                          <h3 className="my-2">
                            <Link href={`/${route}/${slug}`}>
                              <a className="text-xl hover:underline hover:cursor-pointer font-semibold">
                                {title}
                              </a>
                            </Link>
                          </h3>
                          <p className="text-sm my-2">{caption}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                {/* <h2>
                  Something (follow quartz 'latest stories' or 247 just list out
                  the rest of the content by date, displaying a total of 15)
                </h2> */}
                <div className="grid gap-4">
                  {merged.slice(4, 10).map((item, index) => {
                    const route = checkRoute(item);
                    const { title, featuredImage, slug, sys, author, caption } =
                      item;
                    return (
                      <div
                        key={index}
                        className="grid grid-cols-[1fr_3fr] items-center"
                      >
                        <div>
                          <CoverImage
                            title={title}
                            url={featuredImage.url}
                            slug={slug}
                            route={route}
                            height={"150"}
                          />
                        </div>
                        <div className="ml-4">
                          <p className="text-sm font-extralight flex">
                            <DateComponent dateString={sys.firstPublishedAt} />
                            <span className="mx-2 font-extrabold">&#183;</span>
                            <p>{author.name}</p>
                          </p>
                          <h3 className="my-2">
                            <Link href={`/${route}/${slug}`}>
                              <a className="hover:text-[#8C50EE] text-xl hover:cursor-pointer font-semibold">
                                {title}
                              </a>
                            </Link>
                          </h3>
                          <p>{caption}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="grid gap-4 h-fit sticky top-32">
              <div className="bg-[#16181C] p-6 rounded-xl">
                <h2 className="uppercase font-extralight pb-4">
                  Upcoming Projects
                </h2>
                <div>
                  {upcomingProjects.map((item, index) => {
                    const route = checkRoute(item);
                    const {
                      title,
                      mintDate,
                      slug,
                      projectTwitter,
                      projectDiscord,
                      chain,
                    } = item;
                    return (
                      <div
                        key={index}
                        className="py-2 grid grid-cols-2 items-center"
                      >
                        <div>
                          <h3 className="my-2">
                            <Link href={`/${route}/${slug}`}>
                              <a className="hover:underline hover:cursor-pointer font-semibold">
                                {title}
                              </a>
                            </Link>
                          </h3>
                          <p className="font-extralight text-sm">
                            <DateComponent dateString={mintDate} />
                          </p>
                        </div>
                        <div className="flex justify-between items-center">
                          {chain?.length === 1 && chain[0] === "Solana" ? (
                            <ContentfulImage
                              src={Solana}
                              width={24}
                              height={24}
                            />
                          ) : chain?.length === 1 && chain[0] === "Ethereum" ? (
                            <ContentfulImage
                              src={Ethereum}
                              width={24}
                              height={24}
                            />
                          ) : chain?.length === 2 ? (
                            <>
                              <ContentfulImage
                                src={Solana}
                                width={24}
                                height={24}
                              />
                              <ContentfulImage
                                src={Ethereum}
                                width={24}
                                height={24}
                              />
                            </>
                          ) : (
                            ""
                          )}
                          <a
                            className="mx-4 hover:scale-125 duration-200"
                            href={projectTwitter}
                            target="_blank"
                          >
                            <Twitter fill={"#ffffff"} width={24} />
                          </a>
                          <a
                            className="mx-4 scale-125 hover:scale-150 duration-200"
                            href={projectDiscord}
                            target="_blank"
                          >
                            <Discord fill={"#ffffff"} width={24} />
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="bg-[#16181C] p-6 rounded-xl">
                <h2 className="uppercase font-extralight pb-4">
                  Featured Projects
                </h2>
                <div>
                  {projectWriteUpCollection.items.map((news, index) => {
                    return <div key={index}>{news.title}</div>;
                  })}
                </div>
              </div>
              <div className="bg-[#16181C] p-6 rounded-xl">
                <h2 className="uppercase font-extralight pb-4">
                  Featured Artists
                </h2>
                <div>
                  {artistFeatureCollection.items.map((news, index) => {
                    return <div key={index}>{news.title}</div>;
                  })}
                </div>
              </div>
            </div>
          </div>
          <div>
            {result.map((categories, index) => {
              let categoryTitle;
              let route;
              switch (index) {
                case 0:
                  categoryTitle = "news";
                  route = "news";
                  break;
                case 1:
                  categoryTitle = "projects";
                  route = "projects";
                  break;
                case 2:
                  categoryTitle = "artists";
                  route = "artists";
                  break;
                case 3:
                  categoryTitle = "education";
                  route = "education";
                  break;
                case 4:
                  categoryTitle = "analysis";
                  route = "analysis";
                  break;
                case 5:
                  categoryTitle = "opinions";
                  route = "opinions";
                  break;
                case 6:
                  categoryTitle = "interviews";
                  route = "interviews";
                  break;
              }
              return (
                <>
                  {/* <h2 className=" hover:cursor-pointer"> */}
                  <h3 className="mt-4 uppercase font-extrabold border-b-2">
                    <Link href={`/${route}`}>
                      <a className="text-6xl hover:text-[#8C50EE] hover:cursor-pointer font-semibold">
                        {categoryTitle}
                      </a>
                    </Link>
                  </h3>
                  <div className="grid grid-cols-[2fr_1fr] py-8 gap-8">
                    <div>
                      <div>
                        {categories[1].items
                          .slice(0, 1)
                          .map((category, index) => {
                            const {
                              title,
                              featuredImage,
                              slug,
                              caption,
                              author,
                              sys,
                            } = category;
                            return (
                              <div key={index}>
                                <CoverImage
                                  title={title}
                                  url={featuredImage.url}
                                  slug={slug}
                                  route={route}
                                  height={`450`}
                                />
                                <div>
                                  <h3 className="mt-4">
                                    <Link href={`/${route}/${slug}`}>
                                      <a className="text-2xl hover:text-[#8C50EE] hover:cursor-pointer font-semibold">
                                        {title}
                                      </a>
                                    </Link>
                                  </h3>
                                  <p>{caption}</p>
                                  <p className="text-sm font-extralight flex">
                                    <DateComponent
                                      dateString={sys.firstPublishedAt}
                                    />
                                    <span className="mx-2 font-extrabold">
                                      &#183;
                                    </span>
                                    <p>{author.name}</p>
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                    <div>
                      <div className="grid gap-8">
                        {categories[1].items
                          .slice(1, 4)
                          .map((category, index) => {
                            const {
                              title,
                              featuredImage,
                              slug,
                              caption,
                              author,
                              sys,
                            } = category;
                            return (
                              <div
                                key={index}
                                className="grid grid-cols-2 items-center gap-4"
                              >
                                <CoverImage
                                  title={title}
                                  url={featuredImage.url}
                                  slug={slug}
                                  route={route}
                                  height={`150`}
                                />
                                <div>
                                  <h3 className="my-2">
                                    <Link href={`/${route}/${slug}`}>
                                      <a className="text-2xl hover:text-[#8C50EE] hover:cursor-pointer font-semibold">
                                        {title}
                                      </a>
                                    </Link>
                                  </h3>
                                  <p className="text-xs font-extralight flex">
                                    <DateComponent
                                      dateString={sys.firstPublishedAt}
                                    />
                                    <span className="mx-2 font-extrabold">
                                      &#183;
                                    </span>
                                    <p>{author.name}</p>
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  const allContent = (await getAllContentForHome()) ?? [];
  return {
    props: { allContent },
  };
}
