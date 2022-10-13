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
import Logo from "../assets/images/logo.png";

const fetcher = (url) => fetch(url).then((res) => res.json());
const API = `/api/polls`;

function Index({ allContent, featuredItems, selectedDate }) {
  const [topCollections, setTopCollections] = useState();

  // useEffect(async () => {
  //   const res = await fetch(
  //     "https://stats-mainnet.magiceden.io/collection_stats/popular_collections/sol?limit=5&window=1d"
  //   ).then((res) => {
  //     return res.json();
  //   });
  //   setTopCollections(res);
  // }, []);

  // console.log("top", topCollections);
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

  // filters out "latest articles" by removing the "featured articles"
  // this prevents double articles
  const featuredArticlesSlugs = featuredArticles.map((item) => item.slug);

  const filteredMerged = merged.filter((item) => {
    return !featuredArticlesSlugs.includes(item.slug);
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

  const onlyNumbers = (str) => {
    return /^[0-9.,]+$/.test(str);
  };

  return (
    <>
      <Layout>
        <Container>
          <Hero
            title={"Welcome to NFT Radar"}
            description={"The premier source for all things NFTs"}
            reverse={true}
          />
          <div className="grid lg:grid-cols-[1fr_2fr_1fr] gap-8 py-12 relative">
            <div className="h-fit lg:sticky top-32 rounded-xl order-last lg:order-first">
              <Link href={"/polls"}>
                <h2 className="uppercase font-extralight pb-4 hover:cursor-pointer hover:text-[#8C50EE]">
                  Mints for{" "}
                  <DateComponent dateString={selectedDate[0].selectedDate} />
                </h2>
              </Link>
              <div className="grid gap-2">
                {mintsToday.map((item, index) => {
                  const {
                    name,
                    twitter,
                    discord,
                    website,
                    yes,
                    imageUrl,
                    isRequested,
                  } = item;
                  return (
                    <div
                      className="bg-[#16181C] p-4 rounded-xl grid items-center relative"
                      key={index}
                    >
                      {isRequested && (
                        <div className="absolute top-2 right-2">
                          <div className="group cursor-pointer relative text-center mr-1.5">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 6C12.5523 6 13 6.44772 13 7V13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13V7C11 6.44772 11.4477 6 12 6Z"
                                fill="#fde047"
                              />
                              <path
                                d="M12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16Z"
                                fill="#fde047"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12Z"
                                fill="#fde047"
                              />
                            </svg>
                            <div className="opacity-0 bg-black text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 top-0 px-3 pointer-events-none right-6 w-48">
                              This project paid to be included in today's poll.
                              Please refer to the FAQs at the bottom of the
                              Polls page to see a list of reasons why we charge
                              projects to be listed
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="grid grid-cols-[1fr_3fr] gap-6 items-center">
                        <Link href={"/polls"}>
                          <div className="hover:cursor-pointer relative h-12 w-12">
                            <ContentfulImage
                              src={imageUrl ?? Logo}
                              layout="fill"
                              objectFit="cover"
                              className="rounded-full"
                            />
                          </div>
                        </Link>
                        <div className="flex flex-col gap-2">
                          <span
                            className={`absolute justify-end bottom-0 right-0 text-xs font-light bg-gray-200 text-gray-600 inline-flex items-center gap-1 rounded-tl-xl rounded-br-xl py-1 px-1.5`}
                          >
                            Minting:{" "}
                            <span className="font-semibold">{yes}</span>
                          </span>
                          <span className="font-bold">
                            <Link href={"/polls"}>
                              <a className="hover:text-[#8C50EE] duration-200">
                                {name}
                              </a>
                            </Link>
                          </span>
                          <div className="flex items-center gap-2 lg:gap-3">
                            <a
                              className="hover:scale-125 duration-200"
                              href={twitter}
                              target="_blank"
                            >
                              <Twitter fill={"#C4C4C6"} width={12} />
                            </a>
                            <a
                              className="scale-125 hover:scale-150 duration-200"
                              href={discord}
                              target="_blank"
                            >
                              <Discord fill={"#C4C4C6"} width={12} />
                            </a>
                            {website && (
                              <a
                                className="scale-125 hover:scale-150 duration-200"
                                href={website}
                                target="_blank"
                              >
                                <Website fill={"#C4C4C6"} width={12} />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                      {/* <div className="grid grid-cols-3 gap-2 mt-2">
                        <p className="text-xs font-normal">
                          Supply: <br />
                          {quantity}
                        </p>
                        <p className="text-xs font-normal">
                          WL Mint Price: <br />
                          {onlyNumbers(wlMintPrice)
                            ? parseFloat(wlMintPrice)
                            : wlMintPrice}
                        </p>
                        <p className="text-xs font-normal">
                          Mint Price: <br />
                          {onlyNumbers(mintPrice)
                            ? parseFloat(mintPrice)
                            : mintPrice}
                        </p>
                      </div> */}
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
                  {filteredMerged.slice(0, 7).map((item, index) => {
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
                <div key={index}>
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
                </div>
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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/polls`
  );
  const data = (await res.json()) ?? [];
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
