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

const fetcher = (url) => fetch(url).then((res) => res.json());
const API = `/api/polls`;

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

      // const member = guildRes?.filter((guild) => {
      //   return guild.name === "Degen Fat Cats & Coin Flip";
      // });

      // setIsMember(member);
      // setGuilds(guildRes);
      setUserInfo(userRes);
      setGuildRoles(guildRolesRes.roles);
    }
  };

  useEffect(() => {
    getGuilds();
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const id = e.target[0].value;
    const vote = true;
    const discordId = userInfo.id;

    const newVote = { id, vote, discordId };

    const res = await fetch(`/api/polls/${id}`, {
      method: "PATCH",
      body: JSON.stringify(newVote),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  };

  const handleUnvote = async (e) => {
    e.preventDefault();
    setLoading(true);

    const id = e.target[0].value;
    const vote = false;
    const discordId = userInfo.id;

    const newVote = { id, vote, discordId };

    const res = await fetch(`/api/polls/${id}`, {
      method: "PATCH",
      body: JSON.stringify(newVote),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  };

  useEffect(() => {
    setLoading(false);
  }, [swrData]);

  // let today = new Date().toISOString();

  const mintsToday = swrData.filter((data) => {
    return (
      data.date.substring(0, 10) ===
      selectedDate[0].selectedDate.substring(0, 10)
    );
  });

  mintsToday.sort((a, b) => parseFloat(b.yes) - parseFloat(a.yes));

  // filter swrdata to only show mints for today
  // const admins = ["nozid16@gmail.com"];

  return (
    <Layout title={"NFT Radar | Daily Mint Polls"}>
      <Container>
        <Hero
          title={"Daily Mint Polls"}
          description={"Dolore nisi anim culpa cillum ullamco cillum."}
        />
        <div className={`py-12`}>
          {guildRoles?.includes(moderatorRole) && <AddPoll />}
          <div className="text-4xl text-center mb-8">
            <p className="text-lg font-extralight">
              {guildRoles?.includes(voterRole)
                ? "Verified Voter"
                : "Not Eligible to Vote"}
            </p>
            <p className="font-bold">
              Mints for{" "}
              <DateComponent dateString={selectedDate[0].selectedDate} />
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
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
                  className="overflow-hidden border border-gray-600 rounded-lg grid grid-cols-1 group sm:grid-cols-3 bg-[#16181C]"
                >
                  <div className="relative">
                    <div>
                      <ContentfulImage
                        src={imageUrl}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </div>

                  <div className="p-8 sm:col-span-2 relative">
                    <span className="absolute right-4 top-6 rounded-full px-3 py-1.5 bg-green-100 text-green-600 font-medium text-xs">
                      Minting: {yes}
                    </span>

                    <div className="flex items-center">
                      <a
                        className="mr-2 hover:scale-125 duration-200"
                        href={twitter}
                        target="_blank"
                      >
                        <Twitter fill={"#ffffff"} width={16} />
                      </a>
                      <a
                        className="mx-2 scale-125 hover:scale-150 duration-200"
                        href={discord}
                        target="_blank"
                      >
                        <Discord fill={"#ffffff"} width={16} />
                      </a>
                      <a
                        className="mx-2 scale-125 hover:scale-150 duration-200"
                        href={website}
                        target="_blank"
                      >
                        <Website fill={"#ffffff"} width={16} />
                      </a>
                    </div>

                    <h3 className="mt-3 text-xl font-bold">{name}</h3>

                    <dl className="mt-4 grid gap-4 grid-cols-3">
                      <div className="flex flex-col py-2 text-center border border-gray-100 rounded-lg">
                        <dt className="order-last text-xs font-medium text-gray-500">
                          WL Mint Price
                        </dt>

                        <dd className="text-md font-extrabold text-gray-300">
                          {wlMintPrice}
                        </dd>
                      </div>
                      <div className="flex flex-col py-2 text-center border border-gray-100 rounded-lg">
                        <dt className="order-last text-xs font-medium text-gray-500">
                          WL Mint Time
                        </dt>

                        <dd className="text-md font-extrabold text-gray-300">
                          {wlTime}
                        </dd>
                      </div>

                      <div className="row-span-2 justify-center flex flex-col py-2 text-center border border-gray-100 rounded-lg">
                        <dt className="order-last text-xs font-medium text-gray-500">
                          Quantity
                        </dt>

                        <dd className="text-md font-extrabold text-gray-300">
                          {quantity}
                        </dd>
                      </div>

                      <div className="flex flex-col py-2 text-center border border-gray-100 rounded-lg">
                        <dt className="order-last text-xs font-medium text-gray-500">
                          Mint Price
                        </dt>

                        <dd className="text-md font-extrabold text-gray-300">
                          {mintPrice}
                        </dd>
                      </div>

                      <div className="flex flex-col py-2 text-center border border-gray-100 rounded-lg">
                        <dt className="order-last text-xs font-medium text-gray-500">
                          Mint Time
                        </dt>

                        <dd className="text-md font-extrabold text-gray-300">
                          {time}
                        </dd>
                      </div>
                    </dl>
                    <div className="mt-4 flex gap-1">
                      <p
                        className={`${
                          findLauren.length !== 0
                            ? "border-green-800 text-green-800 bg-green-100"
                            : "border-red-800 text-red-800 bg-red-100"
                        } inline-block px-3 py-1 text-xs font-semibold rounded-full`}
                      >
                        Lauren
                      </p>
                      <p
                        className={`${
                          findHotsauce.length !== 0
                            ? "border-green-800 text-green-800 bg-green-100"
                            : "border-red-800 text-red-800 bg-red-100"
                        } inline-block px-3 py-1 text-xs font-semibold rounded-full`}
                      >
                        HoTsAuCe
                      </p>
                    </div>
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
  const res = await fetch(`${process.env.BACKEND_SERVER}/api/polls`);
  const data = await res.json();
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
