import React from "react";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg p-4">
          <div className="bg-light-card dark:bg-dark-card rounded-xl shadow-lg border border-light-border dark:border-dark-border max-w-md w-full p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-light-text dark:text-dark-text mb-3">عذراً! حدث خطأ غير متوقع</h1>
            <p className="text-light-muted dark:text-dark-muted mb-6">
              نعتذر عن هذا الخطأ. يمكنك المحاولة مرة أخرى أو العودة إلى الصفحة الرئيسية.
            </p>
            <div className="flex gap-3">
              <button
                onClick={this.handleGoHome}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-accent-main text-white rounded-lg hover:bg-accent-active transition-colors font-bold shadow-md"
              >
                <Home className="w-5 h-5" />
                الرئيسية
              </button>
              <button
                onClick={this.handleReset}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-light-border dark:border-dark-border rounded-lg text-light-text dark:text-dark-text hover:bg-light-input dark:hover:bg-dark-input transition-colors font-bold"
              >
                <RefreshCw className="w-5 h-5" />
                إعادة المحاولة
              </button>
            </div>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <div className="mt-6 p-4 bg-light-input dark:bg-dark-bg rounded-lg text-left">
                <h3 className="text-sm font-bold text-red-500 mb-2">تفاصيل الخطأ (للمطورين):</h3>
                <pre className="text-xs text-light-muted dark:text-dark-muted overflow-auto max-h-40">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
