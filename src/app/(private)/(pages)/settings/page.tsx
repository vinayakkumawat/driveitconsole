"use client";

import React from "react";
import SettingsMenu from "@/components/theme/SettingsMenu";
import { useState } from "react";
import CommonAbbreviations from "./_components/CommonAbbreviations";
import BillingSetup from "./_components/BillingSetup";
import Callers from "./_components/Callers";
import Channels from "./_components/Channels";
import Stations from "./_components/Stations";
import Drivers from "./_components/Drivers";
import NewStation from "./_components/NewStation";

const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState("shortcuts");

  return (
    <div className="mr-80 flex flex-col gap-12">
      <div className="flex flex-col gap-6 mx-20 mt-20">
        <div className="mt-12">
          <h1 className="text-2xl font-bold">הגדרות</h1>
        </div>

        <div className="flex gap-6">
          <div className="bg-white max-h-[75vh] w-80 rounded-lg shadow-sm">
            <SettingsMenu
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </div>
          <div className="max-h-[60vh] w-full rounded-lg">
            {/* Content area - will be replaced with different components based on activeSection */}
            <div className="text-right">
              <div className="">
                {activeSection === "shortcuts" && (<CommonAbbreviations />)}
                {activeSection === "billing" && (<BillingSetup />)}
                {activeSection === "operators" && (<Callers />)}
                {activeSection === "channels" && (<Channels />)}
                {activeSection === "admin" && "Stations"}
                {activeSection === "stations" && (<Stations />)}
                {activeSection === "drivers" && (<Drivers />)}
                {activeSection === "newStation" && (<NewStation />)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
