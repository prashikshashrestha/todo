import jwt from "jsonwebtoken";
export const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    console.log("authHeader", authHeader);
    const token = authHeader.split(" ")[1];
    if (!token) {
      throw new Error("token not found");
    }
    jwt.verify(token, "qwerty", (error, user) => {
      if (error) {
        throw new Error("invalid token");
      }
      req.user = user;
          next();
    });
    // console.log("token", token);
  } catch (error) {
    console.log("error", error)
return res.status(500).json({
    sucess:false,
    message:"invalid user", error
})
}
};
