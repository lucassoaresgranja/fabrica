const { age, date } = require("../../lib/utils");
const Disciplina = require("../models/Disciplina");

module.exports = {
  index(req, res) {
    const { filter } = req.query;

    if (filter) {
      Disciplina.findByDisciplina(filter,function(disciplinas){
        return res.render("disciplinas/index", { disciplinas, filter });
      });
    } else {
      Disciplina.all(function (disciplinas) {
        return res.render("disciplinas/index", { disciplinas });
      });
    }
  },
  
  indexPagination(req, res) {
    
    let {filter, page, limit} = req.query;

    page = page || 1;
    limit = limit || 2;
    let offset = limit * (page - 1);

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(disciplinas){
        const pagination = { 
          total: Math.ceil(disciplinas[0].total / limit),
          page
        }
        return res.render("disciplinas/index",{ disciplinas, pagination, filter})
      }
    }

    Disciplina.paginate(params); 
  },
  create(req, res) {
    Disciplina.alunosSelectionOption(function (options) {
      return res.render("disciplinas/create", { alunoOptions: options });
    });
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Preencha todos os Campos");
      }
    }

    Disciplina.create(req.body, function (disciplina) {
      return res.redirect(`/disciplinas/${disciplina.id}`);
    });
  },
  show(req, res) {
    Disciplina.findComAluno(req.params.id, function (disciplina) {
      if (!disciplina) return res.send("Disciplinas not Found");
      //disciplina.birth = date(disciplina.birth).birthDay;
      return res.render("disciplinas/show", { disciplina });
    });
  },
  edit(req, res) {
    Disciplina.find(req.params.id, function (disciplina) {
      if (!disciplina) return res.send("Disciplinas not Found");
      //disciplina.birth = date(disciplina.birth).iso;
      Disciplina.alunosSelectionOption(function (options) {
        return res.render("disciplinas/edit", {
          disciplina,
          alunoOptions: options,
        });
      });
    });
  },
  put(req, res) {
    Disciplina.update(req.body, function () {
      return res.redirect(`/disciplinas/${req.body.id}`);
    });
  },
  delete(req, res) {
    Disciplina.delete(req.body.id, function () {
      return res.redirect(`/disciplinas/`);
    });
  },
};
