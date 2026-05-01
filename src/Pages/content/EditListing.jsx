import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useListing } from "../../Hooks/useListing";
import Input from "../../Components/Ui/Input";
import Textarea from "../../Components/Ui/Textarea";
import Select from "../../Components/Ui/Select";
import Button from "../../Components/Ui/Button";
import Alert from "../../Components/Ui/Alert";
import BackButton from "../../Components/Ui/BackButton";
import { Plus, X } from "lucide-react";

const CATEGORIES = [
  { value: "", label: "اختر الفئة" },
  { value: "عقارات", label: "عقارات" },
  { value: "سيارات", label: "سيارات" },
  { value: "إلكترونيات", label: "إلكترونيات" },
  { value: "أثاث", label: "أثاث" },
  { value: "خدمات", label: "خدمات" },
  { value: "أخرى", label: "أخرى" },
];

const EditListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentListing, loading, error, fetchListingDetail, updateListing } = useListing();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    location: "",
  });
  const [images, setImages] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    fetchListingDetail(id);
  }, [id]);

  useEffect(() => {
    if (currentListing) {
      setFormData({
        title: currentListing.title || "",
        description: currentListing.description || "",
        price: currentListing.price || "",
        category: currentListing.category || "",
        location: currentListing.location || "",
      });
      setImages(currentListing.images || []);
    }
  }, [currentListing]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        imageUrls.push(event.target.result);
        if (imageUrls.length === files.length) {
          setImages([...images, ...imageUrls]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const validate = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = "العنوان مطلوب";
    if (!formData.description.trim()) errors.description = "الوصف مطلوب";
    if (!formData.price) errors.price = "السعر مطلوب";
    if (!formData.category) errors.category = "الفئة مطلوبة";
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    try {
      await updateListing(id, { ...formData, price: parseFloat(formData.price), images });
      navigate(`/listing/${id}`);
    } catch {
      // Error handled by Redux
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="bg-light-card dark:bg-dark-card rounded-xl shadow-lg border border-light-border dark:border-dark-border p-6 sm:p-8">
        <div className="flex items-center gap-4 mb-8">
          <BackButton />
          <h1 className="text-2xl font-bold text-light-text dark:text-dark-text">تعديل الإعلان</h1>
        </div>

        {error && <Alert type="error" message={error} onClose={() => {}} className="mb-6" />}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <Input
            label="العنوان"
            name="title"
            value={formData.title}
            onChange={handleChange}
            error={formErrors.title}
          />
          <Textarea
            label="الوصف"
            name="description"
            value={formData.description}
            onChange={handleChange}
            error={formErrors.description}
            rows={5}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label="السعر"
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              error={formErrors.price}
            />
            <Select
              label="الفئة"
              name="category"
              options={CATEGORIES}
              value={formData.category}
              onChange={handleChange}
              error={formErrors.category}
            />
          </div>
          <Input
            label="الموقع"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
          
          {/* Image Upload Section */}
          <div className="flex flex-col gap-3">
            <label className="text-sm font-bold text-light-text dark:text-dark-text">صور الإعلان</label>
            <div className="flex flex-wrap gap-4 p-4 bg-light-input dark:bg-dark-bg border-2 border-dashed border-light-border dark:border-dark-border rounded-lg">
              {images.map((img, index) => (
                <div key={index} className="relative w-20 h-20 rounded-lg overflow-hidden group border-2 border-light-border dark:border-dark-border">
                  <img src={img} alt={`صورة ${index + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <label className="w-20 h-20 border-2 border-dashed border-accent-main/40 dark:border-accent-main/30 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-accent-main/5 dark:hover:bg-accent-main/10 transition-colors group">
                <Plus className="w-6 h-6 text-accent-main group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold text-accent-main mt-1">رفع صورة</span>
                <input type="file" accept="image/*" multiple onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
          </div>
          
          <div className="flex gap-3 pt-4">
            <Button type="submit" loading={loading} className="flex-1">
              حفظ التعديلات
            </Button>
            <Button type="button" variant="secondary" onClick={() => navigate(-1)}>
              إلغاء
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditListing;
