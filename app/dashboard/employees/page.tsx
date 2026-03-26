'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';
import { employees } from '@/app/lib/hr-data';
import { Badge, PageHeader, SurfaceCard } from '../components/ui';

const Employees = () => {
  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Directory"
        title="Employees"
        description="Manage employee records, contact details, and workforce status across the organization."
        action={
          <Link href="/dashboard/employees/add-employee" className="inline-flex items-center gap-2 rounded-2xl bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-strong)]">
            <Icon icon="solar:add-circle-bold-duotone" width={18} height={18} />
            Add employee
          </Link>
        }
      />

      <div className="grid gap-5 md:grid-cols-3">
        <SurfaceCard>
          <p className="text-sm text-slate-500">Headcount</p>
          <p className="mt-3 text-4xl font-semibold text-slate-900">{employees.length}</p>
        </SurfaceCard>
        <SurfaceCard>
          <p className="text-sm text-slate-500">Remote employees</p>
          <p className="mt-3 text-4xl font-semibold text-slate-900">{employees.filter((employee) => employee.status === "Remote").length}</p>
        </SurfaceCard>
        <SurfaceCard>
          <p className="text-sm text-slate-500">On leave / probation</p>
          <p className="mt-3 text-4xl font-semibold text-slate-900">{employees.filter((employee) => employee.status === "On Leave" || employee.status === "Probation").length}</p>
        </SurfaceCard>
      </div>

      <SurfaceCard className="overflow-hidden p-0">
        <div className="flex flex-col gap-4 border-b border-slate-100 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-lg font-semibold text-slate-900">Employee roster</p>
            <p className="text-sm text-slate-500">Live overview of active workforce records.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600">
              <Icon icon="solar:filter-bold-duotone" width={18} height={18} />
              Filter
            </button>
            <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600">
              <Icon icon="solar:download-bold-duotone" width={18} height={18} />
              Export
            </button>
          </div>
        </div>
        <div className="overflow-x-auto px-6 py-2">
          <table className="min-w-full text-left">
            <thead className="text-sm text-slate-400">
              <tr>
                <th className="pb-4 font-medium">Employee</th>
                <th className="pb-4 font-medium">Department</th>
                <th className="pb-4 font-medium">Contact</th>
                <th className="pb-4 font-medium">Location</th>
                <th className="pb-4 font-medium">Salary</th>
                <th className="pb-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id} className="border-t border-slate-100 text-sm text-slate-600">
                  <td className="py-4">
                    <p className="font-medium text-slate-900">{employee.name}</p>
                    <p>{employee.role}</p>
                  </td>
                  <td>{employee.department}</td>
                  <td>
                    <p>{employee.email}</p>
                    <p>{employee.phone}</p>
                  </td>
                  <td>{employee.location}</td>
                  <td>{employee.salary}</td>
                  <td>
                    <Badge
                      tone={
                        employee.status === "Active"
                          ? "success"
                          : employee.status === "Remote"
                            ? "brand"
                            : employee.status === "On Leave"
                              ? "warning"
                              : "neutral"
                      }
                    >
                      {employee.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SurfaceCard>
    </div>
  );
};

export default Employees;
