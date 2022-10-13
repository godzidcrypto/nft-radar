import Layout from "../../../components/layout";
import Container from "../../../components/container";
import useSWR from "swr";
import ContentfulImage from "../../../components/contentful-image";
import Twitter from "../../../components/twitter";
import Discord from "../../../components/discord";
import Website from "../../../components/website";
import Logo from "../../../assets/images/logo.png";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import DateComponent from "../../../components/date";
import Solana from "../../../assets/images/solana.png";
import Ethereum from "../../../assets/images/ethereum.png";
import AddPoll from "../../../components/add-poll";

const fetcher = (url) => fetch(url).then((res) => res.json());
const API = `/api/polls`;

function PollsAdmin() {
  const [userInfo, setUserInfo] = useState("");
  const [guildRoles, setGuildRoles] = useState([]);
  const { data: session } = useSession();

  const guildId = "892235360501923850"; // NFT Radar
  const moderatorRole = "892237845828341760"; // NFT Radar

  const getGuilds = async () => {
    if (session) {
      const userRes = await fetch("https://discord.com/api/users/@me", {
        headers: {
          Authorization: "Bearer " + session.accessToken,
        },
      }).then((res) => {
        return res.json();
      });

      const guildRolesRes = await fetch(
        `https://discord.com/api/users/@me/guilds/${guildId}/member`,
        {
          headers: {
            Authorization: "Bearer " + session.accessToken,
          },
        }
      ).then((res) => {
        return res.json();
      });
      setUserInfo(userRes);
      setGuildRoles(guildRolesRes.roles);
    }
  };

  useEffect(() => {
    // if guildRoles array ahs been updated, prevent function call to repeat
    // this prevents getting rate limited from discord API
    guildRoles?.length === 0 ? getGuilds() : console.log("getguilds");
  }, [session]);

  const { data: swrData } = useSWR(API, fetcher, {
    refreshInterval: 1000,
  });

  const onlyNumbers = (str) => {
    return /^[0-9.,]+$/.test(str);
  };

  const tConvert = (time) => {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  };

  if (!guildRoles?.includes(moderatorRole))
    return (
      <Layout>
        <Container>
          <p className="text-center text-4xl uppercase pt-24">No Access</p>
        </Container>
      </Layout>
    );

  swrData?.sort(function (a, b) {
    return new Date(b.date) - new Date(a.date);
  });

  // const pollDates = [...new Set(swrData.map((item) => item.date))];

  // console.log(pollDates);

  return (
    <Layout>
      <Container>
        {/* <div>
          {pollDates.map((date, index) => {
            return <p>{date}</p>;
          })}
        </div> */}
        <AddPoll />
        <div className="grid lg:grid-cols-2 gap-4 py-16">
          {swrData?.map((item, index) => {
            const {
              _id,
              time,
              wlTime,
              name,
              twitter,
              discord,
              website,
              mintPrice,
              wlMintPrice,
              quantity,
              yes,
              voters,
              imageUrl,
              isRequested,
              chain,
            } = item;
            const findLauren = voters.filter((voter) => {
              return voter.discordId === "778658118854115418";
            });
            const findHotsauce = voters.filter((voter) => {
              return voter.discordId === "449623048505786369";
            });
            return (
              <Link href={`admin/${_id}`}>
                <div
                  key={index}
                  className="overflow-hidden border border-gray-600 rounded-lg grid grid-cols-1 md:grid-cols-3 bg-[#16181C] hover:cursor-pointer hover:opacity-50"
                >
                  <div className="relative h-48 md:h-auto">
                    <div>
                      <ContentfulImage
                        src={imageUrl ?? Logo}
                        layout="fill"
                        objectFit="cover"
                      />
                      <span className="absolute right-4 top-6 rounded-full px-3 py-1.5 bg-gray-100 text-gray-600 font-black text-base">
                        Minting: {yes}
                      </span>
                      {chain.length > 0 && (
                        <div className="absolute bottom-0 w-full px-3 py-1.5 font-black text-base bg-[rgba(0,0,0,.8)] flex justify-center items-center">
                          {chain?.length === 1 && chain[0] === "Solana" ? (
                            <ContentfulImage
                              src={Solana}
                              width={25}
                              height={25}
                            />
                          ) : chain?.length === 1 && chain[0] === "Ethereum" ? (
                            <ContentfulImage
                              src={Ethereum}
                              width={25}
                              height={25}
                            />
                          ) : chain?.length === 2 ? (
                            <>
                              <ContentfulImage
                                src={Solana}
                                width={25}
                                height={25}
                              />
                              <ContentfulImage
                                src={Ethereum}
                                width={25}
                                height={25}
                              />
                            </>
                          ) : null}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-8 sm:col-span-2 relative">
                    <p className="absolute right-4 top-4 text-xs">
                      <DateComponent dateString={item.date} />
                    </p>
                    <div className="flex items-center mb-3">
                      {isRequested && (
                        <div>
                          <div className="group cursor-pointer relative text-center mr-1.5">
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M12 6C12.5523 6 13 6.44772 13 7V13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13V7C11 6.44772 11.4477 6 12 6Z"
                                fill="#fde047"
                              />
                              <path
                                d="M12 16C11.4477 16 11 16.4477 11 17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17C13 16.4477 12.5523 16 12 16Z"
                                fill="#fde047"
                              />
                              <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12Z"
                                fill="#fde047"
                              />
                            </svg>
                            <div className="opacity-0 bg-black text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 top-full px-3 pointer-events-none -left-6 w-48">
                              Cillum mollit anim amet laborum pariatur anim
                              nostrud.
                            </div>
                          </div>
                        </div>
                      )}
                      <h3 className="text-xl font-bold">{name}</h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        className="hover:scale-125 duration-200"
                        href={twitter}
                        target="_blank"
                      >
                        <Twitter fill={"#ffffff"} width={16} />
                      </a>
                      <a
                        className="scale-125 hover:scale-150 duration-200"
                        href={discord}
                        target="_blank"
                      >
                        <Discord fill={"#ffffff"} width={16} />
                      </a>
                      {website && (
                        <a
                          className="scale-125 hover:scale-150 duration-200"
                          href={website}
                          target="_blank"
                        >
                          <Website fill={"#ffffff"} width={16} />
                        </a>
                      )}
                      <div className="ml-2 flex gap-1">
                        <p
                          className={`${
                            findLauren.length !== 0
                              ? "border-green-800 text-green-800 bg-green-100"
                              : "border-red-800 text-red-800 bg-red-100"
                          } inline-block px-2 py-1 text-xs font-normal rounded-full`}
                        >
                          Lauren
                        </p>
                        <p
                          className={`${
                            findHotsauce.length !== 0
                              ? "border-green-800 text-green-800 bg-green-100"
                              : "border-red-800 text-red-800 bg-red-100"
                          } inline-block px-2 py-1 text-xs font-normal rounded-full`}
                        >
                          HoTsAuCe
                        </p>
                      </div>
                    </div>

                    <dl className="mt-4 grid gap-2 lg:gap-4 md:grid-cols-3">
                      <div className="flex flex-col p-2 text-center border border-gray-100 rounded-lg">
                        <dt className="order-last text-xs font-medium text-gray-500">
                          WL Mint Price
                        </dt>

                        <dd className="text-md font-extrabold text-gray-300">
                          {onlyNumbers(wlMintPrice)
                            ? parseFloat(wlMintPrice)
                            : wlMintPrice}
                        </dd>
                      </div>
                      <div className="flex flex-col p-2 text-center border border-gray-100 rounded-lg">
                        <dt className="order-last text-xs font-medium text-gray-500">
                          WL Mint Time
                        </dt>

                        <dd className="text-md font-extrabold text-gray-300">
                          {tConvert(wlTime)}
                        </dd>
                      </div>

                      <div className="justify-center flex flex-col py-2 text-center border border-gray-100 rounded-lg">
                        <dt className="order-last text-xs font-medium text-gray-500">
                          Quantity
                        </dt>

                        <dd className="text-md font-extrabold text-gray-300">
                          {quantity}
                        </dd>
                      </div>

                      <div className="flex flex-col p-2 text-center border border-gray-100 rounded-lg">
                        <dt className="order-last text-xs font-medium text-gray-500">
                          Mint Price
                        </dt>

                        <dd className="text-md font-extrabold text-gray-300">
                          {onlyNumbers(mintPrice)
                            ? parseFloat(mintPrice)
                            : mintPrice}
                        </dd>
                      </div>

                      <div className="flex flex-col p-2 text-center border border-gray-100 rounded-lg">
                        <dt className="order-last text-xs font-medium text-gray-500">
                          Mint Time
                        </dt>

                        <dd className="text-md font-extrabold text-gray-300">
                          {tConvert(time)}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </Layout>
  );
}

export default PollsAdmin;
