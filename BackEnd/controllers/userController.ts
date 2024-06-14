import expressAsyncHandler from "express-async-handler"

const authUser = expressAsyncHandler(async (req, res) => {
    throw new Error("Hello");
})

const registerUser = expressAsyncHandler(async (req, res) => {
    res.send("hi");
})

export { authUser, registerUser }