import Container from "./container";
import Link from "next/link";
import Image from "next/image";
import logo from "../assets/images/logo.png";

export default function Navbar() {
  const myLoader = ({ src }) => {
    return `${src}`;
  };
  return (
    <nav className="bg-[#000000] py-2">
      <Container>
        <div className="flex items-center ">
          <div className="flex items-center">
            <Image src={logo} width={50} height={50} loader={myLoader} />
            {/* <h3 className="text-[#8C50EE] text-4xl font-bold tracking-tighter">
              NFT Radar
            </h3> */}
          </div>
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
      </Container>
    </nav>
  );
}
