import mongoose from 'mongoose'
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        location: {
          type: String
        },
        website: {
          type: String
        },
        image: {
          type: String
        },
        posts: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Post'
            }
        ],
        roles: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Role'
            },
        ]
    },
    {
        timestamps: true,
        versionKey: false
    }
)

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

userSchema.statics.comparePassword = async (password, receivedPassword) => {
    return await bcrypt.compare(password, receivedPassword)
}

userSchema.pre("save", async function (next) {
    const user = this
    if(!user.isModified("password")){
        return next()
    }
    const hash = await bcrypt.hash(user.password, 10)
    user.password = hash
    next()
})


export default mongoose.model('User', userSchema)