const { ethers } = require("ethers");
const fs = require("fs");

async function main() {
  const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
  const signer = provider.getSigner();

  const contractAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"; 
  const contractABI = JSON.parse(fs.readFileSync("artifacts/contracts/Assessment.sol/VotingSystem.json")).abi;
  const contract = new ethers.Contract(contractAddress, contractABI, signer);

  // Read the candidate names from the smart contract
  const candidatesCount = await contract.candidatesCount();
  const candidateNames = [];
  for (let i = 1; i <= candidatesCount; i++) {
    const candidate = await contract.candidates(i);
    candidateNames.push(candidate.name);
  }

  // Display the candidate names on the web page
  const candidatesList = document.getElementById("candidatesList");
  candidateNames.forEach((name) => {
    const candidateItem = document.createElement("li");
    candidateItem.textContent = name;
    candidatesList.appendChild(candidateItem);
  });

  // Voting function
  const voteForm = document.getElementById("voteForm");
  voteForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const candidateId = parseInt(document.querySelector('input[name="candidate"]:checked').value, 10);
    await contract.vote(candidateId);
    alert("Vote successful!");
    window.location.reload();
  });
}

main().catch((error) => {
  console.error(error);
});
