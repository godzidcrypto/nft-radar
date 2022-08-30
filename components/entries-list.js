import ContentfulImage from "./contentful-image";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateComponent from "./date";
import Solana from "../assets/images/solana.png";
import Ethereum from "../assets/images/ethereum.png";
import Link from "next/link";

function EntriesList({ entries, route }) {
  return (
    <div className="grid grid-cols-3 gap-8 py-8 px-24">
      {entries.map((entry, index) => {
        const { title, slug, caption, chain, featuredImage, sys, author } =
          entry;
        return (
          <div
            key={index}
            className="shadow-md p-4 rounded-lg relative bg-white hover:bg-[#111827] hover:text-white transition-colors duration-300"
          >
            <CoverImage
              title={title}
              url={featuredImage.url}
              slug={slug}
              route={route}
            />
            <h2 className="my-2">
              <Link href={`/${route}/${slug}`}>
                <a className="text-xl hover:underline hover:cursor-pointer font-semibold">
                  {title}
                </a>
              </Link>
            </h2>
            <p className="text-sm my-2">{caption}</p>
            <div className="flex justify-between mt-4 items-center">
              {author && <Avatar name={author.name} picture={author.picture} />}
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
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default EntriesList;
