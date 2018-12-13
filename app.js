
const express = require('express');
const bodyParser = require('body-parser');

const { PORT, CONFIRMATION } = require("./config"); 
const processing = require("./processing.js");


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/", (req, res) => {
    const { body } = req;

    switch (body.type) {
        case "confirmation" :
            res.end(CONFIRMATION);
            break;

        case "message_new" :

            // console.log(body);
            console.log(body.object.text);
            // console.log(body.object.attachments);
            // if(body.object.attachments[0].type)
            processing(body.object);
            
            res.end("ok");
            break;
        
        default:
            res.end("ok");
            break;
    } 
});

app.listen(PORT);
