const { ethers } = require("ethers");

async function displayVotes() { 
  const contractAddress = "0x929AdF89436817637b10cD85AAF533dBE2a8B830"; 
  const provider = new ethers.providers.Web3Provider(window.ethereum);
   const contract = new ethers.Contract(contractAddress, abi, provider);
    const [deployer] = await provider.listAccounts(); 
    // Get the number of candidates from the contract 
    const candidatesCount = await contract.getCandidatesCount(); 
    const candidatesDiv = document.getElementById("candidates"); 
    candidatesDiv.innerHTML = ""; 
    // Loop through each candidate and display their name and vote count
    for (let i = 0; i < candidatesCount; i++) 
    {
       const name = await contract.getCandidateName(i); 
       const votes = await contract.getVotesCount(i); 
       const candidateDiv = document.createElement("div");
        candidateDiv.classList.add("candidate");
        const nameHeading = document.createElement("h2"); 
        nameHeading.textContent = name; candidateDiv.appendChild(nameHeading);
         const votesParagraph = document.createElement("p");
          votesParagraph.textContent = "Votes: " + votes.toString();
           candidateDiv.appendChild(votesParagraph); candidatesDiv.appendChild(candidateDiv); 
    }
}

async function getVoterCount() {
  const contractAddress = '0x929AdF89436817637b10cD85AAF533dBE2a8B830';
  const abi = [
    // Function to get the total number of voters
    {
      "constant": true,
      "inputs": [],
      "name": "totalVoters",
      "outputs": [{"name": "", "type": "uint256"}],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    // Function to get the number of candidates
    {
      "constant": true,
      "inputs": [],
      "name": "getCandidatesCount",
      "outputs": [{"name": "", "type": "uint256"}],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    // Function to get the name of a candidate by index
    {
      "constant": true,
      "inputs": [{"name": "index", "type": "uint256"}],
      "name": "getCandidateName",
      "outputs": [{"name": "", "type": "string"}],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    // Function to get the number of votes received by a candidate
    {
      "constant": true,
      "inputs": [{"name": "candidateIndex", "type": "uint256"}],
      "name": "getVotesCount",
      "outputs": [{"name": "", "type": "uint256"}],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    }
  ];
  

  const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
  const contract = new ethers.Contract(contractAddress, abi, provider);

  try {
    const voterCount = await contract.totalVoters();
    document.getElementById('voterCount').textContent = voterCount.toString();
  } catch (error) {
    console.error(error);
    document.getElementById('voterCount').textContent = 'Error loading voter count';
  }
}

async function main() {
  if (window.ethereum) {
    await window.ethereum.request({ method: "eth_requestAccounts" });

    // Call both functions
    await displayVotes();
    await getVoterCount();
  } else {
    alert("Please install MetaMask to use this application.");
  }
}
main();
