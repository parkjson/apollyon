import { mudConfig } from "@latticexyz/world/register";

export default mudConfig({
  tables: {
    Counter: {
      keySchema: {},
      valueSchema: "uint32",
    },
    Map: {
      keySchema: { id: "uint256" },
      valueSchema: {
        allegiance: "address", 
        population: "uint256",
        coordinate: "int256[3]",//"int256[3]",
      },
    },
    Cities: {
      keySchema: { id: "uint256" },
      valueSchema: {
        warlord: "address",
        soldierCount: "uint256",
        coordinate: "int256[3]",//"int256[3]",
        sectors: "uint256[6]",//"int256[6]",
      },
    },
    Soldiers: {
      keySchema: { id: "uint256" },
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
