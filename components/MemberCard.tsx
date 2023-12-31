import React, { useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { HeartIcon } from "@heroicons/react/24/outline";
import { AppContext } from "~~/pages/_app";

const MemberCard = ({ contact }: any) => {
  const { name, user_avatar, user_wallet, total_donations } = contact;
  const { setSelectedProfile } = useContext(AppContext);
  const router = useRouter();

  const handleSelectRpofile = () => {
    setSelectedProfile(contact);
    router.push(`/member-details/${contact.user_wallet}`);
  };

  return (
    <div className=" px-20 m-1">
      <div className="border rounded-lg border-gray-300  p-4 ">
        <div className="flex items-center">
          <div className="flex-1">
            <div className="flex items-center">
              <Image
                width={100}
                height={100}
                className="mr-4 h-[50px] w-[50px] rounded-full"
                src={user_avatar ? user_avatar : "/assets/download.png"}
                alt="Avatar"
              />
              <p
                className="text-[18px] font-bold leading-[28px] mb-0 mt-2 cursor-pointer"
                onClick={handleSelectRpofile}
              >
                {name}
              </p>
            </div>

            <p className="font-semibold leading-[0px]  text-sm ">{user_wallet}</p>
          </div>

          <div className="flex items-center">
            <p className="text-lightGray text-sm leading-4 font-normal text-right  mr-2">
              Total donations: {total_donations}
            </p>
            <HeartIcon className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
