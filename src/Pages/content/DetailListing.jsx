import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useListing } from "../../Hooks/useListing";
import { useAuth } from "../../Hooks/useAuth";
import Button from "../../Components/Ui/Button";
import BackButton from "../../Components/Ui/BackButton";
import FollowButton from "../../Components/Common/FollowButton";
import { MapPin, Calendar, Tag, User } from "lucide-react";
import { formatPrice, formatDate } from "../../Utils/format";

const DetailListing = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentListing, loading, error, fetchListingDetail, deleteListing } = useListing();
  const { user } = useAuth();

  useEffect(() => {
    fetchListingDetail(id);
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin h-8 w-8 border-4 border-accent-main border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (error || !currentListing) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg font-bold">{error || "الإعلان غير موجود"}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-6 py-2.5 bg-accent-main text-white rounded-lg hover:bg-accent-active transition-colors font-bold shadow-md"
        >
          العودة
        </button>
      </div>
    );
  }

  const isOwner = user?.id === currentListing.userId;

  const handleDelete = async () => {
    if (window.confirm("هل أنت متأكد من حذف هذا الإعلان؟")) {
      await deleteListing(id);
      navigate("/");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-light-card dark:bg-dark-card rounded-xl shadow-lg overflow-hidden border border-light-border dark:border-dark-border">
        <div className="relative">
          <img
            src={currentListing.images?.[0] || "/placeholder.jpg"}
            alt={currentListing.title}
            className="w-full h-64 sm:h-80 object-cover"
          />
          {currentListing.featured && (
            <span className="absolute top-4 right-4 bg-accent-main text-white text-sm font-bold px-3 py-1 rounded-full shadow-sm">
              مميز
            </span>
          )}
          {/* شارة "إعلانك" تظهر فقط للمالك */}
          {isOwner && (
            <span className="absolute top-4 left-4 bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-sm">
              إعلانك
            </span>
          )}
        </div>

        <div className="p-6">
          {/* إضافة زر الرجوع هنا */}
          <div className="flex items-center gap-4 mb-4">
            <BackButton />
            <h1 className="text-2xl font-bold text-light-text dark:text-dark-text">{currentListing.title}</h1>
          </div>

          {isOwner && (
            <div className="flex gap-2 mb-4 border-b border-light-border dark:border-dark-border pb-4">
              <Button variant="secondary" size="sm" onClick={() => navigate(`/listing/${id}/edit`)}>
                تعديل
              </Button>
              <Button variant="danger" size="sm" onClick={handleDelete}>
                حذف
              </Button>
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-light-muted dark:text-dark-muted font-medium">
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{currentListing.location || "غير محدد"}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(currentListing.createdAt)}</span>
            </div>
            {currentListing.category && (
              <div className="flex items-center gap-1">
                <Tag className="w-4 h-4 text-accent-main" />
                <span className="bg-accent-main/10 text-accent-main px-2 py-0.5 rounded-full text-xs font-bold">
                  {currentListing.category}
                </span>
              </div>
            )}
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-bold text-light-text dark:text-dark-text mb-2">الوصف</h2>
            <p className="text-light-muted dark:text-dark-muted whitespace-pre-line">{currentListing.description}</p>
          </div>

          <div className="mt-6 pt-6 border-t border-light-border dark:border-dark-border">
            <span className="text-3xl font-extrabold text-accent-main">
              {formatPrice(currentListing.price)}
            </span>
          </div>

          {currentListing.images && currentListing.images.length > 1 && (
            <div className="mt-6">
              <h2 className="text-xl font-bold text-light-text dark:text-dark-text mb-3">الصور</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {currentListing.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`صورة ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg border border-light-border dark:border-dark-border"
                  />
                ))}
              </div>
            </div>
          )}

          {currentListing.seller && (
            <div className="mt-6 pt-6 border-t border-light-border dark:border-dark-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-light-input dark:bg-dark-bg p-4 rounded-lg">
              <Link to={`/user/${currentListing.userId}`} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <User className="w-8 h-8 text-light-muted dark:text-dark-muted" />
                <div>
                  <p className="font-bold text-light-text dark:text-dark-text">{currentListing.seller.name}</p>
                  <p className="text-sm text-light-muted dark:text-dark-muted">{currentListing.seller.email}</p>
                </div>
              </Link>
              <FollowButton targetUserId={currentListing.userId} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailListing;
