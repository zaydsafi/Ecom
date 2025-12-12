const ShortDescription = ({ register }) => (
  <div className="mb-3">
    <label className="form-label">Short Description</label>
    <textarea
      rows={3}
      {...register("short_description")}
      className="form-control"
    ></textarea>
  </div>
);

export default ShortDescription;
