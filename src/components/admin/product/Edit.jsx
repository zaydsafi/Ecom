import React, { useEffect, useState, useRef, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import Layout from "../../common/Layout";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { adminToken, apiUrl } from "../../common/http";
import JoditEditor from "jodit-react";

const Edit = ({ placeholder }) => {
  const { id } = useParams();
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [disable, setDisable] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "Start typings...",
    }),
    [placeholder]
  );

  // Fetch product data for editing
  const fetchProduct = async () => {
    if (!id) {
      toast.error("Product ID is missing");
      navigate("/admin/products");
      return;
    }

    setLoading(true);
    try {
      console.log(`Fetching product with ID: ${id}`);
      console.log(`API URL: ${apiUrl}/products/${id}`);
      
      const res = await fetch(`${apiUrl}/products/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${adminToken()}`,
        },
      });

      console.log("Response status:", res.status);
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const result = await res.json();
      console.log("API Response:", result);
      
      if (result.status === 200 || result.success) {
        const product = result.data || result.product;
        
        if (!product) {
          throw new Error("Product data not found in response");
        }

        // Set form values
        setValue("title", product.title || "");
        setValue("category", product.category_id || product.category?.id || "");
        setValue("brand", product.brand_id || product.brand?.id || "");
        setValue("short_description", product.short_description || "");
        setContent(product.description || "");
        setValue("price", product.price || 0);
        setValue("compare_price", product.compare_price || product.discounted_price || "");
        setValue("sku", product.sku || "");
        setValue("barcode", product.barcode || "");
        setValue("qty", product.quantity || product.qty || product.stock || 0);
        setValue("status", product.status?.toString() || "1");
        setValue("is_featured", product.is_featured?.toString() || "0");
        
        // Set gallery images if they exist
        if (product.gallery && product.gallery.length > 0) {
          const galleryIds = product.gallery.map(img => img.id || img.temp_id);
          const galleryUrls = product.gallery.map(img => img.image_url || img.url);
          setGallery(galleryIds);
          setGalleryImages(galleryUrls);
        } else if (product.images && product.images.length > 0) {
          // Try alternative property name
          const galleryIds = product.images.map(img => img.id || img.temp_id);
          const galleryUrls = product.images.map(img => img.image_url || img.url);
          setGallery(galleryIds);
          setGalleryImages(galleryUrls);
        }
        
        toast.success("Product data loaded successfully");
      } else {
        throw new Error(result.message || "Failed to fetch product");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error(error.message || "Error fetching product data");
      navigate("/admin/products");
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (data) => {
    const formData = { 
      ...data, 
      description: content, 
      gallery: gallery,
      _method: "PUT" // Add this if your API requires it for PUT requests
    };
    setDisable(true);
    
    try {
      console.log("Updating product with data:", formData);
      
      const res = await fetch(`${apiUrl}/products/${id}`, {
        method: "PUT", // or "POST" with _method=PUT for Laravel
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${adminToken()}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      console.log("Update response:", result);
      
      if (result.status === 200 || result.success) {
        toast.success(result.message || "Product updated successfully");
        navigate("/admin/products");
      } else {
        const formErrors = result.errors || result.data?.errors;
        if (formErrors) {
          Object.keys(formErrors).forEach((field) => {
            setError(field, { message: Array.isArray(formErrors[field]) ? formErrors[field][0] : formErrors[field] });
          });
          toast.error("Please fix the errors in the form");
        } else {
          toast.error(result.message || "Failed to update product");
        }
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Error updating product. Please try again.");
    } finally {
      setDisable(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${apiUrl}/categories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${adminToken()}`,
        },
      });
      
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      
      const result = await res.json();
      console.log("Categories:", result);
      
      if (result.data) {
        setCategories(result.data);
      } else if (result.categories) {
        setCategories(result.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Failed to load categories");
    }
  };

  const fetchBrands = async () => {
    try {
      const res = await fetch(`${apiUrl}/brands`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${adminToken()}`,
        },
      });
      
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      
      const result = await res.json();
      console.log("Brands:", result);
      
      if (result.data) {
        setBrands(result.data);
      } else if (result.brands) {
        setBrands(result.brands);
      }
    } catch (error) {
      console.error("Error fetching brands:", error);
      toast.error("Failed to load brands");
    }
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.match('image.*')) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    setDisable(true);

    try {
      const res = await fetch(`${apiUrl}/temp-images`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${adminToken()}`,
        },
        body: formData,
      });

      const result = await res.json();
      console.log("Image upload result:", result);
      
      if (result.data) {
        setGallery(prev => [...prev, result.data.id || result.data.temp_id]);
        setGalleryImages(prev => [...prev, result.data.image_url || result.data.url]);
        toast.success("Image uploaded successfully");
      } else {
        throw new Error(result.message || "Failed to upload image");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error(error.message || "Error uploading image");
    } finally {
      setDisable(false);
      e.target.value = "";
    }
  };

  const deleteImage = (image, index) => {
    setGallery(prev => prev.filter((_, i) => i !== index));
    setGalleryImages(prev => prev.filter((_, i) => i !== index));
    toast.info("Image removed from gallery");
  };

  useEffect(() => {
    // Check if user is authenticated
    const token = adminToken();
    if (!token) {
      toast.error("Please login first");
      navigate("/admin/login");
      return;
    }

    if (id) {
      fetchProduct();
    } else {
      toast.error("No product ID provided");
      navigate("/admin/products");
    }
    
    fetchCategories();
    fetchBrands();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9">
              <div className="text-center py-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-3">Loading product data...</p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Layout>
        <div className="container">
          <div className="row">
            <div className="d-flex justify-content-between mt-5 pb-3">
              <h4 className="h4 pb-0 mb-0">Edit Product (ID: {id})</h4>
              <Link to={"/admin/products"} className="btn btn-primary">
                Back to Products
              </Link>
            </div>
            <div className="col-md-3">
              <Sidebar />
            </div>
            <div className="col-md-9">
              <form onSubmit={handleSubmit(updateProduct)}>
                <div className="card shadow">
                  <div className="card-body p-4">
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">
                        Title *
                      </label>
                      <input
                        type="text"
                        {...register("title", {
                          required: "The title field is required",
                        })}
                        placeholder="Enter Product title"
                        className={`form-control ${errors.title && "is-invalid"}`}
                      />
                      {errors.title && (
                        <p className="invalid-feedback">{errors.title.message}</p>
                      )}
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="category" className="form-label">
                            Category *
                          </label>
                          <select
                            {...register("category", {
                              required: "Please select a category",
                            })}
                            className={`form-control ${errors.category && "is-invalid"}`}
                          >
                            <option value="">Select a Category</option>
                            {categories.map((category) => (
                              <option key={`category-${category.id}`} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                          </select>
                          {errors.category && (
                            <p className="invalid-feedback">{errors.category.message}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="brand" className="form-label">
                            Brand
                          </label>
                          <select {...register("brand")} className="form-control">
                            <option value="">Select a brand</option>
                            {brands.map((brand) => (
                              <option key={`brand-${brand.id}`} value={brand.id}>
                                {brand.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="short_description" className="form-label">
                        Short Description
                      </label>
                      <textarea
                        {...register("short_description")}
                        placeholder="Enter Product short description"
                        className="form-control"
                        rows={3}
                      ></textarea>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">
                        Description
                      </label>
                      <JoditEditor
                        ref={editor}
                        value={content}
                        config={config}
                        tabIndex={1}
                        onChange={(newContent) => setContent(newContent)}
                      />
                    </div>

                    <h3 className="py-3 border-bottom mb-3">Pricing</h3>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="price" className="form-label">
                            Price *
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            {...register("price", {
                              required: "The price field is required",
                              min: { value: 0, message: "Price must be positive" }
                            })}
                            placeholder="Enter Product Price"
                            className={`form-control ${errors.price && "is-invalid"}`}
                          />
                          {errors.price && (
                            <p className="invalid-feedback">{errors.price.message}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="compare_price" className="form-label">
                            Discounted Price
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            {...register("compare_price")}
                            placeholder="Enter Product discounted Price"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>

                    <h3 className="py-3 border-bottom mb-3">Inventory</h3>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="sku" className="form-label">
                            SKU *
                          </label>
                          <input
                            type="text"
                            {...register("sku", {
                              required: "The SKU field is required",
                            })}
                            placeholder="Enter Product SKU"
                            className={`form-control ${errors.sku && "is-invalid"}`}
                          />
                          {errors.sku && (
                            <p className="invalid-feedback">{errors.sku.message}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="barcode" className="form-label">
                            Barcode
                          </label>
                          <input
                            type="text"
                            {...register("barcode")}
                            placeholder="Enter Product barcode"
                            className="form-control"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="qty" className="form-label">
                            Quantity
                          </label>
                          <input
                            type="number"
                            {...register("qty", {
                              min: { value: 0, message: "Quantity must be positive" }
                            })}
                            placeholder="Enter Product quantity"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label htmlFor="status" className="form-label">
                            Status *
                          </label>
                          <select
                            {...register("status", {
                              required: "Please select a status",
                            })}
                            className={`form-control ${errors.status && "is-invalid"}`}
                          >
                            <option value="">Select a Status</option>
                            <option value="1">Active</option>
                            <option value="0">Inactive</option>
                          </select>
                          {errors.status && (
                            <p className="invalid-feedback">{errors.status.message}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="is_featured" className="form-label">
                        Featured *
                      </label>
                      <select
                        {...register("is_featured", {
                          required: "Please select featured status",
                        })}
                        className={`form-control ${errors.is_featured && "is-invalid"}`}
                      >
                        <option value="">Select</option>
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                      </select>
                      {errors.is_featured && (
                        <p className="invalid-feedback">{errors.is_featured.message}</p>
                      )}
                    </div>

                    <h3 className="py-3 border-bottom mb-3">Gallery</h3>

                    <div className="mb-3">
                      <label htmlFor="image" className="form-label">
                        Add More Images
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFile}
                        className="form-control"
                        disabled={disable}
                      />
                      <small className="text-muted">Max size: 5MB. Supported formats: JPG, PNG, GIF</small>
                    </div>

                    <div className="mb-3">
                      <h6>Current Gallery Images</h6>
                      <div className="row">
                        {galleryImages.length > 0 ? (
                          galleryImages.map((image, index) => (
                            <div className="col-md-3 mb-3" key={`image-${index}`}>
                              <div className="card">
                                <img 
                                  src={image} 
                                  alt={`Gallery ${index + 1}`} 
                                  className="card-img-top" 
                                  style={{ height: '150px', objectFit: 'cover' }}
                                />
                                <div className="card-body p-2">
                                  <button 
                                    type="button"
                                    className="btn btn-danger btn-sm w-100"
                                    onClick={() => deleteImage(image, index)}
                                    disabled={disable}
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="col-12">
                            <div className="alert alert-info">
                              No gallery images added yet.
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3">
                  <button
                    type="submit"
                    disabled={disable}
                    className="btn btn-primary me-2"
                  >
                    {disable ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Updating...
                      </>
                    ) : (
                      "Update Product"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate("/admin/products")}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Edit;