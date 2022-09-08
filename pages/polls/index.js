import Layout from "../../components/layout";
import Container from "../../components/container";
import DateComponent from "../../components/date";
import { useSession } from "next-auth/react";
import useSWR, { SWRConfig } from "swr";
import { useState } from "react";

const fetcher = (url) => fetch(url).then((res) => res.json());
const API = "http://localhost:4000/api/polls";

function Polls({}) {
  const { data: session } = useSession();
  const user = session?.user;

  const { data: swrData } = useSWR(API, fetcher, {
    refreshInterval: 1000,
  });

  const [pollMints, setPollMints] = useState([]);
  const [pollDate, setPollDate] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mintId = e.target[0].value;
    const projectId = e.target[1].value;
    const yes = e.target[2].checked;
    const no = e.target[3].checked;
    const email = user.email;

    const newVote = { projectId, yes, no, email };

    const res = await fetch(`http://localhost:4000/api/polls/${mintId}`, {
      method: "PATCH",
      body: JSON.stringify(newVote),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  };

  const handleSubmitPoll = async (e) => {
    e.preventDefault();
    console.log(pollMints, pollDate);

    const mints = pollMints.map((mint) => {
      return { project: mint, yes: 0, no: 0 };
    });

    console.log(mints);
    const date = pollDate;

    const newPoll = {
      date,
      mints,
    };

    console.log(newPoll);

    const res = await fetch(`http://localhost:4000/api/polls`, {
      method: "POST",
      body: JSON.stringify(newPoll),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  };

  return (
    <Layout>
      <Container>
        <div className={`py-12`}>
          <div className="px-4 py-16 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
            <div className="max-w-lg mx-auto">
              <form
                onSubmit={handleSubmitPoll}
                className="p-8 mt-6 mb-0 rounded-lg shadow-2xl space-y-4 text-gray-500"
              >
                <div>
                  <label for="email" className="text-sm font-medium">
                    Mint Date of Project(s)
                  </label>
                  <div className="relative mt-1">
                    <input
                      type="date"
                      onChange={(e) => setPollDate(e.target.value)}
                      // value={poll}
                      className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label for="password" className="text-sm font-medium">
                    Project Name(s) -- separate with commas
                  </label>
                  <div className="relative mt-1">
                    <input
                      type="text"
                      onChange={(e) => setPollMints(e.target.value.split(", "))}
                      // value={amount}
                      className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                      placeholder="Enter Project Name"
                    />
                  </div>
                </div>

                <button className="block w-full px-5 py-3 text-sm font-medium text-white bg-[#8C50EE] rounded-lg">
                  Submit
                </button>
              </form>
            </div>
          </div>
          {swrData?.map((item, index) => {
            const { _id: mint_id, date, mints } = item;
            return (
              <div key={index} className={`pb-8`}>
                <div className="flex justify-between">
                  <DateComponent dateString={date} />
                  <div className="hover:cursor-pointer">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
                        fill="currentColor"
                      />
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M13 7C13 6.44772 12.5523 6 12 6C11.4477 6 11 6.44772 11 7V11H7C6.44772 11 6 11.4477 6 12C6 12.5523 6.44772 13 7 13H11V17C11 17.5523 11.4477 18 12 18C12.5523 18 13 17.5523 13 17V13H17C17.5523 13 18 12.5523 18 12C18 11.4477 17.5523 11 17 11H13V7Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  {mints.map((mint, index) => {
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
  const swrData = await fetcher(API);

  // Pass data to the page via props
  return {
    props: {
      fallback: {
        [API]: swrData,
      },
    },
  };
}
