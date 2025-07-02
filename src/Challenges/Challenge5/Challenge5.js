import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import cteIcon from '../../Icons/cteicon.png';
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import { Button, Card } from "react-bootstrap";
import React, { useState } from "react";
const { Web3 } = require('web3');
const bytecode =  "60806040525f5f60016101000a81548160ff021916908315150217905550348015610028575f5ffd5b5060014361003691906100b4565b4042604051602001610049929190610130565b604051602081830303815290604052805190602001205f1c5f5f6101000a81548160ff021916908360ff16021790555061015b565b5f819050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f6100be8261007e565b91506100c98361007e565b92508282039050818111156100e1576100e0610087565b5b92915050565b5f819050919050565b5f819050919050565b61010a610105826100e7565b6100f0565b82525050565b5f819050919050565b61012a6101258261007e565b610110565b82525050565b5f61013b82856100f9565b60208201915061014b8284610119565b6020820191508190509392505050565b61018a806101685f395ff3fe608060405260043610610028575f3560e01c80634ba4c16b1461002c578063b2fa1c9e14610048575b5f5ffd5b610046600480360381019061004191906100f6565b610072565b005b348015610053575f5ffd5b5061005c6100aa565b604051610069919061013b565b60405180910390f35b5f5f9054906101000a900460ff1660ff168160ff16036100a75760015f60016101000a81548160ff0219169083151502179055505b50565b5f60019054906101000a900460ff1681565b5f5ffd5b5f60ff82169050919050565b6100d5816100c0565b81146100df575f5ffd5b50565b5f813590506100f0816100cc565b92915050565b5f6020828403121561010b5761010a6100bc565b5b5f610118848285016100e2565b91505092915050565b5f8115159050919050565b61013581610121565b82525050565b5f60208201905061014e5f83018461012c565b9291505056fea26469706673582212206cd16ca80244992cd89eeba01a5477d9af2165d02f2603b7a07438dd0d36ec9064736f6c634300081e0033";
const abi = require('./Challenge1abi.json');
const web3 = new Web3(process.env.REACT_APP_ALCHEMY_SEPOLIA_URL);

const Challenge4 = () => {
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

    const storedCount = localStorage.getItem("solveCount4");
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
        const web3 = new Web3(window.ethereum);

        try {
            const accounts = await web3.eth.requestAccounts();
            console.log('Deployer account:', accounts[0]);

            const myContract = new web3.eth.Contract(abi);

            const deployTx = myContract.deploy({
                data: bytecode.startsWith('0x') ? bytecode : '0x' + bytecode,
            });

            const newContractInstance = await deployTx.send({
                from: accounts[0],
                gas: 3000000,
            });

            console.log('Contract deployed at address:', newContractInstance.options.address);
            setDeployedAddress(newContractInstance.options.address);
            localStorage.setItem("deployedChallengeAddress", newContractInstance.options.address);

            const isComplete = await newContractInstance.methods.isComplete().call();
            console.log('isComplete() result:', isComplete);

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
                const prevCount = parseInt(localStorage.getItem("solveCount4")) || 0;
                const newCount = prevCount + 1;
                setSolveCount(newCount);
                localStorage.setItem("solveCount4", newCount);

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
          <h1>Guess the number</h1>
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
      <h1>This time the number is generated based on a couple fairly random sources.</h1>
      <h2>(There are other ways to solve this btw ;) ) </h2>
      <pre style={{ textAlign: "left", marginLeft: "0", paddingLeft: "1rem" }}>
{`
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Hello {
    uint8 private answer;
    bool public isComplete = false;

    constructor() {
        // Use blockhash of previous block and timestamp to generate pseudo-random number
        answer = uint8(uint256(keccak256(abi.encodePacked(blockhash(block.number - 1), block.timestamp))));
    }

    function guess(uint8 n) public payable {
        if (n == answer) {
            isComplete = true;
        }
    }
}
`}
</pre>
    </div>
      </div>
    </div>
  );
}

export default Challenge4;