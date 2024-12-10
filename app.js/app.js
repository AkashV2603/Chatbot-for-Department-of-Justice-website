const express = require('express');
const jwt = require('jsonwebtoken'); // JWT for user authentication
const multer = require('multer'); // Multer for file upload handling
const path = require('path'); // Path module to manage file paths
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directory where files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Create a unique filename
  }
});

const upload = multer({ storage: storage });

// Existing route: GET for home
app.get('/', (req, res) => {
  res.send('Welcome to the DOJ Chatbot API!');
});

// POST route to submit a document with file upload
app.post('/submit-document', upload.single('document'), (req, res) => {
  const { userId } = req.body;

  // Validate the input
  if (!userId) {
    return res.status(400).json({ error: 'Invalid input. Please provide a userId.' });
  }

  // Handle file upload
  if (!req.file) {
    return res.status(400).json({ error: 'Please upload a document.' });
  }

  // File information is available in req.file
  const documentPath = path.join(__dirname, 'uploads', req.file.filename);

  res.json({
    message: `Document received from user ${userId}.`,
    documentPath: documentPath,
    status: 'success',
  });
});

// Example POST route for chatbot inquiries (without modification)
app.post('/inquiry', (req, res) => {
  const { userId, question } = req.body;

  // Validate the input
  if (!userId || !question) {
    return res.status(400).json({ error: 'Invalid input. Please provide both userId and question.' });
  }

  const responseMessage = `Received inquiry from user ${userId}: "${question}".`;

  res.json({
    response: responseMessage,
    status: 'success'
  });
});

// GET route to retrieve case status by case ID
app.get('/case-status/:caseId', (req, res) => {
  const caseId = req.params.caseId;

  // Mock case status data
  const caseStatus = {
    caseId: caseId,
    status: 'Under Investigation',
    update: `The case with ID ${caseId} is currently being reviewed.`,
  };

  res.json(caseStatus);
});

// POST route for user login with JWT authentication
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Dummy authentication logic (replace with real authentication)
  if (username === 'admin' && password === 'password') {
    // Generate a token
    const token = jwt.sign({ username }, 'your_jwt_secret', { expiresIn: '1h' });
    return res.json({ token });
  }

  // If authentication fails
  res.status(401).json({ error: 'Invalid credentials' });
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.post('/submit-document', (req, res) => {
  try {
    const { userId, document } = req.body;

    if (!userId || !document) {
      return res.status(400).json({ error: 'Invalid input. Please provide both userId and document.' });
    }

    res.json({ message: `Document received from user ${userId}.`, status: 'success' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid JSON format' });
  }
});

