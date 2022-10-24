import Layout from "../components/layout";
import Container from "../components/container";
import Hero from "../components/hero";
import { HOME_OG_IMAGE_URL } from "../lib/constants";
import ContentfulImage from "../components/contentful-image";
import { getFounderImages } from "../lib/api";
import Twitter from "../components/twitter";
import Discord from "../components/discord";

function About({ founderImages }) {
  let laurenImg;
  let hotsauceImg;

  founderImages.map((founder) => {
    if (founder.name === "Lauren") {
      laurenImg = founder.picture.url;
    } else if (founder.name === "HoTsAuCe") {
      hotsauceImg = founder.picture.url;
    }
  });

  return (
    <Layout>
      <Container>
        <Hero title={"About Us"} reverse={true} />
        <div className="py-12">
          <div className="relative h-80">
            <ContentfulImage
              src={HOME_OG_IMAGE_URL}
              layout="fill"
              objectFit="cover"
              className="rounded-2xl"
            />
          </div>
          <div className="mx-auto max-w-6xl text-left grid gap-8 p-8 bg-gray-800 rounded-2xl -mt-16 relative z-20">
            <h2 className="font-bold text-2xl">Who is Radar?</h2>
            <p>
              Really, Radar is all of us. Starting in September of 2021, Radar
              opened its doors as a safe haven for all members of the NFT
              community. Whether you're brand new to NFTs or a seasoned veteran,
              there is a place for you here. We're a place to learn, a place to
              meet like-minded people, a place to get all the information you
              need to navigate the fast-paced space that is NFTs. We're a public
              community that provides value because we see the potential in NFTs
              and in the communities they foster.
            </p>
            <p>
              What's changed since we started? We're still that same community
              and provide value for all, for free. In February of 2022, we
              launched our own NFT collection that grants holder benefits like
              giveaways, whitelist spots, and presale opportunities - all of
              this is a bonus to what we offer for free to the general public.
              Some of the brightest minds and project founders in the space have
              been in our community from the start.
            </p>
            <p>
              Our goal is to help onboard new people into NFTs, and provide them
              with a safe space to learn and ask questions along the way. We
              provide as much information and insight as possible and do
              everything we can to help people and projects succeed. Whether
              it's hosting AMAs to ask project founders in-depth questions, or
              advising projects behind the scenes for FREE to help them with
              strategy, we've done everything in our power to help as many as we
              could. We've been doing this for over a year now, and we don't
              plan on stopping anytime soon.
            </p>
            <p>Radar is home. Radar is family.</p>
          </div>
          <div className="mx-auto max-w-6xl my-8 grid md:grid-cols-2 gap-8">
            {/* <h2 className="font-bold text-2xl"x>Founders</h2> */}
            <div className="grid justify-center text-center bg-gray-800 rounded-2xl p-8">
              <div className="relative">
                <ContentfulImage
                  src={laurenImg}
                  width={250}
                  height={250}
                  className="rounded-full"
                />
              </div>
              <div className="text-left mt-4">
                <div className="flex items-center gap-4 mb-2">
                  <span className="font-bold text-xl">Lauren</span>
                  <a href="https://twitter.com/solnftradar" target="_blank">
                    <Twitter fill={"#ffffff"} width={20} />
                  </a>
                  <div className="group cursor-pointer relative text-center mr-1.5">
                    <Discord fill={"#ffffff"} width={20} />
                    <div className="opacity-0 bg-black text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full px-3 pointer-events-none -right-6 w-48">
                      Discord Username: pearlberry#3405
                    </div>
                  </div>
                </div>
                <p className="font-extralight">
                  NFT Radar Founder & Mom. Dove into the endless ocean of NFTs
                  in 2021 and discovered another world. With a background in
                  tech and software development, Lauren is excited about the
                  technical use-cases of NFTs and sees huge potential for their
                  future beyond just PFPs. Community builder, servant leader,
                  strong believer in rising tides lifting all boats - be a mover
                  of the tide, not just a passenger on a ship. Survived the
                  Solana NFT bull run of 2021-2022, stayed here to build with
                  NFTs and smart people.
                </p>
              </div>
            </div>
            <div className="grid justify-center text-center bg-gray-800 rounded-2xl p-8">
              <div className="relative">
                <ContentfulImage
                  src={hotsauceImg}
                  width={250}
                  height={250}
                  className="rounded-full"
                />
              </div>
              <div className="text-left mt-4">
                <div className="flex items-center gap-4 mb-2">
                  <span className="font-bold text-xl">HoTsAuCe</span>
                  <a href="https://twitter.com/SOL_HoTsAuCe" target="_blank">
                    <Twitter fill={"#ffffff"} width={20} />
                  </a>
                  <div className="group cursor-pointer relative text-center mr-1.5">
                    <Discord fill={"#ffffff"} width={20} />
                    <div className="opacity-0 bg-black text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 bottom-full px-3 pointer-events-none -right-6 w-48">
                      Discord Username: HoTsAuCe#7292
                    </div>
                  </div>
                </div>
                <p className="font-extralight">
                  Operations & Community Manager for Radar. Started with NFTs in
                  September of 2021. With 10+ years of Operations Management
                  experience, he helps find ways for projects to operate
                  efficiently and effectively. Pioneer of the daily mint poll.
                  Whitepaper fiend. Not afraid to tell you exactly how it is.
                  Wants to do everything he can to help ensure the longevity of
                  NFTs and help as many people as possible along the way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export default About;

export async function getServerSideProps() {
  const founderImages = (await getFounderImages()) ?? [];

  return {
    props: {
      founderImages,
    },
  };
}
