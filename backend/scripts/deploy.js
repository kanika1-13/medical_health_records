async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  
    // Get the contract factory and deploy it
    const MedicalRecords = await ethers.getContractFactory("MedicalRecords");
    const medicalRecords = await MedicalRecords.deploy();
  
    await medicalRecords.deployed();
    console.log("Contract deployed to:", medicalRecords.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("Error deploying contract:", error);
      process.exit(1);
    });
  