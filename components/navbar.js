import Container from "./container";
import Link from "next/link";
import logo from "../assets/images/logo.png";
import ContentfulImage from "./contentful-image";
import Discord from "./discord";
import Twitter from "./twitter";

export default function Navbar() {
  return (
    <nav className="bg-[#000000] py-2">
      <Container>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href={"/"}>
              <ContentfulImage
                src={logo}
                width={50}
                height={50}
                className="hover:cursor-pointer"
              />
            </Link>
            {/* <h3 className="text-[#8C50EE] text-4xl font-bold tracking-tighter">
              NFT Radar
            </h3> */}
            <div className="text-[#8C50EE]">
              <Link href={"/news"}>
                <a className="mx-4 hover:underline">News</a>
              </Link>
              <Link href={"/projects"}>
                <a className="mx-4 hover:underline">Projects</a>
              </Link>
              <Link href={"/projects"}>
                <a className="mx-4 hover:underline">Artists</a>
              </Link>
              <Link href={"/projects"}>
                <a className="mx-4 hover:underline">Education</a>
              </Link>
              <Link href={"/projects"}>
                <a className="mx-4 hover:underline">Analysis</a>
              </Link>
              <Link href={"/projects"}>
                <a className="mx-4 hover:underline">Opinions</a>
              </Link>
              <Link href={"/projects"}>
                <a className="mx-4 hover:underline">Interviews</a>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <a
              className="mx-4 hover:scale-125 duration-200"
              href="https://twitter.com/solnftradar"
              target="_blank"
            >
              <Twitter fill="#8C50EE" width={24} />
            </a>
            <a
              className="mx-4 scale-125 hover:scale-150 duration-200"
              href="https://discord.gg/nftradar"
              target="_blank"
            >
              <Discord fill="#8C50EE" width={24} />
            </a>
            <button className="text-black hover:text-[#8C50EE] bg-[#8C50EE] mx-2 px-4 py-2 rounded-md hover:bg-black border-[#8C50EE] border-2 duration-200 transition-colors">
              Login
            </button>
          </div>
        </div>
      </Container>
    </nav>
  );
}
