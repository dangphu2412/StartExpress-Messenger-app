import mongoose from 'mongoose';

const { Schema } = mongoose;

const messageSchema = new Schema({
    content: {
        type: String,
        trim: true,
    },
    member: {
        type: String,
        required: true,
        trim: true,
    },
    conversationId: {
        type: Schema.Types.ObjectId,
        ref: 'Conversation',
    },
    memberId: Number,
    },
    {
        timestamps: true,
    });

export default mongoose.model('Message', messageSchema);
