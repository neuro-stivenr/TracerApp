const express = require('express');
const app = express();
const PORT = 5656;

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.redirect('/app.html')
});

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));