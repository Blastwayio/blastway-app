"use client";

import Image from "next/image";
import TempImage from "@/../public/images/pacman.jpg";
import LinkImage from "@/../public/images/link-img.svg";
import SupplyImage from "@/../public/images/suply-img.png";
import CryptoImage from "@/../public/images/eth-img.png";
import PendingImage from "@/../public/images/pending-img.png";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ScriptableContext,
} from "chart.js";
import LendingTabs from "./components/LendingTabs";
import HistoryTable from "./components/HistoryTable";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const DashboardContainer = () => {
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  };

  const labels = [1, 2, 3, 4, 5, 6];

  const data = {
    labels: labels,
    datasets: [
      {
        data: [65, 59, 80, 34, 12, 17],
        backgroundColor: (context: ScriptableContext<"line">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, "rgba(71, 255, 71, 0.40)");
          gradient.addColorStop(1, "rgba(39, 118, 39, 0.00)");
          return gradient;
        },
        fill: "start",
        borderColor: "rgb(37, 205, 37)",
        borderDash: [4, 4],
        borderWidth: 1,
        tension: 0.2,
        pointRadius: 0,
      },
    ],
  };

  const historyData = [
    {
      supplyImage: SupplyImage,
      transactionType: "Supply",
      cryptoImage: CryptoImage,
      balance: "32 ETH",
      statusImage: PendingImage,
      status: "Pending...",
      date: "13/04/2024",
    },
    {
      supplyImage: SupplyImage,
      transactionType: "Supply",
      cryptoImage: CryptoImage,
      balance: "20 ETH",
      statusImage: PendingImage,
      status: "Success!",
      date: "12/04/2024",
    },
    {
      supplyImage: SupplyImage,
      transactionType: "Supply",
      cryptoImage: CryptoImage,
      balance: "61 ETH",
      statusImage: PendingImage,
      status: "Failed!",
      date: "10/04/2023",
    },
    {
      supplyImage: SupplyImage,
      transactionType: "Supply",
      cryptoImage: CryptoImage,
      balance: "17 ETH",
      statusImage: PendingImage,
      status: "Success!",
      date: "28/09/2000",
    },
    {
      supplyImage: SupplyImage,
      transactionType: "Supply",
      cryptoImage: CryptoImage,
      balance: "40 ETH",
      statusImage: PendingImage,
      status: "Pending...",
      date: "10/07/2022",
    },
    {
      supplyImage: SupplyImage,
      transactionType: "Supply",
      cryptoImage: CryptoImage,
      balance: "40 ETH",
      statusImage: PendingImage,
      status: "Pending...",
      date: "21/09/2024",
    },
  ];

  const sortedHistoryData = historyData.sort(function (a, b) {
    const firstDateString = a.date.split("/");
    const secondDateString = b.date.split("/");

    const firstDate = new Date(Number(firstDateString[2]), Number(firstDateString[1]) - 1, Number(firstDateString[0]));
    const secondDate = new Date(
      Number(secondDateString[2]),
      Number(secondDateString[1]) - 1,
      Number(secondDateString[0])
    );

    if (firstDate > secondDate) {
      return -1;
    }

    return 0;
  });

  return (
    <main className="px-4 sm:px-10 sm:ml-60">
      <div className="text-white">
        <p className="text-2xl">Dashboard</p>

        <div className="mt-2 flex flex-col gap-6">
          <div className="bg-[#0E0E0E] p-4 rounded-md flex justify-between items-center">
            <div className="w-1/2 flex gap-2 items-center lg:gap-6 md:gap-2 sm:gap-2">
              <Image className="w-[30%]" src={TempImage} alt="Profile Image." draggable={false} />

              <div className="flex flex-col">
                <p className="text-lg font-medium xl:text-4xl lg:text-2xl md:text-xl sm:text-lg">Blast.eth</p>
                <p className="text-xs font-medium text-[#868686] xl:text-base lg:text-sm md:text-xs sm:text-xs">
                  0x0de6c8d...D618F9ee
                </p>
              </div>
            </div>

            <div className="w-[30%] lg:w-[35%]">
              <Line data={data} options={options} />
            </div>
          </div>

          <div className="bg-[#0E0E0E] p-4 flex justify-between items-center text-[#868686] text-sm font-medium  md:text-sm">
            <div className="flex flex-col items-center">
              <p>Health Factor</p>
              <p className="text-white">100%</p>
            </div>

            <div className="flex flex-col items-center">
              <p className="">Net APR</p>
              <p className="text-white">0%</p>
            </div>

            <div className="flex flex-col items-center">
              <p>Supply</p>
              <p className="text-white">1000$</p>
            </div>

            <div className="flex flex-col items-center">
              <p>Monthly Yield</p>
              <p className="text-white">0$</p>
            </div>
          </div>

          <div className="flex flex-col gap-14 lg:flex-row lg:gap-6 lg:items-start">
            <div className="w-full lg:w-[60%] flex flex-col gap-4">
              <div className="flex justify-between">
                <p className="text-base text-white font-medium xl:text-2xl lg:text-xl md:text-lg sm:text-base">
                  History
                </p>
                <Image src={LinkImage} alt="Link image." className="cursor-pointer w-5 xl:w-8 lg:w-7 md:w-6" />
              </div>

              <HistoryTable datas={sortedHistoryData} />
            </div>

            <div className="w-full lg:w-[40%] flex flex-col gap-4">
              <div className="flex justify-between">
                <p className="text-base text-white font-medium xl:text-2xl lg:text-xl md:text-lg sm:text-base">
                  Lending
                </p>
                <Image src={LinkImage} alt="Link image." className="cursor-pointer w-5 xl:w-8 lg:w-7 md:w-6" />
              </div>

              <LendingTabs />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardContainer;
