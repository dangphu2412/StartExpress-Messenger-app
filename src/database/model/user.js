import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
    id: Number,
    name: String,
    avatar: String,
});

export default mongoose.model('user', userSchema);
