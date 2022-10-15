import User from '../models/User.js'

export const getUsers = async (req, res) => {
    const users = await User.find()
    return res.json(users)
}

export const getUser = async (req, res) => {
    const user = await User.findById(req.params.userId).populate("posts")
    return res.json(user)
}

export const updatedUser = async (req, res) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, {new: true})
    console.log(updatedUser);
    res.status(202).json(updatedUser);
}

export const deleteUser = async (req, res) => {
    const { userId } = req.params
    
    await User.findByIdAndDelete(userId)
    res.status(204).json();
}