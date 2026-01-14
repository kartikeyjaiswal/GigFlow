import mongoose from 'mongoose';

beforeAll(async () => {
    const url = process.env.MONGO_URI_TEST || 'mongodb://localhost:27017/gigflow_test';
    await mongoose.connect(url);
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

afterEach(async () => {
    // Optional: clear collections after each test if needed
    // const collections = mongoose.connection.collections;
    // for (const key in collections) {
    //   await collections[key].deleteMany();
    // }
});
