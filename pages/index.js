import Container from "../components/container";
import MoreStories from "../components/more-stories";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import { getAllPostsForHome, getAllProjects } from "../lib/api";
import { CMS_NAME } from "../lib/constants";
import CoverImage from "../components/cover-image";
import DateComponent from "../components/date";

export default function Index({ preview, allPosts, allProjects }) {
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <>
      <Layout preview={preview}>
        <Container>
          {/* <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />} */}
          <div className="grid grid-cols-2">
            {allProjects.map((project, index) => {
              const { title, description, twitterLink, nftImage } = project;
              const { firstPublishedAt: date } = project.sys;
              return (
                <div key={index}>
                  <div>
                    <CoverImage
                      title={title}
                      // slug={twitterLink}
                      url={nftImage.url}
                    />
                  </div>
                  <h3 className="text-3xl mb-3 leading-snug">{title}</h3>
                  <p className="text-lg leading-relaxed mb-4">
                    <DateComponent dateString={date} />
                  </p>
                  <p className="text-lg leading-relaxed mb-4">{description}</p>
                  <a href={twitterLink} target="_blank">
                    <p>Twitter Link</p>
                  </a>
                </div>
              );
            })}
          </div>
        </Container>
      </Layout>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const allPosts = (await getAllPostsForHome(preview)) ?? [];
  const allProjects = (await getAllProjects(preview)) ?? [];
  return {
    props: { preview, allPosts, allProjects },
  };
}
