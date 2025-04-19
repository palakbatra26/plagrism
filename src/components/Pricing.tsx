'use client';

import Link from 'next/link';
import { SignUpButton, SignedIn, SignedOut } from '@clerk/nextjs';

export function Pricing() {
  const plans = [
    {
      name: 'Free',
      price: 0,
      description: 'Basic features for students and casual users',
      features: [
        '3 AI detection checks per day',
        '2 plagiarism checks per day',
        'Limited result history (7 days)',
        'Basic reporting tools',
        'Email support'
      ],
      cta: 'Start for Free',
      highlight: false
    },
    {
      name: 'Pro',
      price: 19,
      description: 'Everything you need for professional usage',
      features: [
        'Unlimited AI detection checks',
        '20 plagiarism checks per day',
        'Extended result history (90 days)',
        'Advanced reporting tools',
        'API access (100 req/day)',
        'Priority support'
      ],
      cta: 'Get Pro',
      highlight: true
    },
    {
      name: 'Team',
      price: 49,
      description: 'For teams and organizations with advanced needs',
      features: [
        'Unlimited AI detection checks',
        'Unlimited plagiarism checks',
        'Permanent result history',
        'Team management features',
        'Customizable reports',
        'Full API access',
        'Dedicated support'
      ],
      cta: 'Contact Sales',
      highlight: false
    }
  ];
  
  return (
    <section id="pricing" className="py-12 sm:py-16 md:py-24 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold block bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent md:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2 sm:px-0">
            Choose the plan that works best for your needs. All plans include our core AI detection technology.
          </p>
        </div>
        
        <div className="mt-10 sm:mt-12 md:mt-16 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`rounded-lg shadow-sm divide-y divide-gray-200 ${
                plan.highlight ? 'ring-2 ring-blue-600' : ''
              }`}
            >
              <div className="p-5 sm:p-6 bg-white h-full flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900">{plan.name}</h3>
                <div className="mt-4 flex items-baseline text-gray-900">
                  <span className="text-3xl sm:text-4xl font-extrabold tracking-tight">${plan.price}</span>
                  <span className="ml-1 text-lg sm:text-xl font-semibold">/month</span>
                </div>
                <p className="mt-2 text-sm sm:text-base text-gray-500">{plan.description}</p>
                
                <ul className="mt-6 space-y-3 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="h-5 w-5 text-green-500 shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2 text-sm sm:text-base text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 sm:mt-8">
                  {plan.name === 'Team' ? (
                    <Link
                      href="/contact"
                      className={`block w-full rounded-md px-4 py-2 text-center text-base font-medium ${
                        plan.highlight 
                          ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:opacity-90' 
                          : 'bg-gray-50 text-gray-900 border border-gray-200 hover:bg-gray-100'
                      } transition`}
                    >
                      {plan.cta}
                    </Link>
                  ) : (
                    <>
                      <SignedOut>
                        <SignUpButton mode="modal">
                          <button
                            className={`block w-full rounded-md px-4 py-2 text-center text-base font-medium ${
                              plan.highlight 
                                ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:opacity-90' 
                                : 'bg-gray-50 text-gray-900 border border-gray-200 hover:bg-gray-100'
                            } transition cursor-pointer`}
                          >
                            {plan.cta}
                          </button>
                        </SignUpButton>
                      </SignedOut>
                      <SignedIn>
                        <Link
                          href={plan.name === 'Free' ? '/dashboard' : '/billing'}
                          className={`block w-full rounded-md px-4 py-2 text-center text-base font-medium ${
                            plan.highlight 
                              ? 'bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:opacity-90' 
                              : 'bg-gray-50 text-gray-900 border border-gray-200 hover:bg-gray-100'
                          } transition`}
                        >
                          {plan.name === 'Free' ? 'Go to Dashboard' : plan.cta}
                        </Link>
                      </SignedIn>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-10 sm:mt-12 text-center">
          <p className="text-sm sm:text-base text-gray-500">
            Need a custom plan? <Link href="/contact" className="text-blue-600 font-medium">Contact our sales team</Link>
          </p>
        </div>
      </div>
    </section>
  );
} 