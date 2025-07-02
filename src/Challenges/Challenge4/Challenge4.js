import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import cteIcon from '../../Icons/cteicon.png';
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import { Button, Card } from "react-bootstrap";
import React, { useState } from "react";
const { Web3 } = require('web3');
const bytecode =  "6080604052602a5f5f6101000a81548160ff021916908360ff1602179055505f5f60016101000a81548160ff0219169083151502179055503480156041575f5ffd5b506101a88061004f5f395ff3fe608060405260043610610028575f3560e01c80634ba4c16b1461002c578063b2fa1c9e14610048575b5f5ffd5b61004660048036038101906100419190610114565b610072565b005b348015610053575f5ffd5b5061005c6100c8565b6040516100699190610159565b60405180910390f35b5f5f9054906101000a900460ff1660ff168160ff16036100ab5760015f60016101000a81548160ff0219169083151502179055506100c5565b5f5f60016101000a81548160ff0219169083151502179055505b50565b5f60019054906101000a900460ff1681565b5f5ffd5b5f60ff82169050919050565b6100f3816100de565b81146100fd575f5ffd5b50565b5f8135905061010e816100ea565b92915050565b5f60208284031215610129576101286100da565b5b5f61013684828501610100565b91505092915050565b5f8115159050919050565b6101538161013f565b82525050565b5f60208201905061016c5f83018461014a565b9291505056fea264697066735822122033748213056a5004be169ebb1a5f3d28ac0f6d4c8438d0e0027694bb90b1528064736f6c634300081e0033";
const abi = require('./Challenge1abi.json');
const web3 = new Web3(process.env.REACT_APP_ALCHEMY_SEPOLIA_URL);

const Challenge3 = () => {
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

    const storedCount = localStorage.getItem("solveCount3");
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
                const prevCount = parseInt(localStorage.getItem("solveCount3")) || 0;
                const newCount = prevCount + 1;
                setSolveCount(newCount);
                localStorage.setItem("solveCount3", newCount);

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
      <h1>I’m thinking of a number. All you have to do is guess it.</h1>
      
      <pre style={{ textAlign: "left", marginLeft: "0", paddingLeft: "1rem" }}>
{`
pragma solidity ^0.8.0;

contract Hello {
    uint8 answer = 42;
    bool public isComplete = false;

    function guess(uint8 n) public payable {
        if (n == answer) {
            isComplete=true;
        }else{
            isComplete = false;
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

export default Challenge3;