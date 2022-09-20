import Image from "next/image";
import ContentfulImage from "./contentful-image";

export default function RichTextAsset({ id, assets }) {
  const asset = assets?.find((asset) => asset?.sys?.id === id);

  if (asset?.url) {
    return (
      <ContentfulImage
        src={asset.url}
        layout="fill"
        objectFit="cover"
        alt={asset.description}
        className={`rounded-3xl`}
      />
    );
  }

  return null;
}
