// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import "forge-std/Test.sol";
import { MudTest } from "@latticexyz/world/test/MudTest.t.sol";
import { getKeysWithValue } from "@latticexyz/world-modules/src/modules/keyswithvalue/getKeysWithValue.sol";

import { IWorld } from "../src/codegen/world/IWorld.sol";
import { Counter, CounterTableId } from "../src/codegen/index.sol";
import { Map, MapData, MapTableId } from "../src/codegen/index.sol";
import { Cities, CitiesData, CitiesTableId } from "../src/codegen/index.sol";
import { Soldiers, SoldiersData, SoldiersTableId } from "../src/codegen/index.sol";


contract CounterTest is MudTest {
  function testWorldExists() public {
    uint256 codeSize;
    address addr = worldAddress;
    assembly {
      codeSize := extcodesize(addr)
    }
    assertTrue(codeSize > 0);
  }

  function testCounter() public {
    // Expect the counter to be 1 because it was incremented in the PostDeploy script.
    uint32 counter = Counter.get();
    assertEq(counter, 1);

    // Expect the counter to be 2 after calling increment.
    IWorld(worldAddress).increment();
    counter = Counter.get();
    assertEq(counter, 2);
  }
  /*
  function testMap() public {
    int256[3] memory coordinate = Map.getCoordinate(0);
    address allegiance = Map.getAllegiance(0);
    uint256 population = Map.getPopulation(0);
    assertEq(allegiance,address(0));
    assertEq(population,0);
    assertEq(coordinate[0],0);
    assertEq(coordinate[1],0);
    assertEq(coordinate[2],0);
    console.log("tested game constructor");
  }*/
}
