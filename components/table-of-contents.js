import convertToSlug from "../lib/convertToSlug";

function TableOfContents({ headings }) {
  return (
    <>
      {headings.length > 0 && (
        <div className="mt-4 bg-[#16181C] p-6 rounded-md">
          <span className="text-xl font-semibold">Table of Contents</span>
          {headings.map((heading, index) => {
            const text = heading.content[0].value;
            const headingNumber = heading.nodeType.split("-")[1];
            return (
              <li
                key={index}
                className="py-1"
                style={{
                  paddingLeft: `${headingNumber - 2}rem`,
                }}
              >
                {/* {". ".repeat(headingNumber)} */}
                <a href={`#${convertToSlug(text)}`} className="hover:underline">
                  {text}
                </a>
              </li>
            );
          })}
        </div>
      )}
    </>
  );
}

export default TableOfContents;
