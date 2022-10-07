const { createClient } = require("redis");
redis = createClient();
// client.on("error", (err) => console.log("Redis Client Error", err));
redis
  .connect()
  .then(() => {
    console.log("Redis Client Connected");
  })

  .catch((error) => console.error(error));

module.exports = redis;
