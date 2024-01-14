// PokemonDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from './Dashboard/Sidebar';
import TopBar from './Dashboard/Topbar';
import Breadcrumbs from './Breadcrumbs/Breadcrumbs';
import { Tab, Tabs, Card, Row, Col, ProgressBar, Stack } from 'react-bootstrap';

const PokemonDetail = () => {
  const { pokemonName } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error('Error fetching Pokemon detail:', error);
      }
    };

    fetchPokemonDetail();
  }, [pokemonName]);

  if (!pokemon) {
    return <p>Loading...</p>;
  }

  const renderAbilities = () => {
    if (pokemon.abilities && Array.isArray(pokemon.abilities)) {
      return (
        <div>
          <p>Abilities</p>
           <Stack gap={pokemon.abilities.length}>
          {pokemon.abilities.map((ability) => (
            <div className="p-2" key={ability.ability.name}>{capitalizeFirstLetter(ability.ability.name)}</div>
          ))}
        </Stack>
        </div>
      );
    } else {
      return <p>No abilities available</p>;
    }
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const determineVariant = (baseStat) => {
    if (baseStat >= 80) {
      return 'success';
    } else if (baseStat >= 50) {
      return 'warning';
    } else {
      return 'danger';
    }
  };

  const renderStats = () => {
    if (pokemon.stats && Array.isArray(pokemon.stats)) {
      return (
        <div>
          {pokemon.stats.map((stat) => (
            <Row key={stat.stat.name} className="stat-bar-container">
              <Col sm={4}>
                <label>{capitalizeFirstLetter(stat.stat.name)}</label>
              </Col>
              <Col sm={8}>
                <span>{stat.base_stat}
                  <ProgressBar variant={determineVariant(stat.base_stat)} now={stat.base_stat} max="100"></ProgressBar>
                </span>
              </Col>
            </Row>
          ))}
        </div>
      );
    } else {
      return <p>No stats available</p>;
    }
  };

  const breadcrumbPaths = [
    { to: '/', name: 'Home' },
    { to: '/pokemon-list', name: 'List Pokemon' },
    { name: `${pokemon.name}` }
  ];

  const style = pokemon.types[0].type.name + " card text-center";

  return (
    <div>
      <TopBar />
      <div className="dashboard">
        <Sidebar />
        <main className="main-content">
          <Breadcrumbs paths={breadcrumbPaths} />
          <div className="app-container">
            <h2>{capitalizeFirstLetter(pokemon.name)}</h2>
            <div className='text-center'>
            <Card className={style}>
              <Card.Img src={pokemon.sprites.other.home.front_default} alt={`${pokemon.name} sprite`} className="card-img mx-auto d-block"></Card.Img>
            </Card>
            </div>
            <Tabs
              defaultActiveKey="detail"
              id="justify-tab-example"
              className="mb-3"
              justify
            >
              <Tab eventKey="detail" title="Detail">
                <p>Height: {pokemon.height}</p>
                <p>Weight: {pokemon.weight}</p>
                <p>Types: {pokemon.types.map((type) => type.type.name).join(', ')}</p>
              </Tab>
              <Tab eventKey="abilities" title="Abilities">
                {renderAbilities()}
              </Tab>
              <Tab eventKey="stats" title="Stats">
                {renderStats()}
              </Tab>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PokemonDetail;
