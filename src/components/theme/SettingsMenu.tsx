import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
  shortcut?: string;
}

const MenuItem = ({ icon, label, active, onClick }: MenuItemProps) => (
  <Button
    variant="ghost"
    className={`w-full text-right px-4 py-2 ${active ? "bg-gray-100" : ""}`}
    onClick={onClick}
  >
    <div className="flex items-center w-full gap-4">
      <div className="flex items-center gap-2">{icon}</div>
      <div className="flex items-center gap-2">
        <div className="flex-1 text-lg">{label}</div>
      </div>
    </div>
  </Button>
);

interface SettingsMenuProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const SettingsMenu = ({
  activeSection,
  onSectionChange,
}: SettingsMenuProps) => {
  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex flex-col gap-4">
        <span className="mx-4 text-lg font-bold">מנהל התחנה</span>
        <div>
          <MenuItem
            icon={
              <Image
                src="/icons/arrows-repeat-2.svg"
                alt="icon"
                width={20}
                height={20}
              />
            }
            label="קיצורים"
            active={activeSection === "shortcuts"}
            onClick={() => onSectionChange("shortcuts")}
          />
          <MenuItem
            icon={
              <Image
                src="/icons/card-icon.svg"
                alt="icon"
                width={20}
                height={20}
              />
            }
            label="הגדרת חיוב"
            active={activeSection === "billing"}
            onClick={() => onSectionChange("billing")}
          />
          <MenuItem
            icon={
              <Image
                src="/icons/driver-man.svg"
                alt="icon"
                width={20}
                height={20}
              />
            }
            label="מוקדנים"
            active={activeSection === "operators"}
            onClick={() => onSectionChange("operators")}
          />
          <MenuItem
            icon={
              <Image
                src="/icons/house-medical.svg"
                alt="icon"
                width={20}
                height={20}
              />
            }
            label="ערוצים"
            active={activeSection === "channels"}
            onClick={() => onSectionChange("channels")}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <span className="mx-4 text-lg font-bold">Admin</span>
        <div>
          <MenuItem
            icon={
              <Image
                src="/icons/house-flag.svg"
                alt="icon"
                width={20}
                height={20}
              />
            }
            label="תחנות"
            active={activeSection === "stations"}
            onClick={() => onSectionChange("stations")}
          />
          <MenuItem
            icon={
              <Image src="/icons/users.svg" alt="icon" width={20} height={20} />
            }
            label="נהגים"
            active={activeSection === "drivers"}
            onClick={() => onSectionChange("drivers")}
          />
          <MenuItem
            icon={
              <Image
                src="/icons/house-medical.svg"
                alt="icon"
                width={20}
                height={20}
              />
            }
            label="תחנה חדשה"
            active={activeSection === "newStation"}
            onClick={() => onSectionChange("newStation")}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsMenu;
