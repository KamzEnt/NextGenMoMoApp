const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Users CRUD API',
    endpoints: {
      getAllUsers: 'GET /users',
      getOneUser: 'GET /users/:id',
      createUser: 'POST /users',
      updateUser: 'PUT /users/:id',
      deleteUser: 'DELETE /users/:id'
    }
  });
});

let users = [];
let idCounter = 1;

// Create
app.post('/users', (req, res) => {
  const user = { id: idCounter++, ...req.body };
  users.push(user);
  res.status(201).json(user);
});

// Read all
app.get('/users', (req, res) => {
  res.json(users);
});

// Read one
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

// Update
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  Object.assign(user, req.body);
  res.json(user);
});

// Delete
app.delete('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'User not found' });
  users.splice(index, 1);
  res.status(204).send();
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`CRUD API server running at http://localhost:${port}`);
  });
}

module.exports = { app, port };
