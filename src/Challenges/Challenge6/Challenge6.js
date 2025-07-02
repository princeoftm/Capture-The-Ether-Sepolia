import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import cteIcon from '../../Icons/cteicon.png';
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import { Button, Card } from "react-bootstrap";
import React, { useState } from "react";
const { Web3 } = require('web3');
const bytecode =  "60806040525f60035f6101000a81548160ff0219169083151502179055503480156027575f5ffd5b50610370806100355f395ff3fe608060405260043610610033575f3560e01c806311da60b414610037578063b2fa1c9e1461004d578063ed7f559c14610077575b5f5ffd5b348015610042575f5ffd5b5061004b610093565b005b348015610058575f5ffd5b50610061610164565b60405161006e9190610256565b60405180910390f35b610091600480360381019061008c91906102a6565b610176565b005b5f5f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff16146100ea575f5ffd5b60025443116100f7575f5ffd5b5f6002544090505f5f5f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550806001540361016157600160035f6101000a81548160ff0219169083151502179055505b50565b60035f9054906101000a900460ff1681565b5f73ffffffffffffffffffffffffffffffffffffffff165f5f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16146101cd575f5ffd5b670de0b6b3a764000034146101e0575f5ffd5b335f5f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550806001819055506001436102339190610307565b60028190555050565b5f8115159050919050565b6102508161023c565b82525050565b5f6020820190506102695f830184610247565b92915050565b5f5ffd5b5f819050919050565b61028581610273565b811461028f575f5ffd5b50565b5f813590506102a08161027c565b92915050565b5f602082840312156102bb576102ba61026f565b5b5f6102c884828501610292565b91505092915050565b5f819050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f610311826102d1565b915061031c836102d1565b9250828201905080821115610334576103336102da565b5b9291505056fea2646970667358221220344a6260f122ebac04b2af0604a089224cff225c26634edba24f39adcdf2b8ff64736f6c634300081e0033";
const abi = require('./Challenge1abi.json');
const web3 = new Web3(process.env.REACT_APP_ALCHEMY_SEPOLIA_URL);

const Challenge5 = () => {
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
      <h1>Guessing an 8-bit number is apparently too easy. This time, you need to predict the entire 256-bit block hash for a future block.</h1>
      
      <pre style={{ textAlign: "left", marginLeft: "0", paddingLeft: "1rem" }}>
{`
pragma solidity ^0.8.0;

contract Hello {
    address guesser;
    bytes32 guess;
    uint256 settlementBlockNumber;
    bool public isComplete = false;
    function lockInGuess(bytes32 hash) public payable {
        require(guesser == address(0));
        require(msg.value == 1 ether);

        guesser = msg.sender;
        guess = hash;
        settlementBlockNumber = block.number + 1;
    }
    function settle() public {
        require(msg.sender == guesser);
        require(block.number > settlementBlockNumber);

        bytes32 answer = blockhash(settlementBlockNumber);

        guesser = address(0);
        if (guess == answer) {
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

export default Challenge5;