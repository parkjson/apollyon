declare const abi: [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "length",
        "type": "uint256"
      }
    ],
    "name": "PackedCounter_InvalidLength",
    "type": "error"
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
    "inputs": [
      {
        "internalType": "uint256",
        "name": "length",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "accessedIndex",
        "type": "uint256"
      }
    ],
    "name": "Store_IndexOutOfBounds",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "bytes2",
        "name": "expected",
        "type": "bytes2"
      },
      {
        "internalType": "ResourceId",
        "name": "resourceId",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "resourceIdString",
        "type": "string"
      }
    ],
    "name": "Store_InvalidResourceType",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "uint40",
        "name": "startWithinField",
        "type": "uint40"
      },
      {
        "internalType": "uint40",
        "name": "deleteCount",
        "type": "uint40"
      },
      {
        "internalType": "uint40",
        "name": "fieldLength",
        "type": "uint40"
      }
    ],
    "name": "Store_InvalidSplice",
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
      }
    ],
    "name": "Store_DeleteRecord",
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
        "internalType": "uint40",
        "name": "deleteCount",
        "type": "uint40"
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
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "Store_SpliceDynamicData",
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
    "inputs": [],
    "name": "_msgSender",
    "outputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "_msgValue",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "_world",
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
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "soldierId",
        "type": "uint256"
      }
    ],
    "name": "checkTerritoryClaim",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "soldierId",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "allegiance",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tileId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "attack",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "defense",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "mobility",
        "type": "uint256"
      }
    ],
    "name": "createSoldier",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "soldierId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "destinationTileId",
        "type": "uint256"
      }
    ],
    "name": "moveSoldier",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "pseudoConstructor",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "cityId",
        "type": "uint256"
      }
    ],
    "name": "setCityOwner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "cityId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "sectorNumber",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "buildingType",
        "type": "uint256"
      }
    ],
    "name": "setSector",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "attackingSoldierId",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "defendingSoldierId",
        "type": "uint256"
      }
    ],
    "name": "soldierAttack",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "bytes4",
        "name": "interfaceId",
        "type": "bytes4"
      }
    ],
    "name": "supportsInterface",
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
