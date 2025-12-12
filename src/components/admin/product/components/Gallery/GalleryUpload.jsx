const GalleryUpload = ({ handleFile }) => (
  <div className="mb-3">
    <label className="form-label">Upload Image</label>
    <input type="file" className="form-control" onChange={handleFile} />
  </div>
);

export default GalleryUpload;
