import Layout from "../../components/layout";
import { getAllInterviews, getSingleInterview } from "../../lib/api";
import Container from "../../components/container";
import EntryView from "../../components/entry-view";
import YoutubeEmbed from "../../components/youtube-embed";

function InterviewItem({ interview, allInterviews }) {
  const {
    sys,
    title,
    caption,
    chain,
    featuredImage,
    videoLink,
    writeUp,
    author,
  } = interview[0];

  let mediaId;
  let isVideo;

  if (videoLink?.indexOf("youtube.com") !== -1) {
    isVideo = true;
    mediaId = videoLink.split("=").slice(-1)[0];
  } else if (videoLink?.indexOf("audius.co") !== -1) {
    isVideo = false;
    const audiusLink = videoLink.split("/").slice(-1)[0];
    mediaId = audiusLink.split("?")[0];
  }

  const otherInterviews = allInterviews.filter((otherInterview) => {
    return otherInterview.title !== interview[0].title;
  });

  const { firstPublishedAt: date } = sys;

  const content = writeUp.json.content;
  const headings = content.filter((content) => {
    return content.nodeType.includes("heading");
  });

  console.log("MEDIA", mediaId);

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
          otherEntries={otherInterviews}
          route={"interviews"}
        >
          {videoLink && (
            <div>
              {isVideo ? (
                <div className="mt-6 bg-gray-800 p-6 rounded-md">
                  <span className="text-2xl font-bold uppercase">
                    Video Summary
                  </span>
                  <YoutubeEmbed videoId={mediaId} videoLink={videoLink} />
                </div>
              ) : (
                <div className="mt-6 bg-gray-800 p-6 rounded-md">
                  <span className="text-2xl font-bold uppercase">
                    Audio Summary
                  </span>
                  <div className="w-full flex justify-center mt-4 flex-col">
                    <iframe
                      src={`https://audius.co/embed/track/${mediaId}?flavor=compact`}
                      className="w-full"
                    />
                    <span>
                      <a
                        href={videoLink}
                        target="_blank"
                        className="font-light uppercase hover:text-[#8C50EE] duration-200 text-xs"
                      >
                        View Audio &#8594;
                      </a>
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}
        </EntryView>
      </Container>
    </Layout>
  );
}

export default InterviewItem;

export async function getStaticPaths() {
  const allInterviews = (await getAllInterviews()) ?? [];

  const paths = allInterviews.map((interview) => ({
    params: { slug: interview.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const interview = (await getSingleInterview(params.slug)) ?? [];
  const allInterviews = (await getAllInterviews()) ?? [];

  return { props: { interview, allInterviews } };
}
