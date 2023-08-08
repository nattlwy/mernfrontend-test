import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';
import Navbar from './navbar';
import url from '../Constants';

export default function EditTask() {

  const { id } = useParams();

  const [activity, setOnChangeActivity] = useState([]);
  useEffect(() => {
    axios
      .get(url()['url'] + `/activity/${id}`)
      .then((response) => {
        setOnChangeActivity(response.data.activity);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();
    const activityvar = { activity: activity };
    console.log(activityvar);

    console.log(url()['url'] + `/activity/update/${id}`);
    // console.log(e)

    axios
      .post(url()['url'] + `/activity/update/${id}`, activityvar)
      .then((res) => {
        window.location = '/';
      });
  };

  return (
    <div>
      <Navbar />
      <h3>Edit Task</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Task: </label>
          <input
            type="text"
            required
            className="form-control"
            name="testactivity"
            value={activity}
            onChange={(e) => setOnChangeActivity(e.target.value)}
          />
        </div>
        <br></br>

        <div className="form-group">
          <input
            type="submit"
            value="Update Activity Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
