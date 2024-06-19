import mongoose from "mongoose";

export const getReceiver = (_id: mongoose.Types.ObjectId, users: any) => {
    return users[0]._id === _id ? users[1].username : users[0].username;
}

export const formatDate = (date : string) => {
    return new Date(date).toUTCString();
}
