import React from 'react';
import { ChevronDown, ChevronUp, Minus, Plus } from 'lucide-react';

import PropTypes from 'prop-types';

const FAQCard = ({ question, answer, isOpen = false }) => {
    const [isExpanded, setIsExpanded] = React.useState(isOpen);

    return (
        <div className="border shadow-lg border-gray-200 rounded-lg mb-4">
            <button
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <span className="font-semibold text-gray-900">{question}</span>
                {isExpanded ? (
                    <Minus className="h-5 text-blue-600 w-5" />
                ) : (
                    <Plus className="h-5 w-5 text-blue-600" />
                )}
            </button>

            {isExpanded && (
                <div className="px-6 pb-4">
                    <div className="text-gray-600 leading-relaxed">
                        {answer}
                    </div>
                </div>
            )}
        </div>
    );
};

FAQCard.propTypes = {
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    isOpen: PropTypes.bool,
};

export default FAQCard;