import React, { useEffect, useState } from "react";
import TopBar from "./Dashboard/Topbar";
import Sidebar from "./Dashboard/Sidebar";
import Breadcrumbs from "./Breadcrumbs/Breadcrumbs";
import { Card, Col, Row} from 'react-bootstrap';


const MyPokemon = () => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    try {
      const updatedBookmarks = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.includes("pokemon-")) {
          const pokemonData = localStorage.getItem(key);
          if (pokemonData) {
            try {
              const parsedPokemon = JSON.parse(pokemonData);
              if (parsedPokemon && parsedPokemon.name && parsedPokemon.image) {
                updatedBookmarks.push(parsedPokemon);
              }
            } catch (e) {
              console.error(`Error parsing JSON for key ${key}:`, e);
            }
          }
        }
      }
      setBookmarks(updatedBookmarks);
    } catch (error) {
      console.error("Error in useEffect:", error);
    }
  }, []);
  
  
  const breadcrumbPaths = [
    { to: "/", name: "Home" },
    { name: "My Bookmark" },
  ];

  return (
    <div>
      <TopBar />
      <div className="dashboard">
        <Sidebar />
        <main className="main-content">
          <Breadcrumbs paths={breadcrumbPaths} />
          <h2>Bookmarks</h2>
          {bookmarks.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {bookmarks.map((pokemon) => (
                <Card className={pokemon.type + " thumb-container mb-3"}>
                <Row>
                  <Col md={4}>
                    <Card.Img
                      variant="top"
                      src={pokemon.image}
                      alt="Image"
                      className="mx-auto"
                    />
                    <Card.Title className='text-center'>#00{pokemon.id}</Card.Title>
                  </Col>
                  <Col md={8}>
                    <Card.Body>
                      <Card.Title>{pokemon.name}</Card.Title>
                      <Row>
                        <Col>
                        <Card.Text>Height</Card.Text>
                        <h6>{pokemon.height} m</h6>
                        </Col>
                        <Col>
                        <Card.Text>Weight</Card.Text>
                        <h6>{pokemon.weight} kg</h6>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
              ))}
            </div>
          ) : (
            <p>No bookmarks yet.</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default MyPokemon;