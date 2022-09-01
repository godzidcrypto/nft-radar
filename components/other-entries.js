import Link from "next/link";
import DateComponent from "./date";
import ContentfulImage from "./contentful-image";
import CoverImage from "./cover-image";

function OtherEntries({ otherEntries, route }) {
  return (
    <div className="py-16">
      {/* {otherEntries.length > 0 && (
        <div>
          <span className="text-xl font-semibold">Check Out Other News</span>
          {otherEntries.slice(0, 5).map((entry, index) => {
            const { title, slug, caption, featuredImage, sys } = entry;

            return (
              <div
                key={index}
                className="grid grid-cols-[1fr_2fr] lg:grid-cols-2 py-4 border-b-2 border-b-[#E7E9EA] items-center last:border-b-0"
              >
                <CoverImage
                  url={featuredImage.url}
                  title={title}
                  height={"150"}
                  route={route}
                  slug={slug}
                  // className="rounded-sm hover:cursor-pointer"
                />
                <div className="ml-4">
                  <div className="font-extralight text-xs">
                    <DateComponent dateString={sys.firstPublishedAt} />
                  </div>
                  <Link href={`/${route}/${slug}`}>
                    <p className="hover:underline hover:cursor-pointer font-semibold">
                      {title}
                    </p>
                  </Link>
                  <p className="text-xs lg:text-sm">{caption}</p>
                </div>
              </div>
            );
          })}
        </div>
      )} */}
      <span className="text-xl font-semibold">Check Out Other Content</span>
      {otherEntries.length > 0 && (
        <div className="grid grid-cols-3 gap-8 py-4">
          {otherEntries.slice(0, 3).map((entry, index) => {
            const { title, slug, caption, featuredImage, sys } = entry;

            return (
              <div
                key={index}
                // className="grid grid-cols-[1fr_2fr] lg:grid-cols-2 py-4 border-b-2 border-b-[#E7E9EA] items-center last:border-b-0"
              >
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
                  <p className="font-extralight my-2">
                    <DateComponent dateString={sys.firstPublishedAt} />
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
      )}
    </div>
  );
}

export default OtherEntries;
