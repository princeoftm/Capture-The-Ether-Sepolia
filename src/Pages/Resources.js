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
    marginBottom: '1.2rem',
    lineHeight: '1.6'
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
        <h2 style={headingStyle}>Essential Tools</h2>
        <ul style={listStyle}>
          <li style={listItemStyle}>
            <strong>Hardhat</strong> – An Ethereum development environment that facilitates building on Ethereum. It's known for its ease of use and extensibility through plugins.
          </li>
          <li style={listItemStyle}>
            <strong>Foundry</strong> – A blazing fast, portable, and modular toolkit for Ethereum application development written in Rust, often favored for its performance.
          </li>
          <li style={listItemStyle}>
            <strong>Truffle Suite</strong> – A comprehensive development environment, testing framework, and asset pipeline for blockchains using the EVM.
          </li>
          <li style={listItemStyle}>
            <strong>Remix IDE</strong> – An open-source web IDE for Solidity contract development. Excellent for learning and quick prototyping directly in the browser.
          </li>
          <li style={listItemStyle}>
            <strong>Etherscan</strong> – The leading block explorer and analytics platform for Ethereum. Essential for viewing transactions, addresses, and other on-chain activities.
          </li>
           <li style={listItemStyle}>
            <strong>MyEtherWallet (MEW)</strong> – A free, client-side interface helping you interact with the Ethereum blockchain, generate wallets, and more.
          </li>
           <li style={listItemStyle}>
            <strong>Ganache</strong> – A personal blockchain for Ethereum development you can use to deploy contracts, develop your applications, and run tests.
          </li>
           <li style={listItemStyle}>
            <strong>Security Analysis Tools</strong> – A suite of tools to ensure smart contract security. Notable examples include <strong>Slither</strong> (static analysis) and <strong>Echidna</strong> (fuzzing).
          </li>
        </ul>

        <h2 style={headingStyle}>Essential Reading & Learning Platforms</h2>
        <ul style={listStyle}>
          <li style={listItemStyle}>
            <strong>Alchemy University</strong> – Offers comprehensive, free courses on Web3 development, including the popular "Road to Web3" program.
          </li>
          <li style={listItemStyle}>
            <strong>Cyfrin Updraft</strong> – A platform offering a range of courses from beginner to advanced levels, focusing on secure smart contract development.
          </li>
          <li style={listItemStyle}>
            <strong>CryptoZombies</strong> – An interactive, game-based tutorial that teaches you to write smart contracts in Solidity through building your own crypto-collectible game.
          </li>
          <li style={listItemStyle}>
            <strong>Solidity Documentation</strong> – The official documentation for the Solidity programming language. The most accurate and up-to-date resource.
          </li>
          <li style={listItemStyle}>
            <strong>Mastering Ethereum</strong> – A comprehensive book that provides a deep dive into the Ethereum ecosystem, from basics to advanced topics.
          </li>
           <li style={listItemStyle}>
            <strong>Coursera & Udemy</strong> – These platforms host a wide variety of blockchain courses from universities and industry experts.
          </li>
        </ul>

        <h2 style={headingStyle}>Essential Code Libraries</h2>
        <ul style={listStyle}>
          <li style={listItemStyle}>
            <strong>web3.js</strong> – The official JavaScript library for interacting with the Ethereum blockchain.
          </li>
          <li style={listItemStyle}>
            <strong>Ethers.js</strong> – A complete and compact library for interacting with the Ethereum Blockchain, a popular and modern alternative to web3.js.
          </li>
          <li style={listItemStyle}>
            <strong>web3.py</strong> – The Python library for building applications that interact with the Ethereum blockchain.
          </li>
           <li style={listItemStyle}>
            <strong>OpenZeppelin Contracts</strong> – A library of secure and community-vetted smart contracts. An indispensable resource for building secure dApps.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Resources;