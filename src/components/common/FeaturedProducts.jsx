import React from "react";
import Men1 from "../../assets/images/Mens/eight.jpg";
import Men2 from "../../assets/images/Mens/eleven.jpg";

const FeaturedProducts = () => {
  return (
    <>
      <div className="section-2 py-1">
        <div className="container">
          <h2 className="text-center mb-3">Featured Products</h2>
          <div className="row mt-4">
            <div className="col-md-3 col-6">
              <div className="product card border-0">
                <div className="card-img">
                  <img src={Men2} alt="" className="w-100" />
                </div>
                <div className="card-body pt-3">
                  <a href="">Skirf check shirt for Women</a>
                  <div className="price">
                    100${" "}
                    <span className="text-decoration-line-through">180$</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3 col-6">
              <div className="product card border-0">
                <div className="card-img">
                  <img src={Men1} alt="" className="w-100" />
                </div>
                <div className="card-body pt-3">
                  <a href="">Red check shirt for Men</a>
                  <div className="price">
                    50${" "}
                    <span className="text-decoration-line-through">80$</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3 col-6">
              <div className="product card border-0">
                <div className="card-img">
                  <img src={Men1} alt="" className="w-100" />
                </div>
                <div className="card-body pt-3">
                  <a href="">Red check shirt for Men</a>
                  <div className="price">
                    50${" "}
                    <span className="text-decoration-line-through">80$</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-3 col-6">
              <div className="product card border-0">
                <div className="card-img">
                  <img src={Men1} alt="" className="w-100" />
                </div>
                <div className="card-body pt-3">
                  <a href="">Red check shirt for Men</a>
                  <div className="price">
                    50${" "}
                    <span className="text-decoration-line-through">80$</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedProducts;
