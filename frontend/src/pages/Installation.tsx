import React from "react";
import { PageFrame } from "../structural/PageFrame";

export interface Props {}

export const Installation: React.FC<Props> = () => {
  return (
    <>
      <PageFrame>
        <div className="w-full h-full flex flex-col justify-center items-center">
          <h1>Install</h1>
        </div>
      </PageFrame>
    </>
  );
};
