import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        default: '',
    },
    phone: {
        type: String,
        default: ' ',
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: '',
    },
});

export default mongoose.model('user', userSchema);
