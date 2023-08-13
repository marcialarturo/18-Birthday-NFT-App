import React, { useState, useEffect } from "react";
import { IDKitWidget } from "@worldcoin/idkit";
import { useAccount } from "wagmi";
import { HomeIcon, QueueListIcon } from "@heroicons/react/24/outline";
import ContactList from "~~/components/ContactList";
import ClaimFunds from "~~/components/ClaimFunds";
import LockedFunds from "~~/components/LockedFunds";
import AddMemberForm from "~~/components/AddMemberForm";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

function Dashboard() {
  const { address } = useAccount();
  const [wallet, setWallet] = useState<any>("");
  const [isActive, setIsActive] = useState<any>("Dashboard");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isVerify, setIsVerify] = useState<boolean>(true);

  useEffect(() => {
    setWallet(address);
  }, [address]);

  const { data: contacts } = useScaffoldContractRead({
    contractName: "Crowdfunding",
    functionName: "retriveMembers",
    args: [address],
  });

  const onSuccess = data => {
    console.log("data", data);
    setIsVerify(true);

    //  claiming fund, do it from the contract
    //     chain:"polygon"
    // credential_type:"orb"
    // merkle_root:"0x19995279fe826a35089287256ea66dfa47c4a0944152c3166a99f351af38ea26"
    // nullifier_hash:"0x18d3c953cd90cc7cb98408250d39bf726316a9e160fce7be5e5bdd1b232a7573"
    // proof:"0x1e99f9e425febc10ee305ac9e0ab3ff2bd7134eade042d09d05f8f7e6d73d1
    //
  };

  const handleVerify = () => {
    // submitProof(req, resp);
    console.log("handleVerify");
  };

  const worldCoin = (
    <IDKitWidget
      app_id="app_staging_6b7cb2be91cdf10dcdbd790cb9421786" // obtained from the Developer Portal
      action="vote_1" // this is your action name from the Developer Portal
      onSuccess={onSuccess} // callback when the modal is closed
      handleVerify={handleVerify} // optional callback when the proof is received
      credential_types={["orb", "phone"]} // optional, defaults to ['orb']
      enableTelemetry // optional, defaults to false
    >
      {({ open }) => <button onClick={open}>Verify with World ID</button>}
    </IDKitWidget>
  );
  return (
    <>
      {!isVerify ? (
        worldCoin
      ) : (
        <div className="bg-gray-100 flex">
          <div className="bg-blue-600 text-white h-screen w-1/5 p-4">
            <img
              src="https://assets.codepen.io/137754/internal/avatars/users/default.png?fit=crop&format=auto&height=512&version=1597542102&width=512"
              alt="Avatar"
              className="w-20 h-20 rounded-full mx-auto"
            />
            <div className="text-center">
              <p className="text-lg">Welcome back!</p>
              <p className="text-semibold">{`${wallet?.slice(0, 4)}...${wallet?.slice(wallet.length - 4)}`}</p>
            </div>
            <ul>
              <li
                className={`flex items-center space-x-2 my-3 mt-40 p-2 ${
                  isActive === "Dashboard" ? "bg-green-500" : ""
                }`}
                onClick={() => setIsActive("Dashboard")}
              >
                <HomeIcon className="h-8 w-8" />
                <span>Dashboard</span>
              </li>
              <li
                className={`flex items-center space-x-2 my-3 p-2 ${isActive === "Claim Funds" ? "bg-green-500" : ""}`}
                onClick={() => setIsActive("Claim Funds")}
              >
                <QueueListIcon className="h-8 w-8" />
                <span>Available Gifts</span>
              </li>

              <li
                className={`flex items-center space-x-2 my-3 p-2 ${isActive === "Locked Funds" ? "bg-green-500" : ""}`}
                onClick={() => setIsActive("Locked Funds")}
              >
                <QueueListIcon className="h-8 w-8" />
                <span>Upcoming Gifts</span>
              </li>
            </ul>
          </div>

          {isOpen && <AddMemberForm setIsOpen={setIsOpen} isOpen={isOpen} />}

          {isActive === "Dashboard" && <ContactList setIsOpen={setIsOpen} isOpen={isOpen} contacts={contacts} />}
          {isActive === "Claim Funds" && <ClaimFunds />}
          {isActive === "Locked Funds" && <LockedFunds />}
        </div>
      )}
    </>
  );
}

export default Dashboard;
