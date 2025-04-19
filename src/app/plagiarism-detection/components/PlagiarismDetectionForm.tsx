'use client';

import React, { useEffect, useState } from 'react';

interface PlagiarismDetectionFormProps {
  text: string;
  setText: (text: string) => void;
  title: string;
  setTitle: (title: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  error: string | null;
}

const PlagiarismDetectionForm: React.FC<PlagiarismDetectionFormProps> = ({
  text,
  setText,
  title,
  setTitle,
  onSubmit,
  isLoading,
  error
}) => {
  const [wordCount, setWordCount] = useState(0);
  const [validationError, setValidationError] = useState<string | null>(null);
  
  useEffect(() => {
    const words = text.trim() ? text.trim().split(/\s+/) : [];
    setWordCount(words.length);
    
    // Clear validation error when text changes
    if (validationError) {
      setValidationError(null);
    }
  }, [text, validationError]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate before submitting
    if (!text.trim()) {
      setValidationError('Please enter some text to analyze.');
      return;
    }

    if (wordCount < 10) {
      setValidationError('Please enter at least 10 words for accurate analysis.');
      return;
    }
    
    // If validation passes, call the parent's onSubmit
    onSubmit(e);
  };
  
  const handleSampleText = () => {
    setTitle("The Impact of Artificial Intelligence on Society");
    const sampleText = `Artificial intelligence (AI) is transforming the way we work, learn, and communicate. From voice assistants and recommendation systems to autonomous vehicles and medical diagnostics, AI technologies are becoming increasingly integrated into our daily lives. These systems analyze vast amounts of data to identify patterns, make predictions, and automate tasks that once required human intelligence.

While AI offers tremendous benefits in efficiency and innovation, it also raises important questions about privacy, bias, accountability, and the future of work. As these technologies continue to evolve, society faces the challenge of harnessing their potential while addressing ethical concerns and ensuring that AI development benefits humanity as a whole.

The development of responsible AI requires collaboration among technologists, policymakers, ethicists, and the broader public to establish guidelines, standards, and regulations that align with human values and societal goals.`;
    setText(sampleText);
  };

  // Text length check
  const textTooShort = wordCount < 10;
  const textIdealLength = wordCount >= 50 && wordCount <= 1000;
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title (Optional)
          </label>
        </div>
        <input
          type="text"
          id="title"
          name="title"
          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder="Enter a title for the text (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isLoading}
        />
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Paste your text below
          </label>
          <button
            type="button"
            onClick={handleSampleText}
            className="text-blue-600 text-sm hover:text-blue-800"
          >
            Use sample text
          </button>
        </div>
        <textarea
          id="content"
          name="content"
          rows={8}
          className="shadow-sm focus:ring-blue-500 text-black focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md resize-none"
          placeholder="Enter text to check for plagiarism..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isLoading}
        />
        {(error || validationError) && (
          <p className="mt-2 text-sm text-red-600">{error || validationError}</p>
        )}
        <div className="mt-2 text-xs text-gray-500 flex justify-between items-center">
          <div className={`${textTooShort && text.trim() ? 'text-amber-600 font-medium' : ''}`}>
            {wordCount} words {textTooShort && text.trim() ? '(minimum 10 words required)' : ''}
          </div>
          <div className={textIdealLength ? 'text-green-600' : 'text-gray-500'}>
            {textIdealLength ? '✓ Ideal length for analysis' : 'For best results, use 50-1000 words'}
          </div>
        </div>
        
        <div className="mt-4 bg-blue-50 rounded-md p-3 text-sm text-blue-800 flex">
          <svg className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div>
            <p className="font-medium">For best results:</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>Use complete paragraphs rather than fragments</li>
              <li>Include at least 50 words for higher accuracy</li>
              <li>Text in any language is accepted</li>
              <li>Adding a title may improve detection results</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isLoading || !text.trim() || textTooShort}
          className={`px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-violet-600 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            isLoading || !text.trim() || textTooShort ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isLoading ? (
            <div className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Checking Plagiarism...
            </div>
          ) : 'Check for Plagiarism'}
        </button>
      </div>
    </form>
  );
};

export default PlagiarismDetectionForm; 