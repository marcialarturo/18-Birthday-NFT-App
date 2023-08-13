// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Crowdfunding {
    mapping(address => uint) public balances;
    mapping(address => Profile[]) public profiles;
    mapping(address => Fund[]) public fundings;

    struct Profile {
        uint256 id;
        string memberName;
        address userWallet;
        uint256 dateToWithdraw;
        uint256 donationBalance;
    }

     struct Fund {
        uint256 id;
        string message;
        uint256 amount;
        address userWallet;
        uint256 withdrawDate;
    }

    constructor() {}

    function AddFamilyMember(
       string memory _memberName,
       address _userWallet,
       uint256 _dateToWithdraw
    ) external
    {
        uint id = profiles[msg.sender].length;
        profiles[msg.sender].push(Profile(
            id,
            _memberName,
            _userWallet,
            _dateToWithdraw,
            0
        ));
    }

    function CreateFund(
        address _userWallet,
        string calldata _messsage,
        uint256 _withdrawDate
    ) payable external {
        uint id = fundings[msg.sender].length;
        fundings[msg.sender].push(
            Fund(
                id,
                _messsage,
                msg.value,
                _userWallet,
                _withdrawDate
            )
        );
        balances[_userWallet] += msg.value;
    }

    // parent Wallet
    function retriveMembers(address userWallet) external view returns (Profile[] memory) {
        return profiles[userWallet];
    }

    // child wallet
    function retrieveAllFundings(address userWallet) external view returns (Fund[] memory) {
        return fundings[userWallet];
    }

    function claimFundingById() external {
        (bool sent,) = msg.sender.call{value: balances[msg.sender]}("");
        require(sent, "Failed Claim");
        balances[msg.sender] = 0;
    }

  

}
