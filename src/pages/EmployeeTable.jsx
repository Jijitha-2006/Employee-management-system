import { Button } from "../components/tailwreck/tailwreck.es";

function EmployeeTable({
  employees,
  isAdmin,
  loggedInUser,
  onEdit,
  onView,
  onDelete,
}) {
  return (
    <div className="w-full overflow-x-auto bg-background text-foreground p-8 bg:back ">
      <table className="w-full min-w-[1300px] border-collapse border border-[#E2E8F0] dark:border-slate-600 rounded-lg overflow-hidden">

        {/* Table Heading */}
        <thead className="bg-[#E8F0F4] dark:bg-slate-700">
          <tr>
            {[
              "Name",
              "Age",
              "Gender",
              "Email",
              "Phone",
              "Blood Group",
              "Address",
              "Actions",
            ].map((heading) => (
              <th
                key={heading}
                className="border border-[#E2E8F0] dark:border-slate-600 px-4 py-3 text-left text-sm font-semibold text-[#1E3A5F] dark:text-white whitespace-nowrap"
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Content */}
        <tbody className="bg-white dark:bg-slate-800">
          {employees.length > 0 ? (
            employees.map((employee) => (
              <tr
                key={employee.id}
                className="hover:bg-[#F0F4F7] dark:hover:bg-slate-700 transition-colors"
              >
                <td className="border border-[#E2E8F0] dark:border-slate-600 px-4 py-3 text-sm text-[#1E293B] dark:text-slate-100 whitespace-nowrap">
                  {employee.firstName} {employee.lastName}
                </td>

                <td className="border border-[#E2E8F0] dark:border-slate-600 px-4 py-3 text-sm text-[#1E293B] dark:text-slate-100">
                  {employee.age}
                </td>

                <td className="border border-[#E2E8F0] dark:border-slate-600 px-4 py-3 text-sm text-[#1E293B] dark:text-slate-100 capitalize">
                  {employee.gender}
                </td>

                <td className="border border-[#E2E8F0] dark:border-slate-600 px-4 py-3 text-sm text-[#1E293B] dark:text-slate-100">
                  {employee.email}
                </td>

                <td className="border border-[#E2E8F0] dark:border-slate-600 px-4 py-3 text-sm text-[#1E293B] dark:text-slate-100 whitespace-nowrap">
                  {employee.phone}
                </td>

                <td className="border border-[#E2E8F0] dark:border-slate-600 px-4 py-3 text-sm text-[#1E293B] dark:text-slate-100">
                  {employee.bloodGroup}
                </td>

                <td className="border border-[#E2E8F0] dark:border-slate-600 px-4 py-3 text-sm text-[#1E293B] dark:text-slate-100">
                  {employee.address?.address}
                </td>

                {/* Action Buttons */}
                <td className="border border-[#E2E8F0] dark:border-slate-600 px-4 py-3">
                  <div className="flex items-center gap-2">

                    <Button
                      onClick={(event) => {
                        event.stopPropagation();
                        onView(employee);
                      }}
                      className="bg-view text-view-text hover:bg-view-hover rounded-md font-medium transition-colors"
                    >
                      View
                    </Button>

                    <Button
                      onClick={(event) => onEdit(event, employee)}
                      className="bg-edit text-edit-text hover:bg-edit-hover rounded-md font-medium  transition-colors"
                    >
                      Edit
                    </Button>

                    {isAdmin && (
                      <Button
                        disabled={loggedInUser?.id === employee.id}
                        onClick={(event) => onDelete(event, employee)}
                        className="bg-delete text-delete-text hover:bg-delete-hover rounded-md font-medium  transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Delete
                      </Button>
                    )}

                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={8}
                className="border border-[#E2E8F0] dark:border-slate-600 p-6 text-center text-sm text-[#1E293B] dark:text-slate-200"
              >
                No matching employees found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeTable;
