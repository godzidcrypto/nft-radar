import Container from "./container";
import { EXAMPLE_PATH } from "../lib/constants";

export default function Footer() {
  return (
    <footer
      className="bg-[#8C50EE] text-black"
      style={{
        background:
          "linear-gradient(90deg, rgba(188,153,255,1) 3%, rgba(132,83,230,1) 100%)",
      }}
    >
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <div className="mb-8">
            <h3 className="text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-center lg:text-left lg:mb-0 lg:pr-4 lg:w-1/2">
              NFT Radar
            </h3>
            <p className="max-w-sm lg:max-w-lg text-center lg:text-left font-light">
              For any site related questions or project feature/collaboration
              requests, please DM HoTsAuCe#7292 on Discord
            </p>
          </div>
          <div className="flex flex-col lg:flex-row justify-center items-center lg:pl-4 lg:w-1/2">
            <a
              href="https://twitter.com/solnftradar"
              className="mx-3 bg-black hover:bg-[#8C50EE] rounded-md hover:text-black border border-black text-[#8C50EE] font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
              View Twitter
            </a>
            <a
              href={`https://discord.gg/nftradar`}
              className="mx-3 font-bold hover:underline"
            >
              Join Discord
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
