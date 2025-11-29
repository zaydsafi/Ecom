import React, { useState } from "react";
import Layout from "./common/Layout";
import { Link } from "react-router-dom";
import ProductImg from "../assets/images/Mens/eleven.jpg";

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const handleSubmitMethod = (e) => {
    setPaymentMethod(e.target.value);
  };
  return (
    <>
      <Layout>
        <div className="container pb-5">
          <div className="row">
            <div className="col-md-12">
              <nav aria-label="breadcrumb" className="py-4">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item active">
                    <Link to="/checkout">Checkout</Link>
                  </li>
                </ol>
              </nav>
            </div>

            <div className="row">
              <div className="col-md-7">
                <h3 className="border-bottom pb-3">Billing Details</h3>
                <form action="">
                  <div className="row pt-3">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <input
                          type="text"
                          name=""
                          id=""
                          className="form-control"
                          placeholder="Name"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <input
                          type="text"
                          name=""
                          id=""
                          className="form-control"
                          placeholder="Email"
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <textarea
                        className="form-control"
                        rows={3}
                        placeholder="Address"
                      ></textarea>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <input
                          type="text"
                          name=""
                          id=""
                          className="form-control"
                          placeholder="City"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <input
                          type="text"
                          name=""
                          id=""
                          className="form-control"
                          placeholder="State"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <input
                          type="text"
                          name=""
                          id=""
                          className="form-control"
                          placeholder="Zip"
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <input
                          type="text"
                          name=""
                          id=""
                          className="form-control"
                          placeholder="Mobile"
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-md-5">
                <h3 className="border-bottom pb-3">Items</h3>
                <table className="table mt-4">
                  <tbody>
                    <tr>
                      <td width={100}>
                        <img src={ProductImg} width={80} alt="" />
                      </td>
                      <td width={600}>
                        <h4>Product Title</h4>
                        <div className="d-flex align-items-center pt-3">
                          <span className="mb-1 ms-3">$200</span>
                          <div className="ps-4">
                            <button className="btn btn-size">S</button>
                          </div>
                          <div className="ps-5">X 1</div>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td width={100}>
                        <img src={ProductImg} width={80} alt="" />
                      </td>
                      <td width={600}>
                        <h4>Product Title</h4>
                        <div className="d-flex align-items-center pt-3">
                          <span className="mb-1 ms-3">$200</span>
                          <div className="ps-3">
                            <button className="btn btn-size">S</button>
                          </div>
                          <div className="ps-5">X 1</div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className="row">
                  <div className="col-md-12">
                    <div className="d-flex justify-content-between border-bottom pb-2">
                      <div>Sub Total</div>
                      <div>$5</div>
                    </div>

                    <div className="d-flex justify-content-between border-bottom py-2">
                      <div>Shipping</div>
                      <div>$5</div>
                    </div>

                    <div className="d-flex justify-content-between border-bottom py-2">
                      <div>
                        <strong>Grand Total</strong>
                      </div>
                      <div>$5</div>
                    </div>
                  </div>
                </div>
                <h3 className="border-bottom pt-4 pb-3">Payment Methods</h3>
                <div className="pt-2">
                  <input
                    type="radio"
                    onClick={handleSubmitMethod}
                    checked={paymentMethod == "strip"}
                    value={"strip"} 
                    name="strip" 
                    id="strip"
                  />
                  <label htmlFor="strip" className="form-label ps-2">
                    Strip
                  </label>

                  <input
                    type="radio"
                    onClick={handleSubmitMethod}
                    checked={paymentMethod == "cod"}
                    value={"cod"} 
                    name="cod" 
                    id="cod"
                    className="ms-3"
                  />
                  <label htmlFor="cod" className="form-label ps-2">
                    COD
                  </label>
                </div>

                <div className="d-flex justify-content-start py-3">
                  <button className="btn btn-primary">Pay Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Checkout;
