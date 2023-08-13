// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import { ByteHasher } from "./helpers/ByteHasher.sol";
import { IWorldID } from "./interfaces/IWorldID.sol";

contract Crowdfunding1 {
    using ByteHasher for bytes;

    /// @notice Thrown when attempting to reuse a nullifier
    error InvalidNullifier();

    /// @dev The World ID instance that will be used for verifying proofs
    IWorldID internal immutable worldId;

    /// @dev The contract's external nullifier hash
    uint256 internal immutable externalNullifier;

    /// @dev The World ID group ID (always 1)
    uint256 internal immutable groupId = 1;

    /// @dev Whether a nullifier hash has been used already. Used to guarantee an action is only performed once by a single person
    mapping(uint256 => bool) internal nullifierHashes;


    /// @param _worldId The WorldID instance that will verify the proofs
    /// @param _appId The World ID app ID
    /// @param _actionId The World ID action ID

    // Variables
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

    constructor(
        IWorldID _worldId,
        string memory _appId,
        string memory _actionId
    ) {
        worldId = _worldId;
        externalNullifier = abi
            .encodePacked(abi.encodePacked(_appId).hashToField(), _actionId)
            .hashToField();
    }

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



    /// @param signal An arbitrary input from the user, usually the user's wallet address (check README for further details)
    /// @param root The root of the Merkle tree (returned by the JS widget).
    /// @param nullifierHash The nullifier hash for this proof, preventing double signaling (returned by the JS widget).
    /// @param proof The zero-knowledge proof that demonstrates the claimer is registered with World ID (returned by the JS widget).
    /// @dev Feel free to rename this method however you want! We've used `claim`, `verify` or `execute` in the past.
    function verifyAndExecute(
        address signal,
        uint256 root,
        uint256 nullifierHash,
        uint256[8] calldata proof
    ) public {
        // First, we make sure this person hasn't done this before
        if (nullifierHashes[nullifierHash]) revert InvalidNullifier();

        // We now verify the provided proof is valid and the user is verified by World ID
        worldId.verifyProof(
            root,
            groupId,
            abi.encodePacked(signal).hashToField(),
            nullifierHash,
            externalNullifier,
            proof
        );

        // We now record the user has done this, so they can't do it again (proof of uniqueness)
        nullifierHashes[nullifierHash] = true;

        // Finally, execute your logic here, for example issue a token, NFT, etc...
        // Make sure to emit some kind of event afterwards!
    }
}
