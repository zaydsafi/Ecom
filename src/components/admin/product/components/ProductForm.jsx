import React, { useEffect, useState, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { adminToken, apiUrl } from "../../../common/http";

/* Form Fields */
import TitleField from "./FormFields/TitleField";
import CategoryBrand from "./FormFields/CategoryBrand";
import ShortDescription from "./FormFields/ShortDescription";
import DescriptionEditor from "./FormFields/DescriptionEditor";
import PricingFields from "./FormFields/PricingFields";
import InventoryFields from "./FormFields/InventoryFields";
import StatusFields from "./FormFields/StatusFields";
import FeaturedField from "./FormFields/FeaturedField";

/* Gallery */
import GalleryUpload from "./Gallery/GalleryUpload";
import GalleryPreview from "./Gallery/GalleryPreview";

const ProductForm = () => {
  const editor = useRef(null);
  const navigate = useNavigate();

  const [content, setContent] = useState("");
  const [disable, setDisable] = useState(false);

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [gallery, setGallery] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typing...",
    }),
    []
  );

  /** FETCH CATEGORIES */
  useEffect(() => {
    fetch(`${apiUrl}/categories`, {
      headers: { Authorization: `Bearer ${adminToken()}` },
    })
      .then((res) => res.json())
      .then((data) => setCategories(data.data || []));
  }, []);

  /** FETCH BRANDS */
  useEffect(() => {
    fetch(`${apiUrl}/brands`, {
      headers: { Authorization: `Bearer ${adminToken()}` },
    })
      .then((res) => res.json())
      .then((data) => setBrands(data.data || []));
  }, []);

  /** UPLOAD FILE */
  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    setDisable(true);

    try {
      const res = await fetch(`${apiUrl}/temp-images`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
        body: formData,
      });

      const result = await res.json();
      setDisable(false);

      if (result.data) {
        setGallery((prev) => [...prev, result.data.id]);
        setGalleryImages((prev) => [...prev, result.data.image_url]);
      }
    } catch (err) {
      setDisable(false);
    }
  };

  /** DELETE IMAGE */
  const deleteImage = (url) => {
    setGalleryImages((prev) => prev.filter((img) => img !== url));
  };

  /** SAVE PRODUCT */
  const saveProduct = async (data) => {
    const payload = {
      ...data,
      description: content,
      gallery,
    };

    setDisable(true);

    try {
      const res = await fetch(`${apiUrl}/products`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      setDisable(false);

      if (result.status === 200) {
        toast.success(result.message);
        navigate("/admin/products");
      } else if (result.errors) {
        Object.keys(result.errors).forEach((f) =>
          setError(f, { message: result.errors[f][0] })
        );
      }
    } catch (err) {
      setDisable(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(saveProduct)}>
      <div className="card shadow">
        <div className="card-body p-4">
          
          <TitleField register={register} errors={errors} />

          <CategoryBrand
            register={register}
            errors={errors}
            categories={categories}
            brands={brands}
          />

          <ShortDescription register={register} />

          <DescriptionEditor
            editor={editor}
            content={content}
            setContent={setContent}
            config={config}
          />

          <PricingFields register={register} errors={errors} />

          <InventoryFields register={register} errors={errors} />

          <StatusFields register={register} errors={errors} />

          <FeaturedField register={register} errors={errors} />

          <GalleryUpload handleFile={handleFile} />

          <GalleryPreview galleryImages={galleryImages} deleteImage={deleteImage} />
        </div>
      </div>

      <button disabled={disable} className="btn btn-primary mt-3">
        {disable ? "Saving..." : "Create"}
      </button>
    </form>
  );
};

export default ProductForm;
