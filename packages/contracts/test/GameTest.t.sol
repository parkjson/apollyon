// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

import "forge-std/Test.sol";
import { MudTest } from "@latticexyz/world/test/MudTest.t.sol";
import { getKeysWithValue } from "@latticexyz/world-modules/src/modules/keyswithvalue/getKeysWithValue.sol";

import { IWorld } from "../src/codegen/world/IWorld.sol";
import { Map, MapData, MapTableId } from "../src/codegen/index.sol";
import { Cities, CitiesData, CitiesTableId } from "../src/codegen/index.sol";
import { Soldiers, SoldiersData, SoldiersTableId } from "../src/codegen/index.sol";


contract GameTest is MudTest {
  function testWorldExists() public {
    uint256 codeSize;
    address addr = worldAddress;
    assembly {
      codeSize := extcodesize(addr)
    }
    assertTrue(codeSize > 0);
  }

  function testPseudoConstructor() public {
    IWorld(worldAddress).pseudoConstructor();
    int256[3] memory coordinate = Map.getCoordinate(7);
    address allegiance = Map.getAllegiance(0);
    uint256 population = Map.getPopulation(0);
    assertEq(allegiance,address(0));
    assertEq(population,0);
    assertEq(coordinate[0],2);
    assertEq(coordinate[1],1);
    assertEq(coordinate[2],-3);
  }

  function testBuyLand() public {
    IWorld(worldAddress).pseudoConstructor();
    //console.log("msg.sender",msg.sender);
    //console.log("IWorld",address(IWorld(worldAddress)));
    //vm.prank(address(IWorld(worldAddress)));
    //console.log("msg.sender after prank",msg.sender);
    //console.log("ETH balance", address(1).balance / 1e18);
    hoax(address(1),1e18);
    IWorld(worldAddress).buyCity{value: 1e13}(0); //default is 0 becareful
    assertEq(address(1),Cities.getWarlord(0));
    
    hoax(address(2),1e18);
    IWorld(worldAddress).buyCity{value: 1e13}(7); //default is 0 becareful
    assertEq(address(2),Cities.getWarlord(7));
    //revert buyCity?
    
  }

  function testSetCityOwner() public {
    IWorld(worldAddress).pseudoConstructor();
    IWorld(worldAddress).setCityOwner(address(3),7);
    assertEq(address(3),Cities.getWarlord(7));
  }

  function testSetSector() public {
    IWorld(worldAddress).pseudoConstructor();
    IWorld(worldAddress).setSector(0,1,3); //city 0, sector index 1 (0-5), building type 3
    assertEq(3,Cities.getItemSectors(0,1));
  }
  /*
  function testSetCityAllegiance() public {
    IWorld(worldAddress).pseudoConstructor();
    IWorld(worldAddress).setCityAllegiance(0,address(1));
    assertEq(address(1),Map.getAllegiance(1));
  }*/
  
  function testCreateSoldier() public {
    IWorld(worldAddress).pseudoConstructor();
    //console.log(Cities.getWarlord(0));
    hoax(address(4),1e18); //buyCity
    IWorld(worldAddress).buyCity{value: 1e13}(0);
    
    IWorld(worldAddress).createSoldier(0,address(4),1,2,1,3);
    assertEq(1,Map.getPopulation(1));
    assertEq(2,Soldiers.getAttack(0));
    
  }
  
  function testCheckAdjacent() public {
    IWorld(worldAddress).pseudoConstructor();
    int256[3] memory tile2 = Map.getCoordinate(2);
    int256[3] memory tile13 = Map.getCoordinate(13);
    assertEq(true,IWorld(worldAddress).checkAdjacent(tile2,tile13));
  }
  
  function testMoveSoldier() public {
    IWorld(worldAddress).pseudoConstructor();
    hoax(address(5),1e18); //buyCity
    IWorld(worldAddress).buyCity{value: 1e13}(0);
    IWorld(worldAddress).createSoldier(1,address(5),1,2,1,3);
    IWorld(worldAddress).moveSoldier(1,2);
    assertEq(0,Map.getPopulation(1));
    assertEq(1,Map.getPopulation(2));
  }
  
  function testSoldierAttack() public {
    IWorld(worldAddress).pseudoConstructor();
    hoax(address(1),1e18); //buyCity
    IWorld(worldAddress).buyCity{value: 1e13}(0);
    //assertEq(address(1),Cities.getWarlord(0));
    IWorld(worldAddress).createSoldier(0,address(1),2,2,1,3);
    //assertEq(2,Map.getPopulation(2));
    //assertEq(2,Soldiers.getAttack(0));
    hoax(address(2),1e18); //buyCity
    IWorld(worldAddress).buyCity{value: 1e13}(7);
    //assertEq(address(2),Cities.getWarlord(7));
    IWorld(worldAddress).createSoldier(1,address(2),13,2,1,3);
    //assertEq(1,Map.getPopulation(13));
    //assertEq(2,Soldiers.getAttack(1));

    
    assertEq(address(1),Map.getAllegiance(2));
    assertEq(address(2),Map.getAllegiance(13));
    IWorld(worldAddress).soldierAttack(0,1);
    //soldierAttack does not elim population or change allegiance.
    //soldierattack does not kill both soldiers. (check if statements)
    //why does changing if def=att allegiance result in tests passing?
    //assertEq(2,Soldiers.getDefense(0));
    //assertEq(2,Soldiers.getDefense(1));
    assertEq(address(0),Map.getAllegiance(2));
    assertEq(address(0),Map.getAllegiance(13));
    
    assertEq(0,Map.getPopulation(2));
    assertEq(0,Map.getPopulation(13));
    
    //check soldier id and stats if zero
    //check def of surviving fights
  }
  
  
  function testCheckTerritoryClaim() public {
    IWorld(worldAddress).pseudoConstructor();
    //have two soldiers fight on one side's territory, foreigner if winner shld claim territory
    hoax(address(1),1e18); //buyCity
    IWorld(worldAddress).buyCity{value: 1e13}(0);
    IWorld(worldAddress).createSoldier(0,address(1),3,2,2,3);
    hoax(address(2),1e18); //buyCity
    IWorld(worldAddress).buyCity{value: 1e13}(7);
    IWorld(worldAddress).createSoldier(1,address(2),13,1,1,3);
    IWorld(worldAddress).moveSoldier(0,12);
    
    IWorld(worldAddress).soldierAttack(0,1);
    assertEq(address(1),Map.getAllegiance(12));
    assertEq(1,Map.getPopulation(12));
    assertEq(address(0),Map.getAllegiance(13));
    assertEq(0,Map.getPopulation(13));
    //IWorld(worldAddress).checkTerritoryClaim(0));
    //assertEq(address(1),Cities.getWarlord(7));
  }
  

  //create soldier
  //set map allegiance
  //movesoldier 
  //claim territory if there is an enemy soldier of diff allegiance
}
