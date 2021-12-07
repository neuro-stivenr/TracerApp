const fs = require('fs');
const https = require('https')
const express = require('express');
const tableify = require('tableify')

const app = express();

const doselib = require('./doselib');
const doselimit = require('./doselimit.json')
const doseinfo = require('./doseinfo.json')
const config = require('./config.json')

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    console.log(`\nGET on / by ${req.ip} -> redirecting to /app.html`)
    res.redirect('/app.html')
});

app.post('/api/tracers', (req, res) => {
    console.log(`\nPOST on /api/tracers by ${req.ip} -> returning report`)
    pt_exposure = doselib.calc_exposure(req.body, doseinfo)
    htmltable = doselib.tabulate_exposure(pt_exposure, doselimit)
    res.setHeader('Content-Type', 'text/html')
    res.send(htmltable)
})

if (config.do_ssl) {
    (fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')) || 
        console.error('ERROR: Either set do_ssl to false or run `make ssl` in terminal.\n')
    const sslkey = fs.readFileSync('./key.pem')
    const sslcert = fs.readFileSync('./cert.pem')
    https.createServer({
        key: sslkey,
        cert: sslcert,
        passphrase: process.env.TRACER_APP_PASS
    }, app).listen(config.PORT, () => console.log(`Listening on port: ${config.PORT}`));
} else {
    app.listen(config.PORT, () => console.log(`Listening on port: ${config.PORT}`))
}

