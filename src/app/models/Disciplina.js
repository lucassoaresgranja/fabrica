const { age, date } = require("../../lib/utils");
const db = require("../../config/db");

module.exports = {
  // Traz er tudo da tabela disciplinas
  all(callback) {
    db.query(`SELECT * FROM disciplinas ORDER BY nome_disciplina ASC`, function (err, results) {
      if (err) throw `Database Error ${err}`;
      callback(results.rows);
    });
  },
  create(data, callback) {
    const query = `
        INSERT INTO disciplinas (
          nome_disciplina,
          bimestre,
          valor_nota,
          aluno_id
        ) VALUES ($1, $2, $3, $4)
        RETURNING id
   `;

    const values = [
      data.nome_disciplina,
      data.bimestre,
      data.valor_nota,
      data.aluno
    ];

    db.query(query, values, function (err, results) {
      if (err) throw `Database Error ${err}`;
      callback(results.rows[0]);
    });
  },
  findByDisciplina(filter, callback) {
    db.query(`SELECT * FROM disciplinas WHERE disciplinas.nome_disciplina ILIKE '%${filter}%' ORDER BY nome_disciplina ASC`, function (err, results) {
      if (err) throw `Database Error ${err}`;
      callback(results.rows);
    });
  },
  findComAluno(id, callback) {
    db.query(
      `
        SELECT disciplinas.*, alunos.nome_completo AS aluno_nome_completo 
        FROM disciplinas 
        LEFT JOIN alunos ON (disciplinas.aluno_id = alunos.id)
        WHERE disciplinas.id = $1`,
      [id],
      function (err, results) {
        if (err) throw `Database Error ${err}`;
        callback(results.rows[0]);
      }
    );
  },
  findUnicoAluno(id, callback) {
    db.query(
      `
        SELECT disciplinas.*, alunos.nome_completo AS aluno_nome_completo 
        FROM disciplinas 
        LEFT JOIN alunos ON (disciplinas.aluno_id = alunos.id)
        WHERE alunos.id = $1`,
      [id],
      function (err, results) {
        if (err) throw `Database Error ${err}`;
        callback(results.rows[0]);
      }
    );
  },
  find(id, callback) {
    db.query(
      `
        SELECT * 
        FROM disciplinas WHERE id = $1`,
      [id],
      function (err, results) {
        if (err) throw `Database Error ${err}`;
        callback(results.rows[0]);
      }
    );
  },

  update(data, callback) {
    const query = `
        UPDATE disciplinas SET
            nome_disciplina=($1),
            bimestre=($2),
            valor_nota=($3),
            aluno_id=($4)
        WHERE id = $5
        `;

    const values = [
      data.nome_disciplina,
      data.bimestre,
      data.valor_nota,
      data.aluno,
      data.id,
    ];

    db.query(query, values, function (err, results) {
      if (err) throw `Database Error ${err}`;
        callback();
    });
  },
  delete(id, callback){
    db.query(`DELETE FROM disciplinas WHERE id = $1`, [id], function(err, results){
      if (err) throw `Database Error ${err}`;
      return callback();
    })
  },
  alunosSelectionOption(callback){
      db.query(`SELECT nome_completo, id FROM alunos`, function(err, results){
        if (err) throw `Database Error ${err}`
        callback(results.rows);
      });
  },
  paginate(params) {
    const { filter, limit, offset, callback } = params;
    let query = "",
      filterQuery = "",
      totalQuery = `(
                      SELECT count(*) FROM disciplinas
                    ) AS total`;
    if (filter) {
      filterQuery = `
      WHERE disciplinas.nome_completo ILIKE '%${filter}%'
     OR disciplinas.email ILIKE '%${filter}%'
      `;

      totalQuery = `(
                      SELECT count(*) FROM disciplinas
                      ${filterQuery}
                    ) AS total`;
    }

    query = ` SELECT disciplinas.*, ${totalQuery}
              FROM disciplinas
              ${filterQuery}
              LIMIT $1 OFFSET $2`;

    db.query(query, [limit, offset], function (err, results) {
      if (err) throw "Database ERRO";
      callback(results.rows);
    });
  },
};


