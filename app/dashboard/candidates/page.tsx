import { candidates } from "@/app/lib/hr-data";
import { Badge, PageHeader, SurfaceCard } from "../components/ui";

const Candidates = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Hiring"
        title="Candidates"
        description="Review active applicants, interview stages, and candidate quality scores."
      />

      <SurfaceCard>
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            <thead className="text-sm text-slate-400">
              <tr>
                <th className="pb-4 font-medium">Candidate</th>
                <th className="pb-4 font-medium">Role</th>
                <th className="pb-4 font-medium">Stage</th>
                <th className="pb-4 font-medium">Source</th>
                <th className="pb-4 font-medium">Interview</th>
                <th className="pb-4 font-medium">Score</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (
                <tr key={candidate.id} className="border-t border-slate-100 text-sm text-slate-600">
                  <td className="py-4 font-medium text-slate-900">{candidate.name}</td>
                  <td>{candidate.role}</td>
                  <td><Badge tone="brand">{candidate.stage}</Badge></td>
                  <td>{candidate.source}</td>
                  <td>{candidate.interviewDate}</td>
                  <td>{candidate.score}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SurfaceCard>
    </div>
  );
}

export default Candidates;
