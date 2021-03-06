pragma solidity 0.5.0;

import "./ERC721Full.sol";

contract Reptile is ERC721Full {
  mapping(uint256 => ReptileStruc) public reptiles;
  mapping(uint256 => bool) public reptile_exists;
  mapping(uint256 => uint) public reptilesSalePrice;
  mapping(uint => uint) public rarityDistribution;

  enum Rarity {MEX, EX, CR, EN, VU, LC}

  uint public donations = 0;

  uint nonce = 0;

  struct ReptileStruc{
    uint id;
    string species;
    string name;
    string uri;
    bool forSale;
    uint salePrice;
    Rarity rarity;
  }
  
  constructor() ERC721Full("Reptile", "REPTILE") public {}

  function mint(string memory _species, string memory _name, string memory _uri, uint _rarityRating) public {
    uint _tokenId = totalSupply();
    Rarity _rarity = Rarity(_rarityRating);
    reptiles[_tokenId] = ReptileStruc({id: _tokenId, species: _species, name: _name, uri: _uri, forSale: false, salePrice: 0, rarity: _rarity});
    reptile_exists[_tokenId] = true;

    _mint(msg.sender, _tokenId);
  }

  function getTokenProperties(uint256 _tokenId) external view returns (uint256 _id, string memory _species, string memory _name, string memory uri, bool _forSale, uint _salePrice, uint _rarity) {
    return (reptiles[_tokenId].id, reptiles[_tokenId].species, reptiles[_tokenId].name, reptiles[_tokenId].uri, reptiles[_tokenId].forSale, reptiles[_tokenId].salePrice, uint(reptiles[_tokenId].rarity));
  }

  function setForSale(uint256 _tokenId, uint _salePrice) external {
      address owner = ownerOf(_tokenId);

      require(reptile_exists[_tokenId]);
      require(owner == msg.sender);
      require(reptilesSalePrice[_tokenId] == 0);
      reptilesSalePrice[_tokenId] = _salePrice;

      reptiles[_tokenId].forSale = true;
      reptiles[_tokenId].salePrice = _salePrice;
      approve(address(this), _tokenId);
      emit Approval(owner, address(this), _tokenId);
  }

  function buy(uint256 _tokenId) external payable {
      address buyer = msg.sender;
      address seller = ownerOf(_tokenId);
      // address payable sellerPayAddress = address(uint160(seller));
      // uint payedPrice = msg.value;

    //   require(getApproved(_tokenId) == address(this), "unapproved");
      require(reptile_exists[_tokenId], "reptile does not exist");

      // uint salePrice = reptilesSalePrice[_tokenId];

    //   require(payedPrice >= salePrice);

      // pay the seller
    //   sellerPayAddress.transfer(salePrice);

      // transfer token
      transferFrom(seller, buyer, _tokenId);

      // remove token from reptilesOnSale
      reptiles[_tokenId].forSale = false;
      delete reptilesSalePrice[_tokenId];
  }

}
