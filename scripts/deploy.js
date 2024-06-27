const hre = require("hardhat");

async function main() {
  
  const DegenToken = await hre.ethers.getContractFactory("DegenToken");
  const degenToken = await DegenToken.deploy();
  await degenToken.deployed();

  console.log(`Points token deployed to ${degenToken.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// npx hardhat run --network fuji scripts/deploy.js