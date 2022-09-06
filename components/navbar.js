import Container from "./container";
import Link from "next/link";
import logo from "../assets/images/logo.png";
import logoWhite from "../assets/images/logoWhite.png";
import ContentfulImage from "./contentful-image";
import Discord from "./discord";
import Twitter from "./twitter";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import Avatar from "./avatar";

export default function Navbar() {
  const router = useRouter();

  const { data: session } = useSession();
  const user = session?.user;

  const [open, setOpen] = useState(false);
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
    {
      title: "Polls",
      route: "/polls",
    },
  ];

  const Route = ({ route, title }) => {
    return (
      <Link href={route}>
        <a
          className={`${
            router.pathname.includes(route)
              ? `underline font-bold lg:border-none border-2 ${
                  color
                    ? "bg-black !border-[#8C50EE] text-[#8C50EE]"
                    : "bg-white border-black text-black lg:text-white"
                } `
              : `${
                  color
                    ? "bg-[#8C50EE] text-black lg:text-[#8C50EE]"
                    : "text-white"
                }`
          } lg:mx-4 hover:underline my-2 p-4 bg-black rounded-md lg:rounded-none lg:bg-transparent lg:p-0 lg:my-0`}
        >
          {title}
        </a>
      </Link>
    );
  };

  return (
    <>
      <nav
        className={`${
          color ? "bg-[#000000] text-[#8C50EE]" : "bg-[#8C50EE] text-white"
        } py-2 fixed z-50 w-full duration-300 lg:block hidden`}
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
                    <Route
                      key={index}
                      route={route.route}
                      title={route.title}
                    />
                  );
                })}
              </div>
            </div>
            <div className="flex items-center justify-center">
              {!user && (
                <>
                  <a
                    className="mx-4 hover:scale-125 duration-200"
                    href="https://twitter.com/solnftradar"
                    target="_blank"
                  >
                    <Twitter
                      fill={`${color ? "#8C50EE" : "#ffffff"}`}
                      width={24}
                    />
                  </a>
                  <a
                    className="mx-4 scale-125 hover:scale-150 duration-200"
                    href="https://discord.gg/nftradar"
                    target="_blank"
                  >
                    <Discord
                      fill={`${color ? "#8C50EE" : "#ffffff"}`}
                      width={24}
                    />
                  </a>
                  <Link href={`/auth/signIn`}>
                    <button
                      className={`${
                        color
                          ? "text-black hover:text-[#8C50EE] bg-[#8C50EE] hover:bg-black border-[#8C50EE]"
                          : "text-black bg-white border-white hover:bg-[#8C50EE] hover:text-white hover:border-white"
                      } ml-2 px-4 py-2 rounded-md border-2 duration-200 transition-colors`}
                    >
                      Login
                    </button>
                  </Link>
                </>
              )}
              {user && (
                <div className="flex">
                  <Avatar name={user.name} picture={{ url: user.image }} />
                  <button
                    className={`${
                      color
                        ? "text-black hover:text-[#8C50EE] bg-[#8C50EE] hover:bg-black border-[#8C50EE]"
                        : "text-black bg-white border-white hover:bg-[#8C50EE] hover:text-white hover:border-white"
                    } ml-4 px-4 py-2 rounded-md border-2 duration-200 transition-colors`}
                    onClick={() => signOut()}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </Container>
      </nav>
      {/* mobile nav */}
      <nav
        className={`${
          color ? "bg-[#000000] text-[#8C50EE]" : "bg-[#8C50EE] text-white"
        } py-2 fixed z-50 w-full duration-300 lg:hidden block`}
      >
        <div className="flex items-center justify-between h-20 md:px-12 px-6">
          <Link href={"/"}>
            <ContentfulImage
              src={color ? logo : logoWhite}
              width={50}
              height={50}
              className="hover:cursor-pointer"
            />
          </Link>
          <div
            className={`${open ? "block" : "hidden"} ${
              color ? "bg-black" : "bg-[#8C50EE]"
            } flex flex-col absolute top-0 mt-24 -mx-6 px-6 md:-mx-12 md:px-12 w-full h-view pb-4 duration-300`}
          >
            {routes.map((route, index) => {
              return (
                <Route key={index} route={route.route} title={route.title} />
              );
            })}
          </div>
          <button
            className={`focus:ring-2 ${
              color ? "focus:ring-[#8C50EE]" : "focus:ring-gray-200"
            } rounded-lg p-2`}
            onClick={() => setOpen(!open)}
          >
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 6C2 5.44772 2.44772 5 3 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H3C2.44772 7 2 6.55228 2 6Z"
                fill="currentColor"
              />
              <path
                d="M2 12.0322C2 11.4799 2.44772 11.0322 3 11.0322H21C21.5523 11.0322 22 11.4799 22 12.0322C22 12.5845 21.5523 13.0322 21 13.0322H3C2.44772 13.0322 2 12.5845 2 12.0322Z"
                fill="currentColor"
              />
              <path
                d="M3 17.0645C2.44772 17.0645 2 17.5122 2 18.0645C2 18.6167 2.44772 19.0645 3 19.0645H21C21.5523 19.0645 22 18.6167 22 18.0645C22 17.5122 21.5523 17.0645 21 17.0645H3Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </nav>
    </>
  );
}
