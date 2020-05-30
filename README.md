OBJECTIVES:
The goal of this project was to design and implement a decentralized attendance management portal using blockchain. Initial idea was a develop a smart contract that would allow teachers to add students of their class to this smart contract and periodically increase their attendance value using this smart contract.

MOTIVATION:
Maintaining paper records is too much hassle when it comes to calculating total attendance for students or uploading attendance records.
Centralized online database is prone to various kinds of database attacks.
Eg: the intranet attendance portal which used to exist in 2016-2017 was vulnerable to SQLi and it was possible to read and edit student records (theoretically 😊).

CHALLENGES AND GAS COSTS: 
Gas measures how much "work" an action or set of actions takes to perform. The reason gas is important is that it helps to ensure an appropriate fee is being paid by transactions submitted to the network. 
In our sample dapp have two functions createStudent() and incrementAttendance() which needs gas as data is being stored into the blockchain.
Total gas cost = gasUsed * gasPrice
gasUsed is a constant value. It represents the computational cost of running the Dapp.
gasPrice is not constant, and can be adjusted by the network to compensate for changes in the value of ether.
incrementAttendance()  - 0.000027488 Ether
createStudent() - 0.000027488 Ether

BYTES16 VS STRINGS:
During the final stages of development of the smart contract a few changes were made to bring down gas costs for each transaction. One of the most peculiar optimization was using bytes16 instead of String.
According to Solidity docs string is a dynamically sized-type which has current limitations in Solidity such as can't be returned from a function to a contract. Bytes16 uses less gas because it fits in a single word of the EVM. It also can be sent to web3js frontend using events or getters.
Gas comparisons when first name and last name fields:
Bytes16 used 10465 gas, String used 21897 gas
Functions used for conversions:
web3.utils.toAscii(), web3.utils.fromAscii()

EVENTS VS RETURN VALUES VS CONST FUNCTIONS:
Events are used in transactions only. When you execute a transaction function you can't get the return value because transactions are not immediately mined and included in the blockchain. Events allow you to get notified when the transaction has been mined in order to get the return value. Events have been used to retrieve info after successful creation of student.
Functions marked constant don’t change any state values of a contract. By marking them as such, the compiler could know that storage data would not be written as a result of the function call and consequently no network verification would be required. No transaction to mine, meant no gas needed to be spent -- just read that data right off the blockchain. This was very useful in our project to retrieve a list of all the students that have been added.

SETUP INSTRUCTIONS:
•	Install metamask, connect to ropsten testnet and request faucets if empty wallet.
•	Setup Nodejs, npm, web3js, reactjs, lite-server
•	Extract the folder attendsys-react
•	npm run start

USAGE:
Each teacher can deploy their own attendanceSheet smart contract
Add students to their smart contract by filling in studentId, first Name, last Name, age
Then teachers will later on use the smart contract to increment the student’s attendance periodically
Teachers can also then check the student information including their attendance till that point of time.
All the data is stored securely on the decentralized blockchain and can never be falsified

FRONTEND TODO:
Populate a list of clickable studentId buttons which can be clicked to call incrementAttendance(). The list of studentId can be fetched using getter method getStudents(). Which can be then fed into getParticularStudent() one by one to populate the list. React provides us a very powerful framework to carry out these dynamic tasks.
