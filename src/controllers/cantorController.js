const express = require('express');
const router = express.Router();
const Cantor = require('../../database/cantor');
const connection = require('../../database/database');

connection
  .authenticate()
  .then(() => {
    console.log("Conexão realizada com o banco de dados")
  })
  .catch((msgErro) => {
    console.log(msgErro)
  })

//comando para listar todas os cantores no index.ejs em ordem descrescente
router.get("/", (req, res) => {
  Cantor.findAll({
    raw: true, order: [
      ['cantor_data',
        'ASC']
    ]
  }).then(cantores => {
    res.render("index", {
      cantores: cantores
    });
  });
})

//jogar informações (id, titulo, descricao) para aba de editarFeed.ejs
router.get('/cantor/editar/:id', (req, res) => {
  var id = req.params.id;

  Cantor.findByPk(id).then(cantores => {
    if (cantores != undefined) {
      res.render('editarCantor', { cantores: cantores });
    }
    else {
      res.redirect('/');
    }
  }).catch(error => {
    res.redirect('/', { cantores: cantores });
  })
})

//comando update
router.post('/cantor/atualizar', (req, res) => {
  var id = req.body.cantor_id;
  var nome = req.body.cantor_nome;
  var palco = req.body.cantor_palco;
  var ordem = req.body.cantor_ordem;
  var data = req.body.cantor_data;

  Cantor.update({ cantor_nome: nome, cantor_palco: palco, cantor_data: data, cantor_ordem: ordem }, {
    where: {
      cantor_id: id
    }
  }).then(() => {
    res.redirect('/');
  })
})

//redirecionar página para cadastrarFeed.ejs
router.get("/cadastrarCantor", (req, res) => {
  res.render("cadastrarCantor"); //carregar a view
})

//redirecionar página para cadastrarFeed.ejs
//router.get('/editarFeed', (req, res) => {
//  res.render('editarFeed');
//})


//deleter um feed
router.post("/cantor/delete", (req, res) => {
  var id = req.body.cantor_id;
  console.log(id);
  if (id != undefined) {
    if (!isNaN(id)) {
      Cantor.destroy({
        where: {
          cantor_id: id
        }
      }).then(() => {
        res.redirect("/");
      })
    } else {
      res.redirect("/");
    }
  } else {
    res.redirect("/");
  }
});

module.exports = router;