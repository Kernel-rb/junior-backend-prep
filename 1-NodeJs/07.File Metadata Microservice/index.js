var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer = require("multer");
const upload = multer();


var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});


app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
    const name = req.file.originalname;
    const type = req.file.mimetype;
    const size = req.file.size;
    try {
        res.json(
            {
                name: `${name}`,
                type: `${type}`,
                size: `${size}`
            }
        )
    } catch (err) {
        console.log(err);
        return;
    }
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log('Your app is listening on port ' + port)
});
