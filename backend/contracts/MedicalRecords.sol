// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicalRecords {

    address public admin;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin allowed");
        _;
    }

    modifier onlyRegisteredDoctor() {
        require(doctors[msg.sender].isRegistered, "Not a registered doctor");
        _;
    }

    modifier onlyRegisteredNurse() {
        require(nurses[msg.sender].isRegistered, "Not a registered nurse");
        _;
    }

    modifier onlySelfOrAuthorized(address patient) {
        require(
            msg.sender == patient ||
            doctors[msg.sender].isRegistered ||
            nurses[msg.sender].isRegistered,
            "Access denied"
        );
        _;
    }

    struct Record {
        string diagnosis;
        string treatment;
        uint256 timestamp;
    }

    struct Doctor {
        string name;
        string specialization;
        bool isRegistered;
    }

    struct Nurse {
        string name;
        string department;
        bool isRegistered;
    }

    mapping(address => Record[]) private patientRecords;
    mapping(address => Doctor) public doctors;
    mapping(address => Nurse) public nurses;
    mapping(address => bool) public registeredPatients;

    event DoctorRegistered(address indexed doctor, string name);
    event NurseRegistered(address indexed nurse, string name);
    event PatientRegistered(address indexed patient);
    event RecordAdded(address indexed doctor, address indexed patient, string diagnosis);

    // Admin registers a doctor
    function registerDoctor(address _doctor, string memory _name, string memory _specialization) public onlyAdmin {
        require(!doctors[_doctor].isRegistered, "Doctor already registered");
        doctors[_doctor] = Doctor(_name, _specialization, true);
        emit DoctorRegistered(_doctor, _name);
    }

    // Admin registers a nurse
    function registerNurse(address _nurse, string memory _name, string memory _department) public onlyAdmin {
        require(!nurses[_nurse].isRegistered, "Nurse already registered");
        nurses[_nurse] = Nurse(_name, _department, true);
        emit NurseRegistered(_nurse, _name);
    }

    // Patient registers themselves
    function registerAsPatient() public {
        require(!registeredPatients[msg.sender], "Already registered");
        registeredPatients[msg.sender] = true;
        emit PatientRegistered(msg.sender);
    }

    // Doctor adds a medical record for a patient
    function addRecord(address _patient, string memory _diagnosis, string memory _treatment)
        public
        onlyRegisteredDoctor
    {
        require(registeredPatients[_patient], "Patient not registered");
        patientRecords[_patient].push(Record(_diagnosis, _treatment, block.timestamp));
        emit RecordAdded(msg.sender, _patient, _diagnosis);
    }

    // View patient records (by patient, doctor, or nurse)
    function viewRecords(address _patient)
        public
        view
        onlySelfOrAuthorized(_patient)
        returns (Record[] memory)
    {
        return patientRecords[_patient];
    }
}
