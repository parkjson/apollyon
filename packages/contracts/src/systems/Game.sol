// SPDX-License-Identifier: MIT
pragma solidity >=0.8.21;

//import { System } from "@latticexyz/world/src/System.sol";
import { Map, Cities, Soldiers } from "../codegen/index.sol";


contract Game {

  constructor() {
    Cities.set(0,address(0),[int256(0),int256(0),int256(0)],[uint256(0),uint256(0),uint256(0),uint256(1),uint256(1),uint256(1)]);
    Cities.set(7,address(0),[int256(2),int256(1),int256(-3)],[uint256(0),uint256(0),uint256(0),uint256(1),uint256(1),uint256(1)]);

    for (uint256 i=0;i<2;i++){ //for number of cities
      int256[3] memory cityCoordinate = Cities.getCoordinate(i*7);
      Map.set(i*7+1,[cityCoordinate[0]+1,cityCoordinate[1]-1,cityCoordinate[2]]);
      Map.set(i*7+2,[cityCoordinate[0]+1,cityCoordinate[1],cityCoordinate[2]-1]);
      Map.set(i*7+3,[cityCoordinate[0],cityCoordinate[1]+1,cityCoordinate[2]-1]);
      Map.set(i*7+4,[cityCoordinate[0]-1,cityCoordinate[1]+1,cityCoordinate[2]]);
      Map.set(i*7+5,[cityCoordinate[0]-1,cityCoordinate[1],cityCoordinate[2]+1]);
      Map.set(i*7+6,[cityCoordinate[0],cityCoordinate[1]-1,cityCoordinate[2]+1]);
    }
  }
  
  //fraction pays to owner, fraction paid to contract to hold onto?
  function buyCity(uint256 cityId) public payable { //variable prices and where to store?
    //revert functionality
    require(msg.value>=1e13,"Not 0.00001 eth or greater"); //could backfire if it is sent and gas costs exceed
    require(Cities.getWarlord(cityId)==address(0),"City is already claimed");
    Cities.setWarlord(cityId, msg.sender);
  }

  function setCityOwner(address newOwner, uint256 cityId) private {
    Cities.setWarlord(cityId, newOwner);
  }

  function setSector(uint256 cityId, uint256 sectorNumber, uint256 buildingType) private { //private or public?
    Cities.updateSectors(cityId, sectorNumber, buildingType);
  }
  
  function createSoldier(uint256 soldierId, address allegiance, uint256 tileId, uint256 attack, uint256 defense, uint256 mobility) private { //city specific soldier interaction?
    //!set Map[tile id] WHERE one is being created
    Soldiers.set(soldierId, allegiance, tileId, attack, defense, mobility);
  }
  
  function checkAdjacent(int256[3] tileA, int256[3] tileB) public returns (bool) {
    if (tileA[0]+1==tileB[0] && tileA[1]-1==tileB[1]) {
      return True;
    } else if (tileA[0]+1==tileB[0] && tileA[2]-1==tileB[2]) {
      return True;
    } else if (tileA[1]+1=tileB[1] && tileA[2]-1==tileB[2]) {
      return True;
    } else if (tileA[0]-1==tileB[0] && tileA[1]+1==tileB[1]) {
      return True;
    } else if (tileA[0]-1==tileB[0] && tileA[2]+1==tileB[2]) {
      return True;
    } else if (tileA[1]-1==tileB[1] && tileA[2]-1==tileB[2]) {
      return True;
    }
    return False;
  }

  function moveSoldier(uint256 soldierId, uint256 destinationTileId) private returns (bool) {
    uint256 currTileId = Soldiers.getTileId(soldierId);
    address allegiance = Soldiers.getAllegiance(soldierId);
    int256[3] memory currCoordinate = Map.getCoordinate(currTileId);
    int256[3] memory destinationCoordinate = Map.getCoordinate(destinationTileId);
    if (!destinationCoordinate){
      return False;
    }
    if (!checkAdjacent(currCoordinate,destinationCoordinate)) {
      return False;
    }
    if (destinationTileId%7==0) { //cannot move to capital
      return False;
    }
    
    address destinationAllegiance = Map.getAllegiance(destinationTileId);
    uint256 destinationPopulation = Map.getPopulation(destinationTileId);
    if (destinationAllegiance == address(0)) {
      Soldiers.setTileId(soldierId,destinationTileId);
      Map.setAllegiance(destinationTileId, allegiance);
      Map.setPopulation(destinationTileId, 1);
      uint256 population = Map.getPopulation(currTileId)-1;
      Map.setPopulation(currTileId,population);
      if (population == 0) {
        Map.setAllegiance(currTileId,address(0));
      }
      checkTerritoryClaim(soldierId);
      return True;
    } else if (destinationAllegiance == allegiance && destinationPopulation < 6) { 
      Soldiers.setTileId(soldierId,destinationTileId);
      Map.setPopulation(destinationTileId, destinationPopulation+1);
      uint256 population = Map.getPopulation(currTileId)-1;
      Map.setPopulation(currTileId,population);
      if (population == 0) {
        Map.setAllegiance(currTileId,address(0));
      }
      checkTerritoryClaim(soldierId);
      return True;
    } else { //movement failed
      return False;
    }
  }
  function soldierAttack(uint256 attackingSoldierId, uint256 defendingSoldierId) private returns (bool) { //move into tile when kill? or stand there
    //if both choose to attack each other at the same time, if both choose to move into the same hexagon at the same time
    uint256 attackerTileId = Soldiers.getTileId(attackingSoldierId);
    uint256 defenderTileId = Soldiers.getTileId(defendingSoldierId);
    int256[3] memory attackerCoordinate = Map.getCoordinate(attackingSoldierId);
    int256[3] memory defenderCoordinate = Map.getCoordinate(defendingSoldierId);
    if (!checkAdjacent(attackerCoordinate,defenderCoordinate)) {
      return False;
    }
    address defenderAllegiance = Map.getAllegiance(defendingSoldierId);
    address attackerAllegiance = Map.getAllegiance(attackingSoldierId);
    if (defenderAllegiance == attackerAllegiance) {
      return False;
    }
    
    uint256 defenderDefense = Soldiers.getDefense(defendingSoldierId);
    uint256 attackerAttack = Soldiers.getAttack(attackingSoldierId);
    
    uint256 defenderAttack = Soldiers.getAttack(defendingSoldierId);
    uint256 attackerDefense = Soldiers.getDefense(attackingSoldierId);

    bool defenderAliveFlag = True;
    if (attackerAttack>=defenderDefense) {
      uint256 defenderTilePopulation = Map.getPopulation(defenderTileId);
      if (defenderTilePopulation == 1) {
        Map.setAllegiance(defenderTileId,address(0));
      }
      Map.setPopulation(defenderTileId, defenderTilePopulation-1);
      Soldiers.remove(defendingSoldierId);
      defenderAliveFlag=False;
    } else {
      Soldiers.setDefense(defendingSoldierId, defenderDefense-attackerAttack);
    }
    if (defenderAttack>=attackerDefense) {
      uint256 attackerTilePopulation = Map.getPopulation(attackerTileId);
      if (attackerTilePopulation == 1) {
        Map.setAllegiance(attackerTileId,address(0));
      }
      Map.setPopulation(attackerTileId, attackerTilePopulation-1);
      Soldiers.remove(attackingSoldierId);
      if (defenderAliveFlag) {
        checkTerritoryClaim(defendingSoldierId);
      }
    } else {
      Soldiers.setDefense(attackingSoldierId, attackerDefense-defenderAttack);
      if (!defenderAliveFlag) {
        checkTerritoryClaim(attackingSoldierId);
      }
    }
    return True; //successful attack
  }
  
  function checkTerritoryClaim(uint256 soldierId) private returns (bool) {
    uint256 tileId = Soldiers.getTileId(soldierId);
    address allegiance = Soldiers.getAllegiance(soldierId);
    uint256 cityId = tileId-tileId%7;
    address warlord = Cities.getWarlord(cityId);
    if (!warlord) { //not a purchased city
      return False;
    }
    for (int i=cityId+1;i<cityId+7;i++) { //sectors 1 to 6
      address sectorAllegiance = Map.getAllegiance(i);
      if (sectorAllegiance != allegiance && sectorAllegiance != address(0)) {
        return False;
      }
    }
    Cities.setWarlord(allegiance);
    return True;
  }

  //function payout(address warlord){}
  
  //github upload repo
  //update map
  //get it to compile and interact with it
  //createSoldier needs to check conditions for soldier creation 
  //(n/6, barrack for speed)


}