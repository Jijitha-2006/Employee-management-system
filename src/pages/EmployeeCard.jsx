
import {
  Card,
  CardBody,
  CardHeader,
  Button,
} from "../components/tailwreck/tailwreck.es";

import DetailRow from "../components/DetailRow";

function EmployeeCard({
  employee,
  isAdmin,
  loggedInUser,
  onCardClick,
  onEdit,
  onDelete,
}) {
  const fullName = `${employee.firstName} ${employee.lastName}`;

  return (
    <div
      onClick={() => onCardClick(employee)}
      className="cursor-pointer "
    >
      <Card
        layout="vertical"
        rounded="md"
        shadow="lg"
        className="!border-2 !border-border !bg-card !text-foreground"
      >
        <CardHeader className="flex gap-4">
          <img
            alt={fullName}
            className="h-[50px] w-[50px] rounded-full object-cover"
            src={employee.image}
          />

          <div>
            <p>{fullName}</p>
            <p className="text-sm font-semibold">
              Age: {employee.age}
            </p>
          </div>
        </CardHeader>

        <CardBody>
          <DetailRow label="Date of birth:" value={employee.birthDate} />
          <DetailRow label="Gender:" value={employee.gender} />
          <DetailRow label="Email:" value={employee.email} />
          <DetailRow label="Phone:" value={employee.phone} />
          <DetailRow label="Blood Group:" value={employee.bloodGroup} />
          <DetailRow
            label="Address:"
            value={employee.address?.address}
          />

          <div className="mt-4 flex justify-end gap-3">
            <Button
              onClick={(event) => onEdit(event, employee)}
              className="rounded-lg bg-edit text-edit-text hover:bg-edit-hover px-5 py-2"
            >
              Edit Details
            </Button>

            {isAdmin && (
              <Button
                disabled={loggedInUser?.id === employee.id}
                onClick={(event) => onDelete(event, employee)}
                className="rounded-lg bg-delete text-delete-text hover:bg-delete-hover px-5 py-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Delete
              </Button>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default EmployeeCard;
