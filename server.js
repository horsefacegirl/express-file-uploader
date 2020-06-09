const express = require('express');
const fileUpload = require('express-fileupload');

const port = process.env.PORT || 8000;
const app = express();

app.use(fileUpload());

// Routes
app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ msg: "No files uploaded."});
  }

  const file = req.files.file;
  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    if(err) {
      console.error(err)
      return res.status(500).send(err)
    }
    res.json({fileName: file.name, filePath: `/uploads/${file.name}`})
  })
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
})