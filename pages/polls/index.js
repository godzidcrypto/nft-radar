import Layout from "../../components/layout";
import Container from "../../components/container";
import DateComponent from "../../components/date";

function Polls({ data }) {
  console.log("DATA", data);
  return (
    <Layout>
      <Container>
        <div className={`py-12`}>
          {data.map((item, index) => {
            console.log(item);
            const { date, mints } = item;
            return (
              <div key={index} className={`pb-8`}>
                <DateComponent dateString={date} />
                <div>
                  {mints.map((mint, index) => {
                    const { project, yes, no } = mint;
                    return (
                      <div
                        key={index}
                        className="flex justify-between bg-[#16181C] p-8 rounded-xl my-4"
                      >
                        <p>{project}</p>
                        <div className="flex w-24 justify-between">
                          <p className="text-green-300">{yes}</p>
                          <p className="text-red-400">{no}</p>
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
