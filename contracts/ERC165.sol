pragma solidity >=0.4.21 <0.7.0;
/** * @title ERC165 * @dev https://github.com/ethereum/EIPs/blob/master/EIPS/eip-165.md */

interface ERC165 

{   /**   * @notice Query if a contract implements an interface   
* @param _interfaceId The interface identifier, as specified in ERC-165
* @dev Interface identification is specified in ERC-165. This function
* uses less than 30,000 gas.   */  

function supportsInterface(bytes4 _interfaceId)    
external    
view    
returns (bool);}

/** * @title ERC721 token receiver interface *
@dev Interface for any contract that wants to support safeTransfers * from ERC721 asset contracts. 
*/
