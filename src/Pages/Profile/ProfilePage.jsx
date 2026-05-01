import React, { useEffect, useState } from "react";
import { User, Mail, Calendar, Edit2, Save, X } from "lucide-react";
import { useProfile } from "../../Hooks/useProfile";
import { useAuth } from "../../Hooks/useAuth";
import ListingCard from "../../Components/Content/ListingCard";
import Button from "../../Components/Ui/Button";
import Input from "../../Components/Ui/Input";

const ProfilePage = () => {
  const { logout } = useAuth();
  const { profile, myListings, loading, fetchMyProfile, updateProfile } = useProfile();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "" });

  useEffect(() => {
    fetchMyProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      setFormData({ name: profile.name || "" });
    }
  }, [profile]);

  const handleSave = async () => {
    await updateProfile(formData);
    setIsEditing(false);
  };

  if (loading && !profile) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <div className="animate-spin h-8 w-8 border-4 border-accent-main border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-light-card dark:bg-dark-card rounded-xl shadow-lg overflow-hidden mb-8 border border-light-border dark:border-dark-border">
        <div className="bg-accent-main h-32 sm:h-48 relative">
          <div className="absolute -bottom-12 right-6 sm:right-10">
            <div className="w-24 h-24 sm:w-32 sm:h-32 bg-light-input dark:bg-dark-bg rounded-full border-4 border-light-card dark:border-dark-card flex items-center justify-center shadow-md">
              <User className="w-10 h-10 sm:w-16 sm:h-16 text-light-muted dark:text-dark-muted" />
            </div>
          </div>
        </div>

        <div className="pt-16 px-6 sm:px-10 pb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="flex-1">
              {isEditing ? (
                <div className="flex flex-col gap-3 max-w-sm">
                  <Input
                    label="الاسم"
                    name="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ name: e.target.value })}
                  />
                  <div className="flex gap-2">
                    <Button size="sm" onClick={handleSave}><Save className="w-4 h-4 ml-1" /> حفظ</Button>
                    <Button size="sm" variant="secondary" onClick={() => setIsEditing(false)}><X className="w-4 h-4 ml-1" /> إلغاء</Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl sm:text-3xl font-bold text-light-text dark:text-dark-text">{profile?.name}</h1>
                  <button onClick={() => setIsEditing(true)} className="text-light-muted dark:text-dark-muted hover:text-accent-main transition-colors">
                    <Edit2 className="w-5 h-5" />
                  </button>
                </div>
              )}
              <p className="text-light-muted dark:text-dark-muted mt-1 flex items-center gap-2">
                <Mail className="w-4 h-4" /> {profile?.email}
              </p>
              <p className="text-light-muted/80 dark:text-dark-muted text-sm mt-1 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> عضو منذ {new Date(profile?.joined).toLocaleDateString("ar-EG")}
              </p>
            </div>
            <Button variant="danger" size="sm" onClick={logout}>
              تسجيل خروج
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <h2 className="text-xl font-bold text-light-text dark:text-dark-text">إعلاناتي ({myListings.length})</h2>
      </div>

      {myListings.length === 0 ? (
        <div className="text-center py-12 bg-light-card dark:bg-dark-card rounded-xl shadow-sm border border-light-border dark:border-dark-border text-light-muted dark:text-dark-muted font-bold">
          لم تقم بإضافة أي إعلان بعد
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
