import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeCard from "./EmployeeCard";
import EmployeeTable from "./EmployeeTable";

import {
  Card,
  CardBody,
  CardHeader,
  FeaturedInput,
  Button,
  Pagination,
  Input,
  FeaturedBasicSelect,
  Alert,
  Filter,
} from "../components/tailwreck/tailwreck.es";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DetailRow from "../components/DetailRow";
import EditEmployee from "./EditEmployee";
import { FaThLarge, FaTable } from "react-icons/fa";


// Change this import path to match your API file.
import { useGetUserQuery, useDeleteUserMutation } from "../services/Api";
import AddEmployee from "./AddEmployee";

const EmployeeList = ({ setData }) => {
  console.log("EmployeeList")
  const navigate = useNavigate();

  const [viewMode, setViewMode] = useState(() => {
    return sessionStorage.getItem("employeeViewMode") || "card";
  });
  const [users, setUsers] = useState([]);
  console.log(users)

  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [successMessage, setSuccessMessage] = useState("");

  const [loggedInUser, setLoggedInUser] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [age, setAge] = useState("");
  const [sortBy, setSortBy] = useState("firstName");
  const [order, setOrder] = useState("asc");
  const [addedUsers, setAddedUsers] = useState(() => {
    return JSON.parse(
      sessionStorage.getItem("addedUsers") || "[]"
    );
  });

  const isAdmin = loggedInUser?.role === "admin";

  const filteredUsers = useMemo(() => {
    let result = [...users];

    // Search
    if (search.trim()) {
      result = result.filter((user) =>
        `${user.firstName} ${user.lastName}`
          .replace(/\s/g, "")
          .toLowerCase()
          .includes(search.replace(/\s/g, "").toLowerCase())
      );
    }

    // Age filter
    if (age !== "") {
      result = result.filter(
        (user) => user.age === Number(age)
      );
    }

    // Sorting
    result.sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];

      if (typeof valueA === "string" && typeof valueB === "string") {
        return order === "asc"
          ? valueA.localeCompare(valueB, undefined, {
            sensitivity: "base",
          })
          : valueB.localeCompare(valueA, undefined, {
            sensitivity: "base",
          });
      }

      return order === "asc"
        ? valueA - valueB
        : valueB - valueA;
    });

    return result;
  }, [users, search, age, sortBy, order]);

  const totalItems = filteredUsers.length;
  const skip = (currentPage - 1) * limit;

  console.log("EmployeeList rendered");

  useEffect(() => {
    console.log("EmployeeList mounted");

    return () => {
      console.log("EmployeeList unmounted");
    };
  }, []);


  const paginatedUsers = filteredUsers.slice(
    skip,
    skip + limit
  );


  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  // Fetch employees from DummyJSON.
  const {
    data,
    isLoading,
    isError,
  } = useGetUserQuery({
    limit: 0,
    skip: 0,
  });

  // Load the logged-in user from sessionStorage.
  useEffect(() => {
    // console.log("employee list render")
    const storedUser = sessionStorage.getItem("loggedInUser");

    if (!storedUser) {

      return;
    }

    try {
      const currentUser = JSON.parse(storedUser);

      setLoggedInUser(currentUser);

      // Normal users can see only their own details.
      if (currentUser.role !== "admin") {
        const editedUsers = JSON.parse(
          sessionStorage.getItem("editedUsers") || "[]"
        );

        const addedUsers = JSON.parse(
          sessionStorage.getItem("addedUsers") || "[]"
        );

        const editedEmployee = editedUsers.find(
          (employee) =>
            String(employee.id) === String(currentUser.id)
        );

        const addedEmployee = addedUsers.find(
          (employee) =>
            String(employee.id) === String(currentUser.id)
        );

        const employeeToDisplay =
          editedEmployee || addedEmployee || currentUser;

        setUsers([employeeToDisplay]);
      }
    } catch (error) {
      console.error("Failed to load employee details:", error);
    }
  }, [navigate]);


  // Admins can see all employees returned by the API.
  // Restore any employee details edited during this session.

  // Admins can see all employees.
  // Restore edited, added, and deleted employees.
  useEffect(() => {
    // console.log("employee list render")

    if (isAdmin && data?.users) {
      const deletedUserIds = JSON.parse(
        sessionStorage.getItem("deletedUserIds") || "[]"
      );

      const savedAddedUsers = JSON.parse(
        sessionStorage.getItem("addedUsers") || "[]"
      );

      const editedUsers = JSON.parse(
        sessionStorage.getItem("editedUsers") || "[]"
      );

      const filteredAddedUsers = savedAddedUsers.filter(
        (employee) =>
          !deletedUserIds.includes(employee.id)
      );

      const updatedUsers = data.users
        .filter(
          (employee) =>
            !deletedUserIds.includes(employee.id)
        )
        .map((employee) => {
          const editedEmployee = editedUsers.find(
            (edited) =>
              String(edited.id) === String(employee.id)
          );

          return editedEmployee || employee;
        });

      setUsers([
        ...updatedUsers,
        ...filteredAddedUsers,
      ]);

    }
    console.log(addedUsers)
  }, [isAdmin, data, addedUsers]);


  // Open the edit modal for the selected employee.
  const handleEdit = (event, employee) => {
    event.stopPropagation();
    setSelectedEmployee(employee);
    setIsEditOpen(true);
  };

  // Open the add modal for the selected employee.

  const handleAdd = () => {

    setSuccessMessage("");
    setIsAddOpen(true);
  };

  const handleDelete = async (event, employee) => {
    event.stopPropagation();

    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`
    );

    if (!confirmDelete) return;

    try {
      const isAddedUser = addedUsers.some(
        (user) => String(user.id) === String(employee.id)
      );

      // Call API only for DummyJSON employees.
      if (!isAddedUser) {
        await deleteUser(employee.id).unwrap();
      }

      // Remove from users state.
      setUsers((previousUsers) =>
        previousUsers.filter(
          (user) => String(user.id) !== String(employee.id)
        )
      );

      // Remove from addedUsers storage and state.
      setAddedUsers((previousUsers) => {
        const updatedUsers = previousUsers.filter(
          (user) => String(user.id) !== String(employee.id)
        );

        sessionStorage.setItem(
          "addedUsers",
          JSON.stringify(updatedUsers)
        );

        return updatedUsers;
      });

      // Remove from editedUsers storage.
      const editedUsers = JSON.parse(
        sessionStorage.getItem("editedUsers") || "[]"
      );

      const updatedEditedUsers = editedUsers.filter(
        (user) => String(user.id) !== String(employee.id)
      );

      sessionStorage.setItem(
        "editedUsers",
        JSON.stringify(updatedEditedUsers)
      );

      // Store deleted IDs to prevent deleted users from reappearing.
      const deletedUserIds = JSON.parse(
        sessionStorage.getItem("deletedUserIds") || "[]"
      );

      if (
        !deletedUserIds.some(
          (id) => String(id) === String(employee.id)
        )
      ) {
        deletedUserIds.push(employee.id);
      }

      sessionStorage.setItem(
        "deletedUserIds",
        JSON.stringify(deletedUserIds)
      );

      // Reset pagination if the current page becomes empty.
      if (paginatedUsers.length === 1 && currentPage > 1) {
        setCurrentPage((previousPage) => previousPage - 1);
      }

    } catch (error) {
      console.error("Failed to delete employee:", error);
      alert("Failed to delete employee. Please try again.");
    }
  };

  // Save edited details and update the corresponding card.

  const handleEmployeeUpdated = (updatedEmployee) => {
    // Update employee card.
    setUsers((previousUsers) =>
      previousUsers.map((employee) =>
        String(employee.id) === String(updatedEmployee.id)
          ? updatedEmployee
          : employee
      )
    );

    // Check whether this employee was newly added.
    const addedUsers = JSON.parse(
      sessionStorage.getItem("addedUsers") || "[]"
    );

    const isAddedUser = addedUsers.some(
      (employee) =>
        String(employee.id) === String(updatedEmployee.id)
    );

    if (isAddedUser) {
      // Update addedUsers.
      const updatedAddedUsers = addedUsers.map((employee) =>
        String(employee.id) === String(updatedEmployee.id)
          ? updatedEmployee
          : employee
      );

      sessionStorage.setItem(
        "addedUsers",
        JSON.stringify(updatedAddedUsers)
      );

      setAddedUsers(updatedAddedUsers);
    } else {
      // Update editedUsers.
      const editedUsers = JSON.parse(
        sessionStorage.getItem("editedUsers") || "[]"
      );

      const existingIndex = editedUsers.findIndex(
        (employee) =>
          String(employee.id) === String(updatedEmployee.id)
      );

      const updatedEditedUsers =
        existingIndex !== -1
          ? editedUsers.map((employee, index) =>
            index === existingIndex
              ? updatedEmployee
              : employee
          )
          : [...editedUsers, updatedEmployee];

      sessionStorage.setItem(
        "editedUsers",
        JSON.stringify(updatedEditedUsers)
      );
    }

    // Update logged-in user if their own details were edited.
    if (
      String(updatedEmployee.id) === String(loggedInUser?.id)
    ) {
      setLoggedInUser(updatedEmployee);

      sessionStorage.setItem(
        "loggedInUser",
        JSON.stringify(updatedEmployee)
      );
    }

    setSelectedEmployee(updatedEmployee);
  };

  // Navigate to the selected employee's details page.
  const handleCardClick = (employee) => {
    navigate(`/employees/${employee.id}`);
  };

  // const handleViewChange = (view) => {
  //   setViewMode(view);
  //   sessionStorage.setItem("employeeViewMode", view);
  // };

  // Display loading state.
  if (!loggedInUser || (isAdmin && isLoading)) {
    return (
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-grow p-8">
          Loading employees...
        </main>
        <Footer />
      </div>
    );
  }

  // Display API error for admins.
  if (isAdmin && isError) {
    return (
      <div className="flex min-h-screen flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-grow p-8">
          Failed to load employees. Please try again.
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full min-w-0 flex-col overflow-x-hidden bg-background text-foreground">


      <Navbar setData={setData} />
      <main className="w-full flex-grow">

        <h1 className="px-8  pt-6 text-2xl font-bold">
          {isAdmin ? "Employee Details" : "My Details"}
        </h1>

        {successMessage && (
          <Alert
            message="This is a success alert message."
            onClose={() => { }}
            title={successMessage}
          />
        )}
        <div className="relative z-50 mt-6 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">

            {/* Filter Section */}
            <div className="relative z-50 min-w-0 flex-1 overflow-visible">
              <Filter
                initialOpen
                // itemCount={2}
                onApply={() => { }}
                onClear={() => { }}
                showCount
                className="dark:!hover:bg-slate-700"            >
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  <div className="col-span-2">
                    <FeaturedInput
                      label="Search"
                      name="search"
                      theme="primary"
                      type="text"
                      value={search}
                      className="!bg-navbar w-full"
                      onChange={(event) => {
                        setSearch(event.target.value);
                        setCurrentPage(1);
                      }}
                      floatinglabelClass="!bg-navbar"
                    />
                  </div>
                  <Input
                    type="number"
                    placeholder="Filter by age"
                    name="age"
                    value={age}
                    onChange={(e) => {
                      setAge(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full rounded border p-2 bg-navbar"
                    min="1"
                  />
                  {/* <FeaturedBasicSelect
                  border="md"
                  className="w-full !bg-navbar"
                  onChange={(e) => {
                    setOrder(e.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Sort order"
                  size="md"
                  theme="primary"
                  value={order}
                  options={[
                    { label: "Ascending", value: "asc" },
                    { label: "Descending", value: "desc" },
                  ]}

                  
                /> */}
                  <select
                    value={order}
                    onChange={(e) => {
                      setOrder(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="
    bg-white dark:bg-slate-800 text-foreground
    border border-border
    px-3 py-2
    h-[2.4rem] w-full
    text-sm font-medium
    rounded
    focus:outline-none
    focus:border-blue-500
    focus:ring-1 focus:ring-blue-500
    dark:focus:border-blue-400
    dark:focus:ring-blue-400
    cursor-pointer
    transition-all duration-200 ease-out
  "
                  >
                    {/* <option value="" disabled>
    Sort order
  </option> */}

                    <option value="asc" >Ascending</option>
                    <option value="desc">Descending</option>
                  </select>



                </div>
              </Filter>
            </div>

            {/* Add Employee */}
            <div className="flex gap-3">
              <div className="inline-flex items-center gap-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 p-1">

                <button
                  type="button"
                  onClick={() => {
                    setViewMode("card");
                    sessionStorage.setItem("employeeViewMode", "card");
                    setCurrentPage(1);
                  }}
                  className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all
      ${viewMode === "card"
                      ? "bg-white text-blue-600 shadow-sm dark:bg-gray-700 dark:text-blue-400"
                      : "text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                >
                  <FaThLarge className="h-4 w-4" />
                  Card
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setViewMode("table");
                    sessionStorage.setItem("employeeViewMode", "table");
                    setCurrentPage(1);
                  }}
                  className={`flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-all
      ${viewMode === "table"
                      ? "bg-white text-blue-600 shadow-sm dark:bg-gray-700 dark:text-blue-400"
                      : "text-gray-600 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
                    }`}
                >
                  <FaTable className="h-4 w-4" />
                  Table
                </button>

              </div>

              <Button
                onClick={handleAdd}
                className=" rounded bg-view text-view-text hover:bg-view-hover font-medium  sm:w-auto"
              >
                Add Employee
              </Button>
            </div>

          </div>
        </div>

        {/* Employee Display */}
        <div className="relative z-0">

          {viewMode === "card" ? (
            <div className="grid grid-cols-1 gap-5 p-4 sm:grid-cols-2 sm:p-6 lg:grid-cols-3 lg:p-8">

              {paginatedUsers.length > 0 ? (
                paginatedUsers.map((employee) => (
                  <EmployeeCard
                    key={employee.id}
                    employee={employee}
                    isAdmin={isAdmin}
                    loggedInUser={loggedInUser}
                    onCardClick={handleCardClick}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))
              ) : (
                <p className="col-span-full py-6 text-center">
                  No matching employees found.
                </p>
              )}

            </div>
          ) : (
            <EmployeeTable
              employees={paginatedUsers}
              isAdmin={isAdmin}
              loggedInUser={loggedInUser}
              onView={handleCardClick}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}

        </div>

        <EditEmployee
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          user={selectedEmployee}
          onEmployeeUpdated={handleEmployeeUpdated}
        />
        <AddEmployee
          isOpen={isAddOpen}

          onClose={() => setIsAddOpen(false)}
          onEmployeeAdded={(newEmployee) => {
            setAddedUsers((previousUsers) => {
              const maxId = Math.max(
                208,
                ...previousUsers.map((user) => Number(user.id) || 0)
              );

              const employeeWithId = {
                ...newEmployee,
                id: maxId + 1,
              };

              const updatedUsers = [

                ...previousUsers,
                employeeWithId,
              ];

              sessionStorage.setItem(
                "addedUsers",
                JSON.stringify(updatedUsers)
              );

              setUsers((previousUsers) => [
                ...previousUsers,
                employeeWithId,
              ]);

              return updatedUsers;
            });

            setSuccessMessage("Employee added successfully!");
            setIsAddOpen(false);
          }}
        />

      </main>
      <div className="m-3">

        <Pagination
          currentPage={currentPage}
          onPageChange={(page) => {
            setCurrentPage(Number(page));
          }}
          onRowsChange={(rows) => {
            setLimit(Number(rows));
            setCurrentPage(1);
          }}
          showGoPage
          showRangeText
          showRowSelector
          totalItems={totalItems}
          layoutOrder={["rowSelector", "pages", "rangeText"]}
          className="!w-full"
        />
      </div>


      <Footer />

    </div>
  );
};

export default EmployeeList;