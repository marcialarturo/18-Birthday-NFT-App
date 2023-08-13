import React, { useState } from "react";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";

const Modal = ({ setIsOpen, isOpen }: any) => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    setName("");
    setAmount("");
    setMessage("");
  };

  const userWallet = "0x462111d863944d6CA75fD2Dc49f794c7024aa819";
  const messsage = "FOR COLLEGE";
  const withdrawDate = 3363171270;
  const hardAmount = " 1";
  // const hardAmount = 1 / 10 ** 18;

  const { writeAsync: saveToContract, isLoading, isMining } = useScaffoldContractWrite({
    contractName: "Crowdfunding",
    functionName: "CreateFund",
    args: [userWallet, messsage, withdrawDate],
    // For payable functions, expressed in ETH
    value: hardAmount,
    // The number of block confirmations to wait for before considering transaction to be confirmed (default : 1).
    blockConfirmations: 1,
    // The callback function to execute when the transaction is confirmed.
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
      // handleSubmit(event);
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen">
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-md">
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
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  Amount
                </label>
                <input
                  type="number"
                  id="amount"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                  Date to be Release
                </label>
                <input
                  type="text"
                  id="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"
                  rows="3"
                ></textarea>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setIsOpen(false)}
                  className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded"
                >
                  Close
                </button>

                <button
                  type="submit"
                  className="mt-4  bg-blue-500 hover:bg-gray-400 font-semibold py-2 px-4 rounded text-white"
                  onClick={saveToContract}
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
