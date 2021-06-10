import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
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
    },
    frequency: {
      type: Number,
      default: 0
    }
  }
})
const Habit = mongoose.model('Habit', habitSchema)

const authenticateUser = async (req, res, next) => {
  const accessToken = req.header('Authorization')

  try {
    const user = await User.findOne({ accessToken })
      if (user) {
        req.user = user
        next()
      } else {
        res.status(401).json({ success:false, message: "Not authenticated" })
      }
  } catch (error){
    res.status(400).json({ success:false, message: "Invalid request", error })
  }
}

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

const documentation = {
  'Welcome': '🌟 Welcome to Irina´s and Maria´s digital habits tracker 🌟',
  'Endpoint 1': {
    'https://ahabit-tracker.herokuapp.com/signup': 'POST endpoint - register a user. Requires username, password and email in fetch body.',
  },
  'Endpoint 2': {
    'https://ahabit-tracker.herokuapp.com/signin': 'POST endpoint- login by finding user in database based on email and password. Requires email and password in fetch body.',
  },
  'Endpoint 3': {
    'https://ahabit-tracker.herokuapp.com/habits': 'GET endpoint - gives access to the users habits if access token is valid. Requires sending access token in the fetch headers to authenticate user.',
  },
  'Endpoint 4': {
    'https://ahabit-tracker.herokuapp.com/habits': 'POST endpoint - creates a habit for a particular user. Requires sending access token in the fetch headers to authenticate user and title (habits title/description) and duration (combination of totalDays and frequency) sent in the fetch body.',
  },
  'Endpoint 5': {
    'https://ahabit-tracker.herokuapp.com/habits/:id': 'DELETE endpoint - deletes a specified habit for that user. Requires sending access token in the fetch headers to authenticate user and habit id in the path.',
  },
  'Endpoint 6': {
    'https://ahabit-tracker.herokuapp.com/habits/:id': 'PATCH endpoint - updates a specified habit for that user. Requires sending access token in the fetch headers to authenticate user, habit id in the path and properties to be updated: title (habits title/description), duration (combination of totalDays and frequency), progress sent in the fetch body.'
  }
}


// Start defining your routes here
app.get('/', (req, res) => {
  res.send(documentation)
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
  const { usernameOrEmail, password } = req.body

  try {
    const user = await User.findOne({ 
      $or: [
        { username: usernameOrEmail },
        { email: usernameOrEmail }
      ]
    })
    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({
        success: true, 
        user_id: user._id,
        email: user.email,
        username: user.username,
        accessToken: user.accessToken
      })
    } else {
      res.status(404).json({ success: false, message: 'User not found' })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request', error })
  }
})

// POST endpoint adding a habit to the users habits array
///createhabit or users/:d/createhabit
app.post('/habits', authenticateUser)
app.post('/habits', async (req, res) => {
  const { title, totalDays } = req.body
  const { _id }= req.user
  
  try {
    const user = await User.findById(_id)

    const newHabit = await new Habit({ title, duration: {totalDays}, collaborators: [{user_id: user}] }).save()
    res.json({
      success: true, 
      newHabit
    })

  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request', error })
  }
})

//GET endpoint to get all habits of a single user
app.get('/habits', authenticateUser)
app.get('/habits', async (req, res) => {
  const { _id } = req.user

  const userHabits = await Habit.find({'collaborators.user_id': _id}).populate({ 
    path: 'collaborators',
      populate: { 
        path: 'user_id',
        select: 'username'
      }
  })
  res.json({ 
    success: true,
    userHabits
  })
})

//GET endpoint to get all habits of a single user
app.get('/habits', authenticateUser)
app.get('/habits', async (req, res) => {
  const { _id } = req.user

  const userHabits = await Habit.find({'collaborators.user_id': _id}).populate({ 
    path: 'collaborators',
      populate: { 
        path: 'user_id',
        select: 'username'
      }
  })
  res.json({ 
    success: true,
    userHabits
  })
})

//GET endpoint to get all habits of a single user
app.get('/habits', authenticateUser)
app.get('/habits', async (req, res) => {
  const { _id } = req.user

  const userHabits = await Habit.find({'collaborators.user_id': _id}).populate({ 
    path: 'collaborators',
      populate: { 
        path: 'user_id',
        select: 'username'
      }
  })
  res.json({ 
    success: true,
    userHabits
  })
})

//DELETE endpoint to delete a habit
app.delete('/habits/:id', authenticateUser)
app.delete('/habits/:id', async (req, res) => {
  const { id } = req.params
  
  try {
    const deletedHabit = await Habit.findByIdAndDelete(id)
    if(deletedHabit) {
      res.json({
        success: true,
        deletedHabit,
        message: 'Habit deleted'
      })
    } else {
      res.status(404).json({ message: 'Not found' })
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid request', error })
  } 
})

//PATCH endpoint to update a habit
app.patch('/habits/:id', authenticateUser)
app.patch('/habits/:id', async (req, res) => {
  const { id } = req.params
  
  try {
    const updatedHabit = await Habit.findByIdAndUpdate(id, req.body, {new: true})
    if(updatedHabit) {
      res.json({
        success: true,
        updatedHabit,
        message: 'Habit updated'
      })
    } else {
      res.status(404).json({ message: 'Not found' })
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid request', error })
  } 
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
