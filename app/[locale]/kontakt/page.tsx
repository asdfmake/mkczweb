import ContactsInfo from "@/components/Contacts/ContactsInfo";
import MapSection from "@/components/Contacts/MapSection";
import TrainingSchedule from "@/components/Contacts/TrainingSchedule";

export default function KontaktPage() {
  return (
    <main>
      <div className="h-[140px] bg-red" />
      <div className="py-12 bg-background">
        <ContactsInfo />
        <TrainingSchedule />
        <MapSection />
      </div>
    </main>
  );
}
