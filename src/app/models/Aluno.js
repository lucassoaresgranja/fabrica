const { age, date } = require("../../lib/utils");
const db = require("../../config/db");

module.exports = {
  queryFindPersonalizada(callback) {
    db.query(
      `SELECT alunos.*, count(disciplinas) AS total_alunos
     FROM alunos
     LEFT JOIN disciplinas ON (alunos.id = disciplinas.aluno_id) 
     GROUP BY alunos.id
     ORDER BY total_alunos DESC`,
      function (err, results) {
        if (err) throw `Database Error ${err}`;
        callback(results.rows);
      }
    );
  },
  // Traz er tudo da tabela alunos
  all(callback) {
    db.query(`SELECT * FROM alunos ORDER BY nome_completo ASC`, function (
      err,
      results
    ) {
      if (err) throw `Database Error ${err}`;
      callback(results.rows);
    });
  },
  create(data, callback) {
    const query = `
        INSERT INTO alunos (
          avatar_url,
          nome_completo,
          matricula,
          email,
          telefone,
          cargo,
          data_nascimento
        ) VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id
   `;

    const values = [
      data.avatar_url,
      data.nome_completo,
      data.matricula,
      data.email,
      data.telefone,
      data.cargo,
      date(data.data_nascimento).iso,
      //data(data_nascimento).iso,
      //date(data.birth).iso,
      //date(Date.now()).iso,
    ];

    db.query(query, values, function (err, results) {
      if (err) throw `Database Error ${err}`;
      callback(results.rows[0]);
    });
  },
  find(id, callback) {
    db.query(
      `
        SELECT * 
        FROM alunos WHERE id = $1`,
      [id],
      function (err, results) {
        if (err) throw `Database Error ${err}`;
        callback(results.rows[0]);
      }
    );
  },
  findBy(filter, callback) {
    db.query(
      `SELECT alunos.*, count(disciplinas) AS total_alunos
      FROM alunos
      LEFT JOIN disciplinas ON (alunos.id = disciplinas.aluno_id)
      WHERE alunos.nome_completo ILIKE '%${filter}%'
      GROUP BY alunos.id
      ORDER BY total_alunos DESC`,
      function (err, results) {
        if (err) throw `Database Error ${err}`;
        callback(results.rows);
      }
    );
  },
  findByNomeAtendimento(filter, callback) {
    db.query(
      `SELECT alunos.*, count(disciplinas) AS total_alunos
      FROM alunos
      LEFT JOIN disciplinas ON (alunos.id = disciplinas.aluno_id)
      WHERE alunos.nome_completo ILIKE '%${filter}%'
      OR alunos.telefone ILIKE '%${filter}%' 
      GROUP BY alunos.id
      ORDER BY total_alunos DESC`,
      function (err, results) {
        if (err) throw `Database Error ${err}`;
        callback(results.rows);
      }
    );
  },
  update(data, callback) {
    const query = `
        UPDATE alunos SET
            avatar_url=($1),
            nome_completo=($2),
            matricula=($3),
            email=($4),
            telefone=($5),
            cargo=($6),
            data_nascimento=($7)
        WHERE id = $8
        `;

    const values = [
      data.avatar_url,
      data.nome_completo,
      data.matricula,
      data.email,
      data.telefone,
      data.cargo,
      date(data.data_nascimento).iso,
      data.id,
    ];

    db.query(query, values, function (err, results) {
      if (err) throw `Database Error ${err}`;
      callback();
    });
  },
  delete(id, callback) {
    db.query(`DELETE FROM alunos WHERE id = $1`, [id], function (
      err,
      results
    ) {
      if (err) throw `Database Error ${err}`;
      return callback();
    });
  },
  paginate(params) {
    const { filter, limit, offset, callback } = params;
    let query = "",
      filterQuery = "",
      totalQuery = `(
                      SELECT count(*) FROM alunos
                    ) AS total`;
    if (filter) {
      filterQuery = `
      WHERE alunos.nome_completo ILIKE '%${filter}%'
     OR alunos.email ILIKE '%${filter}%'
      `;

      totalQuery = `(
                      SELECT count(*) FROM alunos
                      ${filterQuery}
                    ) AS total`;
    }

    query = ` SELECT alunos.*, ${totalQuery}, count(disciplinas) AS total_alunos
              FROM alunos
              LEFT JOIN disciplinas ON (alunos.id = disciplinas.aluno_id)
              ${filterQuery}
              GROUP BY alunos.id LIMIT $1 OFFSET $2`;

    db.query(query, [limit, offset], function (err, results) {
      if (err) throw "Database ERRO";
      callback(results.rows);
    });
  },
};
