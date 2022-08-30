import Link from "next/link";
import DateComponent from "./date";
import ContentfulImage from "./contentful-image";

function OtherEntries({ otherEntries, route }) {
  return (
    <div>
      {otherEntries.length > 0 && (
        <div className="mt-4">
          <span className="text-xl font-semibold">Check Out Other News</span>
          {otherEntries.slice(0, 5).map((entry, index) => {
            const { title, slug, caption, featuredImage, sys } = entry;

            return (
              <div
                key={index}
                className="mb-4 grid grid-cols-2 p-4 border-b-2 border-b-[#E7E9EA] items-center"
              >
                <Link href={`/${route}/${slug}`}>
                  <ContentfulImage
                    src={featuredImage.url}
                    width={250}
                    height={150}
                    className="rounded-sm hover:cursor-pointer"
                  />
                </Link>
                <div className="ml-4">
                  <div className="font-light text-sm">
                    <DateComponent dateString={sys.firstPublishedAt} />
                  </div>
                  <Link href={`/${route}/${slug}`}>
                    <p className="hover:underline hover:cursor-pointer font-semibold">
                      {title}
                    </p>
                  </Link>
                  <p className="">{caption}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default OtherEntries;
