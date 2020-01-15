import React, { useState } from 'react';
import './App.css';
import { SearchableList } from './Search';

const App: React.FC = () => {
  const [counter, setCounter] = useState<number>(0)
  const [name, setName] = useState<string>('')

  return (
    <main className="App">
      <article>
        <button onClick={ () => setCounter(state => state + 1) }>+</button>
        <p>{ counter }</p>
        <button onClick={ () => setCounter(state => state - 1) }>-</button>
      </article>
      <article>
        <form action="#">
          <label htmlFor="name">name</label>
          <input type="text" name="name" id="name" value={ name } onChange={ handleChange } />
        </form>
      </article>
      <article>
        <SearchableList list={ [{ id: '1', name: 'one' }] } />
      </article>
    </main>
  )

  function handleChange ({ target: { value } }: React.ChangeEvent<HTMLInputElement>): void {
    setName(value)
  }
}

export default App;
