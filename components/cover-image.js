import ContentfulImage from "./contentful-image";
import Link from "next/link";
import cn from "classnames";

export default function CoverImage({ title, url, slug, route, height = 250 }) {
  const image = (
    <ContentfulImage
      layout="fill"
      objectFit="cover"
      alt={`Cover Image for ${title}`}
      // className={cn("sm:mx-0 rounded-lg border-2 border-black", {
      //   "hover:shadow-medium transition-shadow duration-200": slug,
      // })}
      className={`rounded-3xl p-4 ${
        slug ? "hover:opacity-80" : ""
      } duration-200`}
      src={url}
    />
  );

  return (
    <div
      className="sm:mx-0 relative border-2 border-[#16181C] rounded-lg"
      style={{
        height: `${height}px`,
      }}
    >
      {slug ? (
        <Link href={`/${route}/${slug}`}>
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
