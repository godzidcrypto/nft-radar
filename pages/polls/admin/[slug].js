import Layout from "../../../components/layout";
import Container from "../../../components/container";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import ContentfulImage from "../../../components/contentful-image";
import Twitter from "../../../components/twitter";
import Discord from "../../../components/discord";
import Website from "../../../components/website";
import Logo from "../../../assets/images/logo.png";
import { useSession } from "next-auth/react";

function PollsAdmin() {
  const [userInfo, setUserInfo] = useState("");
  const [guildRoles, setGuildRoles] = useState([]);
  const { data: session } = useSession();

  const guildId = "892235360501923850"; // NFT Radar
  const moderatorRole = "892237845828341760"; // NFT Radar

  const getGuilds = async () => {
    if (session) {
      const userRes = await fetch("https://discord.com/api/users/@me", {
        headers: {
          Authorization: "Bearer " + session.accessToken,
        },
      }).then((res) => {
        return res.json();
      });

      const guildRolesRes = await fetch(
        `https://discord.com/api/users/@me/guilds/${guildId}/member`,
        {
          headers: {
            Authorization: "Bearer " + session.accessToken,
          },
        }
      ).then((res) => {
        return res.json();
      });
      setUserInfo(userRes);
      setGuildRoles(guildRolesRes.roles);
    }
  };

  useEffect(() => {
    // if guildRoles array ahs been updated, prevent function call to repeat
    // this prevents getting rate limited from discord API
    guildRoles?.length === 0 ? getGuilds() : console.log("getguilds");
  }, [session]);

  const router = useRouter();
  const { slug: id } = router.query;

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const API = `/api/polls/${id}`;
  const { data: swrData } = useSWR(API, fetcher, {
    refreshInterval: 1000,
  });

  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [time, setTime] = useState(swrData?.time);
  const [wlTime, setWlTime] = useState(swrData?.wlTime);
  const [name, setName] = useState(swrData?.name);
  const [twitter, setTwitter] = useState(swrData?.twitter);
  const [discord, setDiscord] = useState(swrData?.discord);
  const [website, setWebsite] = useState(swrData?.website);
  const [mintPrice, setMintPrice] = useState(swrData?.mintPrice);
  const [wlMintPrice, setWlMintPrice] = useState(swrData?.wlMintPrice);
  const [quantity, setQuantity] = useState(swrData?.quantity);
  const [lauren, setLauren] = useState(false);
  const [hotsauce, setHotsauce] = useState(false);
  const [dagzen, setDagzen] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [isRequested, setIsRequested] = useState(swrData?.isRequested);

  const imageRef = useRef();
  const resetImage = () => {
    imageRef.current.value = "";
  };

  const handleFileChange = (event) => {
    setSelectedImage(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const handleSubmitPoll = async (e) => {
    e.preventDefault();

    const imageData = new FormData();
    imageData.append("file", selectedImage);
    imageData.append("upload_preset", "u7vljuld");

    const imageRes = await fetch(
      `https://api.cloudinary.com/v1_1/${`dsljry28v`}/image/upload`,
      {
        method: "POST",
        body: imageData,
      }
    ).then((res) => {
      return res.json();
    });

    const imageUrl = imageRes.secure_url;

    const newPoll = {
      id,
      date,
      time,
      wlTime,
      name,
      twitter,
      discord,
      website,
      mintPrice,
      wlMintPrice,
      quantity,
      lauren,
      hotsauce,
      dagzen,
      imageUrl,
      isRequested,
    };

    console.log(newPoll);

    const res = await fetch(`/api/polls/${id}`, {
      method: "PATCH",
      body: JSON.stringify(newPoll),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      resetImage();
    }

    return res;
  };

  const onlyNumbers = (str) => {
    return /^[0-9.,]+$/.test(str);
  };

  const tConvert = (time) => {
    // Check correct time format and split into components
    time = time
      ?.toString()
      ?.match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  };

  const findLauren = swrData?.voters?.filter((voter) => {
    return voter.discordId === "778658118854115418";
  });
  const findHotsauce = swrData?.voters?.filter((voter) => {
    return voter.discordId === "449623048505786369";
  });

  const deletePoll = async (id) => {
    const res = await fetch(`/api/polls/${id}`, {
      method: "DELETE",
    });

    const json = await res.json();

    if (res.ok) {
      router.push("/polls/admin");
    }
  };

  if (guildRoles?.includes(moderatorRole))
    return (
      <Layout>
        <Container>
          <p className="text-center text-4xl uppercase pt-24">No Access</p>
        </Container>
      </Layout>
    );

  return (
    <Layout>
      <Container>
        <div className="px-4 py-16 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
          <div className="overflow-hidden border border-gray-600 rounded-lg grid grid-cols-1 md:grid-cols-3 bg-[#16181C]">
            <div className="relative h-48 md:h-auto">
              <div>
                <ContentfulImage
                  src={swrData?.imageUrl ?? Logo}
                  layout="fill"
                  objectFit="cover"
                />
                <span className="absolute right-4 top-6 rounded-full px-3 py-1.5 bg-gray-100 text-gray-600 font-black text-base">
                  Minting: {swrData?.yes}
                </span>
              </div>
            </div>

            <div className="p-8 sm:col-span-2 relative">
              <div className="flex items-center mb-3">
                {swrData?.isRequested && (
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
                        Cillum mollit anim amet laborum pariatur anim nostrud.
                      </div>
                    </div>
                  </div>
                )}
                <h3 className="text-xl font-bold">{swrData?.name}</h3>
              </div>

              <div className="flex items-center gap-2">
                <a
                  className="hover:scale-125 duration-200"
                  href={swrData?.twitter}
                  target="_blank"
                >
                  <Twitter fill={"#ffffff"} width={16} />
                </a>
                <a
                  className="scale-125 hover:scale-150 duration-200"
                  href={swrData?.discord}
                  target="_blank"
                >
                  <Discord fill={"#ffffff"} width={16} />
                </a>
                {swrData?.website && (
                  <a
                    className="scale-125 hover:scale-150 duration-200"
                    href={swrData?.website}
                    target="_blank"
                  >
                    <Website fill={"#ffffff"} width={16} />
                  </a>
                )}
                <div className="ml-2 flex gap-1">
                  <p
                    className={`${
                      findLauren?.length !== 0
                        ? "border-green-800 text-green-800 bg-green-100"
                        : "border-red-800 text-red-800 bg-red-100"
                    } inline-block px-2 py-1 text-xs font-normal rounded-full`}
                  >
                    Lauren
                  </p>
                  <p
                    className={`${
                      findHotsauce?.length !== 0
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
                    {onlyNumbers(swrData?.wlMintPrice)
                      ? parseFloat(swrData?.wlMintPrice)
                      : swrData?.wlMintPrice}
                  </dd>
                </div>
                <div className="flex flex-col p-2 text-center border border-gray-100 rounded-lg">
                  <dt className="order-last text-xs font-medium text-gray-500">
                    WL Mint Time
                  </dt>

                  <dd className="text-md font-extrabold text-gray-300">
                    {tConvert(swrData?.wlTime)}
                  </dd>
                </div>

                <div className="justify-center flex flex-col py-2 text-center border border-gray-100 rounded-lg">
                  <dt className="order-last text-xs font-medium text-gray-500">
                    Quantity
                  </dt>

                  <dd className="text-md font-extrabold text-gray-300">
                    {swrData?.quantity}
                  </dd>
                </div>

                <div className="flex flex-col p-2 text-center border border-gray-100 rounded-lg">
                  <dt className="order-last text-xs font-medium text-gray-500">
                    Mint Price
                  </dt>

                  <dd className="text-md font-extrabold text-gray-300">
                    {onlyNumbers(swrData?.mintPrice)
                      ? parseFloat(swrData?.mintPrice)
                      : swrData?.mintPrice}
                  </dd>
                </div>

                <div className="flex flex-col p-2 text-center border border-gray-100 rounded-lg">
                  <dt className="order-last text-xs font-medium text-gray-500">
                    Mint Time
                  </dt>

                  <dd className="text-md font-extrabold text-gray-300">
                    {tConvert(swrData?.time)}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
          <section>
            <div className="mx-auto max-w-screen-xl sm:px-6 lg:px-8 text-black">
              <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-5">
                <div className="p-8 rounded-lg shadow-lg lg:p-12 lg:col-span-5">
                  <form onSubmit={handleSubmitPoll} className="space-y-4">
                    {swrData?.date && (
                      <div>
                        <input
                          type="date"
                          defaultValue={new Date(swrData?.date)
                            ?.toISOString()
                            .substring(0, 10)}
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full p-3 text-sm border-gray-200 rounded-lg"
                          required
                        />
                      </div>
                    )}

                    <div>
                      <input
                        className="w-full p-3 text-sm border-gray-200 rounded-lg"
                        placeholder="Name"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        defaultValue={swrData?.name}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <input
                          className="w-full p-3 text-sm border-gray-200 rounded-lg"
                          placeholder="Time (UTC)"
                          type="time"
                          onChange={(e) => setTime(e.target.value)}
                          defaultValue={swrData?.time}
                          required
                        />
                      </div>

                      <div>
                        <input
                          className="w-full p-3 text-sm border-gray-200 rounded-lg"
                          placeholder="WL Time (UTC)"
                          type="time"
                          onChange={(e) => setWlTime(e.target.value)}
                          defaultValue={swrData?.wlTime}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div>
                        <input
                          className="w-full p-3 text-sm border-gray-200 rounded-lg"
                          placeholder="Mint Price"
                          onChange={(e) => setMintPrice(e.target.value)}
                          defaultValue={swrData?.mintPrice}
                          required
                        />
                      </div>

                      <div>
                        <input
                          className="w-full p-3 text-sm border-gray-200 rounded-lg"
                          placeholder="WL Mint Price"
                          onChange={(e) => setWlMintPrice(e.target.value)}
                          defaultValue={swrData?.wlMintPrice}
                        />
                      </div>

                      <div>
                        <input
                          className="w-full p-3 text-sm border-gray-200 rounded-lg"
                          placeholder="Quantity"
                          type="number"
                          onChange={(e) => setQuantity(e.target.value)}
                          defaultValue={swrData?.quantity}
                          min={0}
                          step={1}
                          required
                        />
                      </div>
                    </div>

                    <div className="text-center grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div>
                        <input
                          className="w-full p-3 text-sm border-gray-200 rounded-lg"
                          placeholder="Twitter"
                          type="url"
                          onChange={(e) => setTwitter(e.target.value)}
                          defaultValue={swrData?.twitter}
                          required
                        />
                      </div>

                      <div>
                        <input
                          className="w-full p-3 text-sm border-gray-200 rounded-lg"
                          placeholder="Discord"
                          type="url"
                          onChange={(e) => setDiscord(e.target.value)}
                          defaultValue={swrData?.discord}
                          required
                        />
                      </div>

                      <div>
                        <input
                          className="w-full p-3 text-sm border-gray-200 rounded-lg"
                          placeholder="Website"
                          type="url"
                          onChange={(e) => setWebsite(e.target.value)}
                          defaultValue={swrData?.website}
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-4 items-center gap-2">
                      <div className="col-span-2">
                        <label for="MarketingAccept" className="flex gap-4">
                          <input
                            type="checkbox"
                            className="w-5 h-5 bg-white border-gray-200 rounded-md shadow-sm"
                            onChange={() => setIsRequested(!isRequested)}
                            defaultChecked={swrData?.isRequested}
                          />

                          <span className="text-sm text-gray-300">
                            Project Requested to be Featured
                          </span>
                        </label>
                      </div>
                      <div className="col-span-2">
                        <input
                          className="w-full text-sm border-gray-200 bg-gray-100 rounded-lg"
                          accept=".jpg, .png, .jpeg"
                          type="file"
                          onChange={handleFileChange}
                          ref={imageRef}
                        />
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <button
                        type="submit"
                        className="inline-flex items-center justify-center w-full px-5 py-3 text-white border border-gray-200 rounded-lg sm:w-auto "
                      >
                        <span className="font-medium"> Update Project </span>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-5 h-5 ml-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </button>
                    </div>
                  </form>
                </div>
                <button
                  onClick={() => deletePoll(id)}
                  className="inline-flex items-center justify-center max-w-max px-2 py-3 text-white bg-red-400 rounded-lg sm:w-auto "
                >
                  <span className="font-medium"> Delete Project </span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 ml-3"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M17 5V4C17 2.89543 16.1046 2 15 2H9C7.89543 2 7 2.89543 7 4V5H4C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H5V18C5 19.6569 6.34315 21 8 21H16C17.6569 21 19 19.6569 19 18V7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H17ZM15 4H9V5H15V4ZM17 7H7V18C7 18.5523 7.44772 19 8 19H16C16.5523 19 17 18.5523 17 18V7Z"
                      fill="currentColor"
                    />
                    <path d="M9 9H11V17H9V9Z" fill="currentColor" />
                    <path d="M13 9H15V17H13V9Z" fill="currentColor" />
                  </svg>
                </button>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </Layout>
  );
}

export default PollsAdmin;
