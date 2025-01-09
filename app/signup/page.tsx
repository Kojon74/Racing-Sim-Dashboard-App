"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Page = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ username: "", password: "" });

  const handleSignup = async () => {
    const validInputs = checkInputs();
    console.log(validInputs);

    if (!validInputs) return;
    // Check if username exists already
    const resp = await fetch(`http://localhost:3000/api/users/${username}/`, {
      method: "GET",
      cache: "no-store",
    });
    const { user } = await resp.json();
    console.log(user);
    if (user) {
      setErrors((prev) => ({ ...prev, username: "Username exists" }));
      return;
    }
    fetch(`http://localhost:3000/api/users/`, {
      method: "POST",
      cache: "no-store",
      body: JSON.stringify({ username }),
    });
    router.push("/");
  };

  const checkInputs = () => {
    let tempErrors = { username: "", password: "" };
    if (!username) tempErrors.username = "Field is required";
    if (!password) tempErrors.password = "Field is required";
    setErrors(tempErrors);
    return tempErrors.username || tempErrors.password ? false : true;
  };

  return (
    <section>
      <div className="flex flex-col gap-4 w-4/5 max-w-96 mx-auto">
        <h2 className="my-10">Sign up</h2>
        <div>
          <input
            className={`input w-full ${
              errors.username && "input-bordered input-error"
            }`}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && (
            <div className="label">
              <span className="label-text-alt text-error">
                {errors.username}
              </span>
            </div>
          )}
        </div>
        <div>
          <input
            className={`input w-full ${
              errors.password && "input-bordered input-error"
            }`}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <div className="label">
              <span className="label-text-alt text-error">
                {errors.password}
              </span>
            </div>
          )}
        </div>
        <button className="btn mt-5" onClick={handleSignup}>
          Sign up
        </button>
      </div>
    </section>
  );
};

export default Page;
