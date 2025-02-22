import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const GeneralPriceListPage = () => {
  return (
    <div className="mr-80 px-20 py-20 flex flex-col">
      <div className="mt-16">
        <span className="font-semibold text-3xl">תעריפי נסיעות</span>
      </div>
      <div>
        <div className="flex items-start gap-4 mt-8 w-full">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 w-full">
            <div className="bg-white p-8 rounded-lg">
              <div className="flex flex-col">
                <Image
                  src="/icons/location-icon-pink.svg"
                  alt="price-list-icon"
                  width={40}
                  height={40}
                />
                <span className="font-semibold text-3xl mt-2">
                  בני ברק - בית שמש
                </span>
                <span className="font-semibold text-xl">
                  משוייך לערוץ : 124547235
                </span>
                <div className="flex items-center justify-between gap-4 mt-4 w-full">
                  <div>
                    <span className="font-medium">הלוך:</span>
                    <div className="flex items-center">
                      <Input className="w-20 h-8 pl-8 bg-[#FDECC6]" />
                      <span className="-mr-6">₪</span>
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">חזור:</span>
                    <div className="flex items-center">
                      <Input className="w-20 h-8 pl-8 bg-[#FDECC6]" />
                      <span className="-mr-6">₪</span>
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">הלוך וחזור:</span>
                    <div className="flex items-center">
                      <Input className="w-20 h-8 pl-8 bg-[#FDECC6]" />
                      <span className="-mr-6">₪</span>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Collapsible>
                    <CollapsibleTrigger className="flex items-center gap-2 w-full">
                      <Image
                        src="/icons/arrow-down.svg"
                        alt="toggle"
                        className="w-4 h-4 rotate-90"
                        width={10}
                        height={10}
                      />
                      <span>תעריפים נוספים</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="CollapsibleContent">
                      Empty Module.
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg">
              <div className="flex flex-col">
                <Image
                  src="/icons/location-icon-green.svg"
                  alt="price-list-icon"
                  width={40}
                  height={40}
                />
                <span className="font-semibold text-3xl mt-2">
                  בני ברק - בית שמש
                </span>
                <span className="font-semibold text-xl">
                  משוייך לערוץ : 124547235
                </span>
                <div className="flex items-center justify-between gap-4 mt-4 w-full">
                  <div>
                    <span className="font-medium">הלוך:</span>
                    <div className="flex items-center">
                      <Input className="w-20 h-8 pl-8 bg-[#FDECC6]" />
                      <span className="-mr-6">₪</span>
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">חזור:</span>
                    <div className="flex items-center">
                      <Input className="w-20 h-8 pl-8 bg-[#FDECC6]" />
                      <span className="-mr-6">₪</span>
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">הלוך וחזור:</span>
                    <div className="flex items-center">
                      <Input className="w-20 h-8 pl-8 bg-[#FDECC6]" />
                      <span className="-mr-6">₪</span>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Collapsible>
                    <CollapsibleTrigger className="flex items-center gap-2 w-full">
                      <Image
                        src="/icons/arrow-down.svg"
                        alt="toggle"
                        className="w-4 h-4 rotate-90"
                        width={10}
                        height={10}
                      />
                      <span>תעריפים נוספים</span>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="CollapsibleContent">
                      Empty Module.
                    </CollapsibleContent>
                  </Collapsible>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div>
                <Input className="w-56 h-8 pl-8 bg-white" />
            </div>
            <div className="w-56 h-96 bg-white rounded-lg p-4"></div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default GeneralPriceListPage;
