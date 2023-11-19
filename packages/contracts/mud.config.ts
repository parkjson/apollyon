import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  tables: {
    Counter: {
      keySchema: {},
      valueSchema: "uint32",
    },
    Map: {
      keySchema: {
        tileId: "uint256", //technically capital should be %7==0
      },
      valueSchema: {
        coordinate: "int256[3]",
        allegiance: "address", 
        population: "uint256",
      },
    },
    Cities: {
      keySchema: {
        cityId: "uint256",
      },
      valueSchema: {
        warlord: "address",
        coordinate: "int256[3]",
        sectors: "uint256[6]",
        soldierCount: "uint256",
      },
    },
    Soldiers: {
      keySchema: {
        soldierId: "uint256",
      },
      valueSchema: {
        allegiance: "address",
        //cityId: "uint256",
        tileId: "uint256", //coordinate: "int256[3]",
        attack: "uint256",
        defense: "uint256",
        mobility: "uint256",
      },
    },
    //Players:
  },
});
