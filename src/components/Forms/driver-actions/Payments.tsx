"use client";

import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import Image from "next/image";

const Payments = () => {
  return (
    <div dir="rtl" className="flex flex-col justify-between">
      <div className="flex flex-col gap-4">
        <div>
          <div className="w-full mb-2">
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-2">
                <span className="text-lg font-medium">פירוט נסיעות</span>
                <span className="font-light">05/2024</span>
              </div>
              <div className="">
                <span>{"הצג עוד >>>"}</span>
              </div>
            </div>
          </div>
          <div className="bg-white py-2">
            <div className="px-12">
              <div className="flex justify-between py-4">
                <div className="flex flex-col">
                  <span className="font-medium text-lg">
                    מנוי חודש | <span className="font-light mr-1">₪</span>
                    <span>220</span>
                  </span>
                  <span>תאריך חידוש: 04/2024</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-lg">
                    ערוץ פרמיום | <span className="font-light mr-1">₪</span>
                    <span>120</span>
                  </span>
                  <span>תאריך חידוש: 08/2024</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#FEF5E2] py-2 px-6 rounded-t-lg flex justify-end gap-2 -mt-2">
            <span className="text-xl font-semibold">סיכום משתנים:</span>
            <span className="text-lg text-[#FF0004]">
              340 <span className="text-base">₪ (חובה)</span>
            </span>
          </div>
        </div>

        <div>
          <Collapsible>
            <CollapsibleTrigger className="w-full mb-2">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                  <Image
                    src="/icons/arrow-down.svg"
                    alt="toggle"
                    className="w-4 h-4"
                    width={10}
                    height={10}
                  />
                  <span className="text-lg font-medium">תשלומים קבועים</span>
                  <span className="font-light">05/2024</span>
                </div>
                <div className="">
                  <span>{"הצג עוד >>>"}</span>
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="CollapsibleContent bg-white py-2">
              <div className="px-6">
                <div className="flex justify-between border-b border-black py-4">
                  <div className="flex flex-col">
                    <span className="font-medium">
                      נסיעות שעברו לנהגים אחרים{" "}
                      <span className="font-light">(11 נסיעות)</span>
                    </span>
                    <span>
                      סה”כ: 1,523 <span className="text-sm ml-1">₪</span> לפי
                      10%
                    </span>
                  </div>
                  <div>
                    <span className="text-[#2EBD32] font-medium">
                      1523- <span className="text-sm font-light ml-1">₪</span>
                    </span>
                  </div>
                </div>
                <div className="flex justify-between border-b border-black py-4">
                  <div className="flex flex-col">
                    <span className="font-medium">
                      נסיעות שעברו לנהגים אחרים{" "}
                      <span className="font-light">(11 נסיעות)</span>
                    </span>
                    <span>
                      סה”כ: 1,523 <span className="text-sm ml-1">₪</span> לפי
                      10%
                    </span>
                  </div>
                  <div>
                    <span className="text-[#FF0004] font-medium">
                      1,020 <span className="text-sm font-light ml-1">₪</span>
                    </span>
                  </div>
                </div>
                <div className="flex justify-between py-4">
                  <div className="flex flex-col">
                    <span className="font-medium">
                      נסיעות שעברו לנהגים אחרים{" "}
                      <span className="font-light">(11 נסיעות)</span>
                    </span>
                    <span>
                      סה”כ: 1,523 <span className="text-sm ml-1">₪</span> לפי
                      10%
                    </span>
                  </div>
                  <div>
                    <span className="text-[#FF0004] font-medium">
                      2,253 <span className="text-sm font-light ml-1">₪</span>
                    </span>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
            <div className="bg-[#FEF5E2] py-2 px-6 rounded-t-lg flex justify-end gap-2 -mt-2">
              <span className="text-xl font-semibold">סיכום משתנים:</span>
              <span className="text-lg text-[#2EBD32]">
                2,247 <span className="text-base">₪ (יתרה)</span>
              </span>
            </div>
          </Collapsible>
        </div>

        <div>
          <Collapsible>
            <CollapsibleTrigger className="w-full mb-2">
              <div className="flex justify-between items-center w-full">
                <div className="flex items-center gap-2">
                  <Image
                    src="/icons/arrow-down.svg"
                    alt="toggle"
                    className="w-4 h-4"
                    width={10}
                    height={10}
                  />
                  <span className="text-lg font-medium">פירוט נסיעות</span>
                  <span className="font-light">05/2024</span>
                </div>
                <div className="">
                  <span>{"הצג עוד >>>"}</span>
                </div>
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="CollapsibleContent bg-white py-2">
              <div className="px-6">
                <div className="flex justify-between border-b border-black py-4">
                  <div className="flex flex-col">
                    <span className="font-medium">
                      נסיעות שעברו לנהגים אחרים{" "}
                      <span className="font-light">(11 נסיעות)</span>
                    </span>
                    <span>
                      סה”כ: 1,523 <span className="text-sm ml-1">₪</span> לפי
                      10%
                    </span>
                  </div>
                  <div>
                    <span className="text-[#2EBD32] font-medium">
                      1523- <span className="text-sm font-light ml-1">₪</span>
                    </span>
                  </div>
                </div>
                <div className="flex justify-between border-b border-black py-4">
                  <div className="flex flex-col">
                    <span className="font-medium">
                      נסיעות שעברו לנהגים אחרים{" "}
                      <span className="font-light">(11 נסיעות)</span>
                    </span>
                    <span>
                      סה”כ: 1,523 <span className="text-sm ml-1">₪</span> לפי
                      10%
                    </span>
                  </div>
                  <div>
                    <span className="text-[#FF0004] font-medium">
                      1,020 <span className="text-sm font-light ml-1">₪</span>
                    </span>
                  </div>
                </div>
                <div className="flex justify-between py-4">
                  <div className="flex flex-col">
                    <span className="font-medium">
                      נסיעות שעברו לנהגים אחרים{" "}
                      <span className="font-light">(11 נסיעות)</span>
                    </span>
                    <span>
                      סה”כ: 1,523 <span className="text-sm ml-1">₪</span> לפי
                      10%
                    </span>
                  </div>
                  <div>
                    <span className="text-[#FF0004] font-medium">
                      2,253 <span className="text-sm font-light ml-1">₪</span>
                    </span>
                  </div>
                </div>
              </div>
            </CollapsibleContent>
            <div className="bg-[#FEF5E2] py-2 px-6 rounded-t-lg flex justify-end gap-2 -mt-2">
              <span className="text-xl font-semibold">סיכום משתנים:</span>
              <span className="text-lg text-[#2EBD32]">
                2,247 <span className="text-base">₪ (יתרה)</span>
              </span>
            </div>
          </Collapsible>
        </div>
      </div>

      <div className="mt-4">
        <div>
          <span className="font-medium text-lg">סיכום תשלומים</span>
        </div>
        <div className="flex gap-2 w-full">
          <div className="bg-[#DDDEE4] flex justify-between items-center h-10 px-6 rounded-lg w-full">
            <div className="flex gap-4">
              <div className="flex gap-1">
                <span>קבועים:</span>
                <span className="text-[#FF0004]">
                  <span className="text-sm font-light mr-1">₪</span>340
                </span>
              </div>
              <div className="flex gap-1">
                <span>משתנים:</span>
                <span className="text-[#2EBD32]">
                  <span className="text-sm font-light mr-1">₪</span>2,247
                </span>
              </div>
            </div>
            <div className="mx-2">
              <span>=</span>
            </div>
            <div>
              <span className="text-[#2EBD32]">
                <span className="text-sm font-light mr-1">₪</span>1,907
              </span>
            </div>
          </div>

          <div className="bg-[#DDDEE4] flex items-center h-10 px-6 rounded-lg">
            <Image src={"/icons/clip-mail.svg"} alt={"mail"} className="w-6 h-6" width={20} height={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
