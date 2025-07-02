import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import cteIcon from "../Icons/cteicon.png";
import { Link } from "react-router-dom";

const Home = () => {
  const frontpageStyle = {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    padding: "1rem",
  };

  // The style that will override the conflicting CSS from your stylesheet.
  const iconStyle = {
    position: "static", // ✨ This is the key change to fix the overlap.
  };

  return (
    <div>
      <div className="Frontpage" style={frontpageStyle}>
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
      <div>{/* Your other page content goes here */}</div>
    </div>
  );
};

export default Home;
