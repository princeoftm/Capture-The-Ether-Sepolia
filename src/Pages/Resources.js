import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import cteIcon from '../Icons/cteicon.png';
import { Link } from "react-router-dom";

const Resources = () => {
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

  const resourceContainerStyle = {
    padding: '2rem'
  };

  const headingStyle = {
    borderBottom: '2px solid #ccc',
    paddingBottom: '0.5rem',
    marginBottom: '1rem'
  };

  const listStyle = {
    listStyleType: 'none',
    paddingLeft: 0
  };

  const listItemStyle = {
    marginBottom: '1rem'
  };

  return (
    <div>
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
      <div style={resourceContainerStyle}>
        <h2 style={headingStyle}>Tools to use</h2>
        <ul style={listStyle}>
          <li style={listItemStyle}>
            <strong>Etherscan</strong> – Etherscan is useful for viewing accounts and transactions on the block chain, among other things.
          </li>
          <li style={listItemStyle}>
            <strong>Remix</strong> – Remix can be used to compile and deploy contracts. It can also be used to interact with an already-deployed contract.
          </li>
          <li style={listItemStyle}>
            <strong>MyEtherWallet</strong> – MEW is another tool that can be used to interact with deployed contracts. You'll need the ABI for the contract, which you can get by compiling it.
          </li>
        </ul>

        <h2 style={headingStyle}>Things to read</h2>
        <ul style={listStyle}>
          <li style={listItemStyle}>
            <strong>Program the Blockchain</strong> – This is where I blog about smart contracts, so as you can imagine, there's a lot of useful content there.
          </li>
          <li style={listItemStyle}>
            <strong>Solidity documentation</strong> – The Solidity documentation isn't always the best written, but it's fairly comprehensive.
          </li>
          <li style={listItemStyle}>
            <strong>The yellow paper</strong> – Notoriously hard to read, the yellow paper is nonetheless the definitive source for details about Ethereum and the Ethereum Virtual Machine (EVM).
          </li>
        </ul>

        <h2 style={headingStyle}>Code libraries</h2>
        <ul style={listStyle}>
          <li style={listItemStyle}>
            <strong>web3.js</strong> – web3.js is the standard JavaScript client library for working with Ethereum.
          </li>
          <li style={listItemStyle}>
            <strong>ethereumjs</strong> – The ethereumjs suite of Node.js modules are quite useful.
          </li>
          <li style={listItemStyle}>
            <strong>web3.py</strong> – This is essentialy web3.js but for Python.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Resources;