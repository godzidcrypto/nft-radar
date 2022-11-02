import Layout from "../../components/layout";
import { getAllAnalysis, getSingleAnalysis } from "../../lib/api";
import Container from "../../components/container";
import EntryView from "../../components/entry-view";
import YoutubeEmbed from "../../components/youtube-embed";
import { useEffect, useState } from "react";

function AnalysisItem({ analysis, allAnalysis }) {
  const {
    sys,
    title,
    caption,
    chain,
    featuredImage,
    videoLink,
    linksToData,
    writeUp,
    author,
  } = analysis[0];

  const [dataLinks, setDataLinks] = useState([]);

  const videoId = videoLink?.split("=").slice(-1)[0];

  const otherAnalysis = allAnalysis.filter((analysisObject) => {
    return analysisObject.title !== analysis[0].title;
  });

  const { firstPublishedAt: date } = sys;

  const content = writeUp.json.content;
  const headings = content.filter((content) => {
    return content.nodeType.includes("heading");
  });

  const fetchLinksMeta = async (url) => {
    const res = await fetch(`https://jsonlink.io/api/extract?url=${url}`).then(
      (res) => res.json()
    );

    setDataLinks((dataLinks) => [...dataLinks, res]);
  };

  useEffect(() => {
    linksToData?.map((link) => {
      fetchLinksMeta(link);
    });
  }, [linksToData]);

  const LinkCard = ({ title, description, images, url }) => {
    console.log("HERE", title, description, images, url);
    return (
      <div>
        <a
          className="grid grid-cols-1 overflow-hidden border border-gray-100 rounded-lg group sm:grid-cols-3"
          href={url}
          target="_blank"
        >
          <div className="relative h-24 md:h-auto">
            <img
              alt="Climber"
              src={images[0]}
              className="absolute inset-0 object-cover w-full h-full"
            />
          </div>
          <div className="p-4 lg:p-8 sm:col-span-2">
            <h5 className="mt-4 font-bold">{title}</h5>
            <p className="mt-2 text-sm text-gray-500 truncate">{description}</p>
          </div>
        </a>
      </div>
    );
  };

  return (
    <Layout title={title}>
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
          otherEntries={otherAnalysis}
          route={"analysis"}
        >
          {videoLink && (
            <div className="mt-6 bg-gray-800 p-6 rounded-md">
              <span className="text-2xl font-bold uppercase">
                Video Summary
              </span>
              <YoutubeEmbed videoId={videoId} videoLink={videoLink} />
            </div>
          )}
          {linksToData && (
            <div className="mt-6 bg-gray-800 p-6 rounded-md">
              <span className="text-2xl font-bold uppercase">
                Link/s to Data
              </span>
              {linksToData?.length === dataLinks?.length && (
                <div className="mt-4 grid gap-4">
                  {dataLinks?.map((data, index) => {
                    const { title, description, images, url } = data;
                    return (
                      <LinkCard
                        key={index}
                        title={title}
                        description={description}
                        images={images}
                        url={url}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </EntryView>
      </Container>
    </Layout>
  );
}

export default AnalysisItem;

export async function getStaticPaths() {
  const allAnalysis = (await getAllAnalysis()) ?? [];

  const paths = allAnalysis.map((analysis) => ({
    params: { slug: analysis.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const analysis = (await getSingleAnalysis(params.slug)) ?? [];
  const allAnalysis = (await getAllAnalysis()) ?? [];

  return { props: { analysis, allAnalysis } };
}
