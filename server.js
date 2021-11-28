const express = require('express');
const app = express();
const PORT = 5656;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    console.log(`GET on / by ${req.ip} -> redirecting to /app.html`)
    res.redirect('/app.html')
});

app.post('/api/tracers', (req, res) => {
    console.log(`POST on /api/tracers by ${req.ip} -> redirecting to /report.html`)
    console.log(req.body)
    res.redirect('/report.html')
})

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));