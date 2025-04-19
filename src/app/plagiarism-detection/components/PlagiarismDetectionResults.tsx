'use client';

import React, { useState, useEffect } from 'react';
import { PlagiarismResponse, PlagiarismItem } from '@/lib/edenai';

interface PlagiarismDetectionResultsProps {
  results: PlagiarismResponse;
  title?: string;
  isDemo: boolean;
}

const PlagiarismDetectionResults: React.FC<PlagiarismDetectionResultsProps> = ({
  results,
  title,
  isDemo
}) => {
  const [activeTab, setActiveTab] = useState<string>('summary');
  const [hasError, setHasError] = useState(false);
  
  // Get the provider's result (using originalityai as default)
  const provider = Object.keys(results)[0];
  const result = results[provider];
  
  useEffect(() => {
    // Validate the results structure when the component mounts or results change
    try {
      if (!results || !provider || !result || !result.items || !Array.isArray(result.items)) {
        console.error('Invalid plagiarism detection results format:', results);
        setHasError(true);
        return;
      }
      setHasError(false);
    } catch (err) {
      console.error('Error processing plagiarism detection results:', err);
      setHasError(true);
    }
  }, [results, provider, result]);

  // If there's an error with the results, show an error message
  if (hasError || !result || !result.items) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4 mt-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">
              No valid results found. Please try again.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Calculate stats - now safe to access result.items since we've checked above
  const totalItems = result.items.length;
  const plagiarizedItems = result.items.filter(item => 
    item.candidates && item.candidates.some(candidate => candidate.prediction === 'plagiarized')
  ).length;
  const plagiarismScore = result.plagia_score || 0;

  // Determine severity level
  let severityLevel = 'Low';
  let severityColor = 'text-green-600';
  let severityBgColor = 'bg-green-100';
  
  if (plagiarismScore >= 30) {
    severityLevel = 'High';
    severityColor = 'text-red-600';
    severityBgColor = 'bg-red-100';
  } else if (plagiarismScore >= 10) {
    severityLevel = 'Medium';
    severityColor = 'text-amber-600';
    severityBgColor = 'bg-amber-100';
  }

  return (
    <div className="mt-8 space-y-6">
      {isDemo && (
        <div className="bg-amber-50 border-l-4 border-amber-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-amber-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-amber-700">
                <strong>Demo Mode:</strong> This analysis is using simulated data and does not represent an actual plagiarism check.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Plagiarism Detection Results</h2>
          
          {title && (
            <p className="text-gray-600 text-sm mb-4">
              Title: <span className="font-semibold">{title}</span>
            </p>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Plagiarism Score</p>
              <div className="flex items-center">
                <span className={`text-2xl font-bold ${severityColor}`}>
                  {plagiarismScore.toFixed(1)}%
                </span>
                <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${severityBgColor} ${severityColor}`}>
                  {severityLevel}
                </span>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Plagiarized Segments</p>
              <p className="text-2xl font-bold text-gray-900">
                {plagiarizedItems} <span className="text-sm text-gray-500">of {totalItems}</span>
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <p className="text-sm text-gray-500 mb-1">Sources Found</p>
              <p className="text-2xl font-bold text-gray-900">
                {result.items.reduce((total, item) => total + (item.candidates ? item.candidates.length : 0), 0)}
              </p>
            </div>
          </div>

          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('summary')}
                className={`${
                  activeTab === 'summary'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Summary
              </button>
              <button
                onClick={() => setActiveTab('detailed')}
                className={`${
                  activeTab === 'detailed'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Detailed Results
              </button>
            </nav>
          </div>

          <div className="mt-6">
            {activeTab === 'summary' ? (
              <div className="space-y-4">
                <p className="text-gray-600">
                  {plagiarismScore < 5 ? (
                    <>
                      <span className="font-semibold text-green-600">No significant plagiarism detected.</span> The content appears to be mostly original.
                    </>
                  ) : plagiarismScore < 30 ? (
                    <>
                      <span className="font-semibold text-amber-600">Some potential plagiarism detected.</span> We found {plagiarizedItems} segments with matching content from other sources.
                    </>
                  ) : (
                    <>
                      <span className="font-semibold text-red-600">Significant plagiarism detected.</span> The content contains multiple segments that match other sources.
                    </>
                  )}
                </p>
                
                {plagiarizedItems > 0 && (
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Key Findings:</h3>
                    <ul className="space-y-2">
                      {result.items.filter(item => 
                        item.candidates && item.candidates.some(candidate => candidate.prediction === 'plagiarized')
                      ).slice(0, 3).map((item, index) => (
                        <li key={index} className="border-l-4 border-amber-400 pl-4 py-2">
                          <p className="text-gray-600">{truncateText(item.text, 100)}</p>
                          {item.candidates && item.candidates.length > 0 && (
                            <p className="text-sm text-gray-500 mt-1">
                              Source: <a href={item.candidates[0].url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{getDomainFromUrl(item.candidates[0].url)}</a>
                            </p>
                          )}
                        </li>
                      ))}
                    </ul>
                    {plagiarizedItems > 3 && (
                      <p className="text-sm text-gray-500 mt-2">
                        + {plagiarizedItems - 3} more matched segments. View detailed results for more information.
                      </p>
                    )}
                  </div>
                )}
                
                <div className="bg-gray-50 p-4 rounded-lg mt-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">Recommendations:</h3>
                  <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                    {plagiarismScore < 5 ? (
                      <>
                        <li>Your content appears to be original. Great work!</li>
                        <li>Continue to cite any references when using external information.</li>
                      </>
                    ) : plagiarismScore < 30 ? (
                      <>
                        <li>Review the highlighted segments and ensure proper attribution.</li>
                        <li>Consider paraphrasing or directly quoting the matched content with citations.</li>
                        <li>Check the detailed results to see all matched sources.</li>
                      </>
                    ) : (
                      <>
                        <li>Significant revision recommended to reduce plagiarism.</li>
                        <li>Properly cite all sources using appropriate citation style.</li>
                        <li>Rewrite content in your own words while maintaining the original meaning.</li>
                        <li>Use direct quotes with proper attribution when necessary.</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {result.items.map((item, index) => (
                  <PlagiarismItemDetail key={index} item={item} index={index} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface PlagiarismItemDetailProps {
  item: PlagiarismItem;
  index: number;
}

const PlagiarismItemDetail: React.FC<PlagiarismItemDetailProps> = ({ item, index }) => {
  const hasPlagiarism = item.candidates && item.candidates.some(c => c.prediction === 'plagiarized');
  
  return (
    <div className={`p-4 rounded-lg border ${hasPlagiarism ? 'border-amber-300 bg-amber-50' : 'border-gray-200 bg-gray-50'}`}>
      <h3 className="font-medium text-gray-900 mb-2">Segment {index + 1}</h3>
      <p className="text-gray-800 mb-3">{item.text}</p>
      
      {item.candidates && item.candidates.length > 0 ? (
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-700">
            Matching Sources ({item.candidates.length}):
          </h4>
          <div className="space-y-3">
            {item.candidates.map((candidate, cIndex) => (
              <div key={cIndex} className="bg-white p-3 rounded border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    candidate.prediction === 'plagiarized' ? 'bg-amber-100 text-amber-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {candidate.prediction === 'plagiarized' ? 'Plagiarized' : 'Original'}
                  </span>
                  <span className="text-sm text-gray-500">
                    Match score: <span className="font-medium">{(candidate.plagia_score * 100).toFixed(1)}%</span>
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">Source:</span>{' '}
                  <a href={candidate.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {getDomainFromUrl(candidate.url)}
                  </a>
                </p>
                <div className="bg-gray-50 p-2 rounded border border-gray-200 text-sm">
                  <p className="text-gray-700">
                    <span className="font-medium">Matching text:</span>{' '}
                    {candidate.plagiarized_text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-500 italic">No matching sources found for this segment.</p>
      )}
    </div>
  );
};

// Helper function to truncate text with ellipsis
function truncateText(text: string, maxLength: number): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

// Helper function to extract domain from URL
function getDomainFromUrl(url: string): string {
  if (!url) return 'Unknown source';
  try {
    const domain = new URL(url).hostname;
    return domain.replace(/^www\./, '');
  } catch {
    return url;
  }
}

export default PlagiarismDetectionResults; 