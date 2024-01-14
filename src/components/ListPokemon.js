import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Button } from 'react-bootstrap';

const PokemonList = ({ id, image, name, type, height, weight, nameId,bookmarkedPokemon, setBookmarkedPokemon }) => {
  const style = type + " thumb-container mb-3";
  const [isBookmarked, setBookmark] = useState(false);

  const handleBookmark = () => {
    setBookmark(!isBookmarked);
    if (isBookmarked) {
      localStorage.removeItem(`pokemon-${id}`);
      setBookmarkedPokemon(bookmarkedPokemon.filter((p) => p.id !== id));
    } else {
      localStorage.setItem(`pokemon-${id}`, JSON.stringify({ id, image, name, type, height, weight, nameId }));
      setBookmarkedPokemon([...bookmarkedPokemon, { id, image, name, type, height, weight, nameId }]);
    }
  };


  useEffect(() => {
    const bookmark = localStorage.getItem(`pokemon-${id}`);
    if (bookmark) {
       setBookmark(true);
    }
    try {
       const parsedBookmarkedPokemon = JSON.parse(bookmark);
       setBookmarkedPokemon(parsedBookmarkedPokemon || []);
    } catch (error) {
       setBookmarkedPokemon([]);
    }
   }, [id, bookmarkedPokemon]);

  
  return (
    <Card className={style}>
      <Row style={{paddingRight: '5px'}}>
        <Col md={4} className='text-center' >
          <Card.Img
            variant="top"
            src={image}
            alt="Image"
            className="mx-auto"
          />
          <Card.Title className='text-center'>#00{id}</Card.Title>
        </Col>
        <Col md={8}>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Row>
              <Col>
              <Card.Text>Height</Card.Text>
              <h6>{height} m</h6>
              </Col>
              <Col>
              <Card.Text>Weight</Card.Text>
              <h6>{weight} kg</h6>
              </Col>
              <Row style={{paddingLeft: '35px'}}>
              <Col className="justify-content-end">
                <Button style={{fontSize: 12, margin: '8px', backgroundColor:'#d4240c', borderColor:'#d4240c'}} href={`/pokemon-list/${nameId}`}>Detail</Button>
                <Button style={{fontSize: 12}} onClick={handleBookmark} variant={isBookmarked ? "secondary" : "outline-secondary"}>
              {isBookmarked ? "Unbookmarks" : "Bookmark"}
              </Button>
              </Col>
              </Row> 
            </Row>
          </Card.Body>
        </Col>
      </Row>
    </Card>
 );
};

export default PokemonList;
