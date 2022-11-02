import Layout from "../../components/layout";
import { getAllArtistFeatures, getSingleArtistFeature } from "../../lib/api";
import Container from "../../components/container";
import EntryView from "../../components/entry-view";
import Twitter from "../../components/twitter";
import Website from "../../components/website";

function ArtistFeatureItem({ artistFeature, allAristFeatures }) {
  const {
    sys,
    title,
    caption,
    chain,
    featuredImage,
    writeUp,
    author,
    artistName,
    artistTwitter,
    artistWebsite,
    artistMarketplaceSite,
    artStyle,
    previousWorks,
  } = artistFeature[0];

  const otherArtistFeatures = allAristFeatures.filter((otherArtistFeature) => {
    return otherArtistFeature.title !== artistFeature[0].title;
  });

  const { firstPublishedAt: date } = sys;

  const content = writeUp.json.content;
  const headings = content.filter((content) => {
    return content.nodeType.includes("heading");
  });

  return (
    <Layout title={title} description={caption} image={featuredImage}>
      <Container>
        <EntryView
          title={title}
          caption={caption}
          featuredImage={featuredImage}
          author={author}
          chain={chain}
          writeUp={writeUp}
          date={date}
          headings={headings}
          otherEntries={otherArtistFeatures}
          route={"artists"}
        >
          <div className="mt-6 bg-gray-800 p-6 rounded-md relative">
            {artStyle && (
              <span className="absolute right-4 top-6 rounded-full px-3 py-1.5 bg-gray-100 text-gray-600 font-medium text-xs">
                {artStyle}
              </span>
            )}
            <div className="flex md:items-center gap-4 flex-col-reverse md:flex-row">
              <h2 className="text-2xl font-bold uppercase">{artistName}</h2>
              <div>
                <div className="flex items-center">
                  <a
                    className="mr-2 hover:scale-125 duration-200"
                    href={artistTwitter}
                    target="_blank"
                  >
                    <Twitter fill={"#ffffff"} width={16} />
                  </a>
                  {artistWebsite && (
                    <a
                      className="mx-2 scale-125 hover:scale-150 duration-200"
                      href={artistWebsite}
                      target="_blank"
                    >
                      <Website fill={"#ffffff"} width={16} />
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div
              // className={`grid ${
              //   artistMarketplaceSite && previousWorks
              //     ? "lg:grid-cols-2"
              //     : "grid-cols-1"
              // } mt-4 gap-4`}
              className={`grid mt-4 gap-4`}
            >
              {artistMarketplaceSite && (
                <a
                  className="relative block p-4 border border-gray-100 shadow-xl rounded-xl hover:scale-105 duration-200"
                  href={artistMarketplaceSite}
                  target="_blank"
                >
                  <div className="text-gray-500 sm:pr-8">
                    <svg
                      className="w-8 h-8 sm:w-10 sm:h-10"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M5.79166 2H1V4H4.2184L6.9872 16.6776H7V17H20V16.7519L22.1932 7.09095L22.5308 6H6.6552L6.08485 3.38852L5.79166 2ZM19.9869 8H7.092L8.62081 15H18.3978L19.9869 8Z"
                        fill="currentColor"
                      />
                      <path
                        d="M10 22C11.1046 22 12 21.1046 12 20C12 18.8954 11.1046 18 10 18C8.89543 18 8 18.8954 8 20C8 21.1046 8.89543 22 10 22Z"
                        fill="currentColor"
                      />
                      <path
                        d="M19 20C19 21.1046 18.1046 22 17 22C15.8954 22 15 21.1046 15 20C15 18.8954 15.8954 18 17 18C18.1046 18 19 18.8954 19 20Z"
                        fill="currentColor"
                      />
                    </svg>

                    <h3 className="mt-4 text-xl font-bold">Marketplace</h3>
                  </div>
                </a>
              )}
              {/* {previousWorks && (
                <a
                  className="relative block p-4 border border-gray-100 shadow-xl rounded-xl hover:scale-105 duration-200"
                  href={previousWorks}
                  target="_blank"
                >
                  <div className="text-gray-500 sm:pr-8">
                    <svg
                      className="w-8 h-8 sm:w-10 sm:h-10"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M9 14H4V4H14V9H19V19H9V14ZM6 6H12V12H6V6Z"
                        fill="currentColor"
                      />
                    </svg>

                    <h3 className="mt-4 text-xl font-bold">Previous Works</h3>
                  </div>
                </a>
              )} */}
            </div>
          </div>
        </EntryView>
      </Container>
    </Layout>
  );
}

export default ArtistFeatureItem;

export async function getStaticPaths() {
  const allAristFeatures = (await getAllArtistFeatures()) ?? [];

  const paths = allAristFeatures.map((artistFeature) => ({
    params: { slug: artistFeature.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const artistFeature = (await getSingleArtistFeature(params.slug)) ?? [];
  const allAristFeatures = (await getAllArtistFeatures()) ?? [];

  return { props: { artistFeature, allAristFeatures } };
}
