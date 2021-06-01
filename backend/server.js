import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import listEndpoints from 'express-list-endpoints'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import dotenv from 'dotenv'
import "mongoose-type-email"

dotenv.config()

const mongoUrl = process.env.MONGO_URL || `mongodb+srv://${process.env.USER_ID}:${process.env.API_KEY}@cluster0.ekh6z.mongodb.net/habitTracker?retryWrites=true&w=majority`
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
mongoose.Promise = Promise

const userSchema = new mongoose.Schema ({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    trim: true,
    lowercase: true,
    unique: [true, 'Sorry, that email is already in use'],
    required: [true, 'Email is required']
  },
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  },
  habit: {
    type: [{    
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Habit'
    }],
    default: null
  }
})
const User = mongoose.model('User', userSchema)

const habitSchema = new mongoose.Schema ({
  collaborators: [{
    user_id: {    
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    progress: {
      type: Number,
      default: 0
    }
  }],
  title: {
    type: String,
    required: true
  },
  duration: {
    totalDays: {
      type: Number,
      default: 0
    },
    frequency: {
      type: Number,
      default: 0
    }
  }
})
const Habit = mongoose.model('Habit', userSchema)

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send(listEndpoints(app))
})

app.post('/signup', async (req, res) => {
  const { username, password, email } = req.body
  try {
    const salt = bcrypt.genSaltSync()
    const newUser = await new User({
      username,
      password: bcrypt.hashSync(password, salt),
      email
    }).save()
    res.json({
      success: true,
      userID: newUser._id,
      username: newUser.username,
      email: newUser.email,
      accessToken: newUser.accessToken
    })
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request', error })
    console.log(error)
  }
})

app.post('/signin', async (req, res) => {
  const { password, email } = req.body

  try {
    const user = await User.findOne({ email })
    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({
        success: true, 
        userID: user._id,
        email: user.email,
        accessToken: user.accessToken
      })
    } else {
      res.status(404).json({ success: false, message: 'User not found' })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request', error })
    console.log(error)
  }
})
// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
