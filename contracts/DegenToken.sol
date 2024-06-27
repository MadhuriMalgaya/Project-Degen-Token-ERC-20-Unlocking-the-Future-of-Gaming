// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DegenToken is ERC20, Ownable {
    mapping(address => string[]) private _purchases;

    event Burn(address indexed from, uint256 value);
    event Redeem(address indexed from, uint256 value, string itemName);

    constructor() ERC20("Degen", "DGN") Ownable(msg.sender) {}

    function mint(address to, uint256 value) public onlyOwner {
        _mint(to, value);
    }

    function transfer(address to, uint256 value) public override returns (bool) {
        return super.transfer(to, value);
    }

    function redeem(string memory itemName, uint256 value) public {
        address sender = msg.sender;
        require(balanceOf(sender) >= value, "Insufficient balance");

        _burn(sender, value);
        _purchases[sender].push(itemName);
        emit Redeem(sender, value, itemName);
    }

    function burn(uint256 value) public {
        _burn(msg.sender, value);
        emit Burn(msg.sender, value);
    }

    function getPurchases(address account) public view returns (string[] memory) {
        return _purchases[account];
    }
}
