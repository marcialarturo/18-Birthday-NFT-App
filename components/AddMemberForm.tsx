import React, { useState } from "react";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const AddMemberForm = ({ setIsOpen, isOpen }: any) => {
  const [name, setName] = useState("");
  const [memberWallet, setMemberWallet] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    console.log("🚀 name:", name, memberWallet);
    setName("");
    setMemberWallet("");
  };

  //    id,
  // _memberName,
  // _userWallet,
  // _dateToWithdraw,
  // 0
  const memberName = "Joe";
  const userWallet = "0xDA261916E9eD8628f9EC0a67DfC85885036a82A7";
  const dateToWithdraw = 3363171270;

  const { writeAsync, isLoading, isMining } = useScaffoldContractWrite({
    contractName: "Crowdfunding",
    functionName: "AddFamilyMember",
    args: [memberName, userWallet, dateToWithdraw],
    // For payable functions, expressed in ETH
    // value: "0.01",
    // The number of block confirmations to wait for before considering transaction to be confirmed (default : 1).
    blockConfirmations: 1,
    // The callback function to execute when the transaction is confirmed.
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen">
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-md bg-gray-300">
          <div className="bg-white p-8 rounded shadow-lg">
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Create Fund</h2>

              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Member Wallet
                </label>
                <input
                  type="text"
                  id="name"
                  value={memberWallet}
                  onChange={e => setMemberWallet(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-4 bg-gray-100 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
                >
                  Never mind
                </button>

                <button
                  type="submit"
                  className="mt-4  bg-blue-500 hover:bg-gray-400 font-semibold py-2 px-4 rounded text-white"
                  onClick={writeAsync}
                >
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddMemberForm;
