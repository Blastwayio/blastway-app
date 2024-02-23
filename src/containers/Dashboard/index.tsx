'use client';

import Image from 'next/image';
import TempImage from '@/../public/images/pacman.jpg';
import LinkImage from '@/../public/images/link-img.svg';
import SupplyImage from '@/../public/images/suply-img.png';
import CryptoImage from '@/../public/images/eth-img.png';
import PendingImage from '@/../public/images/pending-img.png';
import { Line } from 'react-chartjs-2';
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
} from 'chart.js';
import LendingTabs from './components/LendingTabs';
import HistoryTable from './components/HistoryTable';
import ConstructionBanner from '@/components/Banner/Construction';

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
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 200);
          gradient.addColorStop(0, 'rgba(71, 255, 71, 0.40)');
          gradient.addColorStop(1, 'rgba(39, 118, 39, 0.00)');
          return gradient;
        },
        fill: 'start',
        borderColor: 'rgb(37, 205, 37)',
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
      transactionType: 'Supply',
      cryptoImage: CryptoImage,
      balance: '32 ETH',
      statusImage: PendingImage,
      status: 'Pending...',
      date: '13/04/2024',
    },
    {
      supplyImage: SupplyImage,
      transactionType: 'Supply',
      cryptoImage: CryptoImage,
      balance: '20 ETH',
      statusImage: PendingImage,
      status: 'Success!',
      date: '12/04/2024',
    },
    {
      supplyImage: SupplyImage,
      transactionType: 'Supply',
      cryptoImage: CryptoImage,
      balance: '61 ETH',
      statusImage: PendingImage,
      status: 'Failed!',
      date: '10/04/2023',
    },
    {
      supplyImage: SupplyImage,
      transactionType: 'Supply',
      cryptoImage: CryptoImage,
      balance: '17 ETH',
      statusImage: PendingImage,
      status: 'Success!',
      date: '28/09/2000',
    },
    {
      supplyImage: SupplyImage,
      transactionType: 'Supply',
      cryptoImage: CryptoImage,
      balance: '40 ETH',
      statusImage: PendingImage,
      status: 'Pending...',
      date: '10/07/2022',
    },
    {
      supplyImage: SupplyImage,
      transactionType: 'Supply',
      cryptoImage: CryptoImage,
      balance: '40 ETH',
      statusImage: PendingImage,
      status: 'Pending...',
      date: '21/09/2024',
    },
  ];

  const sortedHistoryData = historyData.sort(function (a, b) {
    const firstDateString = a.date.split('/');
    const secondDateString = b.date.split('/');

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
    <>
      <ConstructionBanner />
      <main className="px-4 sm:ml-60 sm:mt-8 sm:px-10">
        <div className="text-white">
          <p className="text-2xl text-white">Dashboard</p>

          <div className="mt-2 flex flex-col gap-6">
            <div className="flex justify-between rounded-md bg-[#0E0E0E] p-4">
              <div className="flex items-center gap-6">
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

            <div className="flex items-center justify-between bg-[#0E0E0E] p-4">
              <div className="flex flex-col items-center">
                <p className="text-base font-medium text-[#868686]">Health Factor</p>
                <p>100%</p>
              </div>

              <div className="flex flex-col items-center">
                <p className="text-base font-medium text-[#868686]">Net APR</p>
                <p>0%</p>
              </div>

              <div className="flex flex-col items-center">
                <p className="text-base font-medium text-[#868686]">Supply</p>
                <p>1000$</p>
              </div>

              <div className="flex flex-col items-center">
                <p className="text-base font-medium text-[#868686]">Monthly Yield</p>
                <p>0$</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="flex w-1/2 flex-col gap-4">
                <div className="flex justify-between">
                  <p className="text-2xl font-medium text-white">History</p>
                  <Image src={LinkImage} alt="Link image." className="cursor-pointer" />
                </div>

                <HistoryTable datas={sortedHistoryData} />
              </div>

              <div className="flex w-1/2 flex-col gap-4">
                <div className="flex justify-between">
                  <p className="text-2xl font-medium text-white">Lending</p>
                  <Image src={LinkImage} alt="Link image." className="cursor-pointer" />
                </div>

                <LendingTabs />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default DashboardContainer;
