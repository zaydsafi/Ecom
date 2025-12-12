const StatusFields = ({ register, errors }) => (
  <div className="mb-3">
    <label className="form-label">Status</label>
    <select
      {...register("status", { required: "Please select a status" })}
      className={`form-control ${errors.status ? "is-invalid" : ""}`}
    >
      <option value="">Select Status</option>
      <option value="1">Active</option>
      <option value="0">Blocked</option>
    </select>
    {errors.status && <p className="invalid-feedback">{errors.status.message}</p>}
  </div>
);

export default StatusFields;
