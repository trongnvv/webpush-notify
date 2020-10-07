const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors')

const key = {
  publicKey: 'BHAG0y_w1a44bqGJ9Qg79gOnGVb7berSaCkGMUiQyMrCdVU6l4YngLjO_LaNcdavZBqANHhpDxQ6bh8x6DSyDTA',
  privateKey: 'IfnTog7mK_z6eEbVr8RyuPK8rojthJLQWj5p4I9ZnSA'
}


const app = express();
 
app.use(cors())
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client')));

webPush.setVapidDetails('mailto:test@example.com', key.publicKey, key.privateKey);

app.post('/subscribe', (req, res) => {
  const subscription = req.body

  res.status(201).json({});

  const payload = JSON.stringify({
    title: 'Push notifications with Service Workers',
  });

  webPush.sendNotification(subscription, payload)
    .catch(error => console.error(error));
});

app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});