"use client";

import * as React from "react";
import Image from "next/image";
import DownArrow from "@/../public/images/down-arrow-img.png";

const columns = [
  {
    color: "#848484",
    column: "Transaction type",
  },
  {
    color: "#1B1B1B",
    column: "Balance",
  },
  {
    color: "#848484",
    column: "Status",
  },
  {
    color: "#1B1B1B",
    column: "Date",
  },
];

export function HistoryTable() {
  return (
    <div className="w-full">
      <div className="flex justify-between">
        {columns.map((column) => {
          return (
            <div
              className={`w-full flex justify-center items-center gap-1 bg-[${column.color}] text-center text-[#848484] text-sm py-2`}
            >
              {column.column}

              <Image className="cursor-pointer" src={DownArrow} alt="Down arrow image." />
            </div>
          );
        })}
      </div>
    </div>
  );
}
