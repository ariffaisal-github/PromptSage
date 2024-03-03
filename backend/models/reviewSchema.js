const reviewSchema = new mongoose.Schema({
    // review: {
    //     type: String,
    //     required: [true, "Please provide a review!"],
    //     minLength: [6, "Review Must Be Longer Than 6 Characters!"],
    //     maxLength: [500, "Review Cannot Exceed 500 Characters!"],
    // },
    reviewer: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "Please provide the user who wrote this review!"],
    },
    prompt: {
        type: mongoose.Schema.ObjectId,
        ref: "Prompt",
        required: [true, "Please provide the prompt this review is for!"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    likes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User",
        },
    ]
    // dislikes: [
    //     {
    //         type: mongoose.Schema.ObjectId,
    //         ref: "User",
    //     },
    // ],
});

export const Review = mongoose.model("Review", reviewSchema);