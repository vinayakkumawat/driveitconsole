import Nav from "@/components/Navbar/page";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="">
        <Nav />
      </div>
      <div className="mr-80 flex flex-col gap-12">
        <div className="flex flex-col gap-12">
          <section className="flex flex-col gap-4 mt-20 mx-20">
            <div className="flex justify-start items-center gap-3 text-3xl">
              <h2 className="text-foreground font-medium">סטטיסטיקה יומית</h2>
              <span className="text-accent">5.10.2024</span>
            </div>

            <div className="flex flex-wrap gap-4">

              <div className="relative h-48 w-72 p-8 flex flex-col justify-center items-start rounded-lg cursor-pointer hover:drop-shadow-lg transition-all duration-200 bg-primary">
                <button className="absolute top-3 left-4">
                  <Image src="/icons/arrow-down.svg" alt="arrow down" width={20} height={20} />
                </button>
                <div className="flex flex-col">
                  <span className="text-6xl font-bold">20</span>
                  <span className="text-xl font-light">נסיעות פעילות</span>
                </div>
              </div>

              <div className="relative h-48 w-72 p-8 flex flex-col justify-center items-start rounded-lg cursor-pointer hover:drop-shadow-lg transition-all duration-200 bg-white border-r-4 border-r-primary">
                <button className="absolute top-3 left-4">
                  <Image src="/icons/arrow-down.svg" alt="arrow down" width={20} height={20} />
                </button>
                <div className="flex flex-col">
                  <span className="text-6xl font-bold">5</span>
                  <span className="text-xl font-light">נסיעות ממתינות</span>
                </div>
              </div>

              <div className="relative h-48 w-72 p-8 flex flex-col justify-center items-start rounded-lg cursor-pointer hover:drop-shadow-lg transition-all duration-200 bg-white border-r-4 border-r-primary">
                <button className="absolute top-3 left-4">
                  <Image src="/icons/arrow-down.svg" alt="arrow down" width={20} height={20} />
                </button>
                <div className="flex flex-col">
                  <span className="text-6xl font-bold">8</span>
                  <span className="text-xl font-light">נסיעות שהסתיימו</span>
                </div>
              </div>

              <button className="h-48 w-72 p-8 bg-[#ECE9E2] flex justify-center items-center border-2 border-primary rounded-lg hover:drop-shadow-lg transition-all duration-200">
                <span className="text-2xl font-medium">סכום כסף?</span>
              </button>
            </div>
          </section>

          <section className="flex flex-col gap-6 mx-20">
            <div className="flex justify-start items-center gap-3 text-3xl">
              <h2 className="text-foreground font-medium">נסיעות פעילות</h2>
              <span className="text-accent">(20)</span>
            </div>

            <div className="">

            </div>
          </section>
        </div>
      </div>
    </>
  );
}
