import Layout from "../../components/layout";
import Container from "../../components/container";
import DateComponent from "../../components/date";
import { useSession, signOut } from "next-auth/react";

function Polls({ data }) {
  console.log("DATA", data);
  const { data: session } = useSession();
  const user = session?.user;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mintId = e.target[0].value;
    const projectId = e.target[1].value;
    const yes = e.target[2].checked;
    const no = e.target[3].checked;
    const email = user.email;

    // console.log(id, yes, no, email);
    const newVote = { projectId, yes, no, email };

    const res = await fetch(`http://localhost:4000/api/polls/${mintId}`, {
      method: "PATCH",
      body: JSON.stringify(newVote),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(res);
  };

  return (
    <Layout>
      <Container>
        <div className={`py-12`}>
          {data.map((item, index) => {
            console.log(item);
            const { _id: mint_id, date, mints } = item;
            return (
              <div key={index} className={`pb-8`}>
                <DateComponent dateString={date} />
                <div>
                  {mints.map((mint, index) => {
                    const { _id: project_id, project, yes, no, voters } = mint;
                    console.log("HERE", voters);
                    const test = voters.filter((voter) => {
                      return voter.email === user?.email;
                    });

                    // const hasVoted = voters.indexOf(user?.email);
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
                            {test.length === 0 ? (
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
                              <div>Voted</div>
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

export default Polls;

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:4000/api/polls`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
