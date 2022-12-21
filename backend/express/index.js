const express = require('express');
const cors = require('cors');

const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/task', require('./routes/task'));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
