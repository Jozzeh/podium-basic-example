const express = require('express');
const Podlet = require('@podium/podlet');

const app = express();

const podlet = new Podlet({
    name: 'aPodlet',
    version: '1.0.0',
    pathname: '/',
    content: '/',
    development: true,
});

app.use(podlet.middleware());

app.use("/js", express.static('js/'));
podlet.js({ value: '/js/podleta.js' , defer: true});
app.use("/css", express.static('css/'));
podlet.css({ value: '/css/podleta.css' });

app.get(podlet.content(), (req, res) => {
    res.status(200).podiumSend(`
    <div id="podleta-main">
      A
    </div>
    `);
});

app.get(podlet.manifest(), (req, res) => {
    res.status(200).send(podlet);
});

app.listen(6100);