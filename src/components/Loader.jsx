export const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4">
          <div className="skeleton aspect-square mb-4 rounded-xl"></div>
          <div className="skeleton h-4 w-1/4 mb-2"></div>
          <div className="skeleton h-5 w-3/4 mb-4"></div>
          <div className="flex justify-between items-end mt-4">
            <div className="skeleton h-6 w-1/3"></div>
            <div className="skeleton h-10 w-10 rounded-xl"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const CategorySkeleton = () => {
  return (
    <div className="flex gap-4 overflow-hidden">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="w-32 md:w-full flex-shrink-0 bg-white rounded-2xl p-4 border border-gray-100">
          <div className="skeleton w-16 h-16 rounded-full mx-auto mb-3"></div>
          <div className="skeleton h-4 w-2/3 mx-auto mb-2"></div>
          <div className="skeleton h-3 w-1/2 mx-auto"></div>
        </div>
      ))}
    </div>
  );
};

export const DetailSkeleton = () => {
  return (
    <div className="max-w-[1600px] mx-auto px-4 py-8">
      <div className="skeleton h-4 w-1/4 mb-8"></div>
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="skeleton aspect-square rounded-3xl"></div>
        <div>
          <div className="skeleton h-4 w-1/4 mb-4"></div>
          <div className="skeleton h-10 w-3/4 mb-6"></div>
          <div className="skeleton h-6 w-1/3 mb-8"></div>
          <div className="space-y-3 mb-8">
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-5/6"></div>
            <div className="skeleton h-4 w-4/6"></div>
          </div>
          <div className="flex gap-4">
            <div className="skeleton h-12 w-32 rounded-xl"></div>
            <div className="skeleton h-12 flex-1 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};