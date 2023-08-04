const { ethers } = require("hardhat");
const { ethers } = require("ethers");


async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const CandidateNames = ["A", "B", "C","D", "E", "F"];

  const VotingSystem = await ethers.getContractFactory("VotingSystem");
  const votingSystem = await VotingSystem.deploy(CandidateNames);
  await votingSystem.deployed();

  console.log("VotingSystem deployed to:", votingSystem.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
