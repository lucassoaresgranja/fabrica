const express = require('express');
const routes = express.Router();
const instructors = require('./app/controllers/instructors');
const members = require('./app/controllers/members');
const alunos = require('./app/controllers/alunos');
const disciplinas = require('./app/controllers/disciplinas');

routes.get('/', function(req, res){
    return res.redirect("/alunos")
})


routes.get('/alunos', alunos.index);
routes.get('/alunos/create',alunos.create);
routes.get('/alunos/:id',  alunos.show);
routes.get('/alunos/:id/edit/', alunos.edit);
routes.post("/alunos", alunos.post);
routes.put("/alunos", alunos.put);
routes.delete("/alunos",alunos.delete); 

/*
routes.get('/instructors', instructors.index);
routes.get('/instructors/create',instructors.create);
routes.get('/instructors/:id',  instructors.show);
routes.get('/instructors/:id/edit/', instructors.edit);
routes.post("/instructors", instructors.post);
routes.put("/instructors", instructors.put);
routes.delete("/instructors",instructors.delete); 
*/

// HTTP  VERBS 
// GET : RECEBER --> RESOURCE
//POST : CRIAR UM NOVO RESOURCE COM DADOS ENVIADOS
//PUT : ATUALIZAR RESOURCE
//DELETE : DELETAR RESOURCE



/*Members*/ 

routes.get('/disciplinas', disciplinas.index);
routes.get('/disciplinas/create',disciplinas.create);
routes.get('/disciplinas/:id',  disciplinas.show);
routes.get('/disciplinas/:id/edit/', disciplinas.edit);
routes.post("/disciplinas", disciplinas.post);
routes.put("/disciplinas", disciplinas.put);
routes.delete("/disciplinas",disciplinas.delete); 


/*Members*/ 
/*
routes.get('/members', members.indexPagination);
routes.get('/members/create',members.create);
routes.get('/members/:id',  members.show);
routes.get('/members/:id/edit/', members.edit);
routes.post("/members", members.post);
routes.put("/members", members.put);
routes.delete("/members",members.delete); 
*/

module.exports = routes;

