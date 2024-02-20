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
  Filler,
  ScriptableContext,
} from "chart.js";
import { HistoryTable } from "./components/HistoryTable";
import LendingTabs from "./components/LendingTabs";

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
              <Line data={data} options={options} />
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
            <div className="w-1/2 flex flex-col gap-4">
              <div className="flex justify-between">
                <p className="text-2xl text-white font-medium">History</p>
                <Image src={LinkImage} alt="Link image." className="cursor-pointer" />
              </div>

              <HistoryTable />
            </div>

            <div className="w-1/2 flex flex-col gap-4">
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
