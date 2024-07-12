// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DegenToken is ERC20, Ownable {
    mapping(address => string[]) private _purchases;
    mapping(string => uint256) private _itemPrices;

    event Burn(address indexed from, uint256 value);
    event Redeem(address indexed from, uint256 value, string itemName);

    constructor() ERC20("Degen", "DGN") Ownable(msg.sender) {
        
        _itemPrices["tea"] = 10;
        _itemPrices["coffee"] = 15;
        _itemPrices["chips"] = 5;
        _itemPrices["samosha"] = 7;
        _itemPrices["cookies"] = 8;
    }

    function mint(address to, uint256 value) public onlyOwner {
        _mint(to, value);
    }

    function transfer(address to, uint256 value) public override returns (bool) {
        return super.transfer(to, value);
    }

    function redeem(string memory itemName) public {
        address sender = msg.sender;
        uint256 itemPrice = _itemPrices[itemName];
        require(itemPrice > 0, "Item does not exist");
        require(balanceOf(sender) >= itemPrice, "Insufficient balance");

        _burn(sender, itemPrice);
        _purchases[sender].push(itemName);
        emit Redeem(sender, itemPrice, itemName);
    }

    function burn(uint256 value) public {
        _burn(msg.sender, value);
        emit Burn(msg.sender, value);
    }

    function getPurchases(address account) public view returns (string[] memory) {
        return _purchases[account];
    }

    function getItemPrice(string memory itemName) public view returns (uint256) {
        return _itemPrices[itemName];
    }

    
}
