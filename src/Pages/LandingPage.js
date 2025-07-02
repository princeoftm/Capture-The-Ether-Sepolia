import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import cteIcon from '../Icons/cteicon.png';
import '../App.css';

function LandingPage() {
  return (
    <>
      <div className="Frontpage">
        <img src={cteIcon} alt="CTE Icon" />
        <h1 class="welcomepageheader">Capture The Ether</h1>
        <h1 className="fronttext">The game of Ethereum smart contract security</h1>

        {/* This button now links to your new, blank /home page */}
        <Link to="/Challenges">
          <button>Go to Challenges</button>
        </Link>
      </div>

      <div className="container-three-columns">
        <div className="column">
          <h2>What is this?</h2>
          <p>Capture the Ether is a game in which you hack Ethereum smart contracts to learn about security. It's meant to be both fun and educational.</p>
          <p>This game is brought to you by @smarx, who blogs about smart contract development at Program the Blockchain.</p>
          <p>In 2025 this was remade by @princeoftm. It now uses Sepolia testnet</p>
        </div>
        <div className="column">
          <h2>How Do I Win?</h2>
          <p>The game consists of a series of challenges in different categories. You earn points for every challenge you complete. Harder challenges are worth more points.</p>
          <p>Each challenge is in the form of a smart contract with an isComplete function (or public state variable). The goal is always to make isComplete() return true.</p>
          <p>If you're into that sort of thing, there's a leaderboard.</p>
        </div>
        <div className="column">
          <h2>What do I need to know first?</h2>
          <p>The warmup category is designed to introduce the basic tools you need, but if you're brand new to Ethereum smart contract development, head over to Program the Blockchain first and do some background reading.</p>
          <p>If you find you're missing some tools or knowledge, check out the resources page or consider asking for help.</p>
        </div>
      </div>
    </>
  );
}

export default LandingPage;