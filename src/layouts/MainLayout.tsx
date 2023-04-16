import Header from "@/components/Header";
import React from "react";

interface IMainLayout {
  children: React.ReactNode;
}

const MainLayout: React.FC<IMainLayout> = ({ children }) => {
  return (
    <div className="h-screen overflow-y-auto bg-black">
      <Header />
      <main className="flex flex-1">{children}</main>
    </div>
  );
};

export default MainLayout;
