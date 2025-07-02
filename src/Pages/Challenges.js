import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import cteIcon from '../Icons/cteicon.png';
import { Link } from "react-router-dom";

const Challenges = () => {
  const frontpageStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    padding: '1rem'
  };

  // The style that will override the conflicting CSS from your stylesheet.
  const iconStyle = {
    position: 'static' // ✨ This is the key change to fix the overlap.
  };

  const challengesContainerStyle = {
    padding: '2rem 0' // Add some vertical padding
  };

  return (
    <div>
      {/* This is the frontpage div you asked to ignore. */}
      <div className='Frontpage' style={frontpageStyle}>
        <img
          src={cteIcon}
          alt="CTE Icon"
          className="HomeIcon"
          style={iconStyle} // Apply the override style here.
        />
        <Link to="/">
          <Button variant="secondary">Go to Home</Button>
        </Link>
        <Link to="/Resources">
          <Button variant="secondary">Resources</Button>
        </Link>
        <Link to="/Challenges">
          <Button variant="secondary">Challenges</Button>
        </Link>
      </div>

      {/* ================================================================ */}
      {/* START: Here is the updated UI for the challenges list.           */}
      {/* ================================================================ */}
      <Container style={challengesContainerStyle}>
        <Row>
          {/* Warmup Challenges Card */}
          <Col md={6} className="mb-4">
            <Card>
              <Card.Header as="h3">Warmup</Card.Header>
              <Card.Body>
                <Card.Text>
                  The warmup challenges are intended to get you familiar with how Capture the Ether works and the tools you need to use.
                </Card.Text>
                <ListGroup variant="flush">
                  <ListGroup.Item action as={Link} to="/Challenge1">
                    Challenge 1: Deploy me
                  </ListGroup.Item>
                  <br></br>
                  <ListGroup.Item action as={Link} to="/Challenge2">
                    Challenge 2: Call me
                  </ListGroup.Item>
                  <br></br>

                  <ListGroup.Item action as={Link} to="/Challenge3">
                    Challenge 3: Set Your nickname
                  </ListGroup.Item>
                  <br></br>

                </ListGroup>
              </Card.Body>
            </Card>
          </Col>

          {/* Lotteries Challenges Card */}
          <Col md={6} className="mb-4">
            <Card>
              <Card.Header as="h3">Lotteries</Card.Header>
              <Card.Body>
                <Card.Text>
                  Test your skills against various lottery-based smart contracts. Can you claim the prize?
                </Card.Text>
                <ListGroup variant="flush">
                  <ListGroup.Item action as={Link} to="/Challenge4">
                    Challenge 4: Guess the number
                  </ListGroup.Item>
                  <br></br>

                  <ListGroup.Item action as={Link} to="/Challenge5">
                    Challenge 5: Guess the secret number
                  </ListGroup.Item>
                  <br></br>

                  <ListGroup.Item action as={Link} to="/Challenge6">
                    Challenge 6: Predict the block hash
                  </ListGroup.Item>
                  <br></br>

                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* ================================================================ */}
      {/* END: End of the updated UI section.                              */}
      {/* ================================================================ */}
    </div>
  );
}

export default Challenges;