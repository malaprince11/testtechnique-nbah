import React, { useState, useEffect } from "react";
import axios from "axios";

import { forwardRef, createRef } from "react";
import Grid from "@material-ui/core/Grid";

import MaterialTable from "material-table";

// import axios from 'axios'
import Alert from "@material-ui/lab/Alert";

import "./Scores.css";

import {
  UpdateScore,
  getScore,
  deleteScore,
  addScore,
} from "../../service/authService";



const Scores = () => {
  var columns = [
    { title: "id", field: "id", hidden: true },
    { title: "Username", field: "username" },
    { title: "Score", field: "score" },
    { title: "Date", field: "date" },
  ];
  const [data, setData] = useState([]); //table data

  //for error handling
  const [iserror, setIserror] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [score, setScore] = useState("");
  const [date, setDate] = useState("");
  useState;


  useEffect(() => {

  }, []);

  // const handleUpdate = (newData, oldData, resolve) => {
  //   //validation
  //   let errorList = []
  //   if(newData.UserName=== ""){
  //     errorList.push(" enter un UserName valide")
  //   }
  //   if(newData.score === ""){
  //     errorList.push("entrez un score valide")
  //   }

  //   if(errorList.length < 1){
  //     api.patch("/users/"+newData.id, newData)
  //     .then(res => {
  //       const dataUpdate = [...data];
  //       const index = oldData.tableData.id;
  //       dataUpdate[index] = newData;
  //       setData([...dataUpdate]);
  //       resolve()
  //       setIserror(false)
  //       setErrorMessages([])
  //     })
  //     .catch(error => {
  //       setErrorMessages(["Update failed! Server error"])
  //       setIserror(true)
  //       resolve()

  //     })
  //   }else{
  //     setErrorMessages(errorList)
  //     setIserror(true)
  //     resolve()

  //   }

  // }

  // const handleAdd = (newData, resolve) => {
  //   //validation
  //   let errorList = []
  //   if(newData.UserName === undefined){
  //     errorList.push("Please enter first name")
  //   }
  //   if(newData.score === undefined){
  //     errorList.push("entrer un score valide ")
  //   }

  //   if(errorList.length < 1){ //no error
  //     // api.post("/users", newData)
  //     .then(res => {
  //       let dataToAdd = [...data];
  //       dataToAdd.push(newData);
  //       setData(dataToAdd);
  //       resolve()
  //       setErrorMessages([])
  //       setIserror(false)
  //     })
  //     .catch(error => {
  //       setErrorMessages(["Cannot add data. Server error!"])
  //       setIserror(true)
  //       resolve()
  //     })
  //   }else{
  //     setErrorMessages(errorList)
  //     setIserror(true)
  //     resolve()
  //   }

  // }

  // const handleDelete = (oldData, resolve) => {

  //   // api.delete("/scores/"+oldData.id)
  //     .then(res => {
  //       const dataDelete = [...data];
  //       const index = oldData.tableData.id;
  //       dataDelete.splice(index, 1);
  //       setData([...dataDelete]);
  //       resolve()
  //     })
  //     .catch(error => {
  //       setErrorMessages(["Delete failed! Server error"])
  //       setIserror(true)
  //       resolve()
  //     })
  // }

  return (
    <div className="Scores">
      <div className="App">
        <form
          onSubmit={(e) => {
            addScore(score);
            e.preventDefault();
          }}
        >
          <div className="control">
            <label htmlFor="score" className="label">
              Score
              <input
                type="number"
                id="score"
                onChange={(e) => setScore(e.target.value)}
              ></input>
            </label>
            <button type="submit">{`Ajouter un score`}</button>
          </div>
        </form>

        <Grid container spacing={1}>
          <Grid item xs={3}></Grid>
          <Grid item xs={6}>
            <div>
              {iserror && (
                <Alert severity="error">
                  {errorMessages.map((msg, i) => {
                    return <div key={i}>{msg}</div>;
                  })}
                </Alert>
              )}
            </div>
            <MaterialTable
              title="User score"
              columns={columns}
              data={data}
              // icons={tableIcons}

              // editable={{
              //   onRowUpdate: (newData, oldData) =>
              //     new Promise((resolve) => {
              //         handleRowUpdate(newData, oldData, resolve);

              //     }),
              //   onRowAdd: (newData) =>
              //     new Promise((resolve) => {
              //       handleRowAdd(newData, resolve)
              //     }),
              //   onRowDelete: (oldData) =>
              //     new Promise((resolve) => {
              //       handleRowDelete(oldData, resolve)
              //     }),
              // }}
            />
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </div>

      {/* <div className="table">
        <div className="control">
          <label htmlFor="score">
            Score
            <input type="number" id="score"></input>
          </label>
          <button>{`Ajouter un score`}</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>username</th>
              <th>score</th>
              <th>date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Karim</td>
              <td>2</td>
              <td>{new Date().toDateString()}</td>
            </tr>
          </tbody>
        </table>
      </div> */}

      <div className="stats">
        <label htmlFor="score" className="label">
          Meilleur score
          <input
            type="date"
            id="date"
            onChange={(e) => setDate(e.target.value)}
          ></input>
        </label>
        <button>{`Ajouter une date`}</button>
      </div>
    </div>
  );
};
export default Scores;
