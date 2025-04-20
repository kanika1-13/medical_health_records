// Ensure MetaMask is connected
let provider;
let signer;
let contract;

const contractAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";
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

document.getElementById("connectButton").onclick = connectMetaMask;
document.getElementById("viewRecords").onclick = viewMedicalRecords;
document.getElementById("addRecordButton").onclick = addMedicalRecord;

// Function to connect MetaMask
async function connectMetaMask() {
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []); // Prompt MetaMask to request account access
        signer = provider.getSigner(); // Get the connected signer (user's address)
        contract = new ethers.Contract(contractAddress, abi, signer); // Connect to the smart contract
        alert("Connected to MetaMask!");
    } else {
        alert("MetaMask not found. Please install MetaMask to continue.");
    }
}

// Function to view medical records
async function viewMedicalRecords() {
    try {
        const patientAddress = await signer.getAddress(); // Get the address of the connected wallet (patient)
        const records = await contract.viewRecords(patientAddress); // Call the smart contract's viewRecords method
        displayRecords(records); // Pass records to display them in the UI
    } catch (error) {
        console.error(error);
        alert("An error occurred while fetching records.");
    }
}

// Function to display records in the HTML
function displayRecords(records) {
    const recordList = document.getElementById("recordList");
    recordList.innerHTML = ""; // Clear previous records in the list
    records.forEach((record, index) => {
        // Create list items for each record
        const listItem = document.createElement("li");
        listItem.textContent = `Record #${index + 1}: Diagnosis - ${record.diagnosis}, Treatment - ${record.treatment}, Date: ${new Date(record.timestamp * 1000).toLocaleString()}`;
        recordList.appendChild(listItem); // Append the record item to the list
    });
}

// Function to add medical record
async function addMedicalRecord() {
    try {
        // Get the input values for diagnosis and treatment
        const diagnosis = document.getElementById("diagnosis").value;
        const treatment = document.getElementById("treatment").value;

        if (!diagnosis || !treatment) {
            alert("Please fill in both diagnosis and treatment fields.");
            return;
        }

        const patientAddress = await signer.getAddress(); // Get the connected wallet address (patient)

        // Call the smart contract to add the medical record
        const tx = await contract.addRecord(patientAddress, diagnosis, treatment);
        
        // Wait for the transaction to be mined
        await tx.wait();
        
        alert("Medical record added successfully!");
        
        // Optionally, refresh the records after adding a new one
        viewMedicalRecords();
    } catch (error) {
        console.error(error);
        alert("An error occurred while adding the medical record.");
    }
}
