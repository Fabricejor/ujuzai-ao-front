'use client';

import { useState, ReactNode } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface Step {
  id: string;
  title: string;
  description: string;
  component: ReactNode;
  isValid?: boolean;
}

interface MultiStepFormProps {
  steps: Step[];
  onComplete?: (data: any) => void;
  className?: string;
}

export default function MultiStepForm({ steps, onComplete, className = '' }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<any>({});

  const goToNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const goToStep = (stepIndex: number) => {
    if (stepIndex >= 0 && stepIndex < steps.length) {
      setCurrentStep(stepIndex);
    }
  };

  const updateFormData = (stepData: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [steps[currentStep].id]: stepData
    }));
  };

  const handleComplete = () => {
    if (onComplete) {
      onComplete(formData);
    }
  };

  const isCurrentStepValid = () => {
    return steps[currentStep]?.isValid ?? true;
  };

  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium cursor-pointer transition-colors ${
                  index <= currentStep
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
                onClick={() => goToStep(index)}
              >
                {index + 1}
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-4 rounded transition-colors ${
                    index < currentStep ? 'bg-amber-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        
        {/* Step Info */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {steps[currentStep]?.title}
          </h2>
          <p className="text-gray-600">
            {steps[currentStep]?.description}
          </p>
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
        {steps[currentStep]?.component}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          type="button"
          onClick={goToPrevious}
          disabled={currentStep === 0}
          className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
            currentStep === 0
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          <ChevronLeftIcon className="w-5 h-5 mr-2" />
          Précédent
        </button>

        <div className="flex space-x-4">
          {!isLastStep ? (
            <button
              type="button"
              onClick={goToNext}
              disabled={!isCurrentStepValid()}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                isCurrentStepValid()
                  ? 'bg-amber-500 text-white hover:bg-amber-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Suivant
              <ChevronRightIcon className="w-5 h-5 ml-2" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleComplete}
              disabled={!isCurrentStepValid()}
              className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                isCurrentStepValid()
                  ? 'bg-green-500 text-white hover:bg-green-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Terminer
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 