import ContentfulImage from "./contentful-image";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateComponent from "./date";
import Solana from "../assets/images/solana.png";
import Ethereum from "../assets/images/ethereum.png";
import Link from "next/link";

function EntriesList({ entries, route, featured }) {
  const { title, slug, caption, chain, featuredImage, sys, author } = featured;
  return (
    <div className="py-8">
      <div className="grid md:grid-cols-[1fr_2fr] gap-8 items-center">
        <div
          className="text-white bg-black w-full order-2 md:order-first"
          style={{
            background:
              "linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent)",
          }}
        >
          <p className="font-extralight my-2 flex">
            <DateComponent dateString={sys.firstPublishedAt} />
            <span className="mx-4 font-extrabold">&#183;</span>
            <p>{author.name}</p>
          </p>
          <h2 className="py-4">
            <Link href={`/${route}/${slug}`}>
              <a className="text-4xl hover:text-[#8C50EE] hover:cursor-pointer font-semibold duration-200">
                {title}
              </a>
            </Link>
          </h2>
          <p className="md:text-sm py-2 text-xs">{caption}</p>
          <Link href={`/${route}/${slug}`}>
            <a className="font-light uppercase hover:text-[#8C50EE] duration-200 text-xs">
              Read More &#8594;
            </a>
          </Link>
        </div>
        <div>
          <CoverImage
            title={title}
            url={featuredImage.url}
            slug={slug}
            route={route}
            height={"400"}
          />
        </div>
      </div>
      <div className="grid lg:grid-cols-3 gap-16 py-16">
        {entries.map((entry, index) => {
          const { title, slug, caption, chain, featuredImage, sys, author } =
            entry;
          return (
            <div key={index}>
              <div>
                <CoverImage
                  title={title}
                  url={featuredImage.url}
                  slug={slug}
                  route={route}
                  height={"250"}
                />
              </div>
              <div
                className="text-white bg-black w-full"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0, 0, 0, 0.85), transparent)",
                }}
              >
                <p className="font-extralight my-2 flex">
                  <DateComponent dateString={sys.firstPublishedAt} />
                  <span className="mx-4 font-extrabold">&#183;</span>
                  <p>{author.name}</p>
                </p>
                <h2>
                  <Link href={`/${route}/${slug}`}>
                    <a className="text-xl hover:text-[#8C50EE] hover:cursor-pointer font-semibold duration-200">
                      {title}
                    </a>
                  </Link>
                </h2>
                <p className="md:text-sm my-2 text-xs">{caption}</p>
                <Link href={`/${route}/${slug}`}>
                  <a className="font-light uppercase hover:text-[#8C50EE] duration-200 text-xs">
                    Read More &#8594;
                  </a>
                </Link>
                {/* <div className="md:flex justify-between mt-4 items-center hidden">
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
                      <ContentfulImage src={Ethereum} width={35} height={35} />
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <p>
                  <DateComponent dateString={sys.firstPublishedAt} />
                </p>
              </div> */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default EntriesList;
