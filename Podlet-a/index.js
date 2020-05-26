const express = require('express');
const Podlet = require('@podium/podlet');

const app = express();

//create the podlet
const podlet = new Podlet({
    name: 'aPodlet',
    version: '1.0.0',
    pathname: '/',
    content: '/',
    development: true,
});

app.use(podlet.middleware());

//set a static folder 
app.use("/js", express.static('js/'));
//set js url in the podlet data
podlet.js({ value: '/js/podleta.js' , defer: true});

//set a static folder 
app.use("/css", express.static('css/'));
//set css url in the podlet data
podlet.css({ value: '/css/podleta.css' });

//set the HTML... Frontend frameworks usually work with a base-div and a render function.
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