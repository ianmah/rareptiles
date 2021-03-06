pragma solidity 0.5.0;

import "./ERC721Full.sol";

contract Reptile is ERC721Full {
  mapping(uint256 => ReptileStruc) public reptiles;

  uint nonce = 0;

  struct ReptileStruc{
    uint id;
    string species;
    string name;
  }
  
  constructor() ERC721Full("Reptile", "REPTILE") public {}

  function mint(string memory _species, string memory _name) public {
    uint _tokenId = totalSupply();
    reptiles[_tokenId] = ReptileStruc({id: _tokenId, species: _species, name: _name});
    _mint(msg.sender, _tokenId);
  }

  function getTokenProperties(uint256 _tokenId) external view returns (uint256 _id, string memory _species, string memory _name) {
    return (reptiles[_tokenId].id, reptiles[_tokenId].species, reptiles[_tokenId].name);
  }

}
