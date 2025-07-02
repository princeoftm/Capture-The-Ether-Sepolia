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
  "60806040525f60015f6101000a81548160ff0219169083151502179055503480156027575f5ffd5b5061033c806100355f395ff3fe608060405234801561000f575f5ffd5b506004361061004a575f3560e01c80631ae8ab811461004e57806364d98f6e1461006a5780636790081c14610074578063b2fa1c9e146100a4575b5f5ffd5b610068600480360381019061006391906101fb565b6100c2565b005b61007261011f565b005b61008e60048036038101906100899190610280565b61019e565b60405161009b91906102ba565b60405180910390f35b6100ac6101b2565b6040516100b991906102ed565b60405180910390f35b805f5f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f20819055506001805f6101000a81548160ff02191690831515021790555050565b5f5f1b5f5f3373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020015f205403610182575f60015f6101000a81548160ff02191690831515021790555061019c565b6001805f6101000a81548160ff0219169083151502179055505b565b5f602052805f5260405f205f915090505481565b60015f9054906101000a900460ff1681565b5f5ffd5b5f819050919050565b6101da816101c8565b81146101e4575f5ffd5b50565b5f813590506101f5816101d1565b92915050565b5f602082840312156102105761020f6101c4565b5b5f61021d848285016101e7565b91505092915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f61024f82610226565b9050919050565b61025f81610245565b8114610269575f5ffd5b50565b5f8135905061027a81610256565b92915050565b5f60208284031215610295576102946101c4565b5b5f6102a28482850161026c565b91505092915050565b6102b4816101c8565b82525050565b5f6020820190506102cd5f8301846102ab565b92915050565b5f8115159050919050565b6102e7816102d3565b82525050565b5f6020820190506103005f8301846102de565b9291505056fea2646970667358221220a0d395d11f32e92a9ec8aac056351ae1350155f43c301fad6e9c836e4efde1d564736f6c634300081e0033";
const abi = require("./Challenge1abi.json");
const web3 = new Web3(process.env.REACT_APP_ALCHEMY_SEPOLIA_URL);

const Challenge2 = () => {
  console.log("Web3 Connected:", web3.currentProvider);
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

    const storedCount = localStorage.getItem("solveCount2");
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
          "deployedChallengeAddress",
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
    const contractAddress = localStorage.getItem("deployedChallengeAddress");
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
          const prevCount = parseInt(localStorage.getItem("solveCount2")) || 0;
          const newCount = prevCount + 1;
          setSolveCount(newCount);
          localStorage.setItem("solveCount2", newCount);

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
          <h1>Set Your nickname</h1>
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
            It’s time to set your Capture the Ether nickname! This nickname is
            how you’ll show up on the leaderboard.
          </h1>
          <p>
            The CaptureTheEther smart contract keeps track of a nickname for
            every player. To complete this challenge, set your nickname to a
            non-empty string. The smart contract is running on the Ropsten test
            network at the address 0x71c46Ed333C35e4E6c62D32dc7C8F00D125b4fee.
          </p>
          <p>The leaderboard is Soon to be added :) </p>

          <pre
            style={{ textAlign: "left", marginLeft: "0", paddingLeft: "1rem" }}
          >
            {`
pragma solidity ^0.8.0;

// Relevant part of the CaptureTheEther contract.
contract Hello {
    mapping (address => bytes32) public nicknameOf;
    bool public isComplete = false;

    function setNickname(bytes32 nickname) public {
        nicknameOf[msg.sender] = nickname;
        isComplete = true;
    }

    function isSolved() public{
        if (nicknameOf[msg.sender]==0){
            isComplete = false;
        }else{
            isComplete = true;
        }
    }
}
`}
          </pre>
          <p>
            Call the function named callme and then click the “Check Solution”
            button.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Challenge2;
