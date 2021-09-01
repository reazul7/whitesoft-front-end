import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { countryContext } from "../App";

const Country = (props) => {
  const { countries, setCountries } = useContext(countryContext);
  // console.log(countries);

  // react hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  const onSubmit = (data,e) => {
    console.log("from front-end", data);
    fetch("http://localhost:5050/formData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.success) {
                alert('user succefully')
                e.target.reset()
            }
        });
    console.log(data)
};

  return (
    <div className="py-5 my-5">
      <div className="text-lg text-center py-4 font-bold text-blue-600">
        <p className="text-2xl">Oscar Fuquen</p>
        <p>"Full Stack Engineer" <span className="text-black">position - Remote Job</span></p>
      </div>
      <div className="flex justify-center w-full ">
        <form
         onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
         
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 text-lg"
              for="username"
            >
              Full Name
            </label>
            <input
              {...register("fullName", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Write Your Name"
            />
            {errors.fullName && (
              <span className="text-red-500">Full-Name is required</span>
            )}
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2 text-lg"
              for="country"
            >
              Select your Country
            </label>
            <select
              {...register("country", { required: true })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              {countries.map((item, index) => (
                <option value={item.name} key={index}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Country;
