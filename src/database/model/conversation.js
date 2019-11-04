import mongoose from 'mongoose';

const { Schema } = mongoose;

const conversationSchema = new Schema({
    name: String,
    description: String,
    member: [{
        id: Number,
        firstName: String,
        email: String,
    }],
    },
    {
        timestamps: true,
    });

export default mongoose.model('Conversation', conversationSchema);
