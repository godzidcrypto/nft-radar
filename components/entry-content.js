import Avatar from "./avatar";
import ContentfulImage from "./contentful-image";
import PostBody from "./post-body";
import Solana from "../assets/images/solana.png";
import Ethereum from "../assets/images/ethereum.png";

function EntryContent({ title, caption, author, chain, writeUp }) {
  return (
    <div className="bg-[#16181C] py-6 px-12 rounded-md">
      <h1 className="text-6xl font-bold">{title}</h1>
      <p className="text-sm font-medium">{caption}</p>
      <div className="mt-4 flex items-center">
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
      </div>
      <PostBody content={writeUp} />
    </div>
  );
}

export default EntryContent;
