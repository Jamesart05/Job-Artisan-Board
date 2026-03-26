import { holidays } from "@/app/lib/hr-data";
import { Badge, PageHeader, SurfaceCard } from "../components/ui";

const Holidays = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Calendar"
        title="Holidays"
        description="Company and public holidays that affect attendance and payroll planning."
      />

      <SurfaceCard>
        <div className="space-y-4">
          {holidays.map((holiday) => (
            <div key={holiday.name} className="flex flex-col gap-3 rounded-3xl border border-slate-100 px-5 py-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="font-medium text-slate-900">{holiday.name}</p>
                <p className="text-sm text-slate-500">{holiday.date} · {holiday.day}</p>
              </div>
              <Badge tone={holiday.type === "Public holiday" ? "brand" : "neutral"}>{holiday.type}</Badge>
            </div>
          ))}
        </div>
      </SurfaceCard>
    </div>
  );
}

export default Holidays;
