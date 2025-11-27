import React from "react";
import Layout from "./common/Layout";
import Men1 from "../assets/images/Mens/eight.jpg";
import { Link } from "react-router-dom";

const Shop = () => {
  return (
    <>
      <Layout>
        <div className="container">
          <nav aria-label="breadcrumb" className="py-4">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/">Home</a>
              </li>
              <li className="breadcrumb-item">
                <a href="/shop">Shop</a>
              </li>
            </ol>
          </nav>

          <div className="row">
            <div className="col-md-3">
              <div className="card shadow border-0 mb-3">
                <div className="card-body p-4">
                  <h3>Category</h3>
                  <ul>
                    <li className="mb-2">
                      <input type="checkbox" name="men" id="men" />
                      <label htmlFor="men" className="ps-2">
                        Men
                      </label>
                    </li>
                    <li className="mb-2">
                      <input type="checkbox" name="women" id="women" />
                      <label htmlFor="women" className="ps-2">
                        Women
                      </label>
                    </li>
                    <li className="mb-2">
                      <input type="checkbox" name="kids" id="kids" />
                      <label htmlFor="kids" className="ps-2">
                        Kids
                      </label>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="card shadow border-0 mb-3">
                <div className="card-body p-4">
                  <h3>Brands</h3>
                  <ul>
                    <li className="mb-2">
                      <input type="checkbox" name="Nike" id="Nike" />
                      <label htmlFor="Nike" className="ps-2">
                        Nike
                      </label>
                    </li>
                    <li className="mb-2">
                      <input type="checkbox" name="adidas" id="adidas" />
                      <label htmlFor="adidas" className="ps-2">
                        Adidas
                      </label>
                    </li>
                    <li className="mb-2">
                      <input type="checkbox" name="swear" id="swear" />
                      <label htmlFor="swear" className="ps-2">
                        Swear
                      </label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-9">
              <div className="row pb-4">
                <div className="col-md-4 col-6">
                  <div className="product card border-0">
                    <div className="card-img">
                      <Link to="/product">
                      <img src={Men1} alt="" className="w-100" />
                      </Link>
                    </div>
                    <div className="card-body pt-3">
                      <Link to="/product">Red check shirt for Men</Link>
                      <div className="price">
                        50${" "}
                        <span className="text-decoration-line-through">
                          80$
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 col-6">
                  <div className="product card border-0">
                    <div className="card-img">
                      <img src={Men1} alt="" className="w-100" />
                    </div>
                    <div className="card-body pt-3">
                      <a href="">Red check shirt for Men</a>
                      <div className="price">
                        50${" "}
                        <span className="text-decoration-line-through">
                          80$
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 col-6">
                  <div className="product card border-0">
                    <div className="card-img">
                      <img src={Men1} alt="" className="w-100" />
                    </div>
                    <div className="card-body pt-3">
                      <a href="">Red check shirt for Men</a>
                      <div className="price">
                        50${" "}
                        <span className="text-decoration-line-through">
                          80$
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 col-6">
                  <div className="product card border-0">
                    <div className="card-img">
                      <img src={Men1} alt="" className="w-100" />
                    </div>
                    <div className="card-body pt-3">
                      <a href="">Red check shirt for Men</a>
                      <div className="price">
                        50${" "}
                        <span className="text-decoration-line-through">
                          80$
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 col-6">
                  <div className="product card border-0">
                    <div className="card-img">
                      <img src={Men1} alt="" className="w-100" />
                    </div>
                    <div className="card-body pt-3">
                      <a href="">Red check shirt for Men</a>
                      <div className="price">
                        50${" "}
                        <span className="text-decoration-line-through">
                          80$
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 col-6">
                  <div className="product card border-0">
                    <div className="card-img">
                      <img src={Men1} alt="" className="w-100" />
                    </div>
                    <div className="card-body pt-3">
                      <a href="">Red check shirt for Men</a>
                      <div className="price">
                        50${" "}
                        <span className="text-decoration-line-through">
                          80$
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 col-6">
                  <div className="product card border-0">
                    <div className="card-img">
                      <img src={Men1} alt="" className="w-100" />
                    </div>
                    <div className="card-body pt-3">
                      <a href="">Red check shirt for Men</a>
                      <div className="price">
                        50${" "}
                        <span className="text-decoration-line-through">
                          80$
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 col-6">
                  <div className="product card border-0">
                    <div className="card-img">
                      <img src={Men1} alt="" className="w-100" />
                    </div>
                    <div className="card-body pt-3">
                      <a href="">Red check shirt for Men</a>
                      <div className="price">
                        50${" "}
                        <span className="text-decoration-line-through">
                          80$
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-4 col-6">
                  <div className="product card border-0">
                    <div className="card-img">
                      <img src={Men1} alt="" className="w-100" />
                    </div>
                    <div className="card-body pt-3">
                      <a href="">Red check shirt for Men</a>
                      <div className="price">
                        50${" "}
                        <span className="text-decoration-line-through">
                          80$
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Shop;
