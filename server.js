const express = require('express');

const app = express();

app.use(express.json());

app.use('/api/complaints',require('./routes/api/complaints'));

const PORT = process.env.PORT || 5000;

app.listen(PORT,() => console.log(`Server started on ${PORT}`));
