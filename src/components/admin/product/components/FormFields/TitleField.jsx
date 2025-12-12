const TitleField = ({ register, errors }) => (
  <div className="mb-3">
    <label className="form-label">Title</label>
    <input
      type="text"
      {...register("title", { required: "The title field is required" })}
      className={`form-control ${errors.title ? "is-invalid" : ""}`}
      placeholder="Product title"
    />
    {errors.title && <p className="invalid-feedback">{errors.title.message}</p>}
  </div>
);

export default TitleField;
