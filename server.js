const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose.connect('mongodb+srv://ZAKA:ZAKASATTI11@oetcluster.zkoaqcg.mongodb.net/OET_DB')
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ Connection Error:', err));

// ✅ Import All Models
const models = {
  Subject: require('./models/Subject'),
  UserEducation: require('./models/UserEducation'),
  PersonalInfo: require('./models/PersonalInfo'),
  InstituteInfromation: require('./models/InstituteInformation'),
  TestPrep: require('./models/TestPrep'),
  Department: require('./models/Department'),
  EntryTest: require('./models/EntryTest'),
  UserModel: require('./models/UserModel')
};

// ✅ Auto CRUD Route Generator
function generateCrudRoutes(model, routePath) {
  app.get(`/${routePath}`, async (req, res) => {
    try {
      const items = await model.find();
      res.json(items);
    } catch (err) {
      res.status(500).json({ message: `Error getting ${routePath}`, err });
    }
  });

  app.post(`/${routePath}`, async (req, res) => {
    try {
      const newItem = new model(req.body);
      await newItem.save();
      res.json({ message: `${routePath} added`, newItem });
    } catch (err) {
      res.status(500).json({ message: `Error posting to ${routePath}`, err });
    }
  });

  app.delete(`/${routePath}/:id`, async (req, res) => {
    try {
      await model.findByIdAndDelete(req.params.id);
      res.json({ message: `${routePath} deleted` });
    } catch (err) {
      res.status(500).json({ message: `Error deleting from ${routePath}`, err });
    }
  });
}

// ✅ Apply Routes to All Models
generateCrudRoutes(models.Subject, 'subjects');
generateCrudRoutes(models.UserEducation, 'usereducation');
generateCrudRoutes(models.PersonalInfo, 'personal-information');
generateCrudRoutes(models.InstituteInfromation, 'institute-infromation'); // Optional: merge/fix naming
generateCrudRoutes(models.TestPrep, 'testprep');
generateCrudRoutes(models.Department, 'departments');
generateCrudRoutes(models.EntryTest, 'entry-tests');
generateCrudRoutes(models.UserModel, 'users');

// ✅ Authentication Routes
app.post('/register', async (req, res) => {
  try {
    const user = new models.UserModel(req.body);
    await user.save();
    res.json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Registration error', err });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await models.UserModel.findOne({ email, password });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Login error', err });
  }
});

// ✅ Utility Routes
app.get('/', (req, res) => {
  res.send('🎓 University Entry Test API is running!');
});

app.get('/debug-collections', async (req, res) => {
  const collections = await mongoose.connection.db.listCollections().toArray();
  res.send(collections.map(col => col.name));
});

// ✅ Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is live on http://localhost:${PORT}`);
});
