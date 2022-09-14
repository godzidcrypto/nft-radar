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
          <AddPoll></AddPoll>
          <p>
            {loading ? "LOADING" : "NOT LOADING"} |{" "}
            {/* {isMember.length === 1 ? "NFT Radar Member" : "Not a Member"} */}
            {guildRoles?.includes(voterRole)
              ? "Verified Voter"
              : "Not Eligible to Vote"}
          </p>
          <div className="grid grid-cols-2 gap-4">
            {mintsToday?.map((item, index) => {
              const {
                _id,
                date,
                time,
                wlTime,
                name,
                twitter,
                discord,
                website,
                mintPrice,
                wlMintPrice,
                quantity,
                lauren,
                hotsauce,
                dagzen,
                yes,
                no,
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
                <div key={index}>
                  {/* <div className="flex justify-between">
                  <DateComponent dateString={date} />
                </div> */}
                  <div className="grid grid-rows-3 grid-cols-1 justify-between bg-[#16181C] p-8 rounded-xl relative">
                    <div className="flex items-center justify-between w-full relative">
                      <div className="flex gap-4 text-xs font-extralight absolute top-3 text-gray-400 items-center">
                        <p>
                          <DateComponent dateString={date} />
                        </p>
                        {findVoters.length !== 0 ? (
                          <p className="border-gray-800 text-gray-800 bg-gray-100 border px-2 rounded-full">
                            ✅ Voted
                          </p>
                        ) : null}
                      </div>
                      <div className="flex items-center gap-4">
                        <h3 className="text-3xl font-bold">{name}</h3>
                        <div className="flex items-center">
                          <a
                            className="mx-2 hover:scale-125 duration-200"
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
                      </div>
                      <p className="text-green-300">Minting: {yes}</p>
                      <div>
                        <ContentfulImage
                          src={imageUrl}
                          width={35}
                          height={35}
                        />
                      </div>
                    </div>
                    <dl class="grid gap-4 grid-cols-3">
                      <div class="flex flex-col py-2 text-center border border-gray-100 rounded-lg">
                        <dt class="order-last text-xs font-medium text-gray-500">
                          WL Mint Price
                        </dt>

                        <dd class="text-md font-extrabold text-gray-300">
                          {wlMintPrice}
                        </dd>
                      </div>
                      <div class="flex flex-col py-2 text-center border border-gray-100 rounded-lg">
                        <dt class="order-last text-xs font-medium text-gray-500">
                          WL Mint Time
                        </dt>

                        <dd class="text-md font-extrabold text-gray-300">
                          {wlTime}
                        </dd>
                      </div>

                      <div class="row-span-2 justify-center flex flex-col py-2 text-center border border-gray-100 rounded-lg">
                        <dt class="order-last text-xs font-medium text-gray-500">
                          Quantity
                        </dt>

                        <dd class="text-md font-extrabold text-gray-300">
                          {quantity}
                        </dd>
                      </div>

                      <div class="flex flex-col py-2 text-center border border-gray-100 rounded-lg">
                        <dt class="order-last text-xs font-medium text-gray-500">
                          Mint Price
                        </dt>

                        <dd class="text-md font-extrabold text-gray-300">
                          {mintPrice}
                        </dd>
                      </div>

                      <div class="flex flex-col py-2 text-center border border-gray-100 rounded-lg">
                        <dt class="order-last text-xs font-medium text-gray-500">
                          Mint Time
                        </dt>

                        <dd class="text-md font-extrabold text-gray-300">
                          {time}
                        </dd>
                      </div>
                    </dl>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <p
                          className={`${
                            findLauren.length !== 0
                              ? "border-green-800 text-green-800 bg-green-100"
                              : "border-red-800 text-red-800 bg-red-100"
                          } border px-4 rounded-full`}
                        >
                          Lauren
                        </p>
                        <p
                          className={`${
                            findHotsauce.length !== 0
                              ? "border-green-800 text-green-800 bg-green-100"
                              : "border-red-800 text-red-800 bg-red-100"
                          } border px-4 rounded-full`}
                        >
                          HoTsAuCe
                        </p>
                        {/* <p
                          className={`${
                            dagzen
                              ? "border-green-800 text-green-800 bg-green-100"
                              : "border-red-800 text-red-800 bg-red-100"
                          } border px-4 rounded-full`}
                        >
                          Dagzen
                        </p> */}
                      </div>
                      {guildRoles?.includes(voterRole) && (
                        <div>
                          {findVoters.length === 0 ? (
                            <form onSubmit={handleSubmit}>
                              <input type="hidden" value={_id} />
                              <button
                                disabled={loading ? true : false}
                                className="bg-gray-800 py-4 px-6 rounded-md disabled:opacity-50"
                              >
                                Will Mint
                              </button>
                            </form>
                          ) : (
                            <form onSubmit={handleUnvote}>
                              <input type="hidden" value={_id} />
                              <button
                                disabled={loading ? true : false}
                                className="bg-gray-800 py-4 px-6 rounded-md disabled:opacity-50"
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
