import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <div className="container-fluid admin">
        <div className="row">
          <div className="col col-lg-3 bg-light collapse" id="sidebar">
            <div className="container sidebar">
              <button
                type="button"
                className="btn btn-success btn-block createjob"
                data-toggle="modal"
                data-target="#createjob"
              >
                + CREATE JOB
              </button>
              <div className="container">
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
          <div className="col-12 col-lg">
            <div className="container">
              <br />
              <div className="row">
                <button
                  data-toggle="collapse"
                  data-target="#sidebar"
                  className="btn btn-outline-success mr-3"
                >
                  <i className="fas fa-bars"></i>
                </button>
                <h3 className=" text-success">Upcoming Jobs</h3>
              </div>
              <br />
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  aria-label="Recipient's username"
                  aria-describedby="button-addon2"
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-success"
                    type="button"
                    id="button-addon2"
                  >
                    Search
                  </button>
                </div>
              </div>
              <br />
              <table className="table table-hover table-responsive-lg p-why">
                <thead>
                  <tr>
                    <th scope="col">Vessel Loading Time</th>
                    <th scope="col">Job Number</th>
                    <th scope="col">Vessel Name</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>07 July 2019, 13:00</td>
                    <td>SSDE-163</td>
                    <td>
                      <p className="closer">CMA CGM T ROOSEVELT</p>
                      <small className="font-italic">9780873</small>
                    </td>
                    <td>
                      <div className="row">
                        <div className="col-12 col-lg-6">
                          <p className="closer">Job booking Comfirmed</p>
                          <small className="font-italic">
                            Aug 24 2019, 11:00
                          </small>
                        </div>
                        <div className="col-12 col-lg-6">
                          <button className="btn btn-outline-success">
                            Share <i className="fa fa-share-alt"></i>
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>07 July 2019, 13:00</td>
                    <td>SSDE-163</td>
                    <td>
                      <p className="closer">CMA CGM T ROOSEVELT</p>
                      <small className="font-italic">9780873</small>
                    </td>
                    <td>
                      <div className="row">
                        <div className="col-12 col-lg-6">
                          <p className="closer">Job booking Comfirmed</p>
                          <small className="font-italic">
                            Aug 24 2019, 11:00
                          </small>
                        </div>
                        <div className="col-12 col-lg-6">
                          <button className="btn btn-outline-success">
                            Share <i className="fa fa-share-alt"></i>
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>07 July 2019, 13:00</td>
                    <td>SSDE-163</td>
                    <td>
                      <p className="closer">CMA CGM T ROOSEVELT</p>
                      <small className="font-italic">9780873</small>
                    </td>
                    <td>
                      <div className="row">
                        <div className="col-12 col-lg-6">
                          <p className="closer">Job booking Comfirmed</p>
                          <small className="font-italic">
                            Aug 24 2019, 11:00
                          </small>
                        </div>
                        <div className="col-12 col-lg-6">
                          <button className="btn btn-outline-success">
                            Share <i className="fa fa-share-alt"></i>
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <br />
            </div>
          </div>
        </div>
        {/* createjob modal */}
        <div
          className="modal fade"
          id="createjob"
          role="dialog"
          aria-labelledby="exampleModalScrollableTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-scrollable" role="document">
            <div className="modal-content">
              <div className="modal-header bg-success text-light">
                <h5 className="modal-title" id="exampleModalScrollableTitle">
                  Job Booking
                </h5>
                <button
                  type="button"
                  className="close text-light"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <form action="">
                  <div className="container p-5">
                    <div className="row">
                      <div className="avatar d-flex align-items-center justify-content-center bg-success">
                        <h5 className="text-light mt-1">1</h5>
                      </div>
                      <h5 className="p-why ml-2 mt-2">Vessel Information</h5>
                    </div>
                    <br />
                    <small>Job Number</small>
                    <input
                      className="form-control"
                      placeholder="Enter Job Number"
                    ></input>
                    <small className="text-danger">
                      * If left blank, Job Number will be auto-generated.
                    </small>
                    <br />
                    <br />
                    <small>Vessel Loading Location</small>
                    <input className="form-control" placeholder="PSA"></input>
                    <small className="text-danger">
                      * Please note that delivery time will be based on the
                      closest upcoming vessel berth.
                    </small>
                    <br />
                    <br />
                    <small>Vessel Name</small>
                    <input
                      className="form-control"
                      placeholder="Enter Vessel Name"
                    ></input>
                  </div>
                  <div className="dropdown-divider"></div>
                  <div className="container p-5">
                    <div className="row">
                      <div className="avatar d-flex align-items-center justify-content-center bg-success">
                        <h5 className="text-light mt-1">2</h5>
                      </div>
                      <h5 className="p-why ml-2 mt-2">Delivery Details</h5>
                    </div>
                    <br />
                    <small>Items to Deliver</small>
                    <input className="form-control" placeholder=""></input>
                    <small className="font-italic">
                      Let us know if you have refrigeration,fragile,etc items in
                      the remarks
                    </small>
                    <br />
                    <br />
                    <small>Items to Offland (Optional)</small>
                    <input className="form-control" placeholder=""></input>
                    <br />
                    <small>Remarks (Optional)</small>
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="5"
                    ></textarea>
                  </div>
                  <div className="row container pl-5 pr-5 ml-auto">
                    <button type="submit" class="btn btn-success col col-lg">
                      Submit
                    </button>
                    <button
                      type="submit"
                      class="btn btn-outline-success col col-lg ml-2"
                    >
                      cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Home;
