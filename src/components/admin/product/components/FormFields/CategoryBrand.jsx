const CategoryBrand = ({ register, errors, categories, brands }) => (
  <div className="row">
    <div className="col-md-6 mb-3">
      <label className="form-label">Category</label>
      <select
        {...register("category", { required: "Please select a category" })}
        className={`form-control ${errors.category ? "is-invalid" : ""}`}
      >
        <option value="">Select Category</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      {errors.category && (
        <p className="invalid-feedback">{errors.category.message}</p>
      )}
    </div>

    <div className="col-md-6 mb-3">
      <label className="form-label">Brand</label>
      <select {...register("brand")} className="form-control">
        <option value="">Select Brand</option>
        {brands.map((b) => (
          <option key={b.id} value={b.id}>
            {b.name}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default CategoryBrand;
