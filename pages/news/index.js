import Layout from "../../components/layout";
import { getAllCryptoNews } from "../../lib/api";
import News from "../../assets/images/news.svg";
import Hero from "../../components/hero";
import EntriesList from "../../components/entries-list";
import Container from "../../components/container";
import Link from "next/link";

function NewsCollection({ allCryptoNews }) {
  return (
    <Layout title={"NFT Radar | Crypto News"}>
      <Container>
        <Hero
          title={"NFT/Crypto News"}
          description={
            "For all the latest information on important things happening in the space"
          }
          svg={News}
        />
        <div className="grid grid-cols-3 text-center gap-2 sm:gap-4">
          <Link href={"/opinions"}>
            <a className="bg-gray-800 rounded-xl text-sm sm:text-base py-2 sm:p-4 sm:font-bold hover:underline opacity-80 hover:opacity-100">
              Opinions
            </a>
          </Link>
          <Link href={"/analysis"}>
            <a className="bg-gray-800 rounded-xl text-sm sm:text-base py-2 sm:p-4 sm:font-bold hover:underline opacity-80 hover:opacity-100">
              Analysis
            </a>
          </Link>
          <Link href={"/interviews"}>
            <a className="bg-gray-800 rounded-xl text-sm sm:text-base py-2 sm:p-4 sm:font-bold hover:underline opacity-80 hover:opacity-100">
              Interviews
            </a>
          </Link>
        </div>
        <div>
          {/* <div className="px-24 py-12 bg-red-600">Hello</div> */}
          <EntriesList
            featured={allCryptoNews[0]}
            entries={allCryptoNews.slice(1)}
            route={"news"}
          />
        </div>
      </Container>
    </Layout>
  );
}

export default NewsCollection;

export async function getStaticProps() {
  const allCryptoNews = (await getAllCryptoNews()) ?? [];
  return {
    props: { allCryptoNews },
  };
}
