const GalleryPreview = ({ galleryImages, deleteImage }) => (
  <div className="row">
    {galleryImages.map((img, i) => (
      <div className="col-md-3 mb-3" key={i}>
        <div className="card shadow">
          <img src={img} className="w-100" alt="gallery" />
          <button
            type="button"
            className="btn btn-danger btn-sm mt-2"
            onClick={() => deleteImage(img)}
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
);

export default GalleryPreview;
