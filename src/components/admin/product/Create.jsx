import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import Layout from "../../common/Layout";
import ProductForm from "./components/ProductForm";

const Create = () => {
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">Products / Create</h4>
            <Link to={"/admin/products"} className="btn btn-primary">
              Back
            </Link>
          </div>

          <div className="col-md-3">
            <Sidebar />
          </div>

          <div className="col-md-9">
            <ProductForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Create;




