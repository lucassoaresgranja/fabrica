const { age, date } = require("../../lib/utils");
const Aluno = require("../models/Aluno"); 

module.exports = {
  index(req, res) {

    let {filter, page, limit} = req.query;

    page = page || 1;
    limit = limit || 2;
    let offset = limit * (page - 1);

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(alunos){
        const pagination = { 
          total: Math.ceil(alunos[0].total / limit),
          page
        }
        return res.render("alunos/index",{ alunos, pagination, filter})
      }
    }

    Aluno.paginate(params);
   
    // const { filter } = req.query;
    // if(filter) {
    // Aluno.findByNomeAtendimento(filter, function(alunos){
    //    return res.render("alunos/index",{ alunos, filter })
    //  })
    // } else {
    //  Aluno.queryFindPersonalizada(function(alunos){
    //    return res.render("alunos/index",{ alunos })
    //  })
    //}  
  },
  create(req, res) {
    return res.render("alunos/create");
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Preencha todos os Campos");
      }
    }

    Aluno.create(req.body, function(aluno){
      return res.redirect(`/alunos/${aluno.id}`);
    })

    
  },
  show(req, res) {
    Aluno.find(req.params.id, function(aluno){
        if(!aluno) return res.send("Alunos not Found");
        aluno.age = age(aluno.data_nascimento);
        //aluno.services = aluno.services.split(",");
        //aluno.created_at = date(aluno.created_at).format;
        return res.render("alunos/show", { aluno});
    })
    
  },
  edit(req, res) {
    Aluno.find(req.params.id, function(aluno){
      if(!aluno) return res.send("Alunos not Found");
      aluno.data_nascimento = date(aluno.data_nascimento).iso;
      return res.render("alunos/edit", { aluno});
  })
    return;
  },
  put(req, res) {
    Aluno.update(req.body, function(){
      return res.redirect(`/alunos/${req.body.id}`);
    })
  },
  delete(req, res) {
    Aluno.delete(req.body.id, function(){
      return res.redirect(`/alunos/`);
    })
  },
};
