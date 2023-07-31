
//For this project, create a simple contract with 2-3 functions.
//Then show the values of those functions in frontend of the application.

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingSystem{
    struct Candidate {
        string name;
        uint256 voteCount;
    }

    mapping(address => bool) public voters;
    mapping(uint256 => Candidate) public candidates;
    uint256 public candidatesCount;

    constructor(string[] memory _candidateNames) {
        for (uint256 i = 0; i < _candidateNames.length; i++) {
            candidatesCount++;
            candidates[candidatesCount] = Candidate(_candidateNames[i], 0);
        }
    }

    function vote(uint256 _candidateId) external {
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID");
        require(!voters[msg.sender], "You have already voted");

        candidates[_candidateId].voteCount++;
        voters[msg.sender] = true;
    }
}
