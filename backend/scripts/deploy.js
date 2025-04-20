const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const MedicalRecords = await ethers.getContractFactory("MedicalRecords");
  const medicalRecords = await MedicalRecords.deploy();

  await medicalRecords.waitForDeployment(); // This replaces `.deployed()` in newer Hardhat/Ethers versions

  console.log("Contract deployed to:", medicalRecords.target); // Use `.target` instead of `.address` for latest Ethers
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Error deploying contract:", error);
    process.exit(1);
  });
