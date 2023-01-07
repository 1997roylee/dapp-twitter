// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract HelloWorld {
    uint256 public tweetCount;
    mapping(uint256 => Tweet) public tweets;

    struct Tweet {
        uint256 id;
        string hash;
        uint256 tipAmount;
        address payable author;
    }

    event CreateTweet(
        uint256 id,
        string hash,
        uint256 tipAmount,
        address payable author
    );

    event TipTweet(
        uint256 id,
        string hash,
        uint256 tipAmount,
        address payable author
    );

    function mint(string memory _tokenURI) external returns (uint256) {
        tweetCount++;
        tweets[tweetCount] = Tweet(
            tweetCount,
            _tokenURI,
            0,
            payable(msg.sender)
        );
        // emit event
        emit CreateTweet(tweetCount, _tokenURI, 0, payable(msg.sender));

        return (tweetCount);
    }

    function tip(uint256 _id) external payable {
        // make sure the id is valid
        require(_id > 0 && _id <= tweetCount, "Invalid id");
        // fetch the tweet
        Tweet memory _tweet = tweets[_id];
        // fetch the author
        address payable _author = _tweet.author;
        // pay the author by sending them Ether
        _author.transfer(msg.value);
        // increment the tip amount
        _tweet.tipAmount = _tweet.tipAmount + msg.value;
        // update the tweet
        tweets[_id] = _tweet;
        // trigger an event
        emit TipTweet(_id, _tweet.hash, _tweet.tipAmount, _author);
    }

    function getTweets() public view returns (Tweet[] memory _tweets) {
        _tweets = new Tweet[](tweetCount);
        for (uint256 i = 0; i < _tweets.length; i++) {
            _tweets[i] = tweets[i + 1];
        }
    }
}
