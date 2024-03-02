import React, { useState } from "react";
import { Container, Row, Col, Form, Button, Alert, Image } from 'react-bootstrap';
import image  from "./assets/bmi.jpg";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import "./App.css"; // Keep your custom styles

function App() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [bmiStatus, setBmiStatus] = useState("");
  const [error, setError] = useState("");

  const calculateBMI = () => {
    if (!height || !weight || isNaN(height) || isNaN(weight)) {
      setError("Please enter valid height and weight.");
      return;
    } else {
      setError("");
    }

    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
    setBmi(bmiValue);

    if (bmiValue < 18.5) {
      setBmiStatus("Underweight");
    } else if (bmiValue >= 18.5 && bmiValue < 24.9) {
      setBmiStatus("Normal weight");
    } else if (bmiValue >= 25 && bmiValue < 29.9) {
      setBmiStatus("Overweight");
    } else {
      setBmiStatus("Obesity");
    }
  };

  const Clear = () =>{
    setHeight('');
    setWeight('')
    setError('')
    setBmi(null)
    setBmiStatus('')
  }

  return (
    <Container className="d-flex vh-100 ">
      <Row className="m-auto align-self-center w-100">
        <Col lg={6} md={12} className="mb-4 mb-lg-0">
        <div >
        <Image 
        src= {image}
        className="box"
      /> </div>
        </Col>
        <Col lg={6} md={12}>
          <h1>BMI Calculator</h1>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Height (cm)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Height"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Weight (kg)</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </Form.Group>
            <div className="d-flex justify-content-around">
              <Button variant="primary" onClick={calculateBMI}>
                Calculate BMI
              </Button>
              <Button variant="primary" onClick={Clear}>
                Clear
              </Button>
            </div>
          </Form>
          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
          {bmi !== null && (
            <div className="result mt-3">
              <p>Your BMI is : {bmi}</p>
              <p>Status : {bmiStatus}</p>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
