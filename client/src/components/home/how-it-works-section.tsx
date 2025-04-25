const HowItWorksSection = () => {
  const steps = [
    {
      number: 1,
      title: "Choose a Service",
      description: "Select either NammaSahayak for questions or NammaVidhana for document assistance."
    },
    {
      number: 2,
      title: "Provide Information",
      description: "Ask your question or upload your document that needs explanation."
    },
    {
      number: 3,
      title: "Get Simple Answers",
      description: "Receive easy-to-understand explanations and guidance for your legal needs."
    }
  ];

  return (
    <section className="py-12 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">Simple steps to get the legal help you need</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
          {steps.map((step) => (
            <div key={step.number} className="bg-white p-6 rounded-lg border border-gray-200 shadow-md">
              <div className="flex justify-center mb-4">
                <div className="bg-primary text-white text-xl font-bold h-12 w-12 rounded-full flex items-center justify-center">
                  {step.number}
                </div>
              </div>
              <h3 className="text-xl font-bold text-center mb-4 text-primary">{step.title}</h3>
              <p className="text-gray-800 text-center">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
