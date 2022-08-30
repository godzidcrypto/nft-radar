import ContentfulImage from "./contentful-image";

function Hero({ title, description, svg, reverse }) {
  return (
    <div
      className={`bg-[#8C50EE] px-24 mx-auto flex items-center justify-evenly ${
        reverse && "flex-row-reverse"
      }`}
      style={{
        background: "linear-gradient(to bottom, #8C50EE, transparent)",
      }}
    >
      <div>
        <h1 className="text-4xl py-4">{title}</h1>
        <p className="max-w-xl text-justify pb-8">{description}</p>
      </div>
      <ContentfulImage src={svg} width={300} height={300} />
    </div>
  );
}

export default Hero;
