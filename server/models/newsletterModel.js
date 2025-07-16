import mongoose from "mongoose";

const newsletterSchema = new mongoose.Schema({
    email: {
        type: String, 
        required: true, 
        unique: true,
        lowercase: true,
        trim: true
    },
    subscribedAt: {
        type: Date, 
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for faster queries
newsletterSchema.index({ email: 1 });

const newsletterModel = mongoose.models.newsletter || mongoose.model("Newsletter", newsletterSchema);
export default newsletterModel; 