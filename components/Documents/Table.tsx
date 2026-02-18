import React from "react";
import TableRow from "./TableRow";

export interface Document {
  docTitle: string;
  name: string;
  details: string;
}
interface TableProps {
  documents: Document[];
}

function Table({ documents }: TableProps) {
  return (
    <table className="w-full">
      <tbody className="flex flex-col gap-[12px]">
        <tr
          key="title"
          className="hidden sm:flex justify-between bg-[#F5F5F5] font-body font-bold text-[14px] leading-[22px] py-2"
        >
          <td className="mr-[24px]">Ime</td>
          <td>Opis</td>
          <td className="w-[150px]">Preuzimanje</td>
        </tr>
        {documents.map((document) => (
          <TableRow
            name={document.docTitle ?? ""}
            link={document.name ?? ""}
            details={document.details ?? ""}
          />
        ))}
      </tbody>
    </table>
  );
}

export default Table;
