const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const qr = require('qr-image'); 
const fs = require('fs');
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug')

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
})

app.post('/', (req, res) => {
    const url = req.body.Url;
    res.render('index', { url: '/qr_img.png' });

    try {

        var qr_svg = qr.image(url);
        qr_svg.pipe(fs.createWriteStream('./public/qr_img.png'));

    } catch (error) {

        if (error.isTtyError) {
            // Prompt couldn't be rendered in the current environment
        } else {
            // Something else went wrong
        }

    }

})


app.listen(port, () => {
    console.log('http://localhost:' + port);
})
