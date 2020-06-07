
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
