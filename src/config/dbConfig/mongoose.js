import mongoose from 'mongoose';

export default async function () {
    await mongoose.connect(process.env.DATABASE_MONGO_URL,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
}
