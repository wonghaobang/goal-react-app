const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler")
const userModel = require("../models/userModel")

// const protect = asyncHandler(async (req, res, next) => {
//   let token

//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith("Bearer")
//   ) {
//     try {
//       // Get token from header
//       token = req.headers.authorization.split(" ")[1]

//       // Verify token
//       const decoded = jwt.verify(token, process.env.JWT_SECRET)

//       // Get user from token
//       req.id = decoded.id
//       //   req.user = await userModel.findById(decoded.id).select("-password")

//       next()
//     } catch (error) {
//       console.log(error)
//       res.status(401)
//       throw new Error("Not authorized")
//     }
//   }

//   if (!token) {
//     res.status(401)
//     throw new Error("Not authorized, no token")
//   }
// })

const protect = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      const token = req.headers.authorization.split(" ")[1]

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      // Get user id from token
      req.id = decoded.id

      next()
    } catch (error) {
      console.log(error) // since there are many types of bad jwt errors, I'm logging it for my own debug
      res.status(401)
      throw new Error("Not authorized")
    }
  } else {
    res.status(401)
    throw new Error("Not authorized, no token")
  }
})

module.exports = {
  protect,
}

// I still have a try catch even though I have asynchandler because jwt.verify throws an error if it doesn't match,
// therefore, to use my own error message, I need to catch it and then throw my own error message
