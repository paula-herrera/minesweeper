const express = require('express');

const app = express();
const PORT = 2000;

app.use(express.json());

app.use(express.static(__dirname + './build'));

app.listen(PORT, () => console.log(`listening on port ${PORT}`))