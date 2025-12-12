const InventoryFields = ({ register, errors }) => (
  <>
    <h3 className="py-3 border-bottom mb-3">Inventory</h3>

    <div className="row">
      <div className="col-md-6 mb-3">
        <label className="form-label">SKU</label>
        <input
          type="text"
          {...register("sku", { required: "The sku field is required" })}
          className={`form-control ${errors.sku ? "is-invalid" : ""}`}
        />
        {errors.sku && <p className="invalid-feedback">{errors.sku.message}</p>}
      </div>

      <div className="col-md-6 mb-3">
        <label className="form-label">Barcode</label>
        <input type="text" {...register("barcode")} className="form-control" />
      </div>
    </div>

    <div className="row">
      <div className="col-md-6 mb-3">
        <label className="form-label">Quantity</label>
        <input type="number" {...register("qty")} className="form-control" />
      </div>
    </div>
  </>
);

export default InventoryFields;
