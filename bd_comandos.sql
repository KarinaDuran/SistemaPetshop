CREATE TABLE usuarios(

                email VARCHAR(200),

                nome VARCHAR(200),

                telefone VARCHAR(200),

                senha VARCHAR(200),

                PRIMARY KEY(email)

                               );


CREATE TABLE IF NOT EXISTS animais(
	id_animal int NOT NULL AUTO_INCREMENT,
	email VARCHAR(200),
	 especie_do_animal VARCHAR(200),

                nome_do_animal VARCHAR(200),

                porte_do_animal VARCHAR(200),

                raca_do_animal VARCHAR(200),
		PRIMARY KEY(id_animal),
		FOREIGN KEY(email) REFERENCES usuarios(email)


);



INSERT INTO usuarios(email,senha) VALUES(administrador@gmail.com, "$2b$10$zHEacGta51C2rN2hO71A3O4yF.oO487pljK.pSNMhTDXvXbnjg60K");

 

 

CREATE TABLE IF NOT EXISTS agendamento(
        id_Agendamento int NOT NULL AUTO_INCREMENT,
		email VARCHAR(200),
        horario VARCHAR(200),
        dia DATE,
        fk_id_animal int,
		PRIMARY KEY(id_Agendamento),
		FOREIGN KEY(email) REFERENCES usuarios(email),
        FOREIGN KEY(fk_id_animal) REFERENCES animais(id_animal)
);



 

-------Todos os agendamentos----------

SELECT a.email, a.nome, a.telefone, b.especie_do_animal, b.nome_do_animal, b.porte_do_animal, b.raca_do_animal, c.horario

                from usuarios a 

                               inner join animais b

                on a.email = b.email
				inner join agendamento c
		on a.email = c.email

                               where horario >= now();

 

-------Agendamentos de uma data até outra ---------


SELECT a.email, a.nome, a.telefone, b.especie_do_animal, b.nome_do_animal, b.porte_do_animal, b.raca_do_animal, c.horario

                from usuarios a 

                               inner join animais b

                on a.email = b.email
				inner join agendamento c
		on a.email = c.email

                               where horario >= {0} AND <= {1};---Inserir os horarios

 

--------Histórico de todos-------------

 

SELECT a.email, a.nome, a.telefone, b.especie_do_animal, b.nome_do_animal, b.porte_do_animal, b.raca_do_animal, c.horario

                from usuarios a 

                               inner join animais b

                on a.email = b.email
				inner join agendamento c
		on a.email = c.email

                               where horario < now();

 

-------Historico de uma data a outra ----------

SELECT a.email, a.nome, a.telefone, b.especie_do_animal, b.nome_do_animal, b.porte_do_animal, b.raca_do_animal, c.horario

                from usuarios a 

                               inner join animais b

                on a.email = b.email
				inner join agendamento c
		on a.email = c.email

                               where horario >= {0} AND <= {1};

 

 

 

--------Verificar se o email ja existe------

SELECT email FROM usuarios

 WHERE email = {0}--Inserir o email aqui

 

---------Inserir se o email não existir --------

INSERT INTO usuarios VALUES ({0},{1},{2},{3}) -- Valores do cadastro

 

--------Verificar se o horário já esta agendado --------

SELECT horario FROM agendamento

where (horario >= {0} AND horario < DATE_ADD({0}, INTERVAL 1 HOUR))
				OR (horario <={0} AND DATE_ADD(horario, INTERVAL 1 HOUR) >= {0}) ---Inserir o horario desejado aqui

 

--------Depois da verificação inserir no banco---------

INSERT INTO agendamento VALUES ({0}, {1}) --Inserir email e horario



--Visualização pelo usuário -----

SELECT horario FROM agendamento

                WHERE email = {0}

 

----Deletar horario (tanto pro usuario como pro administrador) -------

DELETE FROM agendamento WHERE horario = {0}

 
