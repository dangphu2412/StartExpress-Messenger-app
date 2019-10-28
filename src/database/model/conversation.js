import mongoose from 'mongoose';

const { Schema } = mongoose;

const conversationSchema = new Schema({
    member: Array,
    },
    {
        timestamps: true,
    });

export default mongoose.model('Conversation', conversationSchema);
