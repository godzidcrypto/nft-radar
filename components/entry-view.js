import CoverImage from "./cover-image";
import EntryContent from "./entry-content";
import OtherEntries from "./other-entries";

function EntryView({
  title,
  featuredImage,
  author,
  chain,
  writeUp,
  date,
  headings,
  otherEntries,
  route,
  children,
}) {
  return (
    <>
      <h1 className="text-center py-12 text-4xl font-bold">{title}</h1>
      <div className="relative">
        <CoverImage title={title} url={featuredImage.url} height={"550"} />
        <div className="mx-2 sm:mx-12 md:mx-24 lg:mx-48 py-24 -mt-48 relative z-10">
          <EntryContent
            author={author}
            chain={chain}
            writeUp={writeUp}
            date={date}
            headings={headings}
          >
            <div>{children}</div>
          </EntryContent>
        </div>
      </div>
      <OtherEntries otherEntries={otherEntries} route={route} />
    </>
  );
}

export default EntryView;
