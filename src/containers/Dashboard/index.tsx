"use client";

import Image from "next/image";
import TempImage from "@/../public/images/pacman.jpg";
import LinkImage from "@/../public/images/link-img.svg";
import SupplyImage from "@/../public/images/suply-img.png";
import ETHImage from "@/../public/images/eth-img.png";
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
} from "chart.js";
import { ColumnDef } from "@tanstack/react-table";
import { HistoryTable } from "./components/HistoryTable";
import { HistoryType, HistoryColumns } from "./components/HistoryColumns";
import LendingTabs from "./components/LendingTabs";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const historyData: HistoryType[] = [
  {
    transactionType: "Supply",
    balance: "60 ETH",
    status: "Pending...",
    date: "12/04/2024",
  },
  {
    transactionType: "Supply",
    balance: "54 ETH",
    status: "Pending...",
    date: "12/04/2024",
  },
  {
    transactionType: "Supply",
    balance: "45 ETH",
    status: "Pending...",
    date: "12/04/2024",
  },
  {
    transactionType: "Supply",
    balance: "18 ETH",
    status: "Pending...",
    date: "12/04/2024",
  },
  {
    transactionType: "Supply",
    balance: "24 ETH",
    status: "Pending...",
    date: "11/04/2024",
  },
  {
    transactionType: "Supply",
    balance: "9 ETH",
    status: "Pending...",
    date: "03/04/2024",
  },
  {
    transactionType: "Supply",
    balance: "90 ETH",
    status: "Success!",
    date: "12/04/2024",
  },
  {
    transactionType: "Supply",
    balance: "32 ETH",
    status: "Success!",
    date: "15/04/2024",
  },
  {
    transactionType: "Supply",
    balance: "129 ETH",
    status: "Failed!",
    date: "19/04/2024",
  },
  {
    transactionType: "Supply",
    balance: "32 ETH",
    status: "Pending...",
    date: "17/04/2024",
  },
  {
    transactionType: "Supply",
    balance: "32 ETH",
    status: "Pending...",
    date: "10/04/2024",
  },
];

const DashboardContainer = () => {
  const labels = [1, 2, 3, 4, 5, 6];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Revenue",
        data: [65, 59, 80, 34, 12, 17],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.4,
      },
    ],
  };

  return (
    <main className="px-4 sm:px-10 sm:ml-60">
      <div className="text-white">
        <p className="text-white text-2xl">Dashboard</p>

        <div className="mt-2 flex flex-col gap-6">
          <div className="bg-[#0E0E0E] p-4 rounded-md flex justify-between">
            <div className="flex gap-6 items-center">
              <Image src={TempImage} alt="Profile Image." draggable={false} width={144} height={144} />

              <div className="flex flex-col">
                <p className="text-4xl font-medium">Blast.eth</p>
                <p className="text-base font-medium text-[#868686]">0x0de6c8d9c20f...0688D618F9ee</p>
              </div>
            </div>

            <div>
              <Line data={data} />
            </div>
          </div>

          <div className="bg-[#0E0E0E] p-4 flex justify-between items-center">
            <div className="flex flex-col items-center">
              <p className="text-[#868686] text-base font-medium">Health Factor</p>
              <p>100%</p>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-[#868686] text-base font-medium">Net APR</p>
              <p>0%</p>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-[#868686] text-base font-medium">Supply</p>
              <p>1000$</p>
            </div>

            <div className="flex flex-col items-center">
              <p className="text-[#868686] text-base font-medium">Monthly Yield</p>
              <p>0$</p>
            </div>
          </div>

          <div className="flex gap-6 items-start">
            <div className="w-fit flex flex-col gap-4">
              <div className="flex justify-between">
                <p className="text-2xl text-white font-medium">History</p>
                <Image src={LinkImage} alt="Link image." className="cursor-pointer" />
              </div>

              <HistoryTable data={historyData} columns={HistoryColumns} />
            </div>

            <div className="w-full flex flex-col gap-4">
              <div className="flex justify-between">
                <p className="text-2xl text-white font-medium">Lending</p>
                <Image src={LinkImage} alt="Link image." className="cursor-pointer" />
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
