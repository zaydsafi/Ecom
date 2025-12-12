const FeaturedField = ({ register, errors }) => (
  <div className="mb-3">
    <label className="form-label">Featured</label>
    <select
      {...register("is_featured", { required: "Please select featured" })}
      className={`form-control ${errors.is_featured ? "is-invalid" : ""}`}
    >
      <option value="1">Yes</option>
      <option value="0">No</option>
    </select>
    {errors.is_featured && <p className="invalid-feedback">{errors.is_featured.message}</p>}
  </div>
);

export default FeaturedField;
