import mongoose from 'mongoose';

const { Schema } = mongoose;

const conversationSchema = new Schema({
    name: String,
    description: String,
    membersId: [{
        type: Schema.Types.ObjectId,
        ref: 'user',
    }],
    latestMessage: String,
    latestMember: String,
    },
    {
        timestamps: true,
    });

export default mongoose.model('Conversation', conversationSchema);
