import Image from "next/image";
import React from "react";
import OverTitle from "./OverTitle";

interface IBaseSection {
  imageUrl: string;
  title: string;
  overTitle: string;
  reversed?: boolean;
  children: React.ReactNode;
}

const BaseSection: React.FC<IBaseSection> = ({
  imageUrl,
  title,
  overTitle,
  reversed = false,
  children,
}) => {
  return (
    <div
      className={`flex items-center flex-col mx-5 md:mx-0 my-8 md:my-[100px]  ${
        reversed
          ? "md:flex-row-reverse"
          : "md:flex-row"
      }`}
    >
      <Image
        src={imageUrl}
        alt={title}
        className="flex-1"
        width={700}
        height={200}
      />

      <div className="flex-1">
        <OverTitle title={overTitle} />
        <div className="mb-3 text-3xl font-bold">{title}</div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default BaseSection;
