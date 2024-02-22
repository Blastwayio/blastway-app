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
    color: "#848484",
    name: "Transaction Type",
  },
  {
    color: "#1B1B1B",
    name: "Balance",
  },
  {
    color: "#848484",
    name: "Status",
  },
  {
    color: "#1B1B1B",
    name: "Date",
  },
];

const datas2 = [
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
    date: "12/04/2024",
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
          } else if (a.date > b.date && columnName == "Date") {
            return -1;
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
          } else if (a.date < b.date && columnName == "Date") {
            return -1;
          }

          return 0;
        })
      );
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="flex justify-between">
        {columns.map((column) => {
          return (
            <div
              className={`w-1/4 flex justify-center items-center gap-1 bg-[${column.color}] text-center text-[#848484] text-sm py-2`}
            >
              {column.name}

              <Image
                className="cursor-pointer"
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
      <div className="w-full h-44 overflow-auto">
        {newData.map((data) => {
          return (
            <div className="p-3 flex justify-between">
              <div className="w-1/4 flex gap-2">
                <Image src={data.supplyImage} alt="Crypto image." />
                <p>{data.transactionType}</p>
              </div>

              <div className="w-1/4 flex gap-2">
                <Image src={data.cryptoImage} alt="Crypto image." />
                <p>{data.balance}</p>
              </div>

              <div className="w-1/4 flex gap-2">
                <Image className="w-6" src={data.statusImage} alt="Status image." />
                <p>{data.status}</p>
              </div>

              <p className="w-1/4">{data.date}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryTable;
