const express = require("express");
const multer = require("multer");
const upload = multer({dest: 'uploads/'});
const authRoutes = require("./routes/auth");
const cookieParser = require("cookie-parser");
const cors = require("cors")

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors())

app.use(authRoutes);

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
