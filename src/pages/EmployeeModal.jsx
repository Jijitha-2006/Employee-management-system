import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "../components/tailwreck/tailwreck.es";

// Calculate age accurately using the birth date.
const calculateAge = (birthDate) => {
  if (!birthDate) return null;

  const parts = birthDate.split("-").map(Number);

  if (parts.length !== 3 || parts.some(Number.isNaN)) {
    return null;
  }

  const [year, month, day] = parts;
  const dob = new Date(year, month - 1, day);

  // Reject invalid dates.
  if (
    dob.getFullYear() !== year ||
    dob.getMonth() !== month - 1 ||
    dob.getDate() !== day
  ) {
    return null;
  }

  const today = new Date();
  let age = today.getFullYear() - year;

  const birthdayPassed =
    today.getMonth() > month - 1 ||
    (today.getMonth() === month - 1 && today.getDate() >= day);

  if (!birthdayPassed) age--;

  return age;
};





// Convert dates such as 1996-5-30 to 1996-05-30.
// const formatDate = (date) => {
//   if (!date) return "";

//   const value = String(date).split("T")[0];
//   const parts = value.split("-");

//   if (parts.length !== 3) return "";

//   const [year, month, day] = parts;

//   return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
// };

// Get today's date in YYYY-MM-DD format using local time.
const getToday = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const emptyEmployee = {
  firstName: "",
  lastName: "",
  maidenName: "",
  age: "",
  birthDate: "",
  gender: "",
  email: "",
  phone: "",
  username: "",
  password: "",
  image: "",
  bloodGroup: "",
  height: "",
  weight: "",
  eyeColor: "",
  hair: {
    color: "",
    type: "",
  },
  address: {
    address: "",
    city: "",
    state: "",
    stateCode: "",
    postalCode: "",
    country: "",
    coordinates: {
      lat: "",
      lng: "",
    },
  },
  company: {
    department: "",
    name: "",
    title: "",
    address: {
      address: "",
      city: "",
      state: "",
      stateCode: "",
      postalCode: "",
      country: "",
      coordinates: {
        lat: "",
        lng: "",
      },
    },
  },
  bank: {
    cardExpire: "",
    cardNumber: "",
    cardType: "",
    currency: "",
    iban: "",
  },
  university: "",
  ip: "",
  macAddress: "",
  ein: "",
  ssn: "",
  userAgent: "",
  crypto: {
    coin: "",
    wallet: "",
    network: "",
  },
  role: "user",
};


const EmployeeModal = ({
  isOpen,
  onClose,
  user = null,
  mode = "add",
  onSubmitEmployee,
  isLoading = false,
}) => {

  const isEdit = mode === "edit";
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    watch,
    trigger,
    setValue,
    formState: { errors },

  } = useForm({
    mode: "onChange"
  });

  const today = getToday();

  const birthDateValue = watch("birthDate");
  const ageValue = watch("age");

  // Fill the form whenever the selected employee changes.
  useEffect(() => {
    console.log("employee modal render")

    if (!isOpen) return;

    reset(
      isEdit && user
        ? {
          ...emptyEmployee,
          ...user,
          hair: { ...emptyEmployee.hair, ...user.hair },
          address: {
            ...emptyEmployee.address,
            ...user.address,
            coordinates: {
              ...emptyEmployee.address.coordinates,
              ...user.address?.coordinates,
            },
          },
          company: {
            ...emptyEmployee.company,
            ...user.company,
            address: {
              ...emptyEmployee.company.address,
              ...user.company?.address,
              coordinates: {
                ...emptyEmployee.company.address.coordinates,
                ...user.company?.address?.coordinates,
              },
            },
          },
          bank: { ...emptyEmployee.bank, ...user.bank },
          crypto: { ...emptyEmployee.crypto, ...user.crypto },
        }
        : emptyEmployee
    );
  }, [isOpen, isEdit, user, reset]);

  // Revalidate age when the birth date changes.
  useEffect(() => {
    console.log("employee modal render")

    if (birthDateValue) {
      trigger("age");
    }
  }, [birthDateValue, trigger]);

  // Revalidate birth date when the age changes.
  useEffect(() => {
    console.log("employee modal render")

    if (ageValue !== undefined && ageValue !== "") {
      trigger("birthDate");
    }
  }, [ageValue, trigger]);

  const handleClose = () => {
    // reset();
    onClose();
  };

  const handleFormSubmit = async (data) => {
    const employeeData = {
      ...data,
      age: Number(data.age),
      height: Number(data.height),
      weight: Number(data.weight),
      address: {
        ...emptyEmployee.address,
        ...user?.address,
        ...data.address,
        coordinates: {
          ...emptyEmployee.address.coordinates,
          ...user?.address?.coordinates,
          ...data.address?.coordinates,
          lat: Number(data.address?.coordinates?.lat || 0),
          lng: Number(data.address?.coordinates?.lng || 0),
        },
      },
      hair: {
        ...emptyEmployee.hair,
        ...user?.hair,
        ...data.hair,
      },
      company: {
        ...emptyEmployee.company,
        ...user?.company,
        ...data.company,
        address: {
          ...emptyEmployee.company.address,
          ...user?.company?.address,
          ...data.company?.address,
          coordinates: {
            ...emptyEmployee.company.address.coordinates,
            ...user?.company?.address?.coordinates,
            ...data.company?.address?.coordinates,
            lat: Number(
              data.company?.address?.coordinates?.lat || 0
            ),
            lng: Number(
              data.company?.address?.coordinates?.lng || 0
            ),
          },
        },
      },
      bank: {
        ...emptyEmployee.bank,
        ...user?.bank,
        ...data.bank,
      },
      crypto: {
        ...emptyEmployee.crypto,
        ...user?.crypto,
        ...data.crypto,
      },
    };

    await onSubmitEmployee(employeeData);
  };

  // Read errors for nested fields such as address.city or hair.color.
  const getFieldError = (name) => {
    return name.split(".").reduce(
      (current, key) => current?.[key],
      errors
    );
  };



const inputClass = `
  w-full p-3 rounded-lg border border-border
  bg-input text-foreground
  dark:bg-input dark:text-foreground
  focus:outline-none focus:ring-2 focus:ring-indigo-500
`;
  const minValues = {
    age: 19,
    height: 50,
    weight: 10,
  };

  const renderInput = (
    name,
    label,
    type = "text",
    validation = {}
  ) => {
    const error = getFieldError(name);

    const isNameField =
      name === "firstName" || name === "lastName";

    const isRestrictedNumber = Object.hasOwn(
      minValues,
      name
    );

    const registration = register(name, {
      ...validation,

      ...(isNameField && {
        pattern: {
          value: /^[a-zA-Z\s]+$/,
          message: "Only letters and spaces are allowed",
        },
      }),

      ...(isRestrictedNumber && {
        min: {
          value: name === "age" ? 19 : minValues[name],
          message:
            name === "age"
              ? "Age must be above 18"
              : `${label} must be greater than ${minValues[name]}`,
        },
      }),
    });

    return (
      <div key={name} className="w-full">
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-medium"
        >
          {label}
        </label>

        <input
          id={name}
          type={type}
          min={
            isRestrictedNumber
              ? name === "age"
                ? 19
                : minValues[name]
              : undefined
          }
          max={type === "date" ? today : undefined}
          step={
            type === "number" &&
              (name === "height" || name === "weight")
              ? "any"
              : undefined
          }
          {...registration}
          onChange={(event) => {
            let value = event.target.value;

            if (isNameField) {
              value = value.replace(/[^a-zA-Z\s]/g, "");
              event.target.value = value;
            }

            if (
              isRestrictedNumber &&
              value.startsWith("-")
            ) {
              value = value.replace(/-/g, "");
              event.target.value = value;
            }

            registration.onChange(event);
          }}
          onKeyDown={(event) => {
            if (
              isRestrictedNumber &&
              ["-", "e", "E"].includes(event.key)
            ) {
              event.preventDefault();
            }
          }}
          className={inputClass}
        />

        {error && (
          <p className="mt-1 text-sm text-red-500">
            {error.message}
          </p>
        )}
      </div>
    );
  };

  const renderSelect = (
    name,
    label,
    options,
    validation = {}
  ) => {
    const error = getFieldError(name);

    return (
      <div key={name} className="w-full">
        <label
          htmlFor={name}
          className="mb-1 block text-sm font-medium"
        >
          {label}
        </label>

        <select
          id={name}
          {...register(name, validation)}
          className={inputClass}
        >
          <option value="">Select {label}</option>

          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        {error && (
          <p className="mt-1 text-sm text-red-500">
            {error.message}
          </p>
        )}
      </div>
    );
  };

  const renderSection = (title, fields) => (
    <section key={title} className="mb-6">
      <h3 className="mb-4 border-b pb-2 text-lg font-semibold">
        {title}
      </h3>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {fields.map(
          ([name, label, type, validation, options]) => {
            if (options) {
              return renderSelect(
                name,
                label,
                options,
                validation
              );
            }

            return renderInput(
              name,
              label,
              type,
              validation
            );
          }
        )}
      </div>
    </section>
  );

  // if (!user) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      position="center"
      size="lg"
      theme="primary"
      shadow="lg"
      rounded="lg"
      className="
      w-[95vw] sm:w-[90vw] md:w-[85vw]
      lg:w-[80vw] xl:w-[75vw]
      !max-w-7xl
      max-h-[90dvh]
      overflow-hidden
      mx-auto
      hide-scrollbar overscroll-contain
    "
    >
      <ModalHeader className="bg-gray-800 text-white font-bold shrink-0">
        {isEdit ? "Edit Employee Details" : "Add Employee"}
      </ModalHeader>

      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        noValidate
        className="flex flex-col min-h-0 max-h-[80dvh]"
      >
        <ModalBody className="bg-white dark:bg-slate-800 flex-1 min-h-0 overflow-y-auto hide-scrollbar overscroll-contain">
          <div className="px-1">
            {renderSection("Personal Details", [
              ["firstName", "First Name", "text", {
                required: "First name is required",
              }],

              ["lastName", "Last Name", "text", {
                required: "Last name is required",
              }],

              ["maidenName", "Maiden Name"],

              [
                "age", "Age", "number",
                {
                  required: "Age is required",
                  min: {
                    value: 18,
                    message: "You must be at least 18 years old",
                  },
                  max: {
                    value: 120,
                    message: "Please enter a valid age",
                  },
                  validate: (value) => {
                    if (!Number.isInteger(Number(value))) {
                      return "Age must be a whole number";
                    }

                    const birthDate = getValues("birthDate");

                    if (!birthDate) {
                      return "Please enter your birth date";
                    }

                    const actualAge = calculateAge(birthDate);

                    if (actualAge === null) {
                      return "Please enter a valid birth date";
                    }

                    if (actualAge < 18) {
                      return "You must be at least 18 years old";
                    }

                    if (Number(value) !== actualAge) {
                      return "Age must match your birth date";
                    }

                    return true;
                  },
                },
              ],

              ["birthDate", "Birth Date", "date",
                {
                  required: "Birth date is required",
                  validate: (value) => {
                    if (!value) {
                      return "Birth date is required";
                    }

                    if (value > today) {
                      return "Birth date cannot be in the future";
                    }

                    const actualAge = calculateAge(value);

                    if (actualAge === null) {
                      return "Please enter a valid birth date";
                    }

                    if (actualAge < 18) {
                      return "You must be at least 18 years old";
                    }

                    if (
                      Number(getValues("age")) !== actualAge
                    ) {
                      return "Birth date must match the entered age";
                    }

                    return true;
                  },
                },
              ],

              ["gender", "Gender", "text",
                { required: "Please select a gender" },
                ["male", "female", "other"],
              ],

              ["email", "Email", "email",
                {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Enter a valid email address",
                  },
                },
              ],

              ["phone", "Phone", "tel", {
                required: "Phone is required",
              },],
              ["username", "Username", "", {
                required: "Username is required",
              },],
              ["password", "Password", "password", {
                required: "Password is required",
              },],
              ["image", "Profile Image URL"],
              ["bloodGroup", "Blood Group", "text", {
                required: "Blood Group is required",
              }, [
                  "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-",
                ]],

              ["height", "Height (cm)", "number",
                {
                  required: "Height is required",
                  min: {
                    value: 1,
                    message: "Height must be greater than 0",
                  },
                  validate: (value) =>
                    Number.isFinite(Number(value)) ||
                    "Enter a valid height",
                },
              ],

              ["weight", "Weight (kg)", "number",
                {
                  required: "Weight is required",
                  min: {
                    value: 1,
                    message: "Weight must be greater than 0",
                  },
                  validate: (value) =>
                    Number.isFinite(Number(value)) ||
                    "Enter a valid weight",
                },
              ],

              ["eyeColor", "Eye Color", "text", {}, [
                "Brown", "Blue", "Green", "Hazel", "Gray",
              ]],

              ["hair.color", "Hair Color", "text", {}, [
                "Black", "Brown", "Blond", "Red", "Gray", "White",
              ]],

              ["hair.type", "Hair Type", "text", {}, [
                "Straight", "Wavy", "Curly", "Coily",
              ]],
            ])}

            {renderSection("Address Details", [
              ["address.address", "Street Address"],
              ["address.city", "City"],
              ["address.state", "State"],
              ["address.stateCode", "State Code"],
              ["address.postalCode", "Postal Code"],
              ["address.country", "Country"],
              ["address.coordinates.lat", "Latitude", "number"],
              ["address.coordinates.lng", "Longitude", "number"],
            ])}

            {renderSection("Company Details", [
              ["company.department", "Department"],
              ["company.name", "Company Name"],
              ["company.title", "Job Title"],
              ["company.address.address", "Company Street Address"],
              ["company.address.city", "Company City"],
              ["company.address.state", "Company State"],
              ["company.address.stateCode", "Company State Code"],
              ["company.address.postalCode", "Company Postal Code"],
              ["company.address.country", "Company Country"],
              [
                "company.address.coordinates.lat",
                "Company Latitude",
                "number",
              ],
              [
                "company.address.coordinates.lng",
                "Company Longitude",
                "number",
              ],
            ])}

            {renderSection("Bank Details", [
              ["bank.cardExpire", "Card Expiry"],
              ["bank.cardNumber", "Card Number"],
              ["bank.cardType", "Card Type"],
              ["bank.currency", "Currency"],
              ["bank.iban", "IBAN"],
            ])}

            {renderSection("Other Details", [
              ["university", "University"],
              ["ip", "IP Address"],
              ["macAddress", "MAC Address"],
              ["ein", "EIN"],
              ["ssn", "SSN"],
              ["userAgent", "User Agent"],
              ["crypto.coin", "Crypto Coin"],
              ["crypto.wallet", "Crypto Wallet"],
              ["crypto.network", "Crypto Network"],
              ["role", "Role", "text", {}, [
                "admin", "moderator", "user",
              ]],
            ])}
          </div>
        </ModalBody>

        <ModalFooter className="bg-gray-500 text-white font-bold shrink-0">
        <div className="flex   justify-end gap-3 w-full">
          <Button
            type="button"
            onClick={handleClose}
            className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
          >
            Cancel
          </Button>

          <Button
            type="submit"
            className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
            
          >
            {isLoading
              ? "Saving..."
              : isEdit
                ? "Save Changes"
                : "Add Employee"}
          </Button>
        </div>
      </ModalFooter>

      </form>
      
    </Modal>
  );
};

export default EmployeeModal;