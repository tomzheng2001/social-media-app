const express = require("express");
const multer = require("multer");
const upload = multer({dest: 'uploads/'});

const PORT = process.env.PORT || 3001;

const app = express();

app.post('/create-post', upload.single('media'), (request, response) => {
    console.log(request.body);
    console.log(request.file);
    response.json({
        'success': true
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
