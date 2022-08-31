import ContentfulImage from "./contentful-image";

function Hero({ title, description, svg, reverse }) {
  return (
    <div
      className={`bg-[#8C50EE] -mx-6 px-6 md:px-12 md:-mx-12 lg:-mx-24 flex items-center justify-evenly ${
        reverse && "flex-row-reverse"
      }`}
      style={{
        background: "linear-gradient(to bottom, #8C50EE, transparent)",
      }}
    >
      <div>
        <h1 className="text-2xl md:text-4xl py-4 font-bold">{title}</h1>
        <p className="lg:max-w-xl text-justify pb-8 font-normal">
          {description}
        </p>
      </div>
      <div className="lg:block hidden">
        <ContentfulImage src={svg} width={300} height={300} />
      </div>
    </div>
  );
}

export default Hero;
