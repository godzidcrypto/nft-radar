import Layout from "../../components/layout";
import { getProviders, signIn } from "next-auth/react";
import Discord from "../../components/discord";
import Space from "../../assets/images/space.svg";
import ContentfulImage from "../../components/contentful-image";
import Link from "next/link";

function SignIn({ providers, headers }) {
  return (
    <Layout hide={true}>
      <div className="h-screen text-white grid grid-cols-2">
        <div className="bg-[#8C50EE] grid items-center justify-center text-center">
          <div className="lg:block hidden">
            <h1 className="font-extrabold text-3xl text-black">
              <Link href={"/"}>NFT Radar</Link>
            </h1>
            <ContentfulImage src={Space} width={250} height={250} />
            <p className="font-extralight">
              Adipisicing adipisicing ad amet ex nostrud reprehenderit qui.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center bg-black">
          {/* {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                type="button"
                className="text-white bg-[#5B65EA] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
                onClick={() =>
                  signIn(provider.id, {
                    callbackUrl: `${headers.referer ?? "/"}`,
                  })
                }
              >
                <Discord fill={`#ffffff`} width={24} className={"mr-4"} />
                Sign in with {provider.name}
              </button>
            </div>
          ))} */}
          <div>
            <a href={`${process.env.NEXT_PUBLIC_DISCORD_OAUTH2_URL}`}>
              <button
                type="button"
                className="text-white bg-[#5B65EA] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2"
              >
                <Discord fill={`#ffffff`} width={24} className={"mr-4"} />
                Sign in with Discord
              </button>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SignIn;

export async function getServerSideProps(context) {
  const providers = await getProviders();
  const headers = context.req.headers;
  return {
    props: { providers, headers },
  };
}
