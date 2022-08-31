import Layout from "../../components/layout";
import Link from "next/link";
import { getAllInterviews, getSingleInterview } from "../../lib/api";
import CoverImage from "../../components/cover-image";
import DateComponent from "../../components/date";
import TableOfContents from "../../components/table-of-contents";
import OtherEntries from "../../components/other-entries";
import EntryContent from "../../components/entry-content";
import Container from "../../components/container";

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

  const otherInterviews = allInterviews.filter((otherInterview) => {
    return otherInterview.title !== interview[0].title;
  });

  const { firstPublishedAt: date } = sys;

  const content = writeUp.json.content;
  const headings = content.filter((content) => {
    return content.nodeType.includes("heading");
  });

  return (
    <Layout>
      <Container>
        <article className="grid lg:grid-cols-[1fr_2fr] gap-8 py-16">
          <div>
            <div className="mb-4 flex justify-between items-center">
              <Link href={"/interviews"}>
                <p className="hover:underline hover:cursor-pointer">
                  &#8592; Other Interviews
                </p>
              </Link>
              <p>
                <DateComponent dateString={date} />
              </p>
            </div>
            <div>
              <CoverImage title={title} url={featuredImage.url} />
            </div>
            <TableOfContents headings={headings} />
            <div className="hidden lg:block">
              <OtherEntries
                otherEntries={otherInterviews}
                route={"interviews"}
              />
            </div>
          </div>
          <EntryContent
            title={title}
            caption={caption}
            author={author}
            chain={chain}
            writeUp={writeUp}
          />
          <div className="block lg:hidden">
            <OtherEntries otherEntries={otherInterviews} route={"interviews"} />
          </div>
        </article>
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
