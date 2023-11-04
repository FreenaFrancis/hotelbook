// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcrypt');  // Import bcryptjs for password hashing
// const User = require('../models/user');

// // Register a new user
// router.post('/register', async (req, res) => {
//   const { name, email, password } = req.body;

//   try {
//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({ name, email, password: hashedPassword });
//     const user = await newUser.save();
//     res.send('User registered successfully');
//   } catch (error) {
//     return res.status(400).json({ error: error.message });
//   }
// });

// // User login
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (user) {
//       const isPasswordValid = await bcrypt.compare(password, user.password);

//       if (isPasswordValid) {
//         const temp = {
//           name: user.name,
//           email: user.email,
//           isAdmin: user.isAdmin,
//           _id: user._id
//         };
//         res.json(temp);
//       } else {
//         return res.status(400).json('Login failed');
//       }
//     } else {
//       return res.status(400).json('Login failed');
//     }
//   } catch (error) {
//     return res.status(400).json({ error: error.message });
//   }
// });

// router.get('/getallusers',async(req,res)=>{
//   try{
// const users = await User.find()
// res.send(users)
//   }catch(error){
// return res.status(400).json({error})
//   }
// })
// module.exports = router;



const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');  // Import bcrypt for password hashing
const User = require('../models/user');

// Register a new user
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if the user with the same email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save(); // Use await to ensure user is saved
    res.send('User registered successfully');
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// User login
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (user) {
//       const isPasswordValid = await bcrypt.compare(password, user.password);

//       if (isPasswordValid) {
//         const userResponse = {
//           name: user.name,
//           email: user.email,
//           isAdmin: user.isAdmin,
//           _id: user._id
//         };
//         res.json(userResponse);
//       } else {
//         return res.status(400).json('Login failed');
//       }
//     } else {
//       return res.status(400).json('Login failed');
//     }
//   } catch (error) {
//     return res.status(400).json({ error: error.message });
//   }
// });
// User login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        const userResponse = {
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          _id: user._id
        };
        res.json(userResponse);
      } else {
        return res.status(400).json({ error: 'Incorrect password' });
      }
    } else {
      return res.status(400).json({ error: 'User not found' });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});


router.get('/getallusers', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

module.exports = router;
