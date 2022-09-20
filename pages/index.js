import Layout from "../components/layout";
import Hero from "../components/hero";
import {
  getAllContentForHome,
  getMintPollDate,
  getFeaturedItems,
} from "../lib/api";
import Container from "../components/container";
import CoverImage from "../components/cover-image";
import ContentfulImage from "../components/contentful-image";
import DateComponent from "../components/date";
import Link from "next/link";
import Twitter from "../components/twitter";
import Carousel from "../components/swiper";
import useSWR, { SWRConfig } from "swr";
import Discord from "../components/discord";
import Website from "../components/website";
import { useEffect, useState } from "react";

const fetcher = (url) => fetch(url).then((res) => res.json());
const API = `/api/polls`;

function Index({ allContent, featuredItems, selectedDate }) {
  const [topCollections, setTopCollections] = useState();

  useEffect(async () => {
    const res = await fetch(
      "https://stats-mainnet.magiceden.io/collection_stats/popular_collections/sol?limit=5&window=1d"
    ).then((res) => {
      return res.json();
    });
    setTopCollections(res);
  }, []);

  console.log("top", topCollections);
  const {
    featuredArticlesCollection,
    featuredArtistCollection,
    featuredProjectsCollection,
  } = featuredItems;

  const featuredArticles =
    featuredArticlesCollection.items[0].articlesCollection.items;
  const featuredArtist = featuredArtistCollection.items[0].artist;
  const featuredProjects =
    featuredProjectsCollection.items[0].projectsCollection.items;

  const { data: swrData } = useSWR(API, fetcher, {
    refreshInterval: 1000,
  });

  const mintsToday = swrData.filter((data) => {
    return (
      data.date.substring(0, 10) ===
      selectedDate[0].selectedDate.substring(0, 10)
    );
  });

  mintsToday.sort((a, b) => parseFloat(b.yes) - parseFloat(a.yes));

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
      // used json stringify on array and item to search
      // {} === {} will return false if they come from different objects
      const check =
        JSON.stringify(items[1].items).indexOf(JSON.stringify(item)) > -1;
      if (check !== false) {
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
          <div className="grid lg:grid-cols-[1fr_2fr_1fr] gap-8 py-12 relative">
            <div className="h-fit lg:sticky top-32 rounded-xl order-last lg:order-first">
              <h2 className="uppercase font-extralight pb-4">
                Daily Mints Poll
              </h2>
              <div className="grid gap-2">
                {mintsToday.map((item, index) => {
                  const {
                    name,
                    twitter,
                    discord,
                    website,
                    mintPrice,
                    quantity,
                    yes,
                    imageUrl,
                  } = item;
                  return (
                    <div className="bg-[#16181C] p-4 rounded-xl grid items-center">
                      <div className="flex gap-6 items-center">
                        <Link href={"/polls"}>
                          <div className="hover:cursor-pointer">
                            <ContentfulImage
                              src={imageUrl}
                              width={50}
                              height={50}
                              className="rounded-full"
                            />
                          </div>
                        </Link>
                        <div className="flex flex-col">
                          <div className="flex items-center mb-2">
                            <a
                              className="mr-2 hover:scale-125 duration-200"
                              href={twitter}
                              target="_blank"
                            >
                              <Twitter fill={"#ffffff"} width={12} />
                            </a>
                            <a
                              className="mx-2 scale-125 hover:scale-150 duration-200"
                              href={discord}
                              target="_blank"
                            >
                              <Discord fill={"#ffffff"} width={12} />
                            </a>
                            {website && (
                              <a
                                className="mx-2 scale-125 hover:scale-150 duration-200"
                                href={website}
                                target="_blank"
                              >
                                <Website fill={"#ffffff"} width={12} />
                              </a>
                            )}
                          </div>
                          <span className="font-bold">
                            <Link href={"/polls"}>
                              <a className="hover:text-[#8C50EE] duration-200">
                                {name}
                              </a>
                            </Link>
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        <p className="text-xs font-thin">Supply: {quantity}</p>
                        <p className="text-xs font-thin">
                          Mint Price: {mintPrice}
                        </p>
                        <p className="text-xs font-thin text-green-300">
                          Votes: {yes}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              {topCollections && (
                <h2 className="uppercase font-extralight my-4">
                  Top 5 Collections by 24H Volume
                </h2>
              )}
              <div className="grid gap-2">
                {topCollections?.map((collection, index) => {
                  const { name, fp, totalVol, vol, image, collectionSymbol } =
                    collection;
                  return (
                    <div
                      key={index}
                      className="bg-[#16181C] rounded-xl grid p-6"
                    >
                      <div className="flex items-center gap-4">
                        <a
                          href={`https://magiceden.io/marketplace/${collectionSymbol}`}
                          target="_blank"
                        >
                          <div>
                            <ContentfulImage
                              src={image}
                              width={50}
                              height={50}
                              className="rounded-full"
                            />
                          </div>
                        </a>
                        <p className="font-bold">
                          <a
                            href={`https://magiceden.io/marketplace/${collectionSymbol}`}
                            target="_blank"
                            className="hover:text-[#8C50EE] duration-200"
                          >
                            {name}
                          </a>
                        </p>
                      </div>
                      <div className="grid grid-cols-3 gap-8 mt-2">
                        <p className="text-xs font-thin">
                          Volume: {Math.round(vol).toLocaleString()}
                        </p>
                        <p className="text-xs font-thin">
                          Total Volume: {Math.round(totalVol).toLocaleString()}
                        </p>
                        <p className="text-xs font-thin text-green-300">
                          Floor Price: {fp / 1000000000}
                        </p>
                      </div>
                    </div>
                  );
                })}
                {/* <div className="bg-[#16181C] rounded-xl grid p-6">
                  <span>Degen Fat Cats</span>
                </div>
                <div className="bg-[#16181C] rounded-xl grid p-6">
                  <span>Degen Fat Cats</span>
                </div>
                <div className="bg-[#16181C] rounded-xl grid p-6">
                  <span>Degen Fat Cats</span>
                </div>
                <div className="bg-[#16181C] rounded-xl grid p-6">
                  <span>Degen Fat Cats</span>
                </div>
                <div className="bg-[#16181C] rounded-xl grid p-6">
                  <span>Degen Fat Cats</span>
                </div> */}
              </div>
            </div>
            {/* center content */}
            <div>
              <div className="pb-4">
                <div className="grid lg:grid-cols-2 gap-4">
                  {featuredArticles.map((item, index) => {
                    const route = checkRoute(item);
                    const { title, featuredImage, slug, sys, author, caption } =
                      item;
                    return (
                      <div
                        key={index}
                        className={`${
                          index === 0 ? "lg:col-span-2" : ""
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
                              <a className="text-xl hover:text-purple-400 duration-200 hover:cursor-pointer font-semibold">
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
              {/* bottom center content */}
              <div>
                <div className="grid gap-4">
                  {merged.slice(0, 7).map((item, index) => {
                    const route = checkRoute(item);
                    const { title, featuredImage, slug, sys, author, caption } =
                      item;
                    return (
                      <div
                        key={index}
                        className="grid grid-cols-[1fr_2fr] lg:grid-cols-[1fr_3fr] items-center"
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
                          <p className="text-sm font-extralight flex lg:flex-row flex-col">
                            <DateComponent dateString={sys.firstPublishedAt} />
                            <span className="hidden lg:block mx-2 font-extrabold">
                              &#183;
                            </span>
                            <p>{author.name}</p>
                          </p>
                          <h3 className="my-2">
                            <Link href={`/${route}/${slug}`}>
                              <a className="hover:text-[#8C50EE] duration-200 text-xl hover:cursor-pointer font-semibold">
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
            <div className="grid gap-4 h-fit lg:sticky top-32 order-first lg:order-last">
              <h2 className="uppercase font-extralight">Featured Projects</h2>
              <Carousel items={featuredProjects} />
              <h2 className="uppercase font-extralight">Featured Artist</h2>
              <div>
                <div>
                  <div className="grid grid-cols-2 items-center">
                    <CoverImage
                      title={featuredArtist.title}
                      url={featuredArtist.featuredImage.url}
                      slug={featuredArtist.slug}
                      route={"artists"}
                      height={"200"}
                    />
                    <div className="pl-4">
                      <div className="flex items-center">
                        <h3>
                          <Link href={`/projects/${featuredArtist.slug}`}>
                            <a className="text-md hover:text-[#8C50EE] duration-200 hover:cursor-pointer font-semibold">
                              {featuredArtist.title}
                            </a>
                          </Link>
                        </h3>
                        <a
                          className="mx-2 hover:scale-125 duration-200"
                          href={featuredArtist.artistTwitter}
                          target="_blank"
                        >
                          <Twitter fill={"#ffffff"} width={12} />
                        </a>
                      </div>
                      <p className="text-xs font-extralight">
                        {featuredArtist.caption}
                      </p>
                    </div>
                  </div>
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
                      <a className="text-6xl hover:text-[#8C50EE] duration-200 hover:cursor-pointer font-semibold">
                        {categoryTitle}
                      </a>
                    </Link>
                  </h3>
                  <div className="grid lg:grid-cols-[1fr_2fr_1fr] py-8 gap-8">
                    <div>
                      {/* content on the left side */}
                      <div className="grid gap-8">
                        {categories[1].items
                          .slice(1, 3)
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
                                      <a className="text-2xl hover:text-[#8C50EE] duration-200 hover:cursor-pointer font-semibold">
                                        {title}
                                      </a>
                                    </Link>
                                  </h3>
                                  <p className="text-xs font-extralight flex flex-col">
                                    <DateComponent
                                      dateString={sys.firstPublishedAt}
                                    />
                                    <p>{author.name}</p>
                                  </p>
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                    <div>
                      {/* content in the center */}
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
                                      <a className="text-2xl hover:text-[#8C50EE] duration-200 hover:cursor-pointer font-semibold">
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
                      {/* content on the right side */}
                      <div className="grid gap-8">
                        {categories[1].items
                          .slice(3, 5)
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
                                      <a className="text-2xl hover:text-[#8C50EE] duration-200 hover:cursor-pointer font-semibold">
                                        {title}
                                      </a>
                                    </Link>
                                  </h3>
                                  <p className="text-xs font-extralight flex flex-col">
                                    <DateComponent
                                      dateString={sys.firstPublishedAt}
                                    />
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

export default function IndexPage({
  allContent,
  selectedDate,
  featuredItems,
  fallback,
}) {
  return (
    <SWRConfig value={{ fallback }}>
      <Index
        allContent={allContent}
        selectedDate={selectedDate}
        featuredItems={featuredItems}
      />
    </SWRConfig>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.BACKEND_SERVER}/api/polls`);
  const data = await res.json();
  const selectedDate = (await getMintPollDate()) ?? [];

  const allContent = (await getAllContentForHome()) ?? [];
  const featuredItems = (await getFeaturedItems()) ?? [];
  return {
    props: {
      allContent,
      selectedDate,
      featuredItems,
      fallback: {
        [API]: data,
      },
    },
  };
}
