import Layout from "../../components/layout";
import Container from "../../components/container";
import Hero from "../../components/hero";
import { useSession } from "next-auth/react";
import useSWR, { SWRConfig } from "swr";
import Twitter from "../../components/twitter";
import Discord from "../../components/discord";
import Website from "../../components/website";
import AddPoll from "../../components/add-poll";
import { useEffect, useState } from "react";
import DateComponent from "../../components/date";
import { getMintPollDate } from "../../lib/api";
import ContentfulImage from "../../components/contentful-image";
import Logo from "../../assets/images/logo.png";

const fetcher = (url) => fetch(url).then((res) => res.json());
const API = `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/polls/`;

function Polls({ selectedDate }) {
  const { data: session } = useSession();
  const user = session?.user;

  const { data: swrData } = useSWR(API, fetcher, {
    refreshInterval: 1000,
  });

  const [loading, setLoading] = useState(false);

  const [userInfo, setUserInfo] = useState("");
  const [guildRoles, setGuildRoles] = useState([]);
  const guildId = "892235360501923850"; // NFT Radar
  const moderatorRole = "892237845828341760"; // NFT Radar
  const voterRole = "916065396916899871"; // NFT Radar

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
    guildRoles.length === 0 ? getGuilds() : console.log("getguilds");
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const id = e.target[0].value;
    const vote = true;
    const discordId = userInfo.id;

    const newVote = { id, vote, discordId };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/polls/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(newVote),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res;
  };

  const handleUnvote = async (e) => {
    e.preventDefault();
    setLoading(true);

    const id = e.target[0].value;
    const vote = false;
    const discordId = userInfo.id;

    const newVote = { id, vote, discordId };

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/polls/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(newVote),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return res;
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

  const onlyNumbers = (str) => {
    return /^[0-9.,]+$/.test(str);
  };

  useEffect(() => {
    setLoading(false);
  }, [swrData]);

  const mintsToday = swrData.filter((data) => {
    return (
      data.date.substring(0, 10) ===
      selectedDate[0].selectedDate.substring(0, 10)
    );
  });

  mintsToday.sort((a, b) => parseFloat(b.yes) - parseFloat(a.yes));

  return (
    <Layout title={"NFT Radar | Daily Mint Polls"}>
      <Container>
        {/* <Hero
          title={"Daily Mint Polls"}
          description={"Dolore nisi anim culpa cillum ullamco cillum."}
        /> */}
        <div className={`py-12`}>
          {guildRoles?.includes(moderatorRole) && <AddPoll />}
          <div className="text-4xl text-center mb-8">
            <p className="font-bold"></p>
            <section className="text-white bg-[#16181C]">
              <div className="py-8 mx-auto max-w-screen-xl lg:items-center lg:flex">
                <div className="max-w-3xl mx-auto text-center">
                  <h1 className="text-3xl font-extrabold text-transparent sm:text-5xl bg-clip-text bg-gradient-to-r from-gray-300 to-purple-600">
                    Mints for{" "}
                    <DateComponent dateString={selectedDate[0].selectedDate} />
                  </h1>

                  <p className="max-w-xl mx-auto mt-4 sm:leading-relaxed sm:text-xl">
                    <p className="text-lg font-medium">Mint Times are in UTC</p>
                    {user && (
                      <p className="text-lg font-extralight">
                        {guildRoles?.includes(voterRole)
                          ? `${user.name}: Verified Voter`
                          : `${user.name}: Not Eligible to Vote`}
                      </p>
                    )}
                  </p>
                </div>
              </div>
            </section>
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            {mintsToday?.map((item, index) => {
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
              } = item;
              const findVoters = voters.filter((voter) => {
                return voter.discordId === userInfo.id;
              });
              const findLauren = voters.filter((voter) => {
                return voter.discordId === "778658118854115418";
              });
              const findHotsauce = voters.filter((voter) => {
                return voter.discordId === "449623048505786369";
              });
              return (
                <div
                  key={index}
                  className="overflow-hidden border border-gray-600 rounded-lg grid grid-cols-1 md:grid-cols-3 bg-[#16181C]"
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
                    </div>
                  </div>

                  <div className="p-8 sm:col-span-2 relative">
                    <div className="flex items-center mb-3">
                      {isRequested && (
                        <div>
                          <div className="group cursor-pointer relative text-center mr-1.5">
                            <svg
                              aria-haspopup="true"
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-info-circle"
                              width={25}
                              height={25}
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="#A0AEC0"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path stroke="none" d="M0 0h24v24H0z" />
                              <circle cx={12} cy={12} r={9} />
                              <line x1={12} y1={8} x2="12.01" y2={8} />
                              <polyline points="11 12 12 12 12 16 13 16" />
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
                    <div className="absolute flex justify-end bottom-0 right-0 text-sm">
                      {guildRoles?.includes(voterRole) && (
                        <div>
                          {findVoters.length === 0 ? (
                            <form onSubmit={handleSubmit}>
                              <input type="hidden" value={_id} />
                              <button
                                disabled={loading ? true : false}
                                className={`${
                                  loading ? "bg-gray-500" : "bg-green-600"
                                } -mr-[2px] -mb-[2px] inline-flex items-center gap-1 rounded-tl-xl rounded-br-xl py-1.5 px-3 text-white`}
                              >
                                Will Mint
                              </button>
                            </form>
                          ) : (
                            <form onSubmit={handleUnvote}>
                              <input type="hidden" value={_id} />
                              <button
                                disabled={loading ? true : false}
                                className={`${
                                  loading ? "bg-gray-500" : "bg-red-500"
                                } -mr-[2px] -mb-[2px] inline-flex items-center gap-1 rounded-tl-xl rounded-br-xl py-1.5 px-3 text-white`}
                              >
                                Will Not Mint
                              </button>
                            </form>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="space-y-4 mt-8">
            <h2 className="text-3xl font-semibold">FAQs</h2>
            <details className="group" open>
              <summary className="flex items-center justify-between p-4 rounded-lg cursor-pointer bg-[#16181C]">
                <h5 className="font-medium">
                  How can I get my project featured in the Daily Mint Polls?
                </h5>

                <svg
                  className="flex-shrink-0 ml-1.5 w-5 h-5 transition duration-300 group-open:-rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>

              <p className="px-4 mt-4 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic
                veritatis molestias culpa in, recusandae laboriosam neque
                aliquid libero nesciunt voluptate dicta quo officiis explicabo
                consequuntur distinctio corporis earum similique!
              </p>
            </details>

            <details className="group">
              <summary className="flex items-center justify-between p-4 rounded-lg cursor-pointer bg-[#16181C]">
                <h5 className="font-medium">
                  How can I become eligible to vote for upcoming mints?
                </h5>

                <svg
                  className="flex-shrink-0 ml-1.5 w-5 h-5 transition duration-300 group-open:-rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </summary>

              <p className="px-4 mt-4 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab hic
                veritatis molestias culpa in, recusandae laboriosam neque
                aliquid libero nesciunt voluptate dicta quo officiis explicabo
                consequuntur distinctio corporis earum similique!
              </p>
            </details>
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export default function PollsPage({ selectedDate, fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Polls selectedDate={selectedDate} />
    </SWRConfig>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/polls`
  );
  const data = (await res.json()) ?? [];
  const selectedDate = (await getMintPollDate()) ?? [];

  // Pass data to the page via props
  return {
    props: {
      selectedDate,
      fallback: {
        [API]: data,
      },
    },
  };
}
