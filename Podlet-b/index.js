const express = require('express');
const Podlet = require('@podium/podlet');

const app = express();

const bpodlet = new Podlet({
    name: 'bPodlet',
    version: '1.0.0',
    pathname: '/',
    content: '/',
    development: true,
});

app.use(bpodlet.middleware());

app.use("/js", express.static('js/'));
bpodlet.js({ value: '/js/podletb.js' , defer: true});
app.use("/css", express.static('css/'));
bpodlet.css({ value: '/css/podletb.css' });

app.get(bpodlet.content(), (req, res) => {
    res.status(200).podiumSend(`
    <div id="podletb-main">
      B
    </div>
    `);
});

app.get(bpodlet.manifest(), (req, res) => {
    res.status(200).send(bpodlet);
});

app.listen(6101);