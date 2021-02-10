const express = require('express');
const connectDB = require('./db');

const app = express();
//connect db
connectDB();
//Init Middlewaer
app.use(express.json({ extended: false }));

app.get('/', (req, res) => 
	res.json({msg:'Hello World'})
)

//Define routes
app.use('/api/users', require('./routes/users'))
app.use('/api/projects', require('./routes/projects'))


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

module.exports = app;