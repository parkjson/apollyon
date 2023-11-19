declare const abi: [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "delegatee",
        "type": "address"
      },
      {
        "internalType": "ResourceId",
        "name": "delegationControlId",
        "type": "bytes32"
      },
      {
        "internalType": "bytes",
        "name": "initCallData",
        "type": "bytes"
      }
    ],
    "name": "registerDelegation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "ResourceId",
        "name": "systemId",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "systemFunctionSignature",
        "type": "string"
      }
    ],
    "name": "registerFunctionSelector",
    "outputs": [
      {
        "internalType": "bytes4",
        "name": "worldFunctionSelector",
        "type": "bytes4"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "ResourceId",
        "name": "namespaceId",
        "type": "bytes32"
      }
    ],
    "name": "registerNamespace",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "ResourceId",
        "name": "namespaceId",
        "type": "bytes32"
      },
      {
        "internalType": "ResourceId",
        "name": "delegationControlId",
        "type": "bytes32"
      },
      {
        "internalType": "bytes",
        "name": "initCallData",
        "type": "bytes"
      }
    ],
    "name": "registerNamespaceDelegation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "ResourceId",
        "name": "systemId",
        "type": "bytes32"
      },
      {
        "internalType": "string",
        "name": "worldFunctionSignature",
        "type": "string"
      },
      {
        "internalType": "bytes4",
        "name": "systemFunctionSelector",
        "type": "bytes4"
      }
    ],
    "name": "registerRootFunctionSelector",
    "outputs": [
      {
        "internalType": "bytes4",
        "name": "worldFunctionSelector",
        "type": "bytes4"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "ResourceId",
        "name": "systemId",
        "type": "bytes32"
      },
      {
        "internalType": "contract WorldContextConsumer",
        "name": "system",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "publicAccess",
        "type": "bool"
      }
    ],
    "name": "registerSystem",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "ResourceId",
        "name": "systemId",
        "type": "bytes32"
      },
      {
        "internalType": "contract ISystemHook",
        "name": "hookAddress",
        "type": "address"
      },
      {
        "internalType": "uint8",
        "name": "enabledHooksBitmap",
        "type": "uint8"
      }
    ],
    "name": "registerSystemHook",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "ResourceId",
        "name": "systemId",
        "type": "bytes32"
      },
      {
        "internalType": "contract ISystemHook",
        "name": "hookAddress",
        "type": "address"
      }
    ],
    "name": "unregisterSystemHook",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]; export default abi;
