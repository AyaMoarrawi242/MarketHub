import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import Input from "../../Components/Ui/Input";
import Button from "../../Components/Ui/Button";
import Alert from "../../Components/Ui/Alert";

const Register = () => {
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [formErrors, setFormErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "الاسم مطلوب";
    if (!formData.email.trim()) errors.email = "البريد الإلكتروني مطلوب";
    if (!formData.password) errors.password = "كلمة المرور مطلوبة";
    if (formData.password.length < 6) errors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = "كلمتا المرور غير متطابقتين";
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
      await register({ name: formData.name, email: formData.email, password: formData.password });
      setSuccess(true);
      setTimeout(() => navigate("/login"), 2000);
    } catch {
      // Error handled by Redux
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg px-4">
      <div className="w-full max-w-md bg-light-card dark:bg-dark-card rounded-xl shadow-xl border border-light-border dark:border-dark-border p-8">
        <h1 className="text-2xl font-bold text-center text-light-text dark:text-dark-text mb-6">إنشاء حساب جديد</h1>

        {error && <Alert type="error" message={error} onClose={() => {}} className="mb-4" />}
        {success && <Alert type="success" message="تم إنشاء الحساب بنجاح! جاري التحويل..." className="mb-4" />}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="الاسم الكامل"
            name="name"
            placeholder="أحمد محمد"
            value={formData.name}
            onChange={handleChange}
            error={formErrors.name}
          />
          <Input
            label="البريد الإلكتروني"
            name="email"
            type="email"
            placeholder="example@email.com"
            value={formData.email}
            onChange={handleChange}
            error={formErrors.email}
          />
          <Input
            label="كلمة المرور"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={formErrors.password}
          />
          <Input
            label="تأكيد كلمة المرور"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
            error={formErrors.confirmPassword}
          />
          <Button type="submit" loading={loading} className="w-full">
            إنشاء حساب
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-light-muted dark:text-dark-muted">
          لديك حساب بالفعل؟{" "}
          <Link to="/login" className="text-accent-main hover:underline font-bold">
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
