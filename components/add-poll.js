import { useState, useRef } from "react";

function AddPoll({ isRequest = false }) {
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [time, setTime] = useState("");
  const [wlTime, setWlTime] = useState("");
  const [name, setName] = useState("");
  const [twitter, setTwitter] = useState("");
  const [discord, setDiscord] = useState("");
  const [website, setWebsite] = useState("");
  const [mintPrice, setMintPrice] = useState("");
  const [wlMintPrice, setWlMintPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [lauren, setLauren] = useState(false);
  const [hotsauce, setHotsauce] = useState(false);
  const [dagzen, setDagzen] = useState(false);
  const [selectedImage, setSelectedImage] = useState();
  const [isRequested, setIsRequested] = useState(false);

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

    const res = await fetch(`/api/polls`, {
      method: "POST",
      body: JSON.stringify(newPoll),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      setDate(new Date().toISOString().substring(0, 10));
      setTime("");
      setWlTime("");
      setName("");
      setTwitter("");
      setDiscord("");
      setWebsite("");
      setMintPrice("");
      setWlMintPrice("");
      setQuantity("");
      setLauren(false);
      setHotsauce(false);
      setDagzen(false);
      resetImage();
      setIsRequested(false);
    }

    return res;
  };

  return (
    <div className="px-4 py-16 mx-auto max-w-screen-xl sm:px-6 lg:px-8">
      <section>
        <div className="mx-auto max-w-screen-xl sm:px-6 lg:px-8 text-black">
          <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-5">
            <div className="p-8 rounded-lg shadow-lg lg:p-12 lg:col-span-5">
              <form onSubmit={handleSubmitPoll} className="space-y-4">
                <div>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full p-3 text-sm border-gray-200 rounded-lg"
                    required
                  />
                </div>

                <div>
                  <input
                    className="w-full p-3 text-sm border-gray-200 rounded-lg"
                    placeholder="Name"
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
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
                      value={time}
                      required
                    />
                  </div>

                  <div>
                    <input
                      className="w-full p-3 text-sm border-gray-200 rounded-lg"
                      placeholder="WL Time (UTC)"
                      type="time"
                      onChange={(e) => setWlTime(e.target.value)}
                      value={wlTime}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <input
                      className="w-full p-3 text-sm border-gray-200 rounded-lg"
                      placeholder="Mint Price"
                      type="number"
                      onChange={(e) => setMintPrice(e.target.value)}
                      value={mintPrice}
                      required
                    />
                  </div>

                  <div>
                    <input
                      className="w-full p-3 text-sm border-gray-200 rounded-lg"
                      placeholder="WL Mint Price"
                      type="number"
                      onChange={(e) => setWlMintPrice(e.target.value)}
                      value={wlMintPrice}
                    />
                  </div>

                  <div>
                    <input
                      className="w-full p-3 text-sm border-gray-200 rounded-lg"
                      placeholder="Quantity"
                      type="number"
                      onChange={(e) => setQuantity(e.target.value)}
                      value={quantity}
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
                      value={twitter}
                      required
                    />
                  </div>

                  <div>
                    <input
                      className="w-full p-3 text-sm border-gray-200 rounded-lg"
                      placeholder="Discord"
                      type="url"
                      onChange={(e) => setDiscord(e.target.value)}
                      value={discord}
                      required
                    />
                  </div>

                  <div>
                    <input
                      className="w-full p-3 text-sm border-gray-200 rounded-lg"
                      placeholder="Website"
                      type="url"
                      onChange={(e) => setWebsite(e.target.value)}
                      value={website}
                    />
                  </div>
                </div>

                {/* <div className="text-center grid gap-4 grid-cols-2 text-white">
                  <div>
                    <input className="sr-only" type="radio" tabindex="-1" />
                    <label
                      for="option1"
                      className={`block w-full p-3 border rounded-lg ${
                        lauren
                          ? "text-black bg-white border-gray-200"
                          : "border-gray-200 hover:text-black hover:bg-white"
                      } duration-300 hover:cursor-pointer`}
                      tabindex="0"
                      onClick={() => setLauren(!lauren)}
                    >
                      <span className="text-sm font-medium"> Lauren </span>
                    </label>
                  </div>

                  <div>
                    <input className="sr-only" type="radio" tabindex="-1" />
                    <label
                      for="option2"
                      className={`block w-full p-3 border rounded-lg ${
                        hotsauce
                          ? "text-black bg-white border-gray-200"
                          : "border-gray-200 hover:text-black hover:bg-white"
                      } duration-300 hover:cursor-pointer`}
                      tabindex="0"
                      onClick={() => setHotsauce(!hotsauce)}
                    >
                      <span className="text-sm font-medium"> HotSauce </span>
                    </label>
                  </div>

                  <div>
                    <input className="sr-only" type="radio" tabindex="-1" />
                    <label
                      for="option3"
                      className={`block w-full p-3 border rounded-lg ${
                        dagzen
                          ? "text-black bg-white border-gray-200"
                          : "border-gray-200 hover:text-black hover:bg-white"
                      } duration-300 hover:cursor-pointer`}
                      tabindex="0"
                      onClick={() => setDagzen(!dagzen)}
                    >
                      <span className="text-sm font-medium"> Dagzen </span>
                    </label>
                  </div>
                </div> */}

                <div className="grid sm:grid-cols-4 items-center gap-2">
                  <div className="col-span-2">
                    <label for="MarketingAccept" className="flex gap-4">
                      <input
                        type="checkbox"
                        id="MarketingAccept"
                        name="marketing_accept"
                        className="w-5 h-5 bg-white border-gray-200 rounded-md shadow-sm"
                        onChange={() => setIsRequested(!isRequested)}
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
