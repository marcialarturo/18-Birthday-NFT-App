import React, { useState, useEffect } from "react";

const dataPayments = [
  {
    id: 1,
    date: "Jul 4 2030",
    value: "0.01",
  },
  {
    id: 2,
    date: "Jan 15 2034",
    value: "0.05",
  },
];
function LockedFunds() {
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

  return (
    <div className="w-4/5 p-4 pt-12">
      <h1 className="font-bold text-2xl leading-8">Upcoming Gifts </h1>

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
                      onClick={() => claimNow(payment.id)}
                    >
                      Awaiting...
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

export default LockedFunds;
