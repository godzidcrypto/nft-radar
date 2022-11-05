import Avatar from "./avatar";
import ContentfulImage from "./contentful-image";
import PostBody from "./post-body";
import Solana from "../assets/images/solana.png";
import Ethereum from "../assets/images/ethereum.png";
import Aptos from "../assets/images/aptos.png";
import DateComponent from "./date";
import TableOfContents from "./table-of-contents";

function EntryContent({
  title,
  caption,
  author,
  chain,
  writeUp,
  date,
  headings,
  children,
}) {
  return (
    <div className="bg-[#16181C] py-6 px-6 lg:px-12 rounded-xl">
      <div className="mt-4 flex justify-between md:items-center flex-col md:flex-row">
        <div className="pb-4 md:pb-0">
          {author && <Avatar name={author.name} picture={author.picture} />}
        </div>
        <div>
          {chain?.length > 0 && (
            <div>
              {chain.map((chain, index) => {
                const image =
                  chain === "Solana"
                    ? Solana
                    : chain === "Ethereum"
                    ? Ethereum
                    : Aptos;
                if (chain !== false) {
                  return (
                    <ContentfulImage
                      key={index}
                      src={image}
                      width={25}
                      height={25}
                    />
                  );
                }
              })}
            </div>
          )}
        </div>
        <p>
          <DateComponent dateString={date} />
        </p>
      </div>
      <div>{children}</div>
      <TableOfContents headings={headings} />
      <PostBody content={writeUp} />
    </div>
  );
}

export default EntryContent;
