import mongoose from 'mongoose';
const connectToDB = async () => {
    // .connect(`mongodb://mongo_natours:27017/natours`)
    await mongoose
        .connect(`mongodb://localhost:27017/natours`)
        .then((con) => {
        // console.log(con.connections);
        console.log('Mongodb connected...');
    })
        .catch((err) => console.log(err.message));
};
export default connectToDB;
