// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Escrow {
    address public sender;
    address public receiver;
    uint public amount;
    bool public senderApproved = false;
    bool public receiverApproved = false;
    string public aliasName;
    string public description;

    constructor(address _receiver, string memory _alias, string memory _description) payable {
        sender = msg.sender;
        receiver = _receiver;
        amount = msg.value;
        aliasName = _alias;
        description = _description;
    }

    function approveSender() public {
        require(msg.sender == sender, "Only sender can approve.");
        senderApproved = true;
        finalizeIfApproved();
    }

    function approveReceiver() public {
        require(msg.sender == receiver, "Only receiver can approve.");
        receiverApproved = true;
        finalizeIfApproved();
    }

    function finalizeIfApproved() private {
        if (senderApproved && receiverApproved) {
            payable(receiver).transfer(amount);
        }
    }

    function refund() public {
        require(msg.sender == sender, "Only sender can request a refund.");
        require(!senderApproved || !receiverApproved, "Both must approve for refund.");
        payable(sender).transfer(amount);
    }
}