import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//create action
//post action or a promise using createAsyncThunk which will take 2 parameter name and async function note the rejectwithvalue is method provided by create async thunk to handel errors to the promise
//Promise:A promise is an object in JavaScript that represents the eventual completion (or failure) of an asynchronous operation. It acts as a placeholder for the result, which might not be available immediately because the operation is still ongoing. This asynchronous nature allows JavaScript to continue executing code without being blocked while waiting for the operation to finish.
export const createUser = createAsyncThunk(
    "createUser",
    async (data, { rejectWithValue }) => {
        //here we are using trycatch to handel the eroor for result we will return the response and for error the create async thunk gives method 
      try {
        const response = await axios.post(
          "https://65e35f1588c4088649f5b5c5.mockapi.io/crud",
          data
        );
        return response.data;//here we basically return the data from the response object
      } catch (error) {
        return rejectWithValue(error.response.data);//here we will return the error of the createasyncthunk using rejectWithValue method
      }
    }
  );
  
  export const showUser = createAsyncThunk(
    "showUser",
    async (_, { rejectWithValue }) => {// In JavaScript, the underscore _ is often used as a convention for a variable that won't be used or is a placeholder.
      try {
        const response = await axios.get(
          "https://65e35f1588c4088649f5b5c5.mockapi.io/crud"
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  //in the delete callback function we pass the id which is comming from the read.jsx
  export const deleteUser = createAsyncThunk(
    "deleteUser",
    async (id, { rejectWithValue }) => {
      try {
        const response = await axios.delete(
          `https://65e35f1588c4088649f5b5c5.mockapi.io/crud/${id}`
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const updateUser = createAsyncThunk(
    "updateUser",
    async (data, { rejectWithValue }) => {
      try {
        const response = await axios.put(
          `https://65e35f1588c4088649f5b5c5.mockapi.io/crud/${data.id}`,
          data
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

export const userDetail = createSlice({
    name: "userDetail",
    initialState: {
      users: [],
      loading: false,
      error: null,
      searchData: [],//here we are storing the searched data in the store and inside read we will get the data from the store and apply filter
    },
  //here in case of search we are wrting action directly inside the reducer so no need of extra reducer also we are not calling any api so the promise handaling part too is not required
    reducers: {
      searchUser: (state, action) => {
        console.log(action.payload);
        state.searchData = action.payload;
      },
    },
  //extra reducer is the reducer whose action or promice is define outside the reducer extrareducer returns 3 promises pending ,fullfilled,rejected
  //this is extrareducer to add users note for other action to the states will be added inside the extra reducer
  //createSlice provides a builder object that allows you to define reducers and extra reducers. The builder is essentially a helper object that helps you structure and organize your reducer logic.
  //The builder object provides methods like addCase for adding reducer logic in a more concise and readable way.
  //builder.addCase(action, reducerCallback) builder takes 2 parameter action and callback function

    extraReducers: (builder) => {
      builder
        .addCase(createUser.pending, (state) => {
          state.loading = true;
        })
        .addCase(createUser.fulfilled, (state, action) => {
          state.loading = false;
         // state.users=action.payload; this will add new data in mock api this is not right way the exting data will be removed
         state.users.push(action.payload); //instead we will push in the payload
        })
        .addCase(createUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        })
        //cases to show users 
        .addCase(showUser.pending, (state) => {
          state.loading = true;
        })
        .addCase(showUser.fulfilled, (state, action) => {
          state.loading = false;
          state.users = action.payload;//here we are simply putting the all the data from action.payload to global state users which will be displayed using map in jsx file
        })
        .addCase(showUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

        //cases for delete user
        .addCase(deleteUser.pending, (state) => {
          state.loading = true;
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
          state.loading = false;
          //for delete operation we need to take out id from payload
          const { id } = action.payload;
          if (id) {
            state.users = state.users.filter((ele) => ele.id !== id);//here we check all the data in the store accept that record from that id should be put back inside store i.e accept that record put all record back which is nothing but deleeting that record
          }
        })
        .addCase(deleteUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })
        .addCase(updateUser.pending, (state) => {
          state.loading = true;
        })
        .addCase(updateUser.fulfilled, (state, action) => {
          state.loading = false;
          state.users = state.users.map((ele) =>
            ele.id === action.payload.id ? action.payload : ele //here elemt id is equal to payload data id then keep it or keep the previous data
          );
        })
        .addCase(updateUser.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload.message;
        });
    },
  });
  
  export default userDetail.reducer;
  
  export const { searchUser } = userDetail.actions;