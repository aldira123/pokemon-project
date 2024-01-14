import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import PokemonDetail from './components/PokemonDetail';
import MyPokemon from './components/MyPokemon';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <Router>
    <Routes>
      <Route path="/" element={<App tab="home" />} />
      <Route path="/pokemon-list" element={<App tab="pokemon-list" />} />
      <Route path="/pokemon-list/:pokemonName" element={<PokemonDetail />} />
      <Route path="/my-pokemon" element={<MyPokemon />} />
    </Routes>
  </Router>
);
