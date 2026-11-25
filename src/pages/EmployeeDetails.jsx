
import { useParams, useNavigate } from "react-router-dom";
import { useGetUserByIdQuery } from "../services/Api";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
} from "../components/tailwreck/tailwreck.es";
import DetailRow from "../components/DetailRow";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

const EmployeeDetails = ({ setData }) => {

  console.log("Details rendered");

  useEffect(() => {
    console.log("details mounted");

    return () => {
      console.log("details unmounted");
    };
  }, []);

  // return <div>Employee List</div>;



  const { id } = useParams();
  const navigate = useNavigate();

  const [savedEmployee, setSavedEmployee] = useState(null);
  const [checkedStorage, setCheckedStorage] = useState(false);

  // Read saved edits whenever the employee ID changes.
  useEffect(() => {
    console.log("employee details render")

    setCheckedStorage(false);

    try {
      const addedUsers = JSON.parse(
        sessionStorage.getItem("addedUsers") || "[]"
      );

      const editedUsers = JSON.parse(
        sessionStorage.getItem("editedUsers") || "[]"
      );

      const deletedUserIds = JSON.parse(
        sessionStorage.getItem("deletedUserIds") || "[]"
      );

      // Check whether the employee was deleted.
      const isDeleted = deletedUserIds.some(
        (deletedId) => String(deletedId) === String(id)
      );

      if (isDeleted) {
        setSavedEmployee(null);
        return;
      }

      // Find newly added employee.
      const addedEmployee = addedUsers.find(
        (employee) => String(employee.id) === String(id)
      );

      // Find edited API employee.
      const editedEmployee = editedUsers.find(
        (employee) => String(employee.id) === String(id)
      );

      setSavedEmployee(addedEmployee || editedEmployee || null);

    } catch (error) {
      console.error("Failed to retrieve employee:", error);
      setSavedEmployee(null);
    } finally {
      setCheckedStorage(true);
    }
  }, [id]);

  // Fetch from DummyJSON only when no saved edit exists.
  const {
    data: apiUser,
    isLoading,
    isError,
  } = useGetUserByIdQuery(id, {
    skip: !checkedStorage || Boolean(savedEmployee),
  });

  const user = savedEmployee ?? apiUser;

  if (!checkedStorage || (isLoading && !user)) {
    return <p className="p-8">Loading employee details...</p>;
  }

  if (isError && !user) {
    return <p className="p-8">Failed to load employee details.</p>;
  }

  if (!user) {
    return <p className="p-8">Employee not found.</p>;
  }

  // const fullName = `${user.firstName} ${user.lastName}`;


  return (
    <div>
      <Navbar setData={setData} />
      <div className="min-h-screen bg-gray-50 p-4 font-serif dark:bg-gray-950 sm:p-8">


        <div className="mx-auto max-w-6xl">
          <Button
            onClick={() => navigate("/employees")}
            className="mb-6 rounded-lg bg-edit text-edit-text hover:bg-edit-hover px-5 py-2 transition"
          >
            Back to Employees
          </Button>

          <Card
            layout="vertical"
            rounded="md"
            shadow="lg"
            className="!border-2 !border-border !bg-card !text-foreground"
          >
            <CardHeader className="!flex !flex-col !items-start !gap-4 !border-b !border-border sm:!flex-row sm:!items-center">
              <img
                src={user.image}
                alt={user.firstName}
                className="h-24 w-24 rounded-full border-4 border-blue-100 object-cover"
              />

              <div>
                <h1 className="text-2xl font-bold sm:text-3xl">
                  {user.firstName} {user.lastName}
                </h1>
                <p className=" text-md mt-2 text-gray-500">
                  {user.company?.title}
                </p>
                <p className="text-md  text-gray-500">
                  {user.company?.name}
                </p>
                <div className="mt-4 flex flex-wrap gap-2 mb-4">
                  {user.role &&
                  (<span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 dark:bg-green-950 dark:text-green-300">
                    {user.role}
                  </span>)}

                  {user.company?.department &&
                   (<span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                    {user.company?.department}
                  </span>)}


                </div>
              </div>
            </CardHeader>

            <CardBody className="!space-y-8 !p-5 sm:!p-8">
              {/* Personal Details */}
              <div>
                <h2 className="mb-4 border-b border-border pb-2 text-lg font-bold">
                  Personal Details
                </h2>

                <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2">
                  <DetailRow label="First Name" value={user.firstName} />
                  <DetailRow label="Last Name" value={user.lastName} />
                  <DetailRow label="Maiden Name" value={user.maidenName} />
                  <DetailRow label="Age" value={user.age} />
                  <DetailRow label="Gender" value={user.gender} />
                  <DetailRow label="Date of Birth" value={user.birthDate} />
                  <DetailRow label="Email" value={user.email} />
                  <DetailRow label="Phone" value={user.phone} />
                  <DetailRow label="Username" value={user.username} />
                  <DetailRow label="Password" value={user.password} />
                  <DetailRow label="Blood Group" value={user.bloodGroup} />
                  <DetailRow label="Height" value={`${user.height} cm`} />
                  <DetailRow label="Weight" value={`${user.weight} kg`} />
                  <DetailRow label="University" value={user.university} />
                  <DetailRow label="Role" value={user.role} />
                </div>
              </div>

              {/* Appearance */}
              <div>
                <h2 className="mb-4 border-b border-border pb-2 text-lg font-bold">
                  Appearance
                </h2>

                <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2">
                  <DetailRow label="Eye Color" value={user.eyeColor} />
                  <DetailRow label="Hair Color" value={user.hair?.color} />
                  <DetailRow label="Hair Type" value={user.hair?.type} />
                </div>
              </div>

              {/* Address */}
              <div>
                <h2 className="mb-4 border-b border-border pb-2 text-lg font-bold">
                  Home Address
                </h2>

                <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2">
                  <DetailRow label="Address" value={user.address?.address} />
                  <DetailRow label="City" value={user.address?.city} />
                  <DetailRow label="State" value={user.address?.state} />
                  <DetailRow label="State Code" value={user.address?.stateCode} />
                  <DetailRow label="Postal Code" value={user.address?.postalCode} />
                  <DetailRow label="Country" value={user.address?.country} />
                  <DetailRow label="Latitude" value={user.address?.coordinates?.lat} />
                  <DetailRow label="Longitude" value={user.address?.coordinates?.lng} />
                </div>
              </div>

              {/* Company */}
              <div>
                <h2 className="mb-4 border-b border-border pb-2 text-lg font-bold">
                  Company Details
                </h2>

                <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2">
                  <DetailRow label="Company" value={user.company?.name} />
                  <DetailRow label="Department" value={user.company?.department} />
                  <DetailRow label="Job Title" value={user.company?.title} />
                  <DetailRow label="EIN" value={user.ein} />
                </div>
              </div>

              {/* Company Address */}
              <div>
                <h2 className="mb-4 border-b border-border pb-2 text-lg font-bold">
                  Company Address
                </h2>

                <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2">
                  <DetailRow label="Address" value={user.company?.address?.address} />
                  <DetailRow label="City" value={user.company?.address?.city} />
                  <DetailRow label="State" value={user.company?.address?.state} />
                  <DetailRow label="State Code" value={user.company?.address?.stateCode} />
                  <DetailRow label="Postal Code" value={user.company?.address?.postalCode} />
                  <DetailRow label="Country" value={user.company?.address?.country} />
                  <DetailRow label="Latitude" value={user.company?.address?.coordinates?.lat} />
                  <DetailRow label="Longitude" value={user.company?.address?.coordinates?.lng} />
                </div>
              </div>

              {/* Bank */}
              <div>
                <h2 className="mb-4 border-b border-border pb-2 text-lg font-bold">
                  Bank Details
                </h2>

                <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2">
                  <DetailRow label="Card Expiry" value={user.bank?.cardExpire} />
                  <DetailRow label="Card Type" value={user.bank?.cardType} />
                  <DetailRow label="Currency" value={user.bank?.currency} />
                  <DetailRow label="IBAN" value={user.bank?.iban} />
                  <DetailRow label="Card Number" value={user.bank?.cardNumber} />
                </div>
              </div>

              {/* Crypto */}
              <div>
                <h2 className="mb-4 border-b border-border pb-2 text-lg font-bold">
                  Cryptocurrency Details
                </h2>

                <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2">
                  <DetailRow label="Coin" value={user.crypto?.coin} />
                  <DetailRow label="Wallet" value={user.crypto?.wallet} />
                  <DetailRow label="Network" value={user.crypto?.network} />
                </div>
              </div>

              {/* Technical Details */}
              <div>
                <h2 className="mb-4 border-b border-border pb-2 text-lg font-bold">
                  Technical Details
                </h2>

                <div className="grid grid-cols-1 gap-x-8 md:grid-cols-2">
                  <DetailRow label="IP Address" value={user.ip} />
                  <DetailRow label="MAC Address" value={user.macAddress} />
                  <DetailRow label="User Agent" value={user.userAgent} />
                  <DetailRow label="SSN" value={user.ssn} />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
