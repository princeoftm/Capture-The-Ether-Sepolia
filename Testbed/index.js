const { ethers } = require("ethers");
const abiCoder = new ethers.AbiCoder();
const answerHash = "0xdb81b4d58595fbbbb592d3661a34cdca14d7ab379441400cbfa1b78bc447c365";

(async () => {
    for (let i = 0; i < 256; i++) {

        const encoded = AbiCoder.encode(["uint8"], [i]);  // 32-byte padded encoding
        const hash = ethers.utils.keccak256(encoded);

        if (hash.toLowerCase() === answerHash.toLowerCase()) {
            console.log(`Found matching n: ${i}`);
            break;
        }
    }
})();
