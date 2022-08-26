import ContentfulImage from "./contentful-image";
import Link from "next/link";
import cn from "classnames";

export default function CoverImage({ title, url, slug, route }) {
  const image = (
    <ContentfulImage
      width={2000}
      height={1000}
      alt={`Cover Image for ${title}`}
      className={"hover:shadow-medium transition-shadow duration-200"}
      src={url}
    />
  );

  return (
    <div className="sm:mx-0">
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
