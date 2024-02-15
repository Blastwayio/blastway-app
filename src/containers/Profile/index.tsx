import Image from "next/image";
import Pyth from "../../../public/images/profile-blurred.png";

const ProfileContainer = () => {
  return (
    <main className="flex flex-col gap-8 px-4 py-8 sm:px-10 sm:ml-60 sm:align-center sm:items-center sm:justify-center text-white">
      <Image src={Pyth} alt="Pyth Powered" className="w-full h-full select-none bg-contain blur-sm"  draggable="false" />
    </main>
  );
};

export default ProfileContainer;
