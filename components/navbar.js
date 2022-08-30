import Container from "./container";
import Link from "next/link";
import logo from "../assets/images/logo.png";
import logoWhite from "../assets/images/logoWhite.png";
import ContentfulImage from "./contentful-image";
import Discord from "./discord";
import Twitter from "./twitter";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  console.log(router.pathname);

  const [color, setColor] = useState(false);
  const changeColor = () => {
    if (window.scrollY >= 40) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeColor);
  }, []);

  const routes = [
    {
      title: "News",
      route: "/news",
    },
    {
      title: "Projects",
      route: "/projects",
    },
    {
      title: "Artists",
      route: "/artists",
    },
    {
      title: "Education",
      route: "/education",
    },
    {
      title: "Analysis",
      route: "/analysis",
    },
    {
      title: "Opinions",
      route: "/opinions",
    },
    {
      title: "Interviews",
      route: "/interviews",
    },
  ];

  const Route = ({ route, title }) => {
    return (
      <Link href={route}>
        <a
          className={`${
            router.pathname.includes(route) ? "underline font-bold" : ""
          } mx-4 hover:underline`}
        >
          {title}
        </a>
      </Link>
    );
  };

  return (
    <nav
      className={`${
        color ? "bg-[#000000] text-[#8C50EE]" : "bg-[#8C50EE] text-white"
      } py-2 fixed z-10 w-full duration-300`}
    >
      <Container>
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link href={"/"}>
              <ContentfulImage
                src={color ? logo : logoWhite}
                width={50}
                height={50}
                className="hover:cursor-pointer"
              />
            </Link>
            {/* <h3 className="text-[#8C50EE] text-4xl font-bold tracking-tighter">
              NFT Radar
            </h3> */}
            <div>
              {routes.map((route, index) => {
                return (
                  <Route key={index} route={route.route} title={route.title} />
                );
              })}
            </div>
          </div>
          <div className="flex items-center justify-center">
            <a
              className="mx-4 hover:scale-125 duration-200"
              href="https://twitter.com/solnftradar"
              target="_blank"
            >
              <Twitter fill={`${color ? "#8C50EE" : "#ffffff"}`} width={24} />
            </a>
            <a
              className="mx-4 scale-125 hover:scale-150 duration-200"
              href="https://discord.gg/nftradar"
              target="_blank"
            >
              <Discord fill={`${color ? "#8C50EE" : "#ffffff"}`} width={24} />
            </a>
            <button
              className={`${
                color
                  ? "text-black hover:text-[#8C50EE] bg-[#8C50EE] hover:bg-black border-[#8C50EE]"
                  : "text-black bg-white border-white hover:bg-[#8C50EE] hover:text-white hover:border-white"
              } mx-2 px-4 py-2 rounded-md border-2 duration-200 transition-colors`}
            >
              Login
            </button>
          </div>
        </div>
      </Container>
    </nav>
  );
}
