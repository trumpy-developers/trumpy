import React from "react";
import { Navigation } from "./Navigation";

export interface AppFrameOptions extends React.HTMLAttributes<HTMLDivElement> {
  withPadding?: boolean;
  withNavigation?: boolean;
}

export const PageFrame: React.FC<AppFrameOptions> = ({
  children,
  withPadding = true,
  withNavigation = true,
}) => {
  return (
    <>
      <div className={`flex flex-col min-h-screen h-full w-full`}>
        {withNavigation && <Navigation />}
        <div className={`flex-1 flex flex-col ${withPadding ? "py-8 px-16" : ""}`}>
          {children}
        </div>
      </div>
    </>
  );
};
