const pluginManager = require('../pluginManagerInstance');   

// Mock messages table database
// This should be replaced with a real database connection
const messages = [];

// Get all messages
exports.getMessages = (req, res) => {
  res.status(200).json(messages);
};

// Send a new message
exports.sendMessage = async (req, res) => {
  const { message, user } = req.body;
  if (!message || !user) {
    return res.status(400).send('Bad request, invalid input');
  }

  const newMessage = {
    message,
    user,
    timestamp: new Date().toISOString()
  };

  messages.push(newMessage);

  // Create a context for the plugins
  const context = { newMessage };

  try {
    
    // Pass the message to plugins
    await pluginManager.handleMessage(newMessage, context);

    // Check for response in the context
    if (context.response) {
      return res.status(200).send({ 'message': context.response}); 
    }
  
    res.status(204).send('Message sent successfully'); // Default response
  } catch (error) {
    res.status(500).send('Internal Server Error'); // Handle plugin errors
  }
};