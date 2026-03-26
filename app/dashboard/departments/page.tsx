import { departments } from "@/app/lib/hr-data";
import { PageHeader, SurfaceCard } from "../components/ui";

const Departments = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Structure"
        title="Departments"
        description="Track department leads, open roles, and budget utilization."
      />

      <div className="grid gap-5 lg:grid-cols-2">
        {departments.map((department) => (
          <SurfaceCard key={department.name}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xl font-semibold text-slate-900">{department.name}</p>
                <p className="mt-1 text-sm text-slate-500">Lead: {department.lead}</p>
              </div>
              <p className="text-sm text-slate-500">{department.headcount} employees</p>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm text-slate-500">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p>Open roles</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{department.openRoles}</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p>Budget used</p>
                <p className="mt-2 text-2xl font-semibold text-slate-900">{department.budgetUsed}%</p>
              </div>
            </div>
          </SurfaceCard>
        ))}
      </div>
    </div>
  );
}

export default Departments;
