const notificationSchema = new mongoose.Schema({
    message: {
        type: String,
        required: [true, "Please provide a message!"],
        minLength: [6, "Message Must Be Longer Than 6 Characters!"],
        maxLength: [500, "Message Cannot Exceed 500 Characters!"],
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Please provide the user who received this notification!"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    isRead: {
        type: Boolean,
        default: false,
    },
    });

    export const Notification = mongoose.model("Notification", notificationSchema);