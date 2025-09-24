import React, { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard() {
  const [nomeAluno, setNomeAluno] = useState('');
  const [progresso, setProgresso] = useState(0); // Percentual de progresso
  const [pontos, setPontos] = useState(0); // Pontuação total

  useEffect(() => {
    // Simula a recuperação dos dados do aluno logado
    // Substituir por API real no futuro
    const alunoMock = {
      nome: 'João Silva',
      progresso: 75,
      pontos: 1200,
    };
    setNomeAluno(alunoMock.nome);
    setProgresso(alunoMock.progresso);
    setPontos(alunoMock.pontos);
  }, []);

  return (
    <div className="dashboard-container">
      {/* Cabeçalho */}
      <header className="dashboard-header">
        <h1>Bem-vindo de volta, {nomeAluno}!</h1>
        <p>Continue aprendendo e conquistando seus objetivos!</p>
      </header>

      {/* Resumo de Progresso */}
      <section className="progresso-section">
        <div className="progresso-card">
          <h2>Progresso Geral</h2>
          <div className="progresso-circle">
            <span>{progresso}%</span>
          </div>
          <button>Continuar Aprendendo</button>
        </div>
        <div className="estatisticas-card">
          <h3>Estatísticas Rápidas</h3>
          <ul>
            <li>Aulas Concluídas: 30</li>
            <li>Horas de Estudo: 15h</li>
            <li>Conquistas: 5</li>
          </ul>
        </div>
      </section>

      {/* Missões e Recomendações */}
      <section className="missoes-section">
        <div className="missoes-card">
          <h3>Missão do Dia</h3>
          <p>Complete 2 aulas hoje e ganhe 10 pontos extras!</p>
          <div className="barra-missao">
            <div style={{ width: '50%' }}></div>
          </div>
        </div>
        <div className="recomendacoes-card">
          <h3>Cursos Recomendados</h3>
          <div className="cursos-grid">
            <div className="curso-card">React Avançado</div>
            <div className="curso-card">Python Intermediário</div>
          </div>
        </div>
      </section>

      {/* Feed de Atualizações */}
      <section className="atualizacoes-section">
        <h3>Atualizações Recentes</h3>
        <ul>
          <li>🎉 Novo curso lançado: "JavaScript Avançado".</li>
          <li>🏅 Maria concluiu o curso "Python Básico".</li>
          <li>📅 Próximo workshop: "Criação de Portfólios".</li>
        </ul>
      </section>
    </div>
  );
}

export default Dashboard;