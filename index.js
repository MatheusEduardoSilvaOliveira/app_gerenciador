const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const Cantor = require("./database/cantor");
const connection = require("./database/database");
const cantorController = require("./src/controllers/cantorController");
const multer = require('multer'); //upload
const sharp = require('sharp');
const fs = require('fs');
//const fs = require('fs'); // importar arquivo para modulo node


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    if (file == undefined) {
      file = null
    }
    else {
      cb(null, Date.now() + '-' + file.originalname)
    }

  }
})
const upload = multer({ storage })

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); //informando para o express para utilizar o EJS como View Engine
app.use(express.static('public')); //carregar CSS, Imagens etc.

connection
  .authenticate()
  .then(() => {
    console.log("Conexão realizada com o banco de dados")
  })
  .catch((msgErro) => {
    console.log(msgErro)
  })

app.use('/', cantorController);

app.post("/salvarCantor", upload.single('img'), (req, res) => {

  console.log(upload.single('img'));

  var nome = req.body.nome;
  var palco = req.body.palco;
  var data = req.body.data;
  var ordem = req.body.ordem;
  var url = req.body.url;
  console.log(nome);
  console.log(data);
  console.log(data.substring(0, 10));
  console.log(palco);
  console.log("REQ" + req.file);
  var imagem;
  if (req.file == null) {
    imagem = ""
  }
  else {
    var imagem = "uploads/" + req.file.filename;
    var binaryData = fs.readFileSync(imagem);
    var base64String = new Buffer.from(binaryData).toString("base64");
  }
  //console.log(base64String);

  if (nome != undefined && palco != undefined && data != undefined && ordem != undefined) {
    Cantor.create({
      cantor_nome: nome,
      cantor_palco: palco,
      cantor_data: data,
      cantor_ordem: ordem,
      cantor_url_img: url,
      cantor_img: base64String
    }).then(() => {
      res.redirect("/");
    });
  }
})

app.listen(port, () => {
  console.log("Servidor rodando na porta: " + port);
})