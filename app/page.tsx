import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Image
        className="h-screen w-screen"
        src={"/bg.png"}
        alt="bg"
        width={100}
        height={100}
      />
    </div>
  );
}
