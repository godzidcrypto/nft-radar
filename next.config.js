module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/api/polls",
        destination: `${process.env.BACKEND_SERVER}/api/polls`,
      },
      {
        source: "/api/polls/:id",
        destination: `${process.env.BACKEND_SERVER}/api/polls/:id`,
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
