"use client";

const LoadingOverlay = () => {
  return (
    <div className="loading-wrapper">
      <div className="loading-shadow-wrapper">
        <div className="loading-shadow">
          <div className="loading-animation">
            <div className="h-12 w-12 rounded-full border-4 border-white border-t-transparent" />
          </div>
          <div className="loading-title">Uploading...</div>
          <div className="loading-progress">
            <p className="text-center text-sm text-slate-200">Please wait while your book uploads and processes.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
