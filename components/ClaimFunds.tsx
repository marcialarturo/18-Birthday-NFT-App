import React, { useState, useEffect } from "react";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
const dataPayments = [
  {
    id: 1,
    date: "Jul 4 2023",
    value: "0.01",
  },
  {
    id: 2,
    date: "Jan 15 2023",
    value: "0.05",
  },
  {
    id: 3,
    date: "Feb 22 2023",
    value: "0.02",
  },
  {
    id: 4,
    date: "Oct 8 2022",
    value: "0.03",
  },
  {
    id: 5,
    date: "Nov 11 2022",
    value: "0.04",
  },
  {
    id: 6,
    date: "Dec 25 2022",
    value: "0.07",
  },
];

function ClaimFunds() {
  const [payments, setPayments] = useState<any>([]);

  const claimNow = async id => {
    console.log("🚀claimNow:", id);
  };
  const getPayments = async () => {
    setPayments(dataPayments);
  };

  useEffect(() => {
    try {
      getPayments();
      // if (wallet) {
      // }
    } catch (error) {}
  }, []);

  const { writeAsync: claimFundingById, isLoading, isMining } = useScaffoldContractWrite({
    contractName: "Crowdfunding",
    functionName: "claimFundingById",
    args: [],
    // For payable functions, expressed in ETH
    // value: hardAmount,
    // The number of block confirmations to wait for before considering transaction to be confirmed (default : 1).
    blockConfirmations: 1,
    // The callback function to execute when the transaction is confirmed.
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
      // handleSubmit(event);
    },
  });

  return (
    <div className="w-4/5 p-4 pt-12">
      <h1 className="font-bold text-2xl leading-8">Available Gifts </h1>

      <div className="mt-6">
        <div className="overflow-x-auto ">
          <table className="table-auto border bg-white mx-auto">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2">Available date</th>
                <th className="px-4 py-2">Value (Eth)</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => (
                <tr key={payment.id}>
                  <td className="px-4 py-2">{payment.date}</td>
                  <td className="px-4 py-2">{payment.value} </td>
                  <td className="px-4 py-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md float-right"
                      // onClick={() => claimNow(payment.id)}
                      onClick={claimFundingById}
                    >
                      Claim Now
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ClaimFunds;
