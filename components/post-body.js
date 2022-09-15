import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import markdownStyles from "./markdown-styles.module.css";
import RichTextAsset from "./rich-text-asset";
import convertToSlug from "../lib/convertToSlug";
import TweetEmbed from "react-tweet-embed";
import YouTube from "react-youtube";

const customMarkdownOptions = (content) => ({
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => (
      <div className="w-full flex justify-center">
        <RichTextAsset
          id={node.data.target.sys.id}
          assets={content.links?.assets?.block}
        />
      </div>
    ),
    [INLINES.HYPERLINK]: (node) => {
      if (node.data.uri.indexOf("status") !== -1) {
        const tweetId = node.data.uri.split("/").slice(-1)[0];
        return (
          <div className="w-3/4 mx-auto">
            <TweetEmbed tweetId={tweetId} options={{ theme: "dark" }} />
          </div>
        );
      } else if (node.data.uri.indexOf("watch") !== -1) {
        const youtubeId = node.data.uri.split("=").slice(-1)[0];
        return (
          <div className="w-full flex justify-center">
            <YouTube videoId={youtubeId} />
          </div>
        );
      } else if (node.data.uri.indexOf("track") !== -1) {
        return (
          <iframe
            src="https://audius.co/embed/track/O6agV?flavor=compact"
            className="w-full"
          />
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
        <h2 className={`relative`}>
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
        <h3 className={`relative`}>
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
        <h4 className={`relative`}>
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
        <h5 className={`relative`}>
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
        <h6 className={`relative`}>
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
    <div className="text-justify">
      <div className={markdownStyles["markdown"]}>
        {documentToReactComponents(
          content.json,
          customMarkdownOptions(content)
        )}
      </div>
    </div>
  );
}
