const UploadFormSkeleton = () => {
  return (
    <div className="new-book-wrapper">
      <div className="space-y-8 animate-pulse">
        {/* PDF Upload */}
        <div>
          <div className="mb-2 h-5 w-32 rounded bg-gray-200" />
          <div className="h-40 rounded-xl border-2 border-dashed border-gray-200 bg-gray-100" />
        </div>

        {/* Cover Upload */}
        <div>
          <div className="mb-2 h-5 w-40 rounded bg-gray-200" />
          <div className="h-40 rounded-xl border-2 border-dashed border-gray-200 bg-gray-100" />
        </div>

        {/* Title */}
        <div>
          <div className="mb-2 h-5 w-16 rounded bg-gray-200" />
          <div className="h-12 rounded-lg skeleton" />
        </div>

        {/* Author */}
        <div>
          <div className="mb-2 h-5 w-28 rounded bg-gray-200" />
          <div className="h-12 rounded-lg skeleton" />
        </div>

        {/* Voice Selector */}
        <div>
          <div className="mb-2 h-5 w-44 rounded bg-gray-200" />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="h-16 rounded-xl skeleton"
              />
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div className="h-12 w-full rounded-xl bg-gray-200" />
      </div>
    </div>
  );
};

export default UploadFormSkeleton;