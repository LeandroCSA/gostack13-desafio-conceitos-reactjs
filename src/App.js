import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(res => {
      setRepositories(res.data);
    });
  }, []);

  async function handleAddRepository() {

    const response = await api.post('repositories', {
      title: `Novo projeto ${Date.now()}`
    });

    const repository = response.data;

    setRepositories([ ...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    
    api.delete("/repositories/" + id).then(res => {
      const repositoryIndex = repositories.findIndex(repository => {
          return repository.id === id
      })

      repositories.splice(repositoryIndex, 1)
      console.log(repositories)
      setRepositories([
          ...repositories
      ])
    })

  }

  return (
    <main>
      <section id="repositories-list">
        <h1>Meus Repositórios</h1>
        
        <ul data-testid="repository-list">
          {repositories.map(repository => {
            return (
              <li key={repository.id}>
                <span>{repository.title}</span>
                <button onClick={() => handleRemoveRepository(repository.id)}>
                    Remover
                </button>
              </li>
            )
          })}
        </ul>

      </section>
      <button onClick={handleAddRepository}>Adicionar</button>
    </main>
  );
}

export default App;
