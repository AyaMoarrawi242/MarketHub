import React from "react";

/*
 * مكون SkeletonCard:
 * هذا المكون هو "قالب وهمي" للبطاقة الحقيقية (ListingCard).
 * الهدف منه هو إظهار شكل الهيكل العام للصفحة قبل تحميل البيانات.
 *
 * الفكرة النفسية:
 * المستخدم يشعر أن التطبيق أسرع لأن المحتوى "يظهر" تدريجياً بدلاً من الانتظار الطويل أمام دائرة تحميل (Spinner).
 */

const SkeletonCard = () => {
  return (
    /*
     * الحاوية الرئيسية:
     * نستخدم نفس الـ Classes الخاصة بالبطاقة الحقيقية (bg-light-card, rounded-xl, shadow-md).
     * هذا يضمن أن يكون الحجم والموقع متطابقين تماماً مع البطاقة النهائية لتجنب "القفز" المفاجئ في التصميم.
     */
    <div className="bg-light-card dark:bg-dark-card rounded-xl shadow-md border border-light-border dark:border-dark-border overflow-hidden">
      
      {/* قسم الصورة الوهمية */}
      <div className="relative overflow-hidden">
        {/*
         * div يمثل الصورة:
         * نستخدم h-52 (نفس ارتفاع الصورة في البطاقة الحقيقية).
         * animate-pulse: كلاس من Tailwind يجعل العنصر يضيء وينطفئ ببطء (محاكاة للتحميل).
         * bg-gray-200 / dark:bg-gray-700: لون رمادي محايد لا يزعج العين.
         */}
        <div className="w-full h-52 bg-gray-200 dark:bg-gray-700 animate-pulse" />
      </div>

      {/* قسم المحتوى النصي */}
      <div className="p-4 flex flex-col gap-3">
        {/* 
         * العنوان الوهمي:
         * h-5: ارتفاع النص (نفس حجم الخط تقريباً).
         * rounded-full: حواف دائرية لتبدو كنص حقيقي.
         * w-3/4: العرض 75% لمحاكاة عناوين مختلفة الطول.
         */}
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse" />

        {/* الوصف الوهمي */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full animate-pulse" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3 animate-pulse" />
        </div>

        {/* تفاصيل إضافية (الموقع والسعر) */}
        <div className="mt-2 flex justify-between items-center">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse" />
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3 animate-pulse" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
