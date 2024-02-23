"use client";

import * as React from "react";
import Image, { StaticImageData } from "next/image";
import DownArrow from "@/../public/images/down-arrow-img.png";
import SupplyImage from "@/../public/images/suply-img.png";
import CryptoImage from "@/../public/images/eth-img.png";
import PendingImage from "@/../public/images/pending-img.png";
import { useState } from "react";

const columns = [
  {
    borderRadius: "rounded-tl-md",
    color: "bg-[#0E0E0E]",
    name: "Transaction Type",
  },
  {
    borderRadius: "",
    color: "bg-[#1B1B1B]",
    name: "Balance",
  },
  {
    borderRadius: "",
    color: "bg-[#0E0E0E]",
    name: "Status",
  },
  {
    borderRadius: "rounded-tr-md",
    color: "bg-[#1B1B1B]",
    name: "Date",
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
          if (a.transactionType > b.transactionType && columnName == "Transaction Type") {
            return -1;
          } else if (a.balance > b.balance && columnName == "Balance") {
            return -1;
          } else if (a.status > b.status && columnName == "Status") {
            return -1;
          } else if (columnName == "Date") {
            const firstDateString = a.date.split("/");
            const secondDateString = b.date.split("/");

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
          if (a.transactionType < b.transactionType && columnName == "Transaction Type") {
            return -1;
          } else if (a.balance < b.balance && columnName == "Balance") {
            return -1;
          } else if (a.status < b.status && columnName == "Status") {
            return -1;
          } else if (columnName == "Date") {
            const firstDateString = a.date.split("/");
            const secondDateString = b.date.split("/");

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
    <div className="w-full flex flex-col">
      <div className="flex items-center">
        {columns.map((column) => {
          return (
            <div
              key={column.name}
              className={`w-1/4 flex justify-center items-center gap-1 ${column.color} text-[#848484] text-sm py-2 ${column.borderRadius}`}
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
                className="cursor-pointer w-4"
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
      <div className="w-full h-[13.8rem] overflow-auto rounded-b-md no-scrollbar">
        {newData.map((data, index) => {
          return (
            <div key={`${data.transactionType}#${index}`} className="h-10 flex">
              <div className="w-1/4 flex justify-center items-center gap-2 border-b-[1px] border-[#1B1B1B]">
                <Image className="w-4 h-4" src={data.supplyImage} alt="Crypto image." draggable={false} />
                <p className="w-1/2 text-sm">{data.transactionType}</p>
              </div>

              <div className="w-1/4 bg-[#141414] flex justify-center items-center gap-2 border-b-[1px] border-[#1B1B1B]">
                <Image className="w-4 h-4" src={data.cryptoImage} alt="Crypto image." draggable={false} />
                <p className="w-1/2 text-sm">{data.balance}</p>
              </div>

              <div className="w-1/4 flex justify-center items-center gap-2 border-b-[1px] border-[#1B1B1B]">
                <Image className="w-4 h-4" src={data.statusImage} alt="Status image." draggable={false} />
                <p className="w-1/2 text-sm">{data.status}</p>
              </div>

              <p className="w-1/4 bg-[#141414] flex justify-center items-center text-sm border-b-[1px] border-[#1B1B1B]">
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
