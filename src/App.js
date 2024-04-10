import React, { useState } from 'react';
import './App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from 'react-bootstrap/Card';

function App() {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const catsClicked = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const response = await fetch('http://localhost:8080/cats');
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
        const response = await fetch('http://localhost:8080/dogs');
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
    <html>
    <div>
       <Box sx={{ '& button': { m: 1 } }}>
       <div>
          <Button onClick={catsClicked} variant="contained" size="large">
          Cats
          </Button>
          <Button onClick={dogsClicked} variant="contained" size="large">
          Dogs
          </Button>
       </div>
       </Box>
       {data && data.map((item, index) => (
       <Card class="card">
          <Card.Body>
            <Card.Img class="cardImage" variant="top" src={item.image} />
             <Card.Title class="cardTitle">{item.name}</Card.Title>   
             <Card.Text class="cardText">
             The life span of {item.name} is between {Math.trunc(item.min_life_span)} and {Math.trunc(item.max_life_span)} years.
            </Card.Text> 
            <Card.Link class="cardLink" href={item.image}>Full Image</Card.Link>
            <Card.Text>
            </Card.Text>
          </Card.Body>
       </Card>
       ))}
    </div>
 </html>
  );
      }

export default App;