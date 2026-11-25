import EmployeeModal from "./EmployeeModal";

const EditEmployee = ({
  isOpen,
  onClose,
  user,
  onEmployeeUpdated,
}) => {
  const handleUpdateEmployee = async (data) => {
    const updatedEmployee = {
      ...user,
      ...data,
      age: Number(data.age),
      height: Number(data.height),
      weight: Number(data.weight),
    };

    // Use your existing update callback.
    onEmployeeUpdated(updatedEmployee);
    onClose();
  };

  return (
    <EmployeeModal
      isOpen={isOpen}
      onClose={onClose}
      user={user}
      mode="edit"
      onSubmitEmployee={handleUpdateEmployee}
    />
  );
};

export default EditEmployee;