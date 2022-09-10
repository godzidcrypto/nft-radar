import { useState } from "react";

function AddPoll({}) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [wlTime, setWlTime] = useState("");
  const [name, setName] = useState("");
  const [twitter, setTwitter] = useState("");
  const [discord, setDiscord] = useState("");
  const [website, setWebsite] = useState("");
  const [mintPrice, setMintPrice] = useState("");
  const [wlMintPrice, setWlMintPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleSubmitPoll = async (e) => {
    e.preventDefault();

    const newPoll = {
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
    };

    console.log(newPoll);

    const res = await fetch(`/api/polls`, {
      method: "POST",
      body: JSON.stringify(newPoll),
      headers: {
        "Content-Type": "application/json",
      },
    });

    return res;
  };

  return (
    <div className="px-4 py-16 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
      {/* <div className="max-w-lg mx-auto">
        <form
          onSubmit={handleSubmitPoll}
          className="p-8 mt-6 mb-0 rounded-lg shadow-2xl space-y-4 text-gray-500"
        >
          <div>
            <label for="email" className="text-sm font-medium">
              Mint Date
            </label>
            <div className="relative mt-1">
              <input
                type="date"
                onChange={(e) => setDate(e.target.value)}
                // value={poll}
                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
              />
            </div>
          </div>

          <div>
            <label for="password" className="text-sm font-medium">
              Project Name
            </label>
            <div className="relative mt-1">
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder="Enter Project Name"
              />
            </div>
          </div>

          <div>
            <label for="password" className="text-sm font-medium">
              Time
            </label>
            <div className="relative mt-1">
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder="Enter Project Name"
              />
            </div>
          </div>

          <div>
            <label for="password" className="text-sm font-medium">
              Twitter
            </label>
            <div className="relative mt-1">
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder="Enter Project Name"
              />
            </div>
          </div>

          <div>
            <label for="password" className="text-sm font-medium">
              Discord
            </label>
            <div className="relative mt-1">
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder="Enter Project Name"
              />
            </div>
          </div>

          <div>
            <label for="password" className="text-sm font-medium">
              Website
            </label>
            <div className="relative mt-1">
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder="Enter Project Name"
              />
            </div>
          </div>

          <div>
            <label for="password" className="text-sm font-medium">
              Mint Price
            </label>
            <div className="relative mt-1">
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder="Enter Project Name"
              />
            </div>
          </div>

          <div>
            <label for="password" className="text-sm font-medium">
              Quantity
            </label>
            <div className="relative mt-1">
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                placeholder="Enter Project Name"
              />
            </div>
          </div>

          <button className="block w-full px-5 py-3 text-sm font-medium text-white bg-[#8C50EE] rounded-lg">
            Submit
          </button>
        </form>
      </div> */}

      <section>
        <div className="mx-auto max-w-screen-xl sm:px-6 lg:px-8 text-black">
          <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-5">
            {/* <div className="lg:py-12 lg:col-span-2 text-white">
              <p className="max-w-xl text-lg">
                At the same time, the fact that we are wholly owned and totally
                independent from manufacturer and other group control gives you
                confidence that we will only recommend what is right for you.
              </p>

              <div className="mt-8">
                <a href="" className="text-2xl font-bold text-pink-600">
                  {" "}
                  0151 475 4450{" "}
                </a>

                <address className="mt-2 not-italic">
                  282 Kevin Brook, Imogeneborough, CA 58517
                </address>
              </div>
            </div> */}

            <div className="p-8 rounded-lg shadow-lg lg:p-12 lg:col-span-5">
              <form onSubmit={handleSubmitPoll} className="space-y-4">
                <div>
                  <input
                    type="date"
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-3 text-sm border-gray-200 rounded-lg"
                  />
                </div>

                <div>
                  <input
                    className="w-full p-3 text-sm border-gray-200 rounded-lg"
                    placeholder="Name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <input
                      className="w-full p-3 text-sm border-gray-200 rounded-lg"
                      placeholder="Time (UTC)"
                      type="text"
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </div>

                  <div>
                    <input
                      className="w-full p-3 text-sm border-gray-200 rounded-lg"
                      placeholder="WL Time (UTC)"
                      type="text"
                      onChange={(e) => setWlTime(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <input
                      className="w-full p-3 text-sm border-gray-200 rounded-lg"
                      placeholder="Mint Price"
                      type="text"
                      onChange={(e) => setMintPrice(e.target.value)}
                    />
                  </div>

                  <div>
                    <input
                      className="w-full p-3 text-sm border-gray-200 rounded-lg"
                      placeholder="WL Mint Price"
                      type="text"
                      onChange={(e) => setWlMintPrice(e.target.value)}
                    />
                  </div>
                </div>

                <div className="text-center grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <input
                      className="w-full p-3 text-sm border-gray-200 rounded-lg"
                      placeholder="Twitter"
                      type="text"
                      onChange={(e) => setTwitter(e.target.value)}
                    />
                  </div>

                  <div>
                    <input
                      className="w-full p-3 text-sm border-gray-200 rounded-lg"
                      placeholder="Discord"
                      type="text"
                      onChange={(e) => setDiscord(e.target.value)}
                    />
                  </div>

                  <div>
                    <input
                      className="w-full p-3 text-sm border-gray-200 rounded-lg"
                      placeholder="Website"
                      type="text"
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <input
                    className="w-full p-3 text-sm border-gray-200 rounded-lg"
                    placeholder="Quantity"
                    type="text"
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>

                <div className="text-center grid grid-cols-1 gap-4 sm:grid-cols-3 text-white">
                  <div>
                    <input className="sr-only" type="radio" tabindex="-1" />
                    <label
                      for="option1"
                      className="block w-full p-3 border border-gray-200 rounded-lg hover:text-black hover:bg-white duration-300 hover:cursor-pointer"
                      tabindex="0"
                    >
                      <span className="text-sm font-medium"> Lauren </span>
                    </label>
                  </div>

                  <div>
                    <input className="sr-only" type="radio" tabindex="-1" />
                    <label
                      for="option2"
                      className="block w-full p-3 border border-gray-200 rounded-lg hover:text-black hover:bg-white duration-300 hover:cursor-pointer"
                      tabindex="0"
                    >
                      <span className="text-sm font-medium"> HotSauce </span>
                    </label>
                  </div>

                  <div>
                    <input className="sr-only" type="radio" tabindex="-1" />
                    <label
                      for="option3"
                      className="block w-full p-3 border border-gray-200 rounded-lg hover:text-black hover:bg-white duration-300 hover:cursor-pointer"
                      tabindex="0"
                    >
                      <span className="text-sm font-medium"> Dagzen </span>
                    </label>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center w-full px-5 py-3 text-white border border-gray-200 rounded-lg sm:w-auto "
                  >
                    <span className="font-medium"> Add Project </span>

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
          </div>
        </div>
      </section>
    </div>
  );
}

export default AddPoll;
