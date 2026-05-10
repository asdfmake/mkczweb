import CoachCard from "@/components/HomeCoaches/CoachCard";

interface Member {
  name: string;
  picture: string;
  description: string;
}

interface OrganiSavezaContentProps {
  members: Record<string, Member[]>;
  categoryTitles: Record<string, { en: string; sr: string; ru: string }>;
  categoryOrder: string[];
  locale: string;
  bodyTitle: string;
  membersSubtitle: string;
}

export default function OrganiSavezaPageContent({
  members,
  categoryTitles,
  categoryOrder,
  locale,
  bodyTitle,
  membersSubtitle,
}: OrganiSavezaContentProps) {
  return (
    <main>
      <div className="h-[140px] bg-red"></div>
      <div className="pt-[32px] pb-16 bg-white dark:bg-background">
        <div className="w-full flex flex-col px-6 mb-12 sm:px-16 lg:px-[264px]">
          <h1 className="text-[48px] md:text-[64px] font-[700] font-heading text-red uppercase leading-tight mb-2">
            {bodyTitle}
          </h1>
          <p className="text-[20px] font-body text-foreground/70">
            {membersSubtitle}
          </p>
        </div>

        {Object.entries(members)
          .sort(
            ([keyA], [keyB]) =>
              categoryOrder.indexOf(keyA) - categoryOrder.indexOf(keyB)
          )
          .map(([categoryKey, categoryMembers]) => {
            const categoryTitle =
              categoryTitles[categoryKey]?.[locale as "en" | "sr" | "ru"] ||
              categoryKey;

            return (
              <div key={categoryKey} className="mb-16 px-6 sm:px-16 lg:px-[264px]">
                <h2 className="text-[32px] md:text-[40px] font-heading font-semibold text-red uppercase mb-8">
                  {categoryTitle}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {categoryMembers.map((member, index) => (
                    <div
                      key={`${member.name}-${index}`}
                      className="flex justify-center"
                    >
                      <CoachCard
                        name={member.name}
                        title=""
                        picture={member.picture}
                        description={member.description}
                        className="w-full max-w-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
      </div>
    </main>
  );
}
