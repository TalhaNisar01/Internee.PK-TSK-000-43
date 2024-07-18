import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Badge from '@mui/material/Badge';
import Nav from 'react-bootstrap/Nav';
import Menu from '@mui/material/Menu';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/esm/Table';
import { DLT } from '../redux/actions/action';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Header = () => {
  const [price, setPrice] = useState(0);
  const getdata = useSelector((state) => state.cartreducer.carts);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dlt = (id) => {
    dispatch(DLT(id));
    toast.error("Item removed from cart", {
      position: 'top-center',
    });
  };

  const total = () => {
    let price = 0;
    getdata.forEach((ele) => {
      price += ele.price * ele.qnty;
    });
    setPrice(price);
  };

  useEffect(() => {
    total();
  }, [getdata]);

  const generateReceipt = () => {
    const input = document.getElementById('receipt');

    // Ensure the element is visible before capturing
    input.style.display = 'block';

    html2canvas(input, { scale: 2, useCORS: true })
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210; // A4 width in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const pageHeight = 297; // A4 height in mm
        let heightLeft = imgHeight;
        let position = 0;

        // Add the image data to the PDF
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        // Handle multiple pages
        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('receipt.pdf');

        // Hide the element again after capturing
        input.style.display = 'none';
      })
      .catch((error) => {
        console.error("Error generating PDF:", error);
      });
  };

  return (
    <>
      <Navbar className="navbar" style={{ height: "60px" }}>
        <Container className="navbar">
          <NavLink to="/" className="text-decoration-none text-light">Home</NavLink>
          <Badge badgeContent={getdata.length} color="primary" onClick={handleClick}>
            <i className="fa-solid fa-cart-shopping text-light" style={{ fontSize: 25, cursor: "pointer" }}></i>
          </Badge>
        </Container>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          {getdata.length ? (
            <div className="card_details" style={{ width: "24rem", padding: 10 }}>
              <Table>
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Details</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {getdata.map((e) => (
                    <tr key={e.id}>
                      <td>
                        <NavLink to={`/cart/${e.id}`} onClick={handleClose}>
                          <img src={e.imgdata} style={{ width: "5rem", height: "5rem" }} alt="" />
                        </NavLink>
                      </td>
                      <td>
                        <p>{e.rname}</p>
                        <p>Price : {e.price} PKR</p>
                        <p>Quantity : {e.qnty}</p>
                      </td>
                      <td style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={() => dlt(e.id)}>
                        <i className="fas fa-trash"></i>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <div className='text-center'>
                <p>Total: {price} PKR</p>
                <button className="btn btn-primary" onClick={generateReceipt}>Generate Receipt</button>
              </div>
              <div id="receipt" style={{ display: 'none', padding: '20px', fontFamily: 'Arial, sans-serif', border: '1px solid #ddd', maxWidth: '600px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <h2 style={{ margin: '0 0' }}>Receipt</h2>
                  <p style={{ margin: '0' }}>Talha's Food Villa</p>
                  <p style={{ margin: '0' }}>1234 Street Name, Faisalabad, Pakistan</p>
                  <p style={{ margin: '0' }}>Phone: (123) 456-7890</p>
                </div>
                
                <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
                  <thead>
                    <tr style={{ background: '#f5f5f5' }}>
                      <th style={{ padding: '10px', border: '1px solid #ddd' }}>Item</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd' }}>Price</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd' }}>Quantity</th>
                      <th style={{ padding: '10px', border: '1px solid #ddd' }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getdata.map((e) => (
                      <tr key={e.id}>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                          <img src={e.imgdata} alt={e.rname} style={{ width: '50px', verticalAlign: 'middle' }} />
                          {e.rname}
                        </td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{e.price} PKR</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{e.qnty}</td>
                        <td style={{ padding: '10px', border: '1px solid #ddd' }}>{e.price * e.qnty} PKR</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                <div style={{ textAlign: 'right', marginBottom: '20px' }}>
                  <h3>Total: {price} PKR</h3>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <p>Thank you for your purchase!</p>
                  <p>If you have any questions, please contact us at (123) 456-7890 or email@example.com</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="card_details d-flex justify-content-center align-items-center" style={{ width: "24rem", padding: 10, position: "relative" }}>
              <i className='fas fa-close' onClick={handleClose} style={{ position: "absolute", top: 2, right: 20, fontSize: 23, cursor: "pointer" }}></i>
              <p style={{ fontSize: 22 }}>Your cart is empty</p>
              <img src="./cart.gif" alt="" className="emptycart_img" style={{ width: "5rem", padding: 10 }} />
            </div>
          )}
        </Menu>
      </Navbar>
    </>
  );
}

export default Header;
