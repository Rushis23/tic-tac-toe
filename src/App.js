import './App.css';
import { useState } from 'react';

const rows = new Array(3).fill(0);
const cols = new Array(3).fill(0);
let diag1 = 0, diag2 = 0;

const findWinner = (pos, p) => {
  let [x, y] = pos;

  rows[x] += p;
  cols[y] += p;

  if (x === y) {
    diag1 += p;
  }

  if (x + y === 2) {
    diag2 += p;
  }

  if (
    Math.abs(rows[x]) === 3 ||
    Math.abs(cols[y]) === 3 ||
    Math.abs(diag1) === 3 ||
    Math.abs(diag2) === 3
  ) {
    return p === 1 ? `Player 'A' WON` : `Player 'B' WON`;
  }
  return;
}

function App() {

  const positions = new Array(9);
  const [turns, setTurns] = useState(1);
  const [mp, setMp] = useState({});
  const [result, setResult] = useState('');

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      positions.push([i, j]);
    };
  };

  const handleButtonClick = (index, pos) => {
    setTurns(turns + 1);
    if (turns < 10) {
      if (turns % 2 === 1) {
        setMp({ ...mp, [index]: "X" });
        setResult(findWinner(pos, 1));
        return;
      } else {
        setMp({ ...mp, [index]: "O" });
        setResult(findWinner(pos, -1));
        return;
      }
    }
    return;
  }

  return (
    <div className="App">
      <div
        className='
          text-center mb-10 
          text-5xl font-bold 
          text-Black-600'
        onClick={handleButtonClick}
      >
        Tic Tac Toe
      </div>
      {
        (!result && turns <= 9) &&
        <p
          className='
          text-center mb-3 
          font-bold text-sky-200'
        >
          {turns % 2 === 1 ?
            `Player A's turn` : `Player B's turn`}
        </p>
      }
      <div className='number-grid'>
        {
          positions.map((pos, index) => {
            return (
              <button
                key={index}
                value={mp[index]}
                disabled={(mp[index] || result) ? true : false}
                onClick={() => handleButtonClick(index, pos)}
                className='
                w-16 h-16 bg-gray-700 \
                text-5xl text-slate-400 
                rounded'
              >
                {mp[index]}
              </button>
            )
          })
        }
      </div>
      <div
        className={`
          text-center mt-8 
          text-4xl font-bold 
          ${(result || turns <= 9) ?
            'text-green-600 animate-bounce' :
            'text-red-600'}`}
      >
        {result || turns <= 9 ?
          result : 'Match Drawn'}
      </div>
      {
        (result || turns > 9) &&
        <div className='text-center mt-5'>
          <button
            className='p-3 bg-green-600 rounded'
            onClick={() => { window.location.reload() }}
          >
            Reset
          </button>
        </div>
      }
    </div>
  )
}

export default App;
