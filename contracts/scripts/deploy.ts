import { ethers } from "hardhat";

async function main() {
  const contractFactory = await ethers.getContractFactory("HelloWorld");
  const contract = await contractFactory.deploy();
  await contract.deployed();
  console.log("Contract deployed to:", contract.address);
  // Mint a tweet
  const transaction = await contract.mint("http://google.com")
  await transaction.wait()
  // Tip a tweet
  const tipTransaction = await contract.tip(1, {
    value: ethers.utils.parseEther("0.1")
  })
  await tipTransaction.wait()
  // Get all tweets
  const tweets = await contract.getTweets();
  console.log("We got the tweets!", tweets);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
