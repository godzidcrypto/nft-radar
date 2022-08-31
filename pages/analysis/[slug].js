import Layout from "../../components/layout";
import Link from "next/link";
import { getAllAnalysis, getSingleAnalysis } from "../../lib/api";
import CoverImage from "../../components/cover-image";
import DateComponent from "../../components/date";
import TableOfContents from "../../components/table-of-contents";
import OtherEntries from "../../components/other-entries";
import EntryContent from "../../components/entry-content";
import Container from "../../components/container";

function AnalysisItem({ analysis, allAnalysis }) {
  const {
    sys,
    title,
    caption,
    chain,
    featuredImage,
    videoLink,
    writeUp,
    author,
  } = analysis[0];

  const otherAnalysis = allAnalysis.filter((analysisObject) => {
    return analysisObject.title !== analysis[0].title;
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
              <Link href={"/analysis"}>
                <p className="hover:underline hover:cursor-pointer">
                  &#8592; Other Analyses
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
              <OtherEntries otherEntries={otherAnalysis} route={"analysis"} />
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
            <OtherEntries otherEntries={otherAnalysis} route={"analysis"} />
          </div>
        </article>
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
