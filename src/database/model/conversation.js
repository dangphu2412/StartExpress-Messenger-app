import mongoose from 'mongoose';

const { Schema } = mongoose;

const conversationSchema = new Schema({
    name: String,
    description: String,
    userIds: [{
        type: Schema.Types.ObjectId,
        ref: 'user',
    }],
    memberId: [Number],
    },
    {
        timestamps: true,
    });

export default mongoose.model('Conversation', conversationSchema);
