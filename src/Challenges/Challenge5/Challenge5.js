import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import cteIcon from "../../Icons/cteicon.png";
import { Link } from "react-router-dom";
import { ethers } from "ethers";
import { Button, Card } from "react-bootstrap";
import React, { useState } from "react";
const { Web3 } = require("web3");
const bytecode =
  "6080604052662386f26fc10000341461004d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610044906100fc565b60405180910390fd5b60014361005a9190610150565b404260405160200161006d9291906101cc565b604051602081830303815290604052805190602001205f1c5f5f6101000a81548160ff021916908360ff1602179055506101f7565b5f82825260208201905092915050565b7f4d7573742073656e642065786163746c7920302e3031206574686572000000005f82015250565b5f6100e6601c836100a2565b91506100f1826100b2565b602082019050919050565b5f6020820190508181035f830152610113816100da565b9050919050565b5f819050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f61015a8261011a565b91506101658361011a565b925082820390508181111561017d5761017c610123565b5b92915050565b5f819050919050565b5f819050919050565b6101a66101a182610183565b61018c565b82525050565b5f819050919050565b6101c66101c18261011a565b6101ac565b82525050565b5f6101d78285610195565b6020820191506101e782846101b5565b6020820191508190509392505050565b610274806102045f395ff3fe608060405260043610610028575f3560e01c80634ba4c16b1461002c578063b2fa1c9e14610048575b5f5ffd5b61004660048036038101906100419190610168565b610072565b005b348015610053575f5ffd5b5061005c610125565b60405161006991906101ad565b60405180910390f35b662386f26fc1000034146100bb576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016100b290610220565b60405180910390fd5b5f5f9054906101000a900460ff1660ff168160ff1603610122573373ffffffffffffffffffffffffffffffffffffffff166108fc671bc16d674ec8000090811502906040515f60405180830381858888f19350505050158015610120573d5f5f3e3d5ffd5b505b50565b5f5f4714905090565b5f5ffd5b5f60ff82169050919050565b61014781610132565b8114610151575f5ffd5b50565b5f813590506101628161013e565b92915050565b5f6020828403121561017d5761017c61012e565b5b5f61018a84828501610154565b91505092915050565b5f8115159050919050565b6101a781610193565b82525050565b5f6020820190506101c05f83018461019e565b92915050565b5f82825260208201905092915050565b7f4d7573742073656e642065786163746c7920302e3031206574686572000000005f82015250565b5f61020a601c836101c6565b9150610215826101d6565b602082019050919050565b5f6020820190508181035f830152610237816101fe565b905091905056fea2646970667358221220a017e5be9d2b4ec6cce0bcbc20d619b1e421ddee13f65974056face7b2c7284264736f6c634300081e0033";
const abi = require("./Challenge1abi.json");
const web3 = new Web3(process.env.REACT_APP_ALCHEMY_SEPOLIA_URL);

const Challenge4 = () => {
  console.log("Web3 Connected:", web3.currentProvider);
  const [deployedAddress, setDeployedAddress] = useState("");
  const [completionStatus, setCompletionStatus] = useState("");
  const [challengeComplete, setChallengeComplete] = useState(false);
  const [solveCount, setSolveCount] = useState(0);

  React.useEffect(() => {
    const savedAddress = localStorage.getItem("deployedChallenge5Address");
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
          Balance: ethers.utils.formatEther(balance),
        });
      });
  };
  const deploy = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);

      try {
        const accounts = await web3.eth.requestAccounts();
        console.log("Deployer account:", accounts[0]);

        const myContract = new web3.eth.Contract(abi);

        const deployTx = myContract.deploy({
          data: bytecode.startsWith("0x") ? bytecode : "0x" + bytecode,
        });

        const newContractInstance = await deployTx.send({
          from: accounts[0],
          gas: 3000000,
        });

        console.log(
          "Contract deployed at address:",
          newContractInstance.options.address
        );
        setDeployedAddress(newContractInstance.options.address);
        localStorage.setItem(
          "deployedChallenge5Address",
          newContractInstance.options.address
        );

        const isComplete = await newContractInstance.methods
          .isComplete()
          .call();
        console.log("isComplete() result:", isComplete);
      } catch (error) {
        console.error("Error deploying contract:", error);
        alert("Deployment failed. See console for details.");
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const iscompletecheck = async () => {
    const contractAddress = localStorage.getItem("deployedChallenge5Address");
    console.log("Stored contract address:", contractAddress);

    if (!contractAddress) {
      console.log("No deployed contract found.");
      return;
    }

    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      const contractInstance = new web3Instance.eth.Contract(
        abi,
        contractAddress
      );

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
          localStorage.removeItem("deployedChallenge5Address");
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
        .then((res) => accountChangeHandler(res[0]));
    } else {
      alert("install metamask extension!!");
    }
  };
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
            <Button onClick={btnhandler} variant="primary">
              Connect to wallet
            </Button>
          </Card.Body>

          <button onClick={deploy}>Deploy</button>
          <button onClick={iscompletecheck}>Check If complete</button>
        </div>
        <div class="column">
          <h1>
            This time the number is generated based on a couple fairly random
            sources.
          </h1>
          <h2>(There are other ways to solve this btw ;) ) </h2>
          <pre
            style={{ textAlign: "left", marginLeft: "0", paddingLeft: "1rem" }}
          >
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
};

export default Challenge4;
