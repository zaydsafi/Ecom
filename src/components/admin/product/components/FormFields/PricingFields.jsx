const PricingFields = ({ register, errors }) => (
  <>
    <h3 className="py-3 border-bottom mb-3">Pricing</h3>

    <div className="row">
      <div className="col-md-6 mb-3">
        <label className="form-label">Price</label>
        <input
          type="number"
          {...register("price", { required: "The price field is required" })}
          className={`form-control ${errors.price ? "is-invalid" : ""}`}
        />
        {errors.price && <p className="invalid-feedback">{errors.price.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label className="form-label">Discount Price</label>
        <input type="number" {...register("compare_price")} className="form-control" />
      </div>
    </div>
  </>
);

export default PricingFields;
