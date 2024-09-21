import dynamic from 'next/dynamic';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="size-full p-10">
      <div className="relative mx-auto flex size-48 flex-col items-center justify-center lg:size-96">
        <Image alt="warning" className="relative" fill src="/images/after_mission.svg" />
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        {/* <h2 className="uppercase font-text text-2xl">Homepage</h2> */}
        <h2 className="font-text text-xl">Coming soon</h2>
      </div>
    </div>
  );
}
