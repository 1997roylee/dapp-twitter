// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract HelloWorld {
    uint256 public tweetCount;
    mapping(uint256 => Tweet) public tweets;

    struct Tweet {
        uint256 id;
        string hash;
        address payable author;
    }

    event CreateTweet(uint256 id, string hash, address payable author);

    function mint(string memory _tokenURI) external returns (uint256) {
        tweetCount++;
        tweets[tweetCount] = Tweet(tweetCount, _tokenURI, payable(msg.sender));
        // emit event
        emit CreateTweet(tweetCount, _tokenURI, payable(msg.sender));

        return (tweetCount);
    }

    function getTweets() public view returns (Tweet[] memory _tweets) {
        _tweets = new Tweet[](tweetCount);
        for (uint256 i = 0; i < _tweets.length; i++) {
            _tweets[i] = tweets[i + 1];
        }
    }
}
