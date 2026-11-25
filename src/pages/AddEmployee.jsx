import EmployeeModal from "./EmployeeModal";
import { useAddUserMutation } from "../services/Api";

const AddEmployee = ({ isOpen, onClose, onEmployeeAdded }) => {
  const [addUser, { isLoading }] = useAddUserMutation();

  const handleAddEmployee = async (data) => {
    const createdUser = await addUser(data).unwrap();

    onEmployeeAdded(createdUser);
    onClose();
  };

  return (
    <EmployeeModal
      isOpen={isOpen}
      onClose={onClose}
      mode="add"
      onSubmitEmployee={handleAddEmployee}
      isLoading={isLoading}
    />
  );
};

export default AddEmployee;