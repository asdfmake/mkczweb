import Hero from "@/components/Hero/Hero";
import CoachCard from "@/components/HomeCoaches/CoachCard";
import HomeCoaches from "@/components/HomeCoaches/HomeCoaches";
import HomeInfo from "@/components/HomeInfo";
import HomeLocation from "@/components/HomeLocation";
import HomeWeapons from "@/components/HomeWeapons/HomeWeapons";
import ModelCard from "@/components/ModelCard/ModelCard";
import HomeNews from "@/components/News/HomeNews";
import { members } from "@/constants/OrganiSaveza";
import { useTranslations } from "next-intl";

export default function OrganiSavezaPage() {
  const t = useTranslations("Organi");
  return (
    <main>
      <div className="h-[140px] bg-red"></div>
      <div className="pt-[32px] -mb-10  bg-white">
        <div className="w-full flex flex-col px-[4px] mb-7 sm:flex-row sm:justify-between sm:align-top">
          <h2 className="text-[40px] font-[700] font-heading text-red uppercase sm:hidden">
            {t("bodies")}
          </h2>
          <h2 className="sm:text-[64px] lg:text-[86px] font-[700] font-heading text-red uppercase hidden sm:block sm:leading-none sm:pt-1 md:pt-5 mr-14">
            {t("bodies")}
          </h2>
          <h2 className="text-[100px] leading-[100px] font-[700] font-heading text-red uppercase md:text-[160px] lg:text-[220px] sm:leading-none">
            {t("members")}
          </h2>
        </div>
        <div className="flex flex-wrap">
          {members.map((member) => (
            <CoachCard
              text={member.text}
              name={member.name}
              title={member.title}
              picture={member.picture}
              inverted={true}
              className="mb-10"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
