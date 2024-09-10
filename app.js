const express = require('express');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Simple GET route
app.get('/', (req, res) => {
  res.send('Welcome to the DOJ Chatbot API!');
});

// POST route for chatbot inquiries
app.post('/inquiry', (req, res) => {
  const { userId, question } = req.body;
  const responseMessage = `Received inquiry from user ${userId}: "${question}".`;

  res.json({
    response: responseMessage
  });
});

// GET route for case status (e.g., for DOJ case updates)
app.get('/case-status/:caseId', (req, res) => {
  const caseId = req.params.caseId;
  const caseStatus = {
    status: "In Progress",
    details: `The case with ID ${caseId} is currently under investigation.`
  };

  res.json(caseStatus);
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const express = require('express');
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// POST route to handle user inquiries
app.post('/inquiry', (req, res) => {
  const { userId, question } = req.body;

  // Respond back with the data received
  res.json({
    message: `Received inquiry from user ${userId}: "${question}".`,
    status: 'success'
  });
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
