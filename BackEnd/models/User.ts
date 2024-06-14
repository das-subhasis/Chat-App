import mongoose, { mongo } from "mongoose";
import bcrypt from "bcrypt"

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    pic: {
        type: String,
        default: "https://i.imgur.com/GvsgVco_d.webp?maxwidth=760&fidelity=grand"
    }
},
    {
        timestamps: true
    });

UserSchema.methods.matchPassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
}


UserSchema.pre("save", async function (next) {
    if (!this.isModified) {
        next();
    }

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);

})

const User = mongoose.model('User', UserSchema);

export default User