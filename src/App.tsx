import React, { useState } from 'react';
import './App.scss';
import { ITodo } from './helpers/types/ITodo'
import { Section } from './components/Section';
import { RepoDescription } from './components/RepoDescription';

import axios from 'axios';

function App() {
  const [value, setValue] = useState('https://api.github.com/repos/Facebook/React/issues');
  const [issues, setIssues] = useState([]);
  
  const loadingIssues = (event: any) => {
    event.preventDefault();
    // console.log(value);

    async function fetchIssues() {
      try {
        const response = await axios.get(value, {
          headers: {
            Authorization: `Bearer ${'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'}`,
          },
        });
        setIssues(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    }

    fetchIssues();

    console.log();
  }

  return (
    <div className="App">
      <header className="App-header">
        <input type="url" placeholder="Enter repo URL" className="input" value={value} onChange={(e) => setValue(e.target.value)} />
        <button
          className="button"
          onClick={(event) => loadingIssues(event)}
        >
          Load issues
        </button>


      </header>

      {(value.length > 30) && (
        <div className="App__title">
          <RepoDescription title={value} stars={value.length} />
        </div>
      )}

      <main className="App-blocks">
        <Section title="ToDo" todos={issues} />
        <Section title="In Progress" todos={issues.filter((i: ITodo) => i.state === 'open')} />
        <Section title="Done" todos={issues.filter((i: ITodo) => i.closed_at !== null)} />
      </main>
    </div>
  );
}
export default App;
