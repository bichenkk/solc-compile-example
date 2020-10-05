// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

import "./SafeMath.sol";

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 */
contract Storage {
    
    using SafeMath for uint256;

    uint256 private result;
    
    function add(uint256 a, uint256 b) public returns (uint256) {
        result = a.add(b);
        return result;
    }
    
    function min(uint256 a, uint256 b) public returns (uint256) {
        result = a.sub(b);
        return result;
    }
    
    function mul(uint256 a, uint256 b) public returns (uint256) {
        result = a.mul(b);
        return result;
    }
    
    function div(uint256 a, uint256 b) public returns (uint256) {
        result = a.div(b);
        return result;
    }
    
    function getResult() public view returns (uint256) {
        return result;
    }
}

