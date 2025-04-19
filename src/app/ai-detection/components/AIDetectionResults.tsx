'use client';

import React, { useState, useEffect } from 'react';
import { AIDetectionResponse } from '@/lib/edenai';

interface AIDetectionResultsProps {
  results: AIDetectionResponse;
  isDemo?: boolean;
}

const AIDetectionResults: React.FC<AIDetectionResultsProps> = ({ 
  results, 
  isDemo = false
}) => {
  const [activeTab, setActiveTab] = useState<string>('summary');
  const provider = 'winstonai'; // We're using Winston AI provider
  const aiScore = results[provider]?.ai_score || 0;
  const items = results[provider]?.items || [];
  const [hasError, setHasError] = useState(false);
  
  // Create a more detailed text breakdown for highlighting purposes
  const [textMap, setTextMap] = useState<{
    segments: {text: string; isAI: boolean; score: number}[];
  }>({ segments: [] });

  useEffect(() => {
    try {
      // Validate response format
      if (!results || !results[provider] || !results[provider].items) {
        console.error('Invalid AI detection results format:', results);
        setHasError(true);
        return;
      }
      
      // Calculate the segments directly from the results
      const segments = results[provider].items.map(item => ({
        text: item.text,
        isAI: item.prediction === 'ai-generated',
        score: item.ai_score
      }));
      
      setTextMap({ segments });
      setHasError(false);
    } catch (error) {
      console.error('Error processing AI detection results:', error);
      setHasError(true);
    }
  }, [results, provider]);

  // If there's an error with the results, show an error message
  if (hasError) {
    return (
      <div className="mt-8 pt-8 border-t border-gray-200">
        <div className="bg-red-50 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error displaying analysis results</h3>
              <p className="mt-2 text-sm text-red-700">
                We encountered an issue processing the results. Please try again with a different text sample.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get a human-friendly description of the AI probability
  const getAIDescription = (score: number): string => {
    if (score >= 0.99) return 'Almost certainly AI-generated';
    if (score >= 0.9) return 'Very likely AI-generated';
    if (score >= 0.7) return 'Likely AI-generated';
    if (score >= 0.4) return 'Possibly AI-generated';
    if (score >= 0.2) return 'Possibly human-written';
    if (score >= 0.1) return 'Likely human-written';
    return 'Almost certainly human-written';
  };

  // Get color class based on AI probability
  const getScoreColorClass = (score: number): string => {
    if (score >= 0.9) return 'text-red-600';
    if (score >= 0.7) return 'text-orange-600';
    if (score >= 0.3) return 'text-yellow-600';
    return 'text-green-600';
  };

  // Format percentage
  const formatPercent = (score: number): string => {
    return (score * 100).toFixed(1) + '%';
  };

  // Check if we have any segments to display
  if (textMap.segments.length === 0) {
    return (
      <div className="mt-8 pt-8 border-t border-gray-200">
        <div className="bg-yellow-50 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">No analysis segments available</h3>
              <p className="mt-2 text-sm text-yellow-700">
                The AI detection model couldn't properly segment the text. Try a longer text with complete sentences.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Analysis Results</h2>
      
      {isDemo && (
        <div className="mb-6 bg-amber-50 border border-amber-200 rounded-md p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-amber-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-amber-800">Demo Mode</h3>
              <p className="mt-1 text-sm text-amber-700">
                These results are simulated and do not represent actual AI detection analysis. 
                In demo mode, detection scores are randomly generated for demonstration purposes.
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
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
            Detailed Analysis
          </button>
          <button
            onClick={() => setActiveTab('highlighted')}
            className={`${
              activeTab === 'highlighted'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
          >
            Highlighted Text
          </button>
        </nav>
      </div>
      
      {/* Summary Tab */}
      {activeTab === 'summary' && (
        <div>
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="mb-4">
              <div className="text-sm font-medium text-gray-500 mb-1">
                Overall AI Probability
              </div>
              <div className="flex items-center">
                <div className={`text-3xl font-bold ${getScoreColorClass(aiScore)}`}>
                  {formatPercent(aiScore)}
                </div>
                <div className="ml-4 text-lg font-medium text-gray-700">
                  {getAIDescription(aiScore)}
                </div>
              </div>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
              <div 
                className="bg-gradient-to-r from-green-500 to-red-500 h-2.5 rounded-full" 
                style={{ width: `${aiScore * 100}%` }}
              ></div>
            </div>
            
            <div className="text-sm text-gray-500">
              Based on our analysis, this text shows {aiScore >= 0.5 ? 'strong' : 'some'} characteristics of {aiScore >= 0.5 ? 'AI-generated' : 'human-written'} content.
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Key Findings</h3>
              <ul className="space-y-3 text-black">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>
                    Analyzed {textMap.segments.length} text segments
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>
                    {textMap.segments.filter(s => s.isAI).length} segments show AI characteristics
                  </span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-blue-500 mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>
                    Powered by {isDemo ? 'Demo' : 'Winston AI'} detection algorithm
                  </span>
                </li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">What This Means</h3>
              <p className="text-gray-600 mb-4">
                {aiScore >= 0.9 ? (
                  'This text has a very high probability of being AI-generated. It shows typical patterns and characteristics of content created by language models like ChatGPT, Claude, or other AI systems.'
                ) : aiScore >= 0.7 ? (
                  'This text likely contains AI-generated content. It displays several patterns characteristic of AI writing, though some portions may be human-written or edited.'
                ) : aiScore >= 0.4 ? (
                  'This text shows a mix of AI and human characteristics. It may be partially AI-generated, heavily edited by a human, or written by a human mimicking AI style.'
                ) : (
                  'This text has a high probability of being human-written. It shows natural language patterns and lacks many characteristics typical of AI-generated content.'
                )}
              </p>
              <div className="text-sm text-gray-500">
                <p>Results should be considered as one factor in your assessment and not taken as definitive proof.</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Detailed Analysis Tab */}
      {activeTab === 'detailed' && (
        <div>
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg mb-6">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Text Segment</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-32">AI Score</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-48">Assessment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {items.map((item, index) => (
                  <tr key={index}>
                    <td className="whitespace-normal py-4 pl-4 pr-3 text-sm text-gray-900 sm:pl-6">{item.text}</td>
                    <td className={`whitespace-nowrap px-3 py-4 text-sm font-medium ${getScoreColorClass(item.ai_score)}`}>
                      {formatPercent(item.ai_score)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                      {item.prediction === 'ai-generated' ? 'AI-Generated' : 'Human-Written'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* Highlighted Text Tab */}
      {activeTab === 'highlighted' && (
        <div>
          <div className="prose max-w-none mb-4">
            <p className="text-sm text-gray-500 mb-4">
              Text is highlighted according to its AI probability score. 
              <span className="inline-block mx-1 px-2 py-1 rounded bg-red-100 text-red-800">Red</span> indicates 
              higher probability of AI-generated content, while 
              <span className="inline-block mx-1 px-2 py-1 rounded bg-green-100 text-green-800">green</span> indicates 
              likely human-written content.
            </p>
            
            <div className="p-4 border border-gray-200 text-black rounded-lg bg-white overflow-auto">
              {textMap.segments.map((segment, index) => {
                // Calculate background color based on AI score
                const getHighlightStyle = (score: number) => {
                  if (score >= 0.9) return 'bg-red-100';
                  if (score >= 0.7) return 'bg-orange-100';
                  if (score >= 0.4) return 'bg-yellow-50';
                  if (score >= 0.2) return 'bg-green-50';
                  return 'bg-green-100';
                };
                
                return (
                  <span 
                    key={index} 
                    className={`${getHighlightStyle(segment.score)} rounded px-1 text-black`}
                    title={`AI probability: ${formatPercent(segment.score)}`}
                  >
                    {segment.text}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIDetectionResults; 