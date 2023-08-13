import React, { useState, useContext } from "react";
import { AppContext } from "../_app";
import { useRouter } from "next/router";
import Modal from "~~/components/Modal";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

function MemberDetails() {
  const { selectedProfile } = useContext(AppContext);
  console.log("🚀 ~ file: [id].tsx:9 ~ MemberDetails ~ selectedProfile:", selectedProfile);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { memberName, user_avatar, userWallet: user_wallet, donationBalance } = selectedProfile;
  const router = useRouter();
  const { id: profileUserWallet } = router.query;

  const getTransactionsUsingCovalent = async () => {
    let headers = new Headers();
    headers.set("Authorization", "Basic " + new Buffer("YOUR_API_KEY").toString("base64"));

    fetch(
      "https://api.covalenthq.com/v1/{chainName}/address/{walletAddress}/collection/{collectionContract}/token/{tokenId}/",
      { method: "GET", headers: headers },
    )
      .then(resp => resp.json())
      .then(data => console.log(data));
  };

  let { data: totalDonations } = useScaffoldContractRead({
    contractName: "Crowdfunding",
    functionName: "balances",
    args: [profileUserWallet],
  });
  totalDonations = Number(totalDonations) / 10 ** 18;
  const donations = totalDonations?.toString();

  const goToDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="w-4/5 p-8 bg-gray-200 mx-auto">
      {isOpen && <Modal setIsOpen={setIsOpen} isOpen={isOpen} />}
      {selectedProfile ? (
        <div className="flex justify-between mt-8">
          <div className="flex">
            <img
              src={user_avatar ? user_avatar : "/assets/download.png"}
              alt="Avatar"
              className="w-20 h-20 rounded-full"
            />

            <div className="flex flex-col ml-8 my-1">
              <p className="text-lg font-bold my-1"> {memberName}</p>
              <p className="text-semibold my-1">{`${user_wallet?.slice(0, 4)}...${user_wallet?.slice(
                user_wallet?.length - 4,
              )}`}</p>
              <p className="font-lightbold my-1">{`Total Donations: ${donations}`}</p>
            </div>
          </div>
          <div className="">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md"
              onClick={() => setIsOpen(true)}
            >
              Create Funding
            </button>
          </div>
        </div>
      ) : (
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md shadow-md"
          onClick={goToDashboard}
        >
          Refresh
        </button>
      )}

      {/*  Transaction History */}
      <div className="mt-8">
        <div className="overflow-x-auto ">
          <table className="table-auto border bg-white mx-auto">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="px-4 py-2">TRANSACTION HASH</th>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">From</th>
                <th className="px-4 py-2">To</th>
                <th className="px-4 py-2">VALUE (ETH)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2">0x23456abc...</td>
                <td className="px-4 py-2">2023-08-05 14:30:00</td>
                <td className="px-4 py-2">0x8AaF65B39b...</td>
                <td className="px-4 py-2">0xC8535A3B6a...</td>
                <td className="px-4 py-2">0.025</td>
              </tr>
              <tr>
                <td className="px-4 py-2">0x23456abc...</td>
                <td className="px-4 py-2">2023-08-05 14:30:00</td>
                <td className="px-4 py-2">0x8AaF65B39b...</td>
                <td className="px-4 py-2">0xC8535A3B6a...</td>
                <td className="px-4 py-2">0.025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MemberDetails;
