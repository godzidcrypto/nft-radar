import Layout from "../../components/layout";
import Container from "../../components/container";
import { useSession } from "next-auth/react";
import useSWR, { SWRConfig } from "swr";
import Twitter from "../../components/twitter";
import Discord from "../../components/discord";
import AddPoll from "../../components/add-poll";
import { useEffect, useState } from "react";

const fetcher = (url) => fetch(url).then((res) => res.json());
const API = `/api/polls`;

function Polls() {
  const { data: session } = useSession();
  const user = session?.user;

  const { data: swrData } = useSWR(API, fetcher, {
    refreshInterval: 1000,
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const id = e.target[0].value;
    const vote = true;
    const email = user.email;

    const newVote = { id, vote, email };

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
    const email = user.email;

    const newVote = { id, vote, email };

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

  // filter swrdata to only show mints for today

  return (
    <Layout>
      <Container>
        <div className={`py-12`}>
          <AddPoll />
          <p>{loading ? "LOADING" : "NOT LOADING"}</p>
          {swrData?.map((item, index) => {
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
              mints, // delete this
            } = item;
            const findVoters = voters.filter((voter) => {
              return voter.email === user?.email;
            });
            return (
              <div key={index}>
                {/* <div className="flex justify-between">
                  <DateComponent dateString={date} />
                </div> */}
                <div className="flex justify-between bg-[#16181C] p-8 rounded-xl my-4 relative">
                  <div className="flex items-center">
                    <h3>{name}</h3>
                    <a
                      className="mx-2 hover:scale-125 duration-200"
                      href={twitter}
                      target="_blank"
                    >
                      <Twitter fill={"#ffffff"} width={12} />
                    </a>
                    <a
                      className="mx-2 scale-125 hover:scale-150 duration-200"
                      href={discord}
                      target="_blank"
                    >
                      <Discord fill={"#ffffff"} width={12} />
                    </a>
                  </div>
                  <div className="flex w-24 justify-between">
                    <p className="text-green-300">{yes}</p>
                    <div className="absolute left-1/2 bottom-4">
                      {findVoters.length === 0 ? (
                        <form
                          onSubmit={handleSubmit}
                          className="grid grid-cols-3 items-center"
                        >
                          <input type="hidden" value={_id} />
                          {/* <input type="hidden" value={project_id} /> */}
                          {/* also add hidden input to get user id to disable votes in the future */}
                          <button
                            disabled={loading ? true : false}
                            className="bg-gray-800 py-4 px-6 rounded-md"
                          >
                            Will Mint
                          </button>
                        </form>
                      ) : (
                        <form onSubmit={handleUnvote}>
                          <input type="hidden" value={_id} />
                          <button
                            disabled={loading ? true : false}
                            className="bg-gray-800 py-4 px-6 rounded-md"
                          >
                            Will Not Mint
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  {mints?.map((mint, index) => {
                    const { _id: project_id, project, yes, no, voters } = mint;
                    const findVoters = voters.filter((voter) => {
                      return voter.email === user?.email;
                    });
                    return (
                      <div
                        key={index}
                        className="flex justify-between bg-[#16181C] p-8 rounded-xl my-4 relative"
                      >
                        <p>{project}</p>
                        <div className="flex w-24 justify-between">
                          <p className="text-green-300">{yes}</p>
                          <p className="text-red-400">{no}</p>
                          <div className="absolute left-1/2 bottom-4">
                            {findVoters.length === 0 ? (
                              <form
                                onSubmit={handleSubmit}
                                className="grid grid-cols-3 items-center"
                              >
                                <input type="hidden" value={mint_id} />
                                <input type="hidden" value={project_id} />
                                {/* also add hidden input to get user id to disable votes in the future */}

                                <div>
                                  <label>Yes</label>
                                  <input type="radio" name="vote" value="yes" />
                                </div>
                                <div>
                                  <label>No</label>
                                  <input type="radio" name="vote" value="no" />
                                </div>
                                <button className="bg-gray-800 py-4 px-2 rounded-md">
                                  Submit Vote
                                </button>
                              </form>
                            ) : (
                              <div>
                                Voted{" "}
                                <span
                                  className={`text-xs font-extralight ${
                                    findVoters[0].vote === "Yes"
                                      ? "text-green-300"
                                      : "text-red-400"
                                  }`}
                                >
                                  ({findVoters[0].vote})
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Layout>
  );
}

export default function PollsPage({ fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Polls />
    </SWRConfig>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`${process.env.BACKEND_SERVER}/api/polls`);
  const data = await res.json();

  // Pass data to the page via props
  return {
    props: {
      fallback: {
        [API]: data,
      },
    },
  };
}
