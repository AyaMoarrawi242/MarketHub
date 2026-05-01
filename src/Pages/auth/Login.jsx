import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../Hooks/useAuth";
import Input from "../../Components/Ui/Input";
import Button from "../../Components/Ui/Button";
import Alert from "../../Components/Ui/Alert";

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  const validate = () => {
    const errors = {};
    if (!formData.email.trim()) errors.email = "البريد الإلكتروني مطلوب";
    if (!formData.password) errors.password = "كلمة المرور مطلوبة";
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
      await login(formData.email, formData.password);
      navigate("/");
    } catch {
      // Error handled by Redux
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg px-4">
      <div className="w-full max-w-md bg-light-card dark:bg-dark-card rounded-xl shadow-xl border border-light-border dark:border-dark-border p-8">
        <h1 className="text-2xl font-bold text-center text-light-text dark:text-dark-text mb-6">تسجيل الدخول</h1>

        {error && <Alert type="error" message={error} onClose={() => {}} className="mb-4" />}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          <Button type="submit" loading={loading} className="w-full">
            دخول
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-light-muted dark:text-dark-muted">
          ليس لديك حساب؟{" "}
          <Link to="/register" className="text-accent-main hover:underline font-bold">
            إنشاء حساب
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
