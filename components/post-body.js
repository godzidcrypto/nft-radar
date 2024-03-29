import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import markdownStyles from "./markdown-styles.module.css";
import RichTextAsset from "./rich-text-asset";
import convertToSlug from "../lib/convertToSlug";
import TweetEmbed from "react-tweet-embed";
import YoutubeEmbed from "./youtube-embed";

const customMarkdownOptions = (content) => ({
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => (
      <section
        className="w-full flex justify-center relative"
        style={{ height: "360px" }}
      >
        <RichTextAsset
          id={node.data.target.sys.id}
          assets={content.links?.assets?.block}
        />
      </section>
    ),
    [INLINES.HYPERLINK]: (node) => {
      if (node.data.uri.indexOf("/status/") !== -1) {
        console.log(node.data.uri);
        // Tweets
        const tweetId = node.data.uri.split("/").slice(-1)[0];
        return (
          <div className="w-full lg:w-3/4 mx-auto overflow-hidden">
            <TweetEmbed tweetId={tweetId} options={{ theme: "dark" }} />
            <span>
              <a
                href={node.data.uri}
                target="_blank"
                className="font-light uppercase hover:text-[#8C50EE] duration-200 text-xs"
              >
                View Tweet &#8594;
              </a>
            </span>
          </div>
        );
      } else if (node.data.uri.indexOf("/watch?") !== -1) {
        console.log(node.data.uri);
        // YouTube Links
        const youtubeId = node.data.uri.split("=").slice(-1)[0];
        return (
          <div className="w-full flex justify-center">
            <YoutubeEmbed videoId={youtubeId} videoLink={node.data.uri} />
          </div>
        );
      } else if (node.data.uri.indexOf("/track/") !== -1) {
        console.log(node.data.uri);
        // Audius Links
        const audiusLink = node.data.uri.split("/").slice(-1)[0];
        const audiusEmbed = audiusLink.split("?")[0];
        return (
          <div>
            <iframe
              src={`https://audius.co/embed/track/${audiusEmbed}?flavor=compact`}
              className="w-full"
            />
            <span>
              <a
                href={node.data.uri}
                target="_blank"
                className="font-light uppercase hover:text-[#8C50EE] duration-200 text-xs"
              >
                View Audio &#8594;
              </a>
            </span>
          </div>
        );
      } else {
        return (
          <a
            href={node.data.uri}
            target="_blank"
            className="text-[#60a5fa] underline hover:text-[#93c5fd]"
          >
            {node.content[0].value}
          </a>
        );
      }
    },
    [BLOCKS.HEADING_2]: (node) => {
      const text = node.content[0].value;
      return (
        <h2 className={`relative font-bold text-[#D8D8D9]`}>
          <span
            id={convertToSlug(text)}
            className={`top-[-100px] absolute`}
          ></span>
          {text}
        </h2>
      );
    },
    [BLOCKS.HEADING_3]: (node) => {
      const text = node.content[0].value;
      return (
        <h3 className={`relative font-bold text-[#D8D8D9]`}>
          <span
            id={convertToSlug(text)}
            className={`top-[-100px] absolute`}
          ></span>
          {text}
        </h3>
      );
    },
    [BLOCKS.HEADING_4]: (node) => {
      const text = node.content[0].value;
      return (
        <h4 className={`relative font-bold text-[#D8D8D9]`}>
          <span
            id={convertToSlug(text)}
            className={`top-[-100px] absolute`}
          ></span>
          {text}
        </h4>
      );
    },
    [BLOCKS.HEADING_5]: (node) => {
      const text = node.content[0].value;
      return (
        <h5 className={`relative font-bold text-[#D8D8D9]`}>
          <span
            id={convertToSlug(text)}
            className={`top-[-100px] absolute`}
          ></span>
          {text}
        </h5>
      );
    },
    [BLOCKS.HEADING_6]: (node) => {
      const text = node.content[0].value;
      return (
        <h6 className={`relative font-bold text-[#D8D8D9]`}>
          <span
            id={convertToSlug(text)}
            className={`top-[-100px] absolute`}
          ></span>
          {text}
        </h6>
      );
    },
  },
});

export default function PostBody({ content }) {
  return (
    <div className="text-[#C4C4C6]">
      <div className={markdownStyles["markdown"]}>
        {documentToReactComponents(
          content.json,
          customMarkdownOptions(content)
        )}
      </div>
    </div>
  );
}
