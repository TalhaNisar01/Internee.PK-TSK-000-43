import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DLT, ADD, REMOVE } from '../redux/actions/action';
import toast, { Toaster } from 'react-hot-toast';
import { FaTrash, FaPlus, FaMinus, FaArrowLeft } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const CardsDetails = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getdata = useSelector((state) => state.cartreducer.carts);

  const compare = () => {
    let comparedata = getdata.filter((e) => e.id == id);
    setData(comparedata);
  };

  const send = (item) => {
    dispatch(ADD(item));
    toast.success(`${item.rname} quantity increased!`, {
      position: 'top-center',
    });
  };

  const dlt = (id) => {
    dispatch(DLT(id));
    navigate("/");
    toast.error("Item removed from cart", {
      position: 'top-center',
    });
  };

  const remove = (item) => {
    dispatch(REMOVE(item));
    toast.error("Item quantity decreased", {
      position: 'top-center',
    });
  };

  useEffect(() => {
    compare();
  }, [id]);

  return (
    <div className="container mt-4">
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-3">
        <FaArrowLeft /> Back
      </Button>
      <h2 className='text-center mb-4'>Items Details</h2>
      <section className='container'>
        <div className="itemsdetails">
          {data.map((ele) => (
            <Card key={ele.id} className="mb-4">
              <Card.Body className="d-flex">
                <div className="items_img">
                  <Card.Img src={ele.imgdata} alt="" style={{ width: "200px", height: "200px" }} />
                </div>
                <div className="details ml-3" style={{ flex: 1 }}>
                  <Table borderless>
                    <tbody>
                      <tr>
                        <td>
                          <p><strong>Restaurant:</strong> {ele.rname}</p>
                          <p><strong>Price:</strong> {ele.price} PKR</p>
                          <p><strong>Dishes:</strong> {ele.address}</p>
                          <p><strong>Total:</strong> {ele.price * ele.qnty} PKR</p>
                          <div className='mt-3 d-flex align-items-center'>
                            <Button variant="outline-secondary" onClick={ele.qnty <= 1 ? () => dlt(ele.id) : () => remove(ele)}><FaMinus /></Button>
                            <span className="mx-2" style={{ fontSize: 22 }}>{ele.qnty}</span>
                            <Button variant="outline-secondary" onClick={() => send(ele)}><FaPlus /></Button>
                          </div>
                        </td>
                        <td>
                          <p><strong>Rating:</strong> <span style={{ background: "green", color: "#fff", padding: "2px 5px", borderRadius: "5px" }}>{ele.rating} ★</span></p>
                          <p><strong>Order Review:</strong> {ele.somedata}</p>
                          <p><strong>Remove:</strong> <Button variant="outline-danger" onClick={() => dlt(ele.id)}><FaTrash /></Button></p>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </section>
      <Toaster />
    </div>
  );
};

export default CardsDetails;
