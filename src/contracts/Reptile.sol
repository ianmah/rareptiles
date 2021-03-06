pragma solidity 0.5.0;

import "./ERC721Full.sol";

contract Reptile is ERC721Full {
  ReptileStruc[] public reptiles;
  mapping(uint256 => ReptileStruc) public tokenProperty;

  uint nonce = 0;

  struct ReptileStruc{
    uint id;
    string species;
    string name;
  }
  
  constructor() ERC721Full("Reptile", "REPTILE") public {}

  function mint(string memory _species, string memory _name) public {
    uint _tokenId = totalSupply();

    items.push(PenguinStruc({id: _tokenId, species: _species, name: _name}));
    tokenProperty[_tokenId] = PenguinStruc({id: _tokenId, species: _species, name: _name});
    _mint(msg.sender, _tokenId);
  }

  function getTokenProperties(uint256 _tokenId) external view returns (string memory _id, string memory _species, uint256 _name) {
    return (tokenProperty[_tokenId].id, tokenProperty[_tokenId].asd, tokenProperty[_tokenId].attack);
  }

}
