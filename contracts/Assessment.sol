// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem {
    string[] public candidates;
    mapping(uint256 => uint256) public votesReceived; // Use a mapping to store the votes for each candidate

    constructor(string[] memory candidateNames) {
        candidates = candidateNames;
    }

    // Function to cast a vote for a candidate
    function vote(uint256 candidateIndex) public {
        require(candidateIndex < candidates.length, "Invalid candidate index");
        votesReceived[candidateIndex]++;
    }


    // Function to get the number of candidates
    function getCandidatesCount() public view returns (uint256) {
        return candidates.length;
    }

    // Function to get the number of votes for a specific candidate
    function getVotesCount(uint256 candidateIndex) public view returns (uint256) {
        require(candidateIndex < candidates.length, "Invalid candidate index");
        return votesReceived[candidateIndex];
    }
}
