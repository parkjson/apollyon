declare const abi: [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      },
      {
        "internalType": "uint256",
        "name": "start",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "end",
        "type": "uint256"
      }
    ],
    "name": "Slice_OutOfBounds",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "ResourceId",
        "name": "tableId",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bytes32[]",
        "name": "keyTuple",
        "type": "bytes32[]"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "staticData",
        "type": "bytes"
      },
      {
        "indexed": false,
        "internalType": "PackedCounter",
        "name": "encodedLengths",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "dynamicData",
        "type": "bytes"
      }
    ],
    "name": "Store_SetRecord",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "ResourceId",
        "name": "tableId",
        "type": "bytes32"
      },
      {
        "indexed": false,
        "internalType": "bytes32[]",
        "name": "keyTuple",
        "type": "bytes32[]"
      },
      {
        "indexed": false,
        "internalType": "uint48",
        "name": "start",
        "type": "uint48"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "Store_SpliceStaticData",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "cityId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "purchaser",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "cost",
        "type": "uint256"
      }
    ],
    "name": "cityBought",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "soldierId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "allegiance",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "tileId",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "attack",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "defense",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "mobility",
        "type": "uint256"
      }
    ],
    "name": "soldierCreated",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "cityId",
        "type": "uint256"
      }
    ],
    "name": "buyCity",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "int256[3]",
        "name": "tileA",
        "type": "int256[3]"
      },
      {
        "internalType": "int256[3]",
        "name": "tileB",
        "type": "int256[3]"
      }
    ],
    "name": "checkAdjacent",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  }
]; export default abi;
