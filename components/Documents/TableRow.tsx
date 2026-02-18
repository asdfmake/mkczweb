import Image from "next/image";
import React from "react";
import Button from "../Button";
import { Link } from "@/i18n/routing";

interface TableRowProps {
  name: string;
  details: string;
  link: string;
}

function TableRow({ name, details, link }: TableRowProps) {
  return (
    <tr className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-2xl border-[1px] border-gray-400 sm:border-0 sm:border-b-[#F69191] sm:border-b-[1px] sm:rounded-none px-7 py-3 gap-[24px]">
      <td className="flex w-1/3">
        <Image src="/pdf.svg" height={36} width={23} alt="pdf icon" />
        <h3 className="font-body font-bold text-[14px] leading-[22px]">
          {name}
        </h3>
      </td>
      <td className="font-body text-[14px] leading-[22px]">{details}</td>
      <td className="sm:w-[120px]">
        <a
          target="_blank"
          href={`https://macevalackiklubcrvenazvezda.com/api/getDocFile?docName=${link}`}
          rel="noopener noreferrer"
        >
          <Button text="Preuzmi" variant="table" />
        </a>
      </td>
    </tr>
  );
}

export default TableRow;
