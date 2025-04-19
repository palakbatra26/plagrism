export function HowItWorks() {
  const steps = [
    {
      title: "Paste Your Text",
      description: "Simply copy and paste the text you want to analyze into our secure platform.",
      icon: (
        <svg className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      number: "01"
    },
    {
      title: "Run Analysis",
      description: "Our powerful algorithms will scan for both plagiarism and AI-generated content simultaneously.",
      icon: (
        <svg className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
      number: "02"
    },
    {
      title: "Review Results",
      description: "Examine detailed reports showing potential plagiarism sources and AI probability scores with highlighted text.",
      icon: (
        <svg className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      ),
      number: "03"
    },
    {
      title: "Export Report",
      description: "Download or share comprehensive reports with stakeholders, complete with evidence and citations.",
      icon: (
        <svg className="w-7 h-7 sm:w-8 sm:h-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      number: "04"
    }
  ];
  
  return (
    <section id="how-it-works" className="py-12 sm:py-16 md:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold block bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent sm:text-4xl">
            How TextInspect Works
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-2 sm:px-0">
            Our simple but powerful process helps you analyze content in just a few steps
          </p>
        </div>
        
        <div className="mt-12 sm:mt-16">
          <div className="grid grid-cols-1 gap-10 sm:gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector arrows for mobile (displays between cards vertically) */}
                {index < steps.length - 1 && (
                  <div className="sm:hidden absolute -bottom-6 left-1/2 transform -translate-x-1/2 rotate-90">
                    <svg className="w-6 h-6 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
                
                <div className="bg-white rounded-lg shadow-sm p-5 sm:p-6 h-full border border-gray-100">
                  <span className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 bg-gradient-to-r from-blue-600 to-violet-600 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {step.number}
                  </span>
                  <div className="flex flex-col h-full">
                    <div className="mb-3 sm:mb-4">{step.icon}</div>
                    <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-sm sm:text-base text-gray-500 flex-grow">{step.description}</p>
                  </div>
                </div>
                
                {/* Connector arrows for tablet and desktop (displays between cards horizontally) */}
                {index < steps.length - 1 && (
                  <div className="hidden sm:block md:hidden absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <svg className="w-6 h-6 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
                
                {/* Connector arrows for large desktop (displays between cards horizontally) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-5 transform -translate-y-1/2">
                    <svg className="w-8 h-8 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 