// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract HelloWorld {
    string[] public tweets;

    function getTweets() public view returns (string[] memory) {
        return tweets;
    }
}