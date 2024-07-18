import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Cardsdata from './CardsData';
import './style.css';
import { useDispatch } from 'react-redux';
import { ADD } from '../redux/actions/action';
import toast, { Toaster } from 'react-hot-toast';

const Cards = () => {
  const [data, setData] = useState(Cardsdata);
  const dispatch = useDispatch();

  const send = (item) => {
    dispatch(ADD(item));
    toast.success(`${item.rname} added to cart!`, {
      position: 'top-center', // Center top position
    });
  }

  return (
    <div className='container mt-4'>
      <div className="header text-center mb-4">
        <p>Explore our collection of delicious dishes and add them to your cart.</p>
      </div>
      <div className="row d-flex justify-content-center align-items-center">
        {data.map((element, id) => (
          <Card key={id} style={{ width: '22rem', border: "none", marginBottom: '20px' }} className="mx-2 mt-4 card_style">
            <Card.Img variant="top" src={element.imgdata} style={{ height: "16rem", objectFit: "cover" }} className="mt-3" />
            <Card.Body className="d-flex flex-column align-items-center">
              <Card.Title>{element.rname}</Card.Title>
              <Card.Text>Price: {element.price} PKR</Card.Text>
              <Button onClick={() => send(element)} className='gray-button mt-3'>Add to Cart</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
      <Toaster /> {/* Add this to render the toasts */}
    </div>
  );
}

export default Cards;
