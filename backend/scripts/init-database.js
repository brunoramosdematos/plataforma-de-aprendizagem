const { sequelize } = require('../models'); // Conexão com o Sequelize
const exec = require('child_process').exec;

(async () => {
  try {
    console.log('Verificando a conexão com o banco de dados...');
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados bem-sucedida.');

    console.log('Verificando as tabelas...');
    const tables = await sequelize.getQueryInterface().showAllTables();
    if (tables.length === 0) {
      console.log('Nenhuma tabela encontrada. Executando migrações e seeders...');

      // Executa as migrações
      await new Promise((resolve, reject) => {
        exec('npx sequelize-cli db:migrate', (error, stdout, stderr) => {
          if (error) {
            console.error(`Erro ao executar migrações: ${stderr}`);
            return reject(error);
          }
          console.log(stdout);
          resolve();
        });
      });

      // Executa os seeders em ordem explícita
      const seeders = [
        '20241127225137-AlunoSeeder.js',
        '20241127225218-RecursoAprendizadoSeeder.js',
        '20241127225236-InteracaoSeeder.js',
        '20241127225159-AlunoRecursoSeeder.js',
      ];

      for (const seeder of seeders) {
        console.log(`Executando seeder: ${seeder}`);
        await new Promise((resolve, reject) => {
          exec(`npx sequelize-cli db:seed --seed ${seeder}`, (error, stdout, stderr) => {
            if (error) {
              console.error(`Erro ao executar seeder ${seeder}: ${stderr}`);
              return reject(error);
            }
            console.log(stdout);
            resolve();
          });
        });
      }

      console.log('Migrações e seeders aplicados com sucesso.');
    } else {
      console.log('Tabelas existentes encontradas. Nenhuma ação necessária.');
    }
  } catch (error) {
    console.error('Erro ao inicializar o banco de dados:', error);
    process.exit(1); // Sai com erro para evitar iniciar o backend em estado inválido
  }

  process.exit(0); // Finaliza o script com sucesso
})();