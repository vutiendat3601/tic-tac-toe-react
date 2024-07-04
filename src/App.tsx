import './App.css';
import GlobalStyle from './components/GlobalStyle/GlobalStyle';
import TicTacToe from './components/TicTacToe/TicTacToe';

function App() {
  return (
    <GlobalStyle>
      <TicTacToe />
    </GlobalStyle>
  );
}

export default App;
