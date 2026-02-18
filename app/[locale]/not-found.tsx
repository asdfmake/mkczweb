import { Link } from "@/i18n/routing";
import Image from "next/image";

export default function NotFound() {
  return (
    <div>
      <div className="h-[140px] bg-red"></div>
      <div className="h-[600px] flex justify-center items-center p-16 flex-col max-w-[800px] m-auto">
        <Image
          alt="logo"
          src="/404-02.png"
          width={0}
          sizes="100%"
          height={0}
          className="h-full w-full"
        />
        <p>Page not found</p>
        <Link href="/">Return Home</Link>
      </div>
    </div>
  );
}
