CREATE TABLE "alunos" (
  "id" SERIAL PRIMARY KEY,
  "avatar_url" text,
  "nome_completo" text,
  "matricula" text,
  "data_nascimento" int,
  "email" text,
  "telefone" text,
  "cargo" text
);

CREATE TABLE "disciplinas" (
  "id" SERIAL PRIMARY KEY,
  "diciplina" text,
  "bimestre" text,
  "valor_nota" decimal,
  "aluno_id" int
);

CREATE TABLE "contra_cheque" (
  "id" SERIAL PRIMARY KEY,
  "mes_referencia" date,
  "ano_referencia" date,
  "salario_bruto" decimal,
  "auxilio_saude" boolean,
  "auxilio_alimentacao" boolean,
  "auxilio_transporte" boolean,
  "desconto_ir" decimal,
  "desconto_oportunidade" decimal,
  "aluno_id" int
);
