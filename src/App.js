import React, { useState } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Container, Card, CardLink } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
function App() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const CATS_URL = 'http://localhost:8080/cats';
  const DOGS_URL = 'http://localhost:8080/dogs';

  const catsClicked = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const response = await fetch(CATS_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const json = await response.json();
        setData(json);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }


  const dogsClicked = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const response = await fetch(DOGS_URL);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const json = await response.json();
        setData(json);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
  }

  return (
  <div className="div">
   <Box sx={{ '& button': { m: 1 } }}>
   <Button onClick={catsClicked} variant="contained" size="large">Cats</Button>
   <Button onClick={dogsClicked} variant="contained" size="large">Dogs</Button>
   </Box>
   <Container>
      <Row>
         {data && data.map((item, index) => (
         <Col key={index} lg={3}>
         <Card>
            <Card.Body>
               <Card.Img className="cardImage" variant="top" src={item.image} />
               <Card.Title className="cardTitle">{item.name}</Card.Title>
               <Card.Text className="cardText">
                  The life span is between {Math.trunc(item.min_life_span)} and {Math.trunc(item.max_life_span)} years.
               </Card.Text>
               <Card.Link className="cardLink" href={item.image}>Full Image</Card.Link>
            </Card.Body>
         </Card>
         </Col>
         ))}
      </Row>
   </Container>
</div>
  );
 }

export default App;