import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import dotenv from 'dotenv'

dotenv.config()

const mongoUrl = process.env.MONGO_URL || `mongodb+srv://${process.env.USER_ID}:${process.env.API_KEY}@cluster0.ekh6z.mongodb.net/habitTracker?retryWrites=true&w=majority`
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
mongoose.Promise = Promise

const userSchema = new mongoose.Schema ({
  username: {
    type: String,
    required: [true, 'Username is required'],
    unique: [true, 'Sorry, that username is already in use'],
    minlength: [2, 'Password should be at least 2 characters long']
  },
  password: {
    type: String,
    required: [true, 'Username is required'],
    minlength: [6, 'Password should be at least 6 characters long']
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
    checkedCheckbox: {
      type: Array
    } 
  }],
  title: {
    type: String,
    required: true,
    minlength: [3, 'Your message is too short'],
    maxlength: [140, 'Your message is too long']
  },
  duration: {
    totalDays: {
      type: Number,
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    frequency: {
      type: Number,
      default: 0
    }
  }, 
  createdAt: {
    type: Date, 
    default: Date.now
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
    'https://ahabit-tracker.herokuapp.com/signup': 
    'POST endpoint - register a user. Requires username and password in fetch body.',
  },
  'Endpoint 2': {
    'https://ahabit-tracker.herokuapp.com/signin': 
    'POST endpoint- login by finding user in database based on username and password. Requires username and password in fetch body.',
  },
  'Endpoint 3': {
    'https://ahabit-tracker.herokuapp.com/habits': 
    'GET endpoint - gives access to the users habits if access token is valid. Requires sending access token in the fetch headers to authenticate user.',
  },
  'Endpoint 4': {
    'https://ahabit-tracker.herokuapp.com/habits': 
    'POST endpoint - creates a habit for a particular user. Requires sending access token in the fetch headers to authenticate user and title (habits title/description) and duration (combination of totalDays and frequency) sent in the fetch body.',
  },
  'Endpoint 5': {
    'https://ahabit-tracker.herokuapp.com/habits/:id': 
    'DELETE endpoint - deletes a specified habit for that user. Requires sending access token in the fetch headers to authenticate user and habit id in the path.',
  },
  'Endpoint 6': {
    'https://ahabit-tracker.herokuapp.com/habits/:id': 
    'PATCH endpoint - updates a specified habit for that user. Requires sending access token in the fetch headers to authenticate user, habit id in the path and properties to be updated: title (habits title/description), duration (combination of totalDays and frequency), progress sent in the fetch body.'
  }
}

app.get('/', (req, res) => {
  res.send(documentation)
})

app.post('/signup', async (req, res) => {
  const { username, password } = req.body
  try {
    const salt = bcrypt.genSaltSync()
    const newUser = await new User({
      username,
      password: bcrypt.hashSync(password, salt),
    }).save()
    res.json({
      success: true,
      userID: newUser._id,
      username: newUser.username,
      accessToken: newUser.accessToken
    })
  } catch (error) {
    res.status(400).json({ success: false, message: 'Username or email already exist', error })
  }
})

app.post('/signin', async (req, res) => {
  const { username, password } = req.body

  try {
    const user = await User.findOne({ username: username })
    if (user && bcrypt.compareSync(password, user.password)) {
      res.json({
        success: true, 
        user_id: user._id,
        username: user.username,
        accessToken: user.accessToken
      })
    } else {
      res.status(404).json({ success: false, message: 'Incorrect username or password' })
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request. Please try again', error })
  }
})

// POST endpoint adding a new habit with collaborators
app.post('/habits/collaborators', authenticateUser)
app.post('/habits/collaborators', async (req, res) => {
  const { title, totalDays, startDate, endDate, collaborator } = req.body
  const { _id }= req.user
  
  try {
    const user = await User.findById(_id)

    const newHabit = await new Habit({ title, duration: {totalDays, startDate, endDate}, collaborators: [{user_id: user}, {user_id: collaborator}] }).save()
    res.json({
      success: true, 
      newHabit
    })

  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid request', error })
  }
})

// POST endpoint adding a new habit whithout collaborators
app.post('/habits', authenticateUser)
app.post('/habits', async (req, res) => {
  const { title, totalDays, startDate, endDate } = req.body
  const { _id }= req.user
  
  try {
    const user = await User.findById(_id)

    const newHabit = await new Habit({ title, duration: {totalDays, startDate, endDate}, collaborators: [{user_id: user}] }).save()
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

  const userHabits = await Habit.find({'collaborators.user_id': _id})
    .sort({createdAt: -1 })
    .populate({ 
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

//GET endpoint to get all users
app.get('/users', authenticateUser)
app.get('/users', async (req, res) => {
  let usersArray = []

  try {
    const users = await User.find()
    for (const user of users) {
      usersArray.push({ value: user.username.toLowerCase(), label: user.username }) 
    }
    res.status(201).json({ success: true, usersArray })
  } catch (error) {
    res.status(400).json({ success: false, message: 'Could not get users', error })
  }
})

//GET endpoint to get user by username
app.get('/users/:username', authenticateUser)
app.get('/users/:username', async (req, res) => {
  const { username } = req.params
  
  try {
    const user = await User.findOne({ username: username })
    if(user) {
      res.json({
        success: true,
        user
      })
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid request', error })
  } 
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
  const { title, totalDays, startDate, endDate, collaborator  } = req.body
  
  try {
    const updatedHabit = await Habit.findByIdAndUpdate(
      id,
      { 
        title,
        duration: { 
          totalDays, 
          startDate, 
          endDate  
        },
        collaborators: { //something going on here 
          $push: {
            "user_id": collaborators._id
          } 
        }
      }, 
      {
        new: true
      }
    )
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

//PATCH endpoint to update checkedCheckbox array
app.patch('/habits/:id/checkbox', authenticateUser)
app.patch('/habits/:id/checkbox', async (req, res) => {
  const { id } = req.params //Habit id
  const { _id } = req.user
  const { checkboxMode } = req.query
  const { checkboxId } = req.body
  
  try {
    let updatedHabit = {}
    if(checkboxMode === 'decrease') {
      const updatedCheckboxArray = await Habit.findOneAndUpdate(
        { _id: id, "collaborators.user_id": _id },
        { 
          $pull: { 
            "collaborators.$.checkedCheckbox": checkboxId
          }
        },
        {
          new: true
        }
      )
      updatedHabit = updatedCheckboxArray

    } else if (checkboxMode === 'increase') {
      const updatedCheckboxArray = await Habit.findOneAndUpdate(
        { _id: id, "collaborators.user_id": _id },
        { 
          $push: { 
            "collaborators.$.checkedCheckbox": checkboxId
          }
        },
        {
          new: true
        }
      )
      updatedHabit = updatedCheckboxArray
    }
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
