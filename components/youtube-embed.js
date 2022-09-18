import YouTube from "react-youtube";

function YoutubeEmbed({ videoId, videoLink }) {
  return (
    <>
      <div className="w-full flex justify-center mt-4 flex-col">
        <YouTube videoId={videoId} opts={{ width: "100%" }} />
        <span className="mt-4">
          <a
            href={videoLink}
            target="_blank"
            className="font-light uppercase hover:text-[#8C50EE] duration-200 text-xs"
          >
            View Video &#8594;
          </a>
        </span>
      </div>
    </>
  );
}

export default YoutubeEmbed;
