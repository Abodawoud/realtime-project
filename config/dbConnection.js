import mongoose from 'mongoose';

const dbConnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      `MongoDB connected: ${conn.connection.host}\nDatabase: ${conn.connection.name}`
    );
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default dbConnection;
