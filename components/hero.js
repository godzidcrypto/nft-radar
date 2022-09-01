import ContentfulImage from "./contentful-image";

function Hero({ title, description, svg, reverse }) {
  return (
    <div
      // className={`bg-[#8C50EE] -mx-6 px-6 md:px-12 md:-mx-12 lg:-mx-24 flex items-center justify-evenly ${
      //   reverse && "flex-row-reverse"
      // }`}
      className="-mx-6 px-6 md:px-12 md:-mx-12 lg:-mx-24 lg:px-24 text-center"
      style={{
        background: "linear-gradient(to bottom, #8C50EE, transparent)",
      }}
    >
      <div className="lg:max-w-2xl mx-auto">
        <h1 className="text-2xl md:text-4xl py-4 font-bold">{title}</h1>
        <p className="pb-8 font-normal">{description}</p>
        {/* <span>—</span> */}
      </div>
      {/* <div className="lg:block hidden">
        <ContentfulImage src={svg} width={250} height={250} />
      </div> */}
    </div>
  );
}

export default Hero;
