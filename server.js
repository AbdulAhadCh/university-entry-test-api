// ✅ server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// ✅ Import Models
const Institute = require('./models/Institute');
const Department = require('./models/Department');
const Subject = require('./models/Subject');
const UserEducation = require('./models/UserEducation');
const PersonalInfo = require('./models/PersonalInfo');
const InstituteInfo = require('./models/InstituteInfo');
const TestPrep = require('./models/TestPrep');
const User = require('./models/User');
const EntryTest = require('./models/EntryTest');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://ZAKA:ZAKASATTI11@oetcluster.zkoaqcg.mongodb.net/OET_DB')
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// ✅ User model for login/register
const UserModel = mongoose.model('UserModel', {
  name: String,
  email: String,
  password: String,
  role: String
});

// ✅ Utility to generate CRUD routes
function createCrudRoutes(model, routeName) {
  // GET all
  app.get(`/${routeName}`, async (req, res) => {
    try {
      const data = await model.find();
      res.send(data);
    } catch (err) {
      res.status(500).send({ message: `Error fetching ${routeName}`, error: err });
    }
  });

  // POST new
  app.post(`/${routeName}`, async (req, res) => {
    try {
      const item = new model(req.body);
      await item.save();
      res.send({ message: `${routeName} added successfully`, item });
    } catch (err) {
      res.status(500).send({ message: `Error adding ${routeName}`, error: err });
    }
  });

  // DELETE by ID
  app.delete(`/${routeName}/:id`, async (req, res) => {
    try {
      const deleted = await model.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).send({ message: `${routeName} not found` });
      res.send({ message: `${routeName} deleted successfully` });
    } catch (err) {
      res.status(500).send({ message: `Error deleting ${routeName}`, error: err });
    }
  });
}

// ✅ Apply CRUD routes
createCrudRoutes(Subject, 'subjects');
createCrudRoutes(UserEducation, 'usereducation');
createCrudRoutes(PersonalInfo, 'personal_information');
createCrudRoutes(InstituteInfo, 'Institute-Infromation');
createCrudRoutes(TestPrep, 'TestPrep_collection');
createCrudRoutes(User, 'user');
createCrudRoutes(EntryTest, 'entry_Tests');
createCrudRoutes(Department, 'departments');
createCrudRoutes(Institute, 'institutes');

// ✅ Root route
app.get('/', (req, res) => {
  res.send('🎉 University Entry Test API is running!');
});

// ✅ Register route
app.post('/register', async (req, res) => {
  try {
    const user = new UserModel(req.body);
    await user.save();
    res.send({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).send({ message: 'Error registering user', error: err });
  }
});

// ✅ Login route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email, password });
    if (!user) return res.status(401).send({ message: 'Invalid credentials' });
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: 'Error during login', error: err });
  }
});

// 🔍 Debug route for collection names
app.get('/debug-collections', async (req, res) => {
  const collections = await mongoose.connection.db.listCollections().toArray();
  res.send(collections.map(col => col.name));
});

// 🔍 Debug native query route
app.get('/test-native', async (req, res) => {
  const data = await mongoose.connection.db.collection('Institute-Information').find({}).toArray();
  res.send(data);
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
