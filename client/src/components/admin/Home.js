import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <div class="container-fluid admin">
        <div class="row">
          <div class="col-2 bg-light">
            <div class="container sidebar">
              <button
                type="button"
                class="btn btn-secondary btn-block createjob"
              >
                + CREATE JOB
              </button>
              <div class="container">
                <a href="">Home</a>
                <br />
                <br />
                <a href="">Dashboard</a>
                <br />
                <br />
                <a href="">History</a>
              </div>
            </div>
          </div>
          <div class="col-10">
            <div class="container">
              <br />
              <h3 class=" text-success">Upcoming Jobs</h3>
              <br />
              <div class="input-group mb-3">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                />
                <div class="input-group-append">
                  <button
                    class="btn btn-secondary"
                    type="button"
                    id="button-addon2"
                  >
                    Search
                  </button>
                </div>
              </div>
              <br />
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">First</th>
                    <th scope="col">Last</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </table>
              <br />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
