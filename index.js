//---   Imports   ---
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser());
const cors = require('cors')
const corsOptions = {
    origin: 'localhost:3000',
    optionsSuccessStatus: 200
}
app.use(cors())

const db = require('quick.db');

//---   Start The Server   ---         
app.listen(8090, () => console.log("Listening...")); 


//---   functions   ---//
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}


//---   Redirect Pages Correctly   ---
app.post('/new', cors(corsOptions), (req, res) => {
    const {title, body} = req.body
    const postData = {
        title: title,
        body: body,
        id: makeid(6),
    };
    db.set(`posts.${postData.id}`, postData);
    res.send(postData.id);
});

app.get('/view', cors(corsOptions), (req, res) => {
    const data = db.all()
    res.send(data);
});