const server = require("./data/server");
const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`\n*** Server running at http://locahost:${PORT}... ***\n`);
});
