import { Link } from "wouter";

const CTASection = () => {
  return (
    <section className="py-12 md:py-16 bg-primary text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">Access the legal help you need in language you can understand.</p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/namma-sahayak">
            <span className="inline-block bg-white text-primary text-lg font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100 transition focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50">
              Chat with NammaSahayak
            </span>
          </Link>
          <Link href="/namma-vidhana">
            <span className="inline-block border-2 border-white text-white text-lg font-semibold px-6 py-3 rounded-lg hover:bg-white hover:bg-opacity-10 transition focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50">
              Upload a Document
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
