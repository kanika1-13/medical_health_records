// Ensure MetaMask is connected
let provider;
let signer;
let contract;

const contractAddress = "YOUR_CONTRACT_ADDRESS";
const abi = [
    // Your contract ABI here
    {
        "inputs": [],
        "name": "registerAsPatient",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    // Add other functions from your contract ABI
];

document.getElementById("connectButton").onclick = connectMetaMask;
document.getElementById("viewRecords").onclick = viewMedicalRecords;

// Function to connect MetaMask
async function connectMetaMask() {
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, abi, signer);
        alert("Connected to MetaMask!");
    } else {
        alert("MetaMask not found. Please install MetaMask to continue.");
    }
}

// Function to view records
async function viewMedicalRecords() {
    try {
        const patientAddress = await signer.getAddress();
        const records = await contract.viewRecords(patientAddress);
        displayRecords(records);
    } catch (error) {
        console.error(error);
        alert("An error occurred while fetching records.");
    }
}

// Display the records in the HTML
function displayRecords(records) {
    const recordList = document.getElementById("recordList");
    recordList.innerHTML = ""; // Clear previous records
    records.forEach((record, index) => {
        const listItem = document.createElement("li");
        listItem.textContent = `Record #${index + 1}: Diagnosis - ${record.diagnosis}, Treatment - ${record.treatment}`;
        recordList.appendChild(listItem);
    });
}
