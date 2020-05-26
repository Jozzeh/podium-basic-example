const express = require("express");
const Layout = require("@podium/layout");

const app = express();

const layout = new Layout({
  name: "baseLayout",
  pathname: "/",
});

const apodlet = layout.client.register({
  name: "aPodlet",
  uri: "http://localhost:6100/manifest.json",
});

const bpodlet = layout.client.register({
  name: "bPodlet",
  uri: "http://localhost:6101/manifest.json",
});

app.use(layout.middleware());

app.get("/", async (req, res) => {
  const incoming = res.locals.podium;
  const response = await Promise.all([
    apodlet.fetch(incoming),
    bpodlet.fetch(incoming),
  ]).catch((e) => {
    console.log(e);
  });

  incoming.podlets = response;
  incoming.view.title = "My Base Application";

  res.podiumSend (`<div>${response[0]}</div><div>${response[1]}</div>`);
});

app.listen(7000);
console.log('App running at port 7000');