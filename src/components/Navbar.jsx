
import { useState } from "react";
import { Button, Dropdown, DropdownItem } from "./tailwreck/tailwreck.es";
import { FaMoon, FaSun, FaUserCircle, FaChevronDown} from "react-icons/fa";
import { useTheme } from "../Context/ThemeContext";
import { useNavigate } from "react-router-dom";
import { User,ChevronDown, Settings, LogOut } from "lucide-react";

const Navbar = ({ setData }) => {
  console.log("navbar")
  const { theme, toggleTheme } = useTheme();
  const dark = theme === "dark";

  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const loggedInUser = JSON.parse(
    sessionStorage.getItem("loggedInUser") || "null"
  );

  const fullName = loggedInUser
    ? `${loggedInUser.firstName || ""} ${loggedInUser.lastName || ""}`.trim()
    : "User";

  const id = loggedInUser?.id || "Employee";

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("loggedInUser");
    //  setData((prev) => !prev);
    //  navigate("/" ,{replace:true})

    setTimeout(() => {

      setData((pre) => !pre);
    }, 1000);
  };

  const profileOpen = () =>{
    navigate(`/employees/${id}`)
  }
  

const renderDropdown = () => (
<div className="relative z-[110]  flex justify-center gap-4">    <Dropdown
      content={
        <div className="flex items-center gap-2">
          <User className="w-4 h-4" />
          <span>{fullName}</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      }
      variant="custom"
      className="relative z-[9999] bg-navbar border border-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 px-3 py-2 rounded-md shadow-sm"
    >
      <DropdownItem>Account</DropdownItem>

      <DropdownItem onClick={()=> navigate(`/employees/${id}`)}>
        <div className="flex items-center gap-2">
          <User className="w-4 h-4" />
          <span>Profile</span>
        </div>
      </DropdownItem>

      {/* <DropdownItem>
        <div className="flex items-center gap-2">
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </div>
      </DropdownItem> */}

      {/* <DropdownDivider /> */}

      {/* <DropdownItem>
        <div
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-500"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </div>
      </DropdownItem> */}
      <DropdownItem onClick={() => {
    console.log("DropdownItem clicked");
    handleLogout();
  }}>
  <div className="flex items-center gap-2 text-red-500">
    <LogOut className="h-4 w-4" />
    <span>Sign Out</span>
  </div>
</DropdownItem>
    </Dropdown>
  </div>
);

  return (
<nav className="sticky top-0 z-[100] flex h-[75px] items-center justify-end gap-4 border-b border-border bg-navbar p-3">
      {/* Theme Toggle */}
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        className="rounded-full p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        {dark ? (
          <FaSun size={24} className="text-yellow-400" />
        ) : (
          <FaMoon size={24} className="text-gray-700 dark:text-white" />
        )}
      </button>
      {renderDropdown()}

      {/* Profile Dropdown */}
      {/* <div className="relative">

        <button
          type="button"
          onClick={() => setIsProfileOpen((prev) => !prev)}
          aria-expanded={isProfileOpen}
          className="flex items-center gap-2 rounded-lg p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          <FaUserCircle
            size={30}
            className="text-gray-600 dark:text-gray-200"
          />
          <div className="min-w-0">
            <h3 className="truncate font-semibold text-foreground">
              {fullName}
            </h3>

            <p className="truncate text-sm text-gray-500">
              {jobTitle}
            </p>
          </div>

          <FaChevronDown
            size={12}
            className={`transition-transform ${isProfileOpen ? "rotate-180" : ""
              }`}
          />
        </button>

        {isProfileOpen && (
          <div className="absolute right-0 top-full mt-3 w-64 rounded-xl border border-border bg-card p-4 shadow-lg"> */}

            {/* User Information */}
            {/* <div className="mb-4 flex items-center gap-3 border-b border-border pb-4">
              <FaUserCircle
                size={42}
                className="shrink-0 text-gray-500"
              />

              <div className="min-w-0">
                <h3 className="truncate font-semibold text-foreground">
                  {fullName}
                </h3>

                <p className="truncate text-sm text-gray-500">
                  {jobTitle}
                </p>
              </div>
            </div> */}

            {/* Logout */}
            {/* <Button
              className="w-full rounded-lg bg-red-500 font-medium text-white hover:bg-red-600"
              onClick={handleLogout}
            >
              Logout
            </Button>

          </div>
        )} */}
      {/* </div> */}
    </nav>
  );
};

export default Navbar;
