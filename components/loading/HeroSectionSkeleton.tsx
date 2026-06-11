const HeroSectionSkeleton = () => {
  return (
    <section className="wrapper mb-10 md:mb-16">
      <div className="library-hero-card">
        <div className="library-hero-content">
          {/* Left */}
          <div className="library-hero-text animate-pulse">
            <div className="h-12 w-56 rounded-md bg-gray-200" />

            <div className="mt-4 space-y-2">
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-5/6 rounded bg-gray-200" />
            </div>

            <div className="mt-6 h-12 w-44 rounded-xl bg-gray-200" />
          </div>

          {/* Image */}
          <div className="library-hero-illustration-desktop">
            <div className="h-88 w-90 rounded-2xl bg-gray-200 animate-pulse" />
           
          </div>

          <div className="library-hero-illustration"> 
            <div className="aspect-491/352 w-full rounded-2xl bg-gray-200 animate-pulse" />
          </div>

          {/* Steps */}
          <div className="library-steps-card min-w-65 max-w-70 z-10 shadow-soft-md">
            <ul className="space-y-6 animate-pulse">
              {[1, 2, 3].map((item) => (
                <li key={item} className="library-step-item">
                  <div className="w-10 h-10 rounded-full bg-gray-200" />
                  <div className="flex-1">
                    <div className="h-5 w-28 rounded bg-gray-200" />
                    <div className="mt-2 h-4 w-36 rounded bg-gray-200" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionSkeleton;