import { Link, useLocation } from "wouter";

const Breadcrumb = () => {
  const [location] = useLocation();
  
  // Create path segments
  const getPathSegments = () => {
    if (location === "/") return [];
    
    // Remove leading slash and split by slash
    const segments = location.slice(1).split("/");
    const result = [];
    
    let accumulatedPath = "";
    for (let i = 0; i < segments.length; i++) {
      accumulatedPath += `/${segments[i]}`;
      result.push({
        label: formatSegmentName(segments[i]),
        path: accumulatedPath
      });
    }
    
    return result;
  };
  
  // Format the segment name to be more readable
  const formatSegmentName = (segment: string) => {
    return segment
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  
  const segments = getPathSegments();
  
  // If we're at home page, don't show breadcrumbs
  if (segments.length === 0) {
    return null;
  }
  
  return (
    <div className="bg-gray-100 border-b border-gray-200">
      <div className="container mx-auto px-4 py-2">
        <nav className="text-sm md:text-base" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center">
            <li className="flex items-center">
              <Link href="/" className="text-primary hover:underline">Home</Link>
              {segments.length > 0 && <span className="mx-2 text-gray-500">/</span>}
            </li>
            {segments.map((segment, index) => (
              <li key={segment.path} className="flex items-center">
                {index === segments.length - 1 ? (
                  <span className="text-neutral" aria-current="page">{segment.label}</span>
                ) : (
                  <>
                    <Link href={segment.path} className="text-primary hover:underline">{segment.label}</Link>
                    <span className="mx-2 text-gray-500">/</span>
                  </>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;
