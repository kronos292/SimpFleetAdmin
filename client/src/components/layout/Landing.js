import React, { Component } from "react";
import assets1 from "../../img/assest1.png";
import assets2 from "../../img/assest2.png";
import assets3 from "../../img/assest3.png";

class Landing extends Component {
  render() {
    return (
      <div>
        {/* line 1 */}
        <div className="container-fluid landing">
          <div className="row">
            <div className="col-12 col-lg-6 align-self-end">
              <h1 className="text-light font-weight-bold">SimpFleet</h1>
              <h3 className="text-light font-italic">
                A platform where digital technology <br />
                meets marine logistics.
              </h3>
            </div>
            {/* sign up form */}
            <div className="col-12 col-lg-6">
              <div className="container login">
                <h3 className="text-center text-success">
                  Signup with SimpFleet
                </h3>
                <p className="text-center">Get Started with us by signing up</p>
                <form action="">
                  <div className="row">
                    <div className="col-12 col-lg-6">
                      <div className="form-group">
                        <small>First Name*</small>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="First Name*"
                        />
                      </div>
                    </div>
                    <div className="col-12 col-lg-6">
                      <div className="form-group">
                        <small>Last Name*</small>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Last Name*"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <small>Contact Number*</small>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Contact Number*"
                    />
                  </div>
                  <div className="form-group">
                    <small>Email Address*</small>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Email Address*"
                    />
                  </div>
                  <div className="form-group">
                    <small>Company Name*</small>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Company Name*"
                    />
                  </div>
                  <div className="form-group">
                    <small>Password</small>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                    />
                  </div>
                  <div className="form-group">
                    <small>Confirm Password*</small>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirm Password*"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success btn-block mb-3"
                  >
                    SIGN UP NOW
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* line 2 */}
        <div className="container mt-5 mb-5">
          <h3 className="text-center text-success">What is SimpFleet?</h3>
          <div className="row">
            <div className="col-12 col-lg-12 mt-5">
              <p className="p-why">
                SimpFleet is an information system (IS), comprised of a delivery
                management system (desktop interface) and an integrated mobile
                application for SSD delivery trucks. <br />
                We handle delivery up the vessel and reduce delivery cost by 30%
                and cutting number of trucks per delivery by 60%.
              </p>
            </div>
            <div className="col-12 col-lg-12 mt-5">
              <p className="p-why">
                <strong>To Agents,</strong>
                <br />
                We are sure that we can help you reduce up to 80% of the time
                spent coordinating with suppliers for delivery and make it easy
                for you to deal with multiple parties.
              </p>
            </div>
            <div className="col-12 col-lg-12 mt-5">
              <p className="p-why">
                <strong>To Suppliers and Chandlers,</strong>
                <br />
                We provide an affordable way to fulfill small order, arrange a
                hassle-free coordination, reduce delivery cost, reduce waiting
                time and present transparency of goods’ position.
              </p>
            </div>
          </div>
        </div>
        {/* line 3 */}
        <div className="container-fluid greybg pt-5 pb-5">
          <h3 className="text-center text-success">Why Sign up with Us?</h3>
          <div className="row mt-5">
            <div className="col-12 col-lg-4 text-center pl-5 pr-5">
              <img src={assets1} alt="assets1" />
              <h5 className="p-why">End to End Visibility</h5>
              <p className="p-why">
                Track your job from creation to completion, and retrieve
                documents easily
              </p>
            </div>
            <div className="col-12 col-lg-4 text-center pl-5 pr-5">
              <img src={assets2} alt="assets2" />
              <h5 className="p-why">Hassle-Free Coordination</h5>
              <p className="p-why">
                Communicate and coordinate with multiple stakeholders via our
                integrated platform
              </p>
            </div>
            <div className="col-12 col-lg-4 text-center pl-5 pr-5">
              <img src={assets3} alt="assets3" />
              <h5 className="p-why">Unlock Savings</h5>
              <p className="p-why">
                Pool your delivery with other suppliers, and convert your fixed
                costs to variable costs
              </p>
            </div>
          </div>
        </div>
        {/* line 4 */}
        <div className="container-fluid pt-5 pb-5" />
        {/* line 5 */}
        <div className="container-fluid greybg">
          <div className="row">
            <div className="col-12 col-lg-6 pl-5 pr-5 pt-5 pb-5">
              <h1 className="text-success">Features</h1>
              <ul>
                <li className="p-why">
                  <p>
                    Increased traceability with real-time tracking of goods
                    positions
                  </p>
                </li>
                <li className="p-why">
                  <p>Accurate vessel berthing timing</p>
                </li>
                <li className="p-why">
                  <p>
                    User-friendly interface for logistics providers to view and
                    update job details easily
                  </p>
                </li>
                <li className="p-why">
                  <p>
                    Logistics providers can have a oversight of last-mile
                    delivery process with greater data transparency and access
                  </p>
                </li>
              </ul>
            </div>
            <div className="col-12 col-lg-6">
              <div className="line5img" />
            </div>
          </div>
        </div>
        {/* line 6 */}
        <div className="container-fluid pt-5 pb-5">
          <h3 className="text-center text-success">Contact Us</h3>
          <div className="row mt-5">
            <div className="col-12 col-lg-6 contact">
              <p className="p-why">
                <strong>Contact:</strong>
                <br />
                <a href="tel:+65 8748 0467" className="p-why" target="_blank">
                  +65 8748 0467
                </a>
              </p>
              <p className="p-why mt-5">
                <strong>Email:</strong>
                <br />
                <a
                  href="service@simpfleet.com"
                  className="p-why"
                  target="_blank"
                >
                  service@simpfleet.com
                </a>
              </p>
              <p className="p-why mt-5">
                <strong>Location:</strong>
                <br />
                <a
                  href="https://www.google.com/maps/place/PSA+Pasir+Panjang+Terminal+Building+3/@1.2748411,103.7914553,15z/data=!4m2!3m1!1s0x0:0xbe14fc54d013435b"
                  className="p-why"
                  target="_blank"
                >
                  PSA Unboxed, Pasar Panjang Terminal Building 3
                </a>
              </p>
            </div>
            <div className="col-12 col-lg-6 contact">
              <form action="">
                <div className="form-group">
                  <small>Your Name</small>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Name"
                  />
                </div>
                <div className="form-group">
                  <small>Email Address</small>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email Address"
                  />
                </div>
                <div className="form-group">
                  <small>Contact Number</small>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Contact Number"
                  />
                </div>
                <div className="form-group">
                  <small>Message</small>
                  <textarea
                    className="form-control"
                    id="exampleTextarea"
                    rows="3"
                    placeholder="Message"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-success btn-block mb-3"
                >
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;
