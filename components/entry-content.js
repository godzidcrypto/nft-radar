import Avatar from "./avatar";
import ContentfulImage from "./contentful-image";
import PostBody from "./post-body";
import Solana from "../assets/images/solana.png";
import Ethereum from "../assets/images/ethereum.png";
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
}) {
  return (
    <div className="bg-[#16181C] py-6 px-6 lg:px-12 rounded-xl">
      <div className="mt-4 flex justify-between items-center">
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
        <p>
          <DateComponent dateString={date} />
        </p>
      </div>
      <TableOfContents headings={headings} />
      <PostBody content={writeUp} />
    </div>
  );
}

export default EntryContent;
