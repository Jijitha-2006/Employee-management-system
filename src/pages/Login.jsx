
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetUserByNameQuery } from "../services/Api";
import { useForm } from "react-hook-form";
import { Button, FeaturedInput, FeaturedPasswordInput } from "../components/tailwreck/tailwreck.es";

function Login() {
  console.log("login ")
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { data, isLoading, isError } = useGetUserByNameQuery();

  const handleLogin = (username, password) => {
    setError("");

    // Get newly added employees from sessionStorage.
    const addedUsers = JSON.parse(
      sessionStorage.getItem("addedUsers") || "[]"
    );

    // Check whether the user exists in addedUsers.
    const addedUser = addedUsers.find(
      (item) =>
        item.username === username.trim() &&
        item.password === password
    );

    // If the user is found, log them in.
    if (addedUser) {
      sessionStorage.setItem("isLoggedIn", "true");

      sessionStorage.setItem(
        "loggedInUser",
        JSON.stringify(addedUser)
      );

      navigate("/employees", { replace: true });
      return;
    }

    // Check DummyJSON users.
    if (isLoading) {
      setError("Please wait. Users are still loading.");
      return;
    }

    if (isError || !data?.users) {
      setError("Unable to load users. Please try again.");
      return;
    }

    const user = data.users.find(
      (item) =>
        item.username === username.trim() &&
        item.password === password
    );

    if (!user) {
      setError("Username or password is incorrect.");
      return;
    }

    sessionStorage.setItem("isLoggedIn", "true");

    sessionStorage.setItem(
      "loggedInUser",
      JSON.stringify(user)
    );

    navigate("/employees", { replace: true });
  };

  const onSubmit = (formData) => {
    handleLogin(formData.username, formData.password);
  };

  return (
  <div className="flex min-h-screen items-center justify-center bg-background p-4 transition-colors duration-300">

    <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 shadow-lg transition-colors duration-300">

      <h1 className="mb-6 text-center text-2xl font-bold text-foreground">
        Login
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

        <div className="flex flex-col gap-5">

          <FeaturedInput
            name="username"
            label="Username"
            type="text"
            register={register}
            shrink={true}
            autofill = "off"
             className = "bg-slate-100 dark:bg-slate-900"
             floatinglabelClass="bg-slate-100 dark:bg-slate-900  borer  !border-border !text-foreground"
            validation={{
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
            }}
            error={errors.username}
          />

          <FeaturedPasswordInput
            label="Password"
            name="password"
            size="md"
            theme="primary"
            register={register}
            shrink={true}
             className = "bg-slate-100 dark:bg-slate-900"
            floatinglabelClass="bg-slate-100 dark:bg-slate-900  borer  !border-border !text-foreground"

            validation={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Minimum 8 characters",
              },
            }}
            error={errors.password}
            showIcon
          />

          {error && (
            <p className="mt-3 text-sm font-medium text-red-600" role="alert">
              {error}
            </p>
          )}

        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="
            w-full rounded-md
            bg-edit text-edit-text
            hover:bg-edit-hover
            px-4 py-3 font-semibold
            transition-colors duration-200
            disabled:cursor-not-allowed
            disabled:opacity-50
          "
        >
          {isLoading ? "Loading..." : "Login"}
        </Button>

      </form>
    </div>
  </div>
);
}

export default Login;
