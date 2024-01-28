const express = require("express");
const connect = require("./db/connection");
const contentRouter=require("./routes/content")
const Content = require("./models/content");
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.listen(port, () => {
  console.log(`connection is setup at ${port}`);
});
connect();
app.use('/files',express.static("files"))
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './files')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null,uniqueSuffix+file.originalname)
  }
})
const upload = multer({ storage: storage });
app.post("/content",upload.single('file'), async (req, res) => {
  try {
    const title=req.body.title;
    const description=req.body.description;
    const authorName=req.body.authorName;
    const email=req.body.email;
    const file=req.file.filename;
    await Content.create({title,description,authorName,email,file});
    res.status(200).send('success');
  } catch (err) {
    res.status(400).send(err);
  }
});
app.use(contentRouter)

