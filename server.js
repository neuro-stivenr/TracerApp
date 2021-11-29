const express = require('express');
const app = express();
const PORT = 5656;
const doselib = require('./doselib');
const tableify = require('tableify')

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    console.log(`\nGET on / by ${req.ip} -> redirecting to /app.html`)
    res.redirect('/app.html')
});

app.post('/api/tracers', (req, res) => {
    console.log(`\nPOST on /api/tracers by ${req.ip} -> returning report`)
    htmltable = tableify(doselib.calc_exposure(req.body))
    res.setHeader('Content-Type', 'text/html')
    res.send(htmltable)
})

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));