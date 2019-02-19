const express = require('express');
const app = express();

app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.render('dist/index.html');
});

const PORT = 8888;

app.listen(PORT, () => {
  console.log(`SALES HECTA is running on port ${PORT}`);
});
