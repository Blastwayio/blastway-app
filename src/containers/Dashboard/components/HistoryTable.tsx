'use client';

import * as React from 'react';
import Image, { StaticImageData } from 'next/image';
import DownArrow from '@/../public/images/down-arrow-img.png';
import { useState } from 'react';

const columns = [
  {
    borderRadius: 'rounded-tl-md',
    color: 'bg-[#0E0E0E]',
    name: 'Transaction Type',
  },
  {
    borderRadius: '',
    color: 'bg-[#1B1B1B]',
    name: 'Balance',
  },
  {
    borderRadius: '',
    color: 'bg-[#0E0E0E]',
    name: 'Status',
  },
  {
    borderRadius: 'rounded-tr-md',
    color: 'bg-[#1B1B1B]',
    name: 'Date',
  },
];

interface DatasType {
  datas: {
    supplyImage: StaticImageData;
    transactionType: string;
    cryptoImage: StaticImageData;
    balance: string;
    statusImage: StaticImageData;
    status: string;
    date: string;
  }[];
}

const HistoryTable = ({ datas }: DatasType) => {
  const [checkClick, setCheckClick] = useState(true);
  const [newData, setNewData] = useState(datas);

  const clickedSortButton = (columnName: string) => {
    if (checkClick) {
      setCheckClick(false);

      setNewData((prev) =>
        prev.sort(function (a, b) {
          if (a.transactionType > b.transactionType && columnName == 'Transaction Type') {
            return -1;
          } else if (a.balance > b.balance && columnName == 'Balance') {
            return -1;
          } else if (a.status > b.status && columnName == 'Status') {
            return -1;
          } else if (columnName == 'Date') {
            const firstDateString = a.date.split('/');
            const secondDateString = b.date.split('/');

            const firstDate = new Date(
              Number(firstDateString[2]),
              Number(firstDateString[1]) - 1,
              Number(firstDateString[0])
            );
            const secondDate = new Date(
              Number(secondDateString[2]),
              Number(secondDateString[1]) - 1,
              Number(secondDateString[0])
            );

            if (firstDate > secondDate) {
              return -1;
            }
          }

          return 0;
        })
      );
    } else {
      setCheckClick(true);

      setNewData((prev) =>
        prev.sort(function (a, b) {
          if (a.transactionType < b.transactionType && columnName == 'Transaction Type') {
            return -1;
          } else if (a.balance < b.balance && columnName == 'Balance') {
            return -1;
          } else if (a.status < b.status && columnName == 'Status') {
            return -1;
          } else if (columnName == 'Date') {
            const firstDateString = a.date.split('/');
            const secondDateString = b.date.split('/');

            const firstDate = new Date(
              Number(firstDateString[2]),
              Number(firstDateString[1]) - 1,
              Number(firstDateString[0])
            );
            const secondDate = new Date(
              Number(secondDateString[2]),
              Number(secondDateString[1]) - 1,
              Number(secondDateString[0])
            );

            if (firstDate < secondDate) {
              return -1;
            }
          }

          return 0;
        })
      );
    }
  };

  return (
    <div className="flex w-full flex-col">
      <div className="flex items-center">
        {columns.map((column) => {
          return (
            <div
              key={column.name}
              className={`flex w-1/4 items-center justify-center gap-1 ${column.color} py-2 text-sm text-[#848484] ${column.borderRadius}`}
            >
              <p
                className="cursor-pointer text-sm"
                onClick={() => {
                  clickedSortButton(column.name);
                }}
              >
                {column.name}
              </p>

              <Image
                className="w-4 cursor-pointer"
                src={DownArrow}
                alt="Down arrow image."
                onClick={() => {
                  clickedSortButton(column.name);
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="no-scrollbar h-[13.8rem] w-full overflow-auto rounded-b-md">
        {newData.map((data, index) => {
          return (
            <div key={`${data.transactionType}#${index}`} className="flex h-10">
              <div className="flex w-1/4 items-center justify-center gap-2 border-b-[1px] border-[#1B1B1B]">
                <Image className="h-4 w-4" src={data.supplyImage} alt="Crypto image." draggable={false} />
                <p className="w-1/2 text-sm">{data.transactionType}</p>
              </div>

              <div className="flex w-1/4 items-center justify-center gap-2 border-b-[1px] border-[#1B1B1B] bg-[#141414]">
                <Image className="h-4 w-4" src={data.cryptoImage} alt="Crypto image." draggable={false} />
                <p className="w-1/2 text-sm">{data.balance}</p>
              </div>

              <div className="flex w-1/4 items-center justify-center gap-2 border-b-[1px] border-[#1B1B1B]">
                <Image className="h-4 w-4" src={data.statusImage} alt="Status image." draggable={false} />
                <p className="w-1/2 text-sm">{data.status}</p>
              </div>

              <p className="flex w-1/4 items-center justify-center border-b-[1px] border-[#1B1B1B] bg-[#141414] text-sm">
                {data.date}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryTable;
