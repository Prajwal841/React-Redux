import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../features/userDetailsSlice";
const Create = () => {
  const [users, setUsers] = useState({});
//here instead of creating usestate variable for each form data we just created a function insted getuser data and which will act as a key value pair in form of name and its respective value so for name we need to add name attribute in lable and for value we need to call it onchange
  const getUserData = (e) =>{
  setUsers({ ...users, [e.target.name]: e.target.value });
}

  const navigate = useNavigate();

  const dispatch = useDispatch();


  const handleSubmit = (e) => {
    //as this is form we need to add prevent default to handel refresh
    e.preventDefault();
    console.log("users...", users);
    //so overall we take the users data with help of getusersData and we dispatch the data with help of the dispatch function
    //NOTE : so basically the dispatch fuction is calling the createUser action/promise from create user slice which will then call the extrareducers which will handel the request according to promise response i.e pending,fullfilledor rejected
    dispatch(createUser(users));
    navigate("/read");
  };

  return (
    <div>
      <h2 className="my-2">Fill the data</h2>
      <form className="w-50 mx-auto my-5" onSubmit={handleSubmit}>
      {/* <form className="w-50 mx-auto my-5" > */}

        <div class="mb-3">
          <label class="form-label">Name</label>
          <input
            type="text"
            name="name"
            class="form-control"
            onChange={getUserData}
            required
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Email</label>
          <input
            type="email"
            name="email"
            class="form-control"
            onChange={getUserData}
            required
          />
        </div>
        <div class="mb-3">
          <label class="form-label">Age</label>
          <input
            type="text"
            name="age"
            class="form-control"
            onChange={getUserData}
            required
          />
        </div>
        <div class="mb-3">
          <input
            class="form-check-input"
            name="gender"
            value="Male"
            type="radio"
            onChange={getUserData}
            required
          />
          <label class="form-check-label">Male</label>
        </div>
        <div class="mb-3">
          <input
            class="form-check-input"
            name="gender"
            value="Female"
            type="radio"
            onChange={getUserData}
          />
          <label class="form-check-label">Female</label>
        </div>

        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Create;
