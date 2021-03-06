import './ERC721Metadata.sol';
import './ERC721Basic.sol';
import './ERC721Enumerable.sol';

pragma solidity >=0.4.21 <0.7.0;

/**
 * @title ERC-721 Non-Fungible Token Standard, full implementation interface
 * @dev See https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md
 */
contract ERC721 is ERC721Basic, ERC721Enumerable, ERC721Metadata {
}
