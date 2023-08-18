const jsonWebToken = require("jsonwebtoken");

exports.LoginUserAndGenerateToken = async (payload) => {
  const token = jsonWebToken.sign(payload, process.env.TOKEN_SECREAT, {
    algorithm: "HS256",
    expiresIn: "800h",
  });
  return token;
};

exports.verifyTheUserToken = async (req,res,next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = await jsonWebToken.verify(token, process.env.TOKEN_SECREAT);
        req.user = decoded;
        next()
      } catch(err) {
        res.status(400).send({message:"Invalid Token"})
      }
}