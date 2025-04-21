// Ensure MetaMask is connected
let provider;
let signer;
let contract;

const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const abi = [
        {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "doctor",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "name",
              "type": "string"
            }
          ],
          "name": "DoctorRegistered",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "nurse",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "name",
              "type": "string"
            }
          ],
          "name": "NurseRegistered",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "patient",
              "type": "address"
            }
          ],
          "name": "PatientRegistered",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "doctor",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "address",
              "name": "patient",
              "type": "address"
            },
            {
              "indexed": false,
              "internalType": "string",
              "name": "diagnosis",
              "type": "string"
            }
          ],
          "name": "RecordAdded",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_patient",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "_diagnosis",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_treatment",
              "type": "string"
            }
          ],
          "name": "addRecord",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "admin",
          "outputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "doctors",
          "outputs": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "specialization",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "isRegistered",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "nurses",
          "outputs": [
            {
              "internalType": "string",
              "name": "name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "department",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "isRegistered",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "registerAsPatient",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_doctor",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "_name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_specialization",
              "type": "string"
            }
          ],
          "name": "registerDoctor",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_nurse",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "_name",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "_department",
              "type": "string"
            }
          ],
          "name": "registerNurse",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "",
              "type": "address"
            }
          ],
          "name": "registeredPatients",
          "outputs": [
            {
              "internalType": "bool",
              "name": "",
              "type": "bool"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "address",
              "name": "_patient",
              "type": "address"
            }
          ],
          "name": "viewRecords",
          "outputs": [
            {
              "components": [
                {
                  "internalType": "string",
                  "name": "diagnosis",
                  "type": "string"
                },
                {
                  "internalType": "string",
                  "name": "treatment",
                  "type": "string"
                },
                {
                  "internalType": "uint256",
                  "name": "timestamp",
                  "type": "uint256"
                }
              ],
              "internalType": "struct MedicalRecords.Record[]",
              "name": "",
              "type": "tuple[]"
            }
          ],
          "stateMutability": "view",
          "type": "function"
        }
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