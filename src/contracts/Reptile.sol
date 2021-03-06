pragma solidity 0.5.0;

import "./ERC721Full.sol";

contract Reptile is ERC721Full {
  mapping(uint256 => ReptileStruc) public reptiles;
  mapping(uint256 => bool) public reptile_exists;
  mapping(uint256 => uint) public reptilesOnSale;

  uint nonce = 0;

  struct ReptileStruc{
    uint id;
    string species;
    string name;
    string uri;
  }
  
  constructor() ERC721Full("Reptile", "REPTILE") public {}

  function mint(string memory _species, string memory _name, string memory _uri) public {
    uint _tokenId = totalSupply();
    reptiles[_tokenId] = ReptileStruc({id: _tokenId, species: _species, name: _name, uri: _uri});
    reptile_exists[_tokenId] = true;

    _mint(msg.sender, _tokenId);
  }

  function getTokenProperties(uint256 _tokenId) external view returns (uint256 _id, string memory _species, string memory _name, string memory uri) {
    return (reptiles[_tokenId].id, reptiles[_tokenId].species, reptiles[_tokenId].name, reptiles[_tokenId].uri);
  }

  function setForSale(uint256 _tokenId, uint _salePrice) external {
      address owner = ownerOf(_tokenId);

      require(reptile_exists[_tokenId]);
      require(owner == msg.sender);
      require(reptilesOnSale[_tokenId] == 0);
      reptilesOnSale[_tokenId] = _salePrice;

      emit Approval(owner, address(this), _tokenId);
  }

  function buy(uint256 _tokenId) external payable {
      address buyer = msg.sender;
      uint payedPrice = msg.value;

      require(getApproved(_tokenId) == address(this));
      require(reptile_exists[_tokenId]);

      uint salePrice = reptilesOnSale[_tokenId];

      require(payedPrice >= salePrice);

      // pay the seller
      transferFrom(ownerOf(_tokenId), buyer, _tokenId);

      // remove token from reptilesOnSale
      delete reptilesOnSale[_tokenId];
  }

}
