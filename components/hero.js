import ContentfulImage from "./contentful-image";

function Hero({ title, description, svg, reverse }) {
  return (
    <div
      className={`bg-[#8C50EE] text-black px-24 mx-auto flex items-center justify-between ${
        reverse && "flex-row-reverse"
      }`}
      // style={{
      //   backgroundImage: "linear-gradient(#8C50EE, #9558A6)",
      // }}
    >
      <div>
        <h1 className="text-4xl py-4">{title}</h1>
        <p className="max-w-xl text-justify pb-8">{description}</p>
      </div>
      <ContentfulImage src={svg} width={500} height={500} />
    </div>
  );
}

export default Hero;
