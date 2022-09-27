import Layout from "../../../components/layout";
import Container from "../../../components/container";
import useSWR from "swr";
import ContentfulImage from "../../../components/contentful-image";
import Twitter from "../../../components/twitter";
import Discord from "../../../components/discord";
import Website from "../../../components/website";
import Logo from "../../../assets/images/logo.png";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((res) => res.json());
const API = `/api/polls`;

function PollsAdmin() {
  const { data: swrData } = useSWR(API, fetcher, {
    refreshInterval: 1000,
  });

  const onlyNumbers = (str) => {
    return /^[0-9.,]+$/.test(str);
  };

  const tConvert = (time) => {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  };

  console.log(swrData);

  return (
    <Layout>
      <Container>
        <div className="grid lg:grid-cols-2 gap-4 py-16">
          {swrData?.map((item, index) => {
            const {
              _id,
              time,
              wlTime,
              name,
              twitter,
              discord,
              website,
              mintPrice,
              wlMintPrice,
              quantity,
              yes,
              voters,
              imageUrl,
              isRequested,
            } = item;
            const findLauren = voters.filter((voter) => {
              return voter.discordId === "778658118854115418";
            });
            const findHotsauce = voters.filter((voter) => {
              return voter.discordId === "449623048505786369";
            });
            return (
              <Link href={`admin/${_id}`}>
                <div
                  key={index}
                  className="overflow-hidden border border-gray-600 rounded-lg grid grid-cols-1 md:grid-cols-3 bg-[#16181C] hover:cursor-pointer hover:opacity-50"
                >
                  <div className="relative h-48 md:h-auto">
                    <div>
                      <ContentfulImage
                        src={imageUrl ?? Logo}
                        layout="fill"
                        objectFit="cover"
                      />
                      <span className="absolute right-4 top-6 rounded-full px-3 py-1.5 bg-gray-100 text-gray-600 font-black text-base">
                        Minting: {yes}
                      </span>
                    </div>
                  </div>

                  <div className="p-8 sm:col-span-2 relative">
                    <div className="flex items-center mb-3">
                      {isRequested && (
                        <div>
                          <div className="group cursor-pointer relative text-center mr-1.5">
                            <svg
                              aria-haspopup="true"
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-info-circle"
                              width={25}
                              height={25}
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="#A0AEC0"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path stroke="none" d="M0 0h24v24H0z" />
                              <circle cx={12} cy={12} r={9} />
                              <line x1={12} y1={8} x2="12.01" y2={8} />
                              <polyline points="11 12 12 12 12 16 13 16" />
                            </svg>
                            <div className="opacity-0 bg-black text-white text-center text-xs rounded-lg py-2 absolute z-10 group-hover:opacity-100 top-full px-3 pointer-events-none -left-6 w-48">
                              Cillum mollit anim amet laborum pariatur anim
                              nostrud.
                            </div>
                          </div>
                        </div>
                      )}
                      <h3 className="text-xl font-bold">{name}</h3>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        className="hover:scale-125 duration-200"
                        href={twitter}
                        target="_blank"
                      >
                        <Twitter fill={"#ffffff"} width={16} />
                      </a>
                      <a
                        className="scale-125 hover:scale-150 duration-200"
                        href={discord}
                        target="_blank"
                      >
                        <Discord fill={"#ffffff"} width={16} />
                      </a>
                      {website && (
                        <a
                          className="scale-125 hover:scale-150 duration-200"
                          href={website}
                          target="_blank"
                        >
                          <Website fill={"#ffffff"} width={16} />
                        </a>
                      )}
                      <div className="ml-2 flex gap-1">
                        <p
                          className={`${
                            findLauren.length !== 0
                              ? "border-green-800 text-green-800 bg-green-100"
                              : "border-red-800 text-red-800 bg-red-100"
                          } inline-block px-2 py-1 text-xs font-normal rounded-full`}
                        >
                          Lauren
                        </p>
                        <p
                          className={`${
                            findHotsauce.length !== 0
                              ? "border-green-800 text-green-800 bg-green-100"
                              : "border-red-800 text-red-800 bg-red-100"
                          } inline-block px-2 py-1 text-xs font-normal rounded-full`}
                        >
                          HoTsAuCe
                        </p>
                      </div>
                    </div>

                    <dl className="mt-4 grid gap-2 lg:gap-4 md:grid-cols-3">
                      <div className="flex flex-col p-2 text-center border border-gray-100 rounded-lg">
                        <dt className="order-last text-xs font-medium text-gray-500">
                          WL Mint Price
                        </dt>

                        <dd className="text-md font-extrabold text-gray-300">
                          {onlyNumbers(wlMintPrice)
                            ? parseFloat(wlMintPrice)
                            : wlMintPrice}
                        </dd>
                      </div>
                      <div className="flex flex-col p-2 text-center border border-gray-100 rounded-lg">
                        <dt className="order-last text-xs font-medium text-gray-500">
                          WL Mint Time
                        </dt>

                        <dd className="text-md font-extrabold text-gray-300">
                          {tConvert(wlTime)}
                        </dd>
                      </div>

                      <div className="justify-center flex flex-col py-2 text-center border border-gray-100 rounded-lg">
                        <dt className="order-last text-xs font-medium text-gray-500">
                          Quantity
                        </dt>

                        <dd className="text-md font-extrabold text-gray-300">
                          {quantity}
                        </dd>
                      </div>

                      <div className="flex flex-col p-2 text-center border border-gray-100 rounded-lg">
                        <dt className="order-last text-xs font-medium text-gray-500">
                          Mint Price
                        </dt>

                        <dd className="text-md font-extrabold text-gray-300">
                          {onlyNumbers(mintPrice)
                            ? parseFloat(mintPrice)
                            : mintPrice}
                        </dd>
                      </div>

                      <div className="flex flex-col p-2 text-center border border-gray-100 rounded-lg">
                        <dt className="order-last text-xs font-medium text-gray-500">
                          Mint Time
                        </dt>

                        <dd className="text-md font-extrabold text-gray-300">
                          {tConvert(time)}
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </Layout>
  );
}

export default PollsAdmin;
