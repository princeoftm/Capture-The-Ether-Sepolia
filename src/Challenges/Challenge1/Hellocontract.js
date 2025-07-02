import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import cteIcon from '../../Icons/cteicon.png';
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import { Button, Card } from "react-bootstrap";
import React, { useState } from "react";
const { Web3 } = require('web3');
const bytecode =  "6080604052348015600e575f5ffd5b5060b180601a5f395ff3fe6080604052348015600e575f5ffd5b50600436106026575f3560e01c8063b2fa1c9e14602a575b5f5ffd5b60306044565b604051603b91906064565b60405180910390f35b5f6001905090565b5f8115159050919050565b605e81604c565b82525050565b5f60208201905060755f8301846057565b9291505056fea26469706673582212208984f8d80134da40a86084e92b1a6236378bd75ee2aea7866ff36cc8235619c864736f6c634300081e0033";
const abi = require('./Challenge1abi.json');
const web3 = new Web3(process.env.REACT_APP_ALCHEMY_SEPOLIA_URL);

const HelloChallenge = () => {
    console.log('Web3 Connected:', web3.currentProvider);
const [deployedAddress, setDeployedAddress] = useState("");
const [completionStatus, setCompletionStatus] = useState("");
const [challengeComplete, setChallengeComplete] = useState(false);
const [solveCount, setSolveCount] = useState(0);

React.useEffect(() => {
    const savedAddress = localStorage.getItem("deployedChallengeAddress");
    if (savedAddress) {
        setDeployedAddress(savedAddress);
        iscompletecheck();
    }

    const completed = localStorage.getItem("challengeComplete");
    if (completed === "true") {
        setCompletionStatus("✅ Challenge Complete");
    }

    const storedCount = localStorage.getItem("solveCount");
    if (storedCount) {
        setSolveCount(parseInt(storedCount));
    }
}, []);





    const [data, setdata] = useState({
        address: "",
        Balance: null,
    });
    const accountChangeHandler = (account) => {
        // Setting an address data
        setdata({
            address: account,
        });

        // Setting a balance
        getbalance(account);
    };
    const getbalance = (address) => {
        // Requesting balance method
        window.ethereum
            .request({
                method: "eth_getBalance",
                params: [address, "latest"],
            })
            .then((balance) => {
                // Setting balance
                setdata({
                    Balance:
                        ethers.utils.formatEther(balance),
                });
            });
    };
const deploy = async () => {
    if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);

        try {
            const accounts = await web3Instance.eth.requestAccounts();
            console.log('Deployer account:', accounts[0]);

            const myContract = new web3Instance.eth.Contract(abi);

            const deployTx = myContract.deploy({
                data: '0x' + bytecode,
            });

            const newContractInstance = await deployTx.send({
                from: accounts[0],
                gas: 200000,
            });

            console.log('Contract deployed at address:', newContractInstance.options.address);
            setDeployedAddress(newContractInstance.options.address);

            // Check isComplete
            const isComplete = await newContractInstance.methods.isComplete().call();
            console.log('isComplete() result:', isComplete);
            localStorage.setItem("deployedChallengeAddress", newContractInstance.options.address);

        } catch (error) {
            console.error('Error deploying contract:', error);
            alert("Deployment failed. See console for details.");
        }
    } else {
        alert("Please install MetaMask!");
    }
};
const iscompletecheck = async () => {
    const contractAddress = localStorage.getItem("deployedChallengeAddress");
    console.log("Stored contract address:", contractAddress);

    if (!contractAddress) {
        console.log("No deployed contract found.");
        return;
    }

    if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        const contractInstance = new web3Instance.eth.Contract(abi, contractAddress);

        try {
            const isComplete = await contractInstance.methods.isComplete().call();
            console.log("isComplete() result:", isComplete);

            if (isComplete) {
                alert("✅ Challenge Complete!");

                // Increment and update counter
                const prevCount = parseInt(localStorage.getItem("solveCount")) || 0;
                const newCount = prevCount + 1;
                setSolveCount(newCount);
                localStorage.setItem("solveCount", newCount);

                setCompletionStatus("✅ Challenge Complete");
                setChallengeComplete(true);

                localStorage.setItem("challengeComplete", "true");
                localStorage.removeItem("deployedChallengeAddress");
            } else {
                alert("❌ Challenge Incomplete.");
                setCompletionStatus("❌ Challenge Incomplete");
                setChallengeComplete(false);

                localStorage.setItem("challengeComplete", "false");
            }
        } catch (error) {
            console.error("Error calling isComplete():", error);
            alert("Error checking completion.");
        }
    } else {
        alert("Please install MetaMask!");
    }
};



    // Button handler button for handling a
    // request event for metamask
    const btnhandler = () => {
        // Asking if metamask is already present or not
        if (window.ethereum) {
            // res[0] for fetching a first wallet
            window.ethereum
                .request({ method: "eth_requestAccounts" })
                .then((res) =>
                    accountChangeHandler(res[0])
                );
        } else {
            alert("install metamask extension!!");
        }
    };
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
      <div class="two-columns">
        <div class="column">
          <h1> Deploy A Contract</h1>
          <h4>WARMUP:50 points</h4>
          <Card.Body>
    <Card.Text>
        <strong>Balance: </strong>
        {data.Balance}
    </Card.Text>
    <Card.Text>
<strong>Deployed Address: </strong>
{deployedAddress ? deployedAddress : "No contract deployed yet"}
<Card.Text>
    <strong>Times Solved: </strong>
    {solveCount}
</Card.Text>

    </Card.Text>
    <Button
        onClick={btnhandler}
        variant="primary"
    >
        Connect to wallet
    </Button>
</Card.Body>

            <button onClick={deploy}>
              Deploy
            </button>
            <button onClick={iscompletecheck}>
              Check If complete
            </button>
    </div>
    <div class="column">
      <h1>To complete this challenge, you need to:</h1>
      <ol>
        <li>Install MetaMask.</li>
        <li>Switch to the Sepolia network </li>
        <li>Get some Sepolia ether.</li>
      </ol>
      <p>After you’ve done that, press the red button on the left to deploy the challenge contract.</p>
      <p>You don’t need to do anything with the contract once it’s deployed. Just click the “Check Solution” button to verify that you deployed successfully.</p>
<pre style={{ textAlign: "left", marginLeft: "0", paddingLeft: "1rem" }}>
{`
pragma solidity ^0.4.21;

contract DeployChallenge {
    // This tells the CaptureTheFlag contract that the challenge is complete.
    function isComplete() public pure returns (bool) {
        return true;
    }
}
`}
</pre>

    
    
    </div>
      </div>
    </div>
  );
}

export default HelloChallenge;