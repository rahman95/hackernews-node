const jwt = require("jsonwebtoken");

const APP_SECRET = "MY_R34LLY_54FE_53CR37";

function getUserId(context) {
  const Authorization = context.request.get("Authorization");

  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, APP_SECRET);

    return userId;
  }

  throw new Error("Not authenticated");
}

module.exports = {
  APP_SECRET,
  getUserId
};
