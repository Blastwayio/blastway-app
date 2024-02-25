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
  datas: [
    {
      supplyImage: StaticImageData;
      transactionType: string;
      cryptoImage: StaticImageData;
      balance: string;
      statusImage: StaticImageData;
      status: string;
      date: string;
    }
  ];
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
      <div className="flex">
        {columns.map((column) => {
          return (
            <div
              className={`w-1/4 flex justify-center items-center gap-1 ${column.color} py-2 text-[#848484] text-[10px] ${column.borderRadius} xl:text-base lg:py-2 lg:text-xs md:text-[10px] sm:text-[7px] sm:py-0`}
            >
              <p
                className="cursor-pointer"
                onClick={() => {
                  clickedSortButton(column.name);
                }}
              >
                {column.name}
              </p>

              <Image
                className="hidden cursor-pointer xl:w-4 lg:w-3 lg:block"
                src={DownArrow}
                alt="Down arrow image."
                draggable={false}
                onClick={() => {
                  clickedSortButton(column.name);
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="w-full h-[13.8rem] overflow-auto rounded-b-md no-scrollbar">
        {newData.map((data) => {
          return (
            <div className="h-10 flex text-[10px] xl:text-base lg:text-xs md:text-[10px] sm:text-[7px]">
              <div className="w-1/4 flex justify-center items-center gap-1 border-b-[1px] border-[#1B1B1B]">
                <Image
                  className="hidden xl:w-4 xl:h-4 lg:w-3 lg:h-3 lg:block"
                  src={data.supplyImage}
                  alt="Crypto image."
                  draggable={false}
                />
                <p>{data.transactionType}</p>
              </div>

              <div className="w-1/4 bg-[#141414] flex justify-center items-center gap-1 border-b-[1px] border-[#1B1B1B]">
                <Image
                  className="hidden xl:w-4 xl:h-4 lg:w-3 lg:h-3 lg:block"
                  src={data.cryptoImage}
                  alt="Crypto image."
                  draggable={false}
                />
                <p>{data.balance}</p>
              </div>

              <div className="w-1/4 flex justify-center items-center gap-1 border-b-[1px] border-[#1B1B1B]">
                <Image
                  className="hidden xl:w-4 xl:h-4 lg:w-3 lg:h-3 lg:block"
                  src={data.statusImage}
                  alt="Status image."
                  draggable={false}
                />
                <p className="w-12 xl:w-20 lg:w-14 md:w-12 sm:w-8">{data.status}</p>
              </div>

              <p className="w-1/4 bg-[#141414] flex justify-center items-center border-b-[1px] border-[#1B1B1B]">
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
