import mongoose from 'mongoose'
import app from './app'
import dotenv from 'dotenv'
import config from './config'
dotenv.config()

// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.j1gssm8.mongodb.net/acadizo?retryWrites=true&w=majority`;
// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('MongoDB connected successfully')
    // Start Server
    app.listen(config.port, () => {
      console.log(`Application listening on port ${config.port}`)
    })
  } catch (error) {
    console.error('MongoDB connection error:', error)
    process.exit(1) // Exit process with failure
  }
}
connectDB()
