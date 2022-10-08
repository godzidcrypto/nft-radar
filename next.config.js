module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/api/polls",
        destination: `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/polls`,
      },
      {
        source: "/api/polls/:id",
        destination: `${process.env.NEXT_PUBLIC_BACKEND_SERVER}/api/polls/:id`,
      },
    ];
  };
  return {
    rewrites,
    images: {
      loader: "custom",
    },
  };
};
