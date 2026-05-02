import React from "react";
import { Link } from "react-router-dom";
import { Heart, ShieldCheck, Mail, Phone, MapPin } from "lucide-react";
import BazarHalab from "../../assets/BazarHalab5.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-light-card dark:bg-dark-card border-t border-light-border dark:border-dark-border mt-auto">
      <div className="container mx-auto px-4 py-10 max-w-7xl">
        
        {/* Grid Layout for Responsive Design */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Column 1: Brand & Description */}
          <div className="flex flex-col gap-4 items-start">
            <img src={BazarHalab} alt="BazarHalab" className="h-10 object-contain" />
            <p className="text-light-muted dark:text-dark-muted text-sm leading-relaxed max-w-xs">
              منصة Marketplace الأولى لبيع وشراء المنتجات بسهولة وأمان. نوفر لك تجربة تسوق مميزة.
            </p>
            <div className="flex gap-3">
              {/* Social Placeholders */}
              <a href="#" className="p-2 bg-light-bg dark:bg-dark-bg rounded-full hover:text-accent-main transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
              </a>
              <a href="#" className="p-2 bg-light-bg dark:bg-dark-bg rounded-full hover:text-accent-main transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" /></svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-light-text dark:text-dark-text">روابط سريعة</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link to="/" className="text-light-muted dark:text-dark-muted hover:text-accent-main transition-colors">الرئيسية</Link></li>
              <li><Link to="/categories" className="text-light-muted dark:text-dark-muted hover:text-accent-main transition-colors">الفئات</Link></li>
              <li><Link to="/search" className="text-light-muted dark:text-dark-muted hover:text-accent-main transition-colors">بحث متقدم</Link></li>
              <li><Link to="/createListing" className="text-light-muted dark:text-dark-muted hover:text-accent-main transition-colors">أضف إعلانك</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact & Info */}
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-bold text-light-text dark:text-dark-text">تواصل معنا</h3>
            <ul className="flex flex-col gap-3 text-sm text-light-muted dark:text-dark-muted">
              <li className="flex items-center gap-2"><Mail className="w-4 h-4" /> support@bazarhalab.com</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +963 912 345 678</li>
              <li className="flex items-center gap-2"><MapPin className="w-4 h-4" /> دمشق، سوريا</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-light-border dark:border-dark-border pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-light-muted dark:text-dark-muted flex items-center gap-1">
            © {currentYear} BazarHalab. جميع الحقوق محفوظة. صنع بـ <Heart className="w-4 h-4 text-red-500 fill-current" />
          </p>
          <div className="flex gap-4 text-xs text-light-muted dark:text-dark-muted">
            <a href="#" className="hover:text-accent-main transition-colors flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> سياسة الخصوصية</a>
            <a href="#" className="hover:text-accent-main transition-colors">شروط الاستخدام</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
