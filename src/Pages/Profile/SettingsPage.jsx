
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Settings, Bell, Moon, Globe, Lock, AlertTriangle, ChevronRight, Save, CheckCircle, XCircle 
} from "lucide-react";
import Input from "../../Components/Ui/Input";
import Button from "../../Components/Ui/Button";
import Alert from "../../Components/Ui/Alert";

/**
 * صفحة الإعدادات (SettingsPage):
 * هذه الصفحة تجمع كل الخيارات التي يريدها المستخدم لتخصيص التطبيق.
 *
 * لماذا نستخدم useState هنا بدلاً من Redux؟
 * - لأن هذه الإعدادات عادة لا يحتاجها التطبيق في "كل مكان" فوراً.
 * - البيانات هنا (مثل حقول الباسورد) مؤقتة ولا نريد تخزينها في الـ State العام إلا عند الحفظ الفعلي.
 */

const SettingsPage = () => {
  const navigate = useNavigate();

  // 1. حالة الإعدادات العامة (لغة، وضع ليلي، إشعارات)
  const [preferences, setPreferences] = useState({
    language: "ar", // ar = العربية، en = الإنجليزية
    darkMode: true,
    notifications: true,
  });

  // 2. حالة نموذج تغيير كلمة المرور
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // 3. حالات واجهة المستخدم (رسائل نجاح أو خطأ)
  const [feedback, setFeedback] = useState({ message: "", type: "" });
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  // دالة لتبديل الإعدادات (Toggles)
  const togglePreference = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key], // نعكس القيمة الحالية (true -> false)
    }));
    
    // ملاحظة: هنا عادة نرسل تحديثاً للسيرفر أو نخزنه في LocalStorage
    localStorage.setItem("appSettings", JSON.stringify({ ...preferences, [key]: !preferences[key] }));
  };

  // دالة التعامل مع حقول الباسورد
  const handlePasswordInput = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    });
  };

  // 4. منطق التحقق من صحة كلمة المرور وحفظها
  const handleSavePassword = async (e) => {
    e.preventDefault();
    setFeedback({ message: "", type: "" }); // تصفير الرسائل السابقة

    // التحقق (Validation)
    if (!passwordForm.currentPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      setFeedback({ message: "جميع الحقول مطلوبة", type: "error" });
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      setFeedback({ message: "كلمة المرور الجديدة يجب أن تكون 6 أحرف على الأقل", type: "error" });
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setFeedback({ message: "كلمتا المرور غير متطابقتين", type: "error" });
      return;
    }

    // محاكاة الاتصال بالسيرفر
    setIsSavingPassword(true);
    setTimeout(() => {
      setIsSavingPassword(false);
      setFeedback({ message: "تم تحديث كلمة المرور بنجاح!", type: "success" });
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" }); // تفريغ الحقول
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      
      {/* العنوان الرئيسي */}
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
          <ChevronRight className="w-6 h-6 text-light-muted dark:text-dark-muted" />
        </button>
        <h1 className="text-2xl font-bold text-light-text dark:text-dark-text flex items-center gap-2">
          <Settings className="w-7 h-7" /> الإعدادات
        </h1>
      </div>

      {/* عرض رسائل الخطأ أو النجاح */}
      {feedback.message && (
        <Alert 
          type={feedback.type === "success" ? "success" : "error"} 
          message={feedback.message} 
          onClose={() => setFeedback({ message: "", type: "" })} 
          className="mb-6"
        />
      )}

      {/* القسم الأول: التفضيلات العامة */}
      <div className="bg-light-card dark:bg-dark-card rounded-xl shadow-sm border border-light-border dark:border-dark-border mb-6 overflow-hidden">
        <div className="p-4 border-b border-light-border dark:border-dark-border bg-gray-50 dark:bg-gray-800/50">
          <h2 className="font-bold text-light-text dark:text-dark-text">تفضيلات التطبيق</h2>
        </div>
        
        <div className="divide-y divide-light-border dark:divide-dark-border">
          
          {/* خيار اللغة */}
          <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-light-muted dark:text-dark-muted" />
              <span className="text-light-text dark:text-dark-text font-medium">اللغة العربية</span>
            </div>
            
            {/* Toggle Button مخصص */}
            <button 
              onClick={() => togglePreference("language")}
              className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${preferences.language === "ar" ? "bg-accent-main" : "bg-gray-300 dark:bg-gray-600"}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${preferences.language === "ar" ? "translate-x-6" : "translate-x-0"}`} />
            </button>
          </div>

          {/* خيار الوضع الليلي */}
          <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-light-muted dark:text-dark-muted" />
              <span className="text-light-text dark:text-dark-text font-medium">الوضع الليلي</span>
            </div>
            <button 
              onClick={() => togglePreference("darkMode")}
              className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${preferences.darkMode ? "bg-accent-main" : "bg-gray-300 dark:bg-gray-600"}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${preferences.darkMode ? "translate-x-6" : "translate-x-0"}`} />
            </button>
          </div>

           {/* خيار الإشعارات */}
           <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-light-muted dark:text-dark-muted" />
              <span className="text-light-text dark:text-dark-text font-medium">إشعارات البريد الإلكتروني</span>
            </div>
            <button 
              onClick={() => togglePreference("notifications")}
              className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${preferences.notifications ? "bg-accent-main" : "bg-gray-300 dark:bg-gray-600"}`}
            >
              <div className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${preferences.notifications ? "translate-x-6" : "translate-x-0"}`} />
            </button>
          </div>

        </div>
      </div>

      {/* القسم الثاني: الأمان (تغيير كلمة المرور) */}
      <div className="bg-light-card dark:bg-dark-card rounded-xl shadow-sm border border-light-border dark:border-dark-border mb-8 overflow-hidden">
        <div className="p-4 border-b border-light-border dark:border-dark-border bg-gray-50 dark:bg-gray-800/50">
          <h2 className="font-bold text-light-text dark:text-dark-text flex items-center gap-2">
            <Lock className="w-5 h-5" /> الأمان
          </h2>
          <p className="text-xs text-light-muted dark:text-dark-muted mt-1">تأكد من استخدام كلمة مرور قوية يصعب تخمينها.</p>
        </div>

        <form onSubmit={handleSavePassword} className="p-6 space-y-5">
          <Input 
            label="كلمة المرور الحالية" 
            name="currentPassword"
            type="password"
            value={passwordForm.currentPassword}
            onChange={handlePasswordInput}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input 
              label="كلمة المرور الجديدة" 
              name="newPassword"
              type="password"
              value={passwordForm.newPassword}
              onChange={handlePasswordInput}
            />
            <Input 
              label="تأكيد كلمة المرور" 
              name="confirmPassword"
              type="password"
              value={passwordForm.confirmPassword}
              onChange={handlePasswordInput}
            />
          </div>
          
          <div className="flex justify-end pt-2">
            <Button type="submit" loading={isSavingPassword} size="sm">
              حفظ التغييرات
            </Button>
          </div>
        </form>
      </div>

      {/* القسم الثالث: منطقة الخطر (حذف الحساب) */}
      <div className="bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-200 dark:border-red-900/30 p-6">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full">
            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h3 className="font-bold text-red-800 dark:text-red-300">حذف الحساب نهائياً</h3>
            <p className="text-sm text-red-700/80 dark:text-red-400/80 mt-1 mb-4">
              هذا الإجراء لا يمكن التراجع عنه. سيتم حذف جميع إعلاناتك وبياناتك من الخوادم.
            </p>
               <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-lg transition-colors shadow-sm">
              حذف حسابي
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SettingsPage;
