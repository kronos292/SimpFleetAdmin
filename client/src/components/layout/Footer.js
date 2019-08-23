import React from "react";

export default function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-6 col-lg-3">
            <h4 className="text-light">Company</h4>
            <a
              className="text-light"
              href="https://www.shipsuppliesdirect.com/"
              target="_blank"
            >
              About Ship Supplies Direct
            </a>
            <br />
            <a
              className="text-light"
              href="https://medium.com/@shipsuppliesdirect"
              target="_blank"
            >
              Blog
            </a>
            <br />
            <a className="text-light" href="/">
              Press
            </a>
          </div>
          <div className="col-6 col-lg-3">
            <h4 className="text-light">SimpFleet</h4>
            <a className="text-light" href="/" target="_blank">
              FAQ
            </a>
            <br />
            <a className="text-light" href="/" target="_blank">
              Career
            </a>
          </div>
        </div>
        <br />
        <br />
        <div className="dropdown-divider" />
        <div className="row">
          <div className="col-12 col-lg-6">
            <h6 className="text-light">&copy;2019 Ship Supplies Direct</h6>
          </div>
          <div className="col-12 col-lg-6 text-right">
            <a
              className="text-light"
              href="https://api.whatsapp.com/send?phone=6587480467"
              target="_blank"
            >
              <i className="fab fa-whatsapp fa-2x" />
            </a>
            <a
              className="text-light"
              href="https://www.facebook.com/shipsuppliesdirect"
              target="_blank"
            >
              <i className="fab fa-facebook fa-2x" />
            </a>
            <a
              className="text-light"
              href="https://www.instagram.com/shipsuppliesdirect/s"
              target="_blank"
            >
              <i className="fab fa-instagram fa-2x" />
            </a>
            <a
              className="text-light"
              href="https://www.linkedin.com/company/ship-supplies-direct/"
              target="_blank"
            >
              <i className="fab fa-linkedin fa-2x" />
            </a>
            <a
              className="text-light"
              href="https://telegram.me/ShipSuppliesDirect"
              target="_blank"
            >
              <i className="fab fa-telegram fa-2x" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
