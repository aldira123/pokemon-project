import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import PokemonList from '../ListPokemon';
import TopBar from './Topbar';
import Breadcrumbs from '../Breadcrumbs/Breadcrumbs';

const Dashboard = () => {
    const [allPokemons, setAllPokemons] = useState([]);
    const [offset, setOffset] = useState('https://pokeapi.co/api/v2/pokemon?limit=100');
    const [searchTerm, setSearchTerm] = useState('');
    const [bookmarkedPokemon, setBookmarkedPokemon] = useState([]);

    const getAllPokemons = async () => {
        try {
            const res = await fetch(offset);
            const data = await res.json();

            setOffset(data.next);

            const pokemonPromises = data.results.map(async (pokemon) => {
                const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
                return res.json();
            });

            const pokemonDataArray = await Promise.all(pokemonPromises);

            const updatedPokemonList = [...allPokemons, ...pokemonDataArray];

            setAllPokemons(updatedPokemonList.sort((a, b) => a.id - b.id));
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    const breadcrumbPaths = [
        { to: '/', name: 'Home' },
        { to: '/dashboard', name: 'Dashboard' },
    ];

    useEffect(() => {
        getAllPokemons();
    }, []);

    const filteredPokemons = allPokemons.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div>  <TopBar />
            <div className="dashboard">
                <Sidebar />
                <main className="main-content">
                <Breadcrumbs paths={breadcrumbPaths} />
                    <div className="header-container">
                        <h2>List Pokemon</h2>
                        <div className="search-container">
                            <input
                                type="text"
                                placeholder="Search Pokemon"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            {searchTerm && (
                                <button className="clear-button" onClick={() => setSearchTerm('')}>
                                    Clear
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="app-container">
                        <div className="pokemon-container">
                            <div className="all-container">
                                {filteredPokemons && filteredPokemons.length > 0 ? (
                                    filteredPokemons.map((pokemonStats) => (
                                        <PokemonList
                                            key={pokemonStats.id}
                                            id={pokemonStats.id}
                                            image={pokemonStats.sprites.other.home.front_default}
                                            nameId={pokemonStats.name}
                                            name={capitalizeFirstLetter(pokemonStats.name)}
                                            type={pokemonStats.types[0].type.name}
                                            height={pokemonStats.height}
                                            weight={pokemonStats.weight}
                                            bookmarkedPokemon={bookmarkedPokemon}
                                            setBookmarkedPokemon={setBookmarkedPokemon}
                                        />
                                    ))
                                ) : (
                                    <p>No Pokemon found.</p>
                                )}
                            </div>
                            <button className="load-more" onClick={() => getAllPokemons()}>
                                Load more
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
