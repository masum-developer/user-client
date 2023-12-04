import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const Registration = () => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data) => {
    console.log(data);
    if (data.password !== confirmPassword) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Password does not match",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    const saveUser = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(saveUser),
    })
      .then((res) => res.json())
      .then((data) => {
        reset();
        console.log(data);
        navigate("/login");
      });
  };
  return (
    <div className="w-1/2 mx-auto">
      <div className="my-5">
        <h2 className="text-3xl text-center">Registration</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex">
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                {...register("name")}
                className="input input-bordered w-full "
              />
            </div>
            <div className="form-control w-full ml-4">
              <label className="label">
                <span className="label-text">Email*</span>
              </label>
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
                className="input input-bordered w-full "
              />
              {errors.email && (
                <span className="text-red-700">email field is required</span>
              )}
            </div>
          </div>
          <div className="flex">
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text">Password*</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /(?=.*?[A-Z])(?=.*?[#?!@$%^&*-])/,
                })}
                className="input input-bordered w-full"
              />
              {errors.password?.type === "required" && (
                <span className="text-red-700">password field is required</span>
              )}
              {errors.password?.type === "minLength" && (
                <span className="text-red-700">
                  password must be 6 characters
                </span>
              )}
              {errors.password?.type === "pattern" && (
                <span className="text-red-700">
                  password must have one uppercase and one special character
                </span>
              )}
            </div>
            <div className="form-control w-full ml-4">
              <label className="label">
                <span className="label-text">Confirm Password*</span>
              </label>
              <input
                type="password"
                placeholder="confirm Password"
                className="input input-bordered w-full"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="text-center">
            <input
              type="submit"
              className="btn btn-block hover:bg-slate-800 bg-black text-white  my-4 "
              value="Add"
            />
          </div>
        </form>
        <p>
          Already have an account{" "}
          <Link to="/login" className="text-red-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registration;
