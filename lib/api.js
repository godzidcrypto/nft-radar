const POST_GRAPHQL_FIELDS = `
slug
title
coverImage {
  url
}
date
author {
  name
  picture {
    url
  }
}
excerpt
content {
  json
  links {
    assets {
      block {
        sys {
          id
        }
        url
        description
      }
    }
  }
}
`;

async function fetchGraphQL(query, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((response) => response.json());
}

export async function getAllContentForHome() {
  const entries = await fetchGraphQL(
    `query {
      cryptoNewsCollection(order:[sys_firstPublishedAt_DESC]) {
        items {
          sys {
            firstPublishedAt
          }
          title
          slug
          caption
          chain
          featuredImage {
            url
          }
          author {
            name
            picture {
              url
            }
          }
        }
      }
      projectWriteUpCollection(order:[sys_firstPublishedAt_DESC]) {
        items {
          sys {
            firstPublishedAt
          }
          title
          slug
          caption
          chain
          featuredImage {
            url
          }
          author {
            name
            picture {
              url
            }
          }
          mintDate
          projectTwitter
          projectDiscord
        }
      }
      artistFeatureCollection(order:[sys_firstPublishedAt_DESC]) {
        items {
          sys {
            firstPublishedAt
          }
          title
          slug
          caption
          featuredImage {
            url
          }
          author {
            name
            picture {
              url
            }
          }
          artistTwitter
          artistWebsite
          artistMarketplaceSite
          artStyle
          previousWorks
        }
      }
      educationalContentCollection(order:[sys_firstPublishedAt_DESC]) {
        items {
          sys {
            firstPublishedAt
          }
          title
          slug
          caption
          featuredImage {
            url
          }
          author {
            name
            picture {
              url
            }
          }
        }
      }
      analysisCollection(order:[sys_firstPublishedAt_DESC]) {
        items {
          sys {
            firstPublishedAt
          }
          title
          slug
          caption
          featuredImage {
            url
          }
          author {
            name
            picture {
              url
            }
          }
        }
      }
      opinionPieceCollection(order:[sys_firstPublishedAt_DESC]) {
        items {
          sys {
            firstPublishedAt
          }
          title
          slug
          caption
          featuredImage {
            url
          }
          author {
            name
            picture {
              url
            }
          }
        }
      }
      interviewCollection(order:[sys_firstPublishedAt_DESC]) {
        items {
          sys {
            firstPublishedAt
          }
          title
          slug
          caption
          featuredImage {
            url
          }
          author {
            name
            picture {
              url
            }
          }
        }
      }
    }`
  );

  return entries?.data;
}

export async function getFeaturedItems() {
  const entries = await fetchGraphQL(
    `query {
      featuredArtistCollection {
        items {
          artist {
            title
            slug
            caption
            artistTwitter
            artistWebsite
            featuredImage {
              url
            }
          }
        }
      }
      featuredProjectsCollection(limit: 50) {
        items {
          projectsCollection {
            items {
              title
              slug
              projectTwitter
              projectDiscord
              projectWebsite
              caption
              featuredImage {
                url
              }
            }
          }
        }
      }
      featuredArticlesCollection(limit: 3) {
        items {
          articlesCollection {
            items {
              ... on CryptoNews {
                sys {
                  firstPublishedAt
                }
                title
                slug
                caption
                featuredImage {
                  url
                }
                author {
                  name
                  picture {
                    url
                  }
                }
              }
              ... on ProjectWriteUp {
                sys {
                  firstPublishedAt
                }
                title
                slug
                caption
                featuredImage {
                  url
                }
                author {
                  name
                  picture {
                    url
                  }
                }
              }
              ... on ArtistFeature {
                sys {
                  firstPublishedAt
                }
                title
                slug
                caption
                featuredImage {
                  url
                }
                author {
                  name
                  picture {
                    url
                  }
                }
              }
              ... on EducationalContent {
                sys {
                  firstPublishedAt
                }
                title
                slug
                caption
                featuredImage {
                  url
                }
                author {
                  name
                  picture {
                    url
                  }
                }
              }
              ... on Analysis {
                sys {
                  firstPublishedAt
                }
                title
                slug
                caption
                featuredImage {
                  url
                }
                author {
                  name
                  picture {
                    url
                  }
                }
              }
              ... on OpinionPiece {
                sys {
                  firstPublishedAt
                }
                title
                slug
                caption
                featuredImage {
                  url
                }
                author {
                  name
                  picture {
                    url
                  }
                }
              }
              ... on Interview {
                sys {
                  firstPublishedAt
                }
                title
                slug
                caption
                featuredImage {
                  url
                }
                author {
                  name
                  picture {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }`
  );

  return entries?.data;
}

export async function getAllCryptoNews() {
  const entries = await fetchGraphQL(
    `query {
      cryptoNewsCollection(order:[sys_firstPublishedAt_DESC]) {
        items {
          sys {
            firstPublishedAt
          }
          title
          slug
          caption
          chain
          featuredImage {
            url
          }
          author {
            name
            picture {
              url
            }
          }
        }
      }
    }`
  );

  return entries?.data?.cryptoNewsCollection?.items;
}

export async function getSingleCryptoNews(slug) {
  const entry = await fetchGraphQL(
    `query {
      cryptoNewsCollection(where: {slug: "${slug}"}, limit: 1) {
        items {
          sys {
            firstPublishedAt
          }
          title
          caption
          chain
          featuredImage {
            url
          }
          videoLink
          writeUp {
            json
            links {
              assets {
                block {
                  sys {
                    id
                  }
                  description
                  url
                  width
                  height
                }
              }
            }
          }
          author {
            name
            picture {
              url
            }
          }
        }
      }
    }`
  );

  return entry?.data?.cryptoNewsCollection?.items;
}

export async function getAllProjects() {
  const entries = await fetchGraphQL(
    `query {
      projectWriteUpCollection(order:[sys_firstPublishedAt_DESC]) {
        items {
          sys {
            firstPublishedAt
          }
          title
          slug
          caption
          featuredImage {
            url
          }
          chain
          author {
            name
            picture {
              url
            }
          }
        }
      }
    }`
  );

  return entries?.data?.projectWriteUpCollection?.items;
}

export async function getSingleProject(slug) {
  const entry = await fetchGraphQL(
    `query {
      projectWriteUpCollection(where: {slug: "${slug}"}, limit: 1) {
        items {
          sys {
            firstPublishedAt
          }
          title
          caption
          chain
          featuredImage {
            url
          }
          writeUp {
            json
            links {
              assets {
                block {
                  sys {
                    id
                  }
                  description
                  url
                  width
                  height
                }
              }
            }
          }
          author {
            name
            picture {
              url
            }
          }
          projectName
          projectTwitter
          projectDiscord
          projectWebsite
          mintDate
          publicMintPrice
          wlMintPrice
          projectSupply
          mintSite
          marketplaceLink
          willMint
        }
      }
    }`
  );
  return entry?.data?.projectWriteUpCollection?.items;
}

export async function getAllArtistFeatures() {
  const entries = await fetchGraphQL(
    `query {
      artistFeatureCollection(order:[sys_firstPublishedAt_DESC]){
        items {
          sys {
            firstPublishedAt
          }
          title
          slug
          caption
          featuredImage {
            url
          }
          author {
                name
                picture {
                  url
                }
              }
        }
      }
    }`
  );

  return entries?.data?.artistFeatureCollection?.items;
}

export async function getSingleArtistFeature(slug) {
  const entry = await fetchGraphQL(
    `query {
      artistFeatureCollection(where: {slug: "${slug}"}, limit: 1) {
        items {
          sys {
            firstPublishedAt
          }
          title
          caption
          featuredImage {
            url
          }
          writeUp {
            json
            links {
              assets {
                block {
                  sys {
                    id
                  }
                  description
                  url
                  width
                  height
                }
              }
            }
          }
          author {
            name
            picture {
              url
            }
          }
          artistName
          artistTwitter
          artistWebsite
          artistMarketplaceSite
          artStyle
          previousWorks
        }
      }
    }`
  );
  return entry?.data?.artistFeatureCollection?.items;
}

export async function getAllEducationalContent() {
  const entries = await fetchGraphQL(
    `query {
      educationalContentCollection(order:[sys_firstPublishedAt_DESC]){
        items {
          sys {
            firstPublishedAt
          }
          title
          slug
          caption
          featuredImage {
            url
          }
          author {
                name
                picture {
                  url
                }
              }
        }
      }
    }`
  );

  return entries?.data?.educationalContentCollection?.items;
}

export async function getSingleEducationalContent(slug) {
  const entry = await fetchGraphQL(
    `query {
      educationalContentCollection(where: {slug: "${slug}"}, limit: 1) {
        items {
          sys {
            firstPublishedAt
          }
          title
          caption
          featuredImage {
            url
          }
          writeUp {
            json
            links {
              assets {
                block {
                  sys {
                    id
                  }
                  description
                  url
                  width
                  height
                }
              }
            }
          }
          author {
            name
            picture {
              url
            }
          }
          videoLink
        }
      }
    }`
  );
  return entry?.data?.educationalContentCollection?.items;
}

export async function getAllAnalysis() {
  const entries = await fetchGraphQL(
    `query {
      analysisCollection(order:[sys_firstPublishedAt_DESC]){
        items {
          sys {
            firstPublishedAt
          }
          title
          slug
          caption
          featuredImage {
            url
          }
          author {
                name
                picture {
                  url
                }
              }
        }
      }
    }`
  );

  return entries?.data?.analysisCollection?.items;
}

export async function getSingleAnalysis(slug) {
  const entry = await fetchGraphQL(
    `query {
      analysisCollection(where: {slug: "${slug}"}, limit: 1) {
        items {
          sys {
            firstPublishedAt
          }
          title
          caption
          featuredImage {
            url
          }
          writeUp {
            json
            links {
              assets {
                block {
                  sys {
                    id
                  }
                  description
                  url
                  width
                  height
                }
              }
            }
          }
          author {
            name
            picture {
              url
            }
          }
          videoLink
          linksToData
        }
      }
    }`
  );
  return entry?.data?.analysisCollection?.items;
}

export async function getAllOpinionPieces() {
  const entries = await fetchGraphQL(
    `query {
      opinionPieceCollection(order:[sys_firstPublishedAt_DESC]){
        items {
          sys {
            firstPublishedAt
          }
          title
          slug
          caption
          featuredImage {
            url
          }
          author {
                name
                picture {
                  url
                }
              }
        }
      }
    }`
  );

  return entries?.data?.opinionPieceCollection?.items;
}

export async function getSingleOpinionPiece(slug) {
  const entry = await fetchGraphQL(
    `query {
      opinionPieceCollection(where: {slug: "${slug}"}, limit: 1) {
        items {
          sys {
            firstPublishedAt
          }
          title
          caption
          featuredImage {
            url
          }
          writeUp {
            json
            links {
              assets {
                block {
                  sys {
                    id
                  }
                  description
                  url
                  width
                  height
                }
              }
            }
          }
          author {
            name
            picture {
              url
            }
          }
        }
      }
    }`
  );
  return entry?.data?.opinionPieceCollection?.items;
}

export async function getAllInterviews() {
  const entries = await fetchGraphQL(
    `query {
      interviewCollection(order:[sys_firstPublishedAt_DESC]){
        items {
          sys {
            firstPublishedAt
          }
          title
          slug
          caption
          featuredImage {
            url
          }
          author {
                name
                picture {
                  url
                }
              }
        }
      }
    }`
  );

  return entries?.data?.interviewCollection?.items;
}

export async function getSingleInterview(slug) {
  const entry = await fetchGraphQL(
    `query {
      interviewCollection(where: {slug: "${slug}"}, limit: 1) {
        items {
          sys {
            firstPublishedAt
          }
          title
          caption
          featuredImage {
            url
          }
          writeUp {
            json
            links {
              assets {
                block {
                  sys {
                    id
                  }
                  description
                  url
                  width
                  height
                }
              }
            }
          }
          author {
            name
            picture {
              url
            }
          }
          videoLink
        }
      }
    }`
  );
  return entry?.data?.interviewCollection?.items;
}

export async function getMintPollDate() {
  const entry = await fetchGraphQL(
    `query {
      dailyMintsPollCollection {
        items {
          selectedDate
        }
      }
    }`
  );
  return entry?.data?.dailyMintsPollCollection?.items;
}
