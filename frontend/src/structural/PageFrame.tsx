import React from "react";

export interface AppFrameOptions extends React.HTMLAttributes<HTMLDivElement> {
  withPadding?: boolean;
}

export const PageFrame: React.FC<AppFrameOptions> = ({
  children,
  withPadding = true,
}) => {
  return (
    <div
      className={`min-h-screen min-w-full flex flex-col ${
        withPadding ? "p-16" : ""
      }`}
    >
      {children}
    </div>
  );
};
