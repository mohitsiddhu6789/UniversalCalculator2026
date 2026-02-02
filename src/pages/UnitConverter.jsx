import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const CONVERSION_UNITS = {
  length: {
    name: 'Length',
    icon: '📏',
    units: {
      m: { name: 'Meter', factor: 1 },
      km: { name: 'Kilometer', factor: 0.001 },
      cm: { name: 'Centimeter', factor: 100 },
      mm: { name: 'Millimeter', factor: 1000 },
      mi: { name: 'Mile', factor: 0.000621371 },
      yd: { name: 'Yard', factor: 1.09361 },
      ft: { name: 'Foot', factor: 3.28084 },
      in: { name: 'Inch', factor: 39.3701 },
    },
  },
  weight: {
    name: 'Weight/Mass',
    icon: '⚖️',
    units: {
      kg: { name: 'Kilogram', factor: 1 },
      g: { name: 'Gram', factor: 1000 },
      mg: { name: 'Milligram', factor: 1000000 },
      lb: { name: 'Pound', factor: 2.20462 },
      oz: { name: 'Ounce', factor: 35.274 },
      ton: { name: 'Metric Ton', factor: 0.001 },
    },
  },
  volume: {
    name: 'Volume',
    icon: '🧪',
    units: {
      l: { name: 'Liter', factor: 1 },
      ml: { name: 'Milliliter', factor: 1000 },
      m3: { name: 'Cubic Meter', factor: 0.001 },
      gal: { name: 'US Gallon', factor: 0.264172 },
      pt: { name: 'Pint', factor: 2.11338 },
      cup: { name: 'Cup', factor: 4.22675 },
      oz: { name: 'Fluid Ounce', factor: 33.814 },
    },
  },
};

const UNIT_CONVERTER_FAQ = [
  {
    question: 'What units can I convert?',
    answer: 'The Unit Converter supports three categories: Length (m, km, cm, mm, mi, yd, ft, in), Weight/Mass (kg, g, mg, lb, oz, ton), and Volume (l, ml, m³, gal, pt, cup, oz). You can convert between any units within the same category.'
  },
  {
    question: 'How accurate are the conversions?',
    answer: 'Conversions are highly accurate with precision up to 6 decimal places. The calculator uses international standard conversion factors. For most practical purposes, 4-6 decimal places provide sufficient precision for accurate conversions.'
  },
  {
    question: 'Can I convert between metric and imperial units?',
    answer: 'Yes! The converter supports both metric (kg, meters, liters) and imperial (pounds, feet, gallons) systems and can convert between them seamlessly. For example: 1 kg = 2.20462 pounds, 1 meter = 3.28084 feet, 1 liter = 0.264172 gallons.'
  },
  {
    question: 'What is the conversion formula for length?',
    answer: 'Length conversions use the base unit meter: 1 km = 1000 m, 1 m = 100 cm, 1 m = 1000 mm, 1 m = 3.28084 feet, 1 m = 39.3701 inches, 1 m = 1.09361 yards, 1 km = 0.621371 miles.'
  },
  {
    question: 'What is the conversion formula for weight?',
    answer: 'Weight conversions use kilogram as the base: 1 kg = 1000 g, 1 kg = 1,000,000 mg, 1 kg = 2.20462 pounds, 1 kg = 35.274 ounces, 1 metric ton = 1000 kg. These factors are internationally standardized.'
  },
  {
    question: 'What is the conversion formula for volume?',
    answer: 'Volume conversions use liter as the base: 1 l = 1000 ml, 1 m³ = 1000 l, 1 l = 0.264172 US gallons, 1 l = 2.11338 pints, 1 l = 4.22675 cups, 1 l = 33.814 fluid ounces.'
  },
  {
    question: 'Can I convert weight to volume?',
    answer: 'You cannot directly convert weight to volume as they measure different properties. Weight measures how heavy an object is, while volume measures how much space it occupies. To convert between them, you need the density of the substance. Formula: Volume = Weight / Density.'
  },
  {
    question: 'What is a good use case for this unit converter?',
    answer: 'The Unit Converter is useful for: cooking recipes (cups to ml, ounces to grams), construction and carpentry (feet to meters, inches to cm), fitness and health (pounds to kg), international travel (miles to km, gallons to liters), and scientific work (various unit conversions).'
  },
  {
    question: 'What is the difference between pound (lb) and ounce (oz)?',
    answer: 'Both measure weight but different units: 1 pound (lb) = 16 ounces (oz) = 0.453592 kg. Pounds are used for heavier items, ounces for lighter items. In cooking, ounces are more common for ingredients. In body weight, pounds are standard in the US.'
  },
  {
    question: 'How many cups are in a liter?',
    answer: '1 liter = 4.22675 cups (US standard). For practical cooking purposes, approximately 4.2 cups or 4 1/4 cups equals 1 liter. This is useful for converting recipes from metric to US measurements.'
  },
  {
    question: 'What is a metric ton vs a pound?',
    answer: '1 metric ton = 1000 kg = 2,204.62 pounds. It\'s a large unit used for heavy items like vehicles, cargo, and industrial materials. A pound is much smaller (0.453592 kg) and used for everyday items.'
  },
  {
    question: 'How do I convert miles to kilometers?',
    answer: '1 mile (mi) = 1.60934 kilometers (km). To convert: multiply miles by 1.60934. For example: 5 miles = 5 × 1.60934 = 8.0467 km. Conversely: 1 km = 0.621371 miles.'
  },
  {
    question: 'What is the difference between US gallon and imperial gallon?',
    answer: 'This converter uses US gallons. 1 US gallon = 3.78541 liters, while 1 imperial gallon (UK) = 4.54609 liters. They are different! Always check which gallon is being used, especially in recipes or fuel measurements.'
  },
  {
    question: 'How accurate do conversions need to be for cooking?',
    answer: 'For most cooking, 2-3 significant figures is sufficient. For example: 1 cup ≈ 240 ml (not 236.588 ml). Most recipes are forgiving with slight variations. However, for baking, precision is more important as chemistry is involved.'
  },
  {
    question: 'How do I convert centimeters to inches?',
    answer: '1 inch (in) = 2.54 centimeters (cm). To convert: divide cm by 2.54. For example: 10 cm = 10 ÷ 2.54 = 3.94 inches. This is useful for clothing sizes, screen sizes, and height measurements.'
  },
  {
    question: 'Can I use this converter for scientific calculations?',
    answer: 'Yes! This converter maintains high precision (up to 6 decimal places) suitable for scientific work. It uses internationally standardized conversion factors. For extremely precise calculations, you may need specialized scientific tools.'
  },
  {
    question: 'What is the difference between gram and kilogram?',
    answer: '1 kilogram (kg) = 1000 grams (g). Kilogram is used for heavier items (weight of people, food packages), while gram is used for lighter items (medicine dosages, spices in cooking). Milligram (mg) = 0.001 g is used for very light items.'
  },
  {
    question: 'How do I convert fluid ounces to milliliters?',
    answer: '1 fluid ounce (fl oz) = 29.5735 milliliters (ml). To convert: multiply fl oz by 29.57. For example: 2 fl oz = 2 × 29.57 = 59.14 ml. This is useful for liquid medicines and cooking measurements.'
  },
  {
    question: 'Is there a difference between weight ounce and fluid ounce?',
    answer: 'Yes! Weight ounce (oz) measures mass: 1 oz = 28.3495 grams. Fluid ounce (fl oz) measures volume: 1 fl oz = 29.57 ml. They are different units! The converter shows both, so be careful to select the correct one.'
  },
  {
    question: 'How do I remember common conversions?',
    answer: 'Useful memory aids: 1 km ≈ 0.62 miles, 1 kg ≈ 2.2 pounds, 1 liter ≈ 0.26 gallons, 1 inch = 2.54 cm, 1 cup ≈ 240 ml. These approximate values are useful for quick mental calculations in everyday situations.'
  }
];

export default function UnitConverter({ onNavigate }) {
  const [inputValue, setInputValue] = useState('');
  const [category, setCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('km');
  const [expandedFaqIndex, setExpandedFaqIndex] = useState(null);

  const convert = () => {
    if (!inputValue || isNaN(inputValue)) return '';
    
    const units = CONVERSION_UNITS[category].units;
    const baseValue = inputValue / units[fromUnit].factor;
    const result = baseValue * units[toUnit].factor;
    
    return result.toFixed(6).replace(/\.?0+$/, '');
  };

  const currentUnits = CONVERSION_UNITS[category].units;

  const toggleFaq = (index) => {
    setExpandedFaqIndex(expandedFaqIndex === index ? null : index);
  };

  return (
    <>
      <Helmet>
        <title>Unit Converter</title>
        <meta name="description" content="Convert between different units of measurement" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-4 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* Header */}
          <div className="mb-4">
            <h4 className="text-2xl font-bold text-slate-900 mb-2">📏 Unit Converter</h4>
            <p className="text-sm text-slate-700">
              Convert between different units of measurement instantly
            </p>
          </div>

          {/* Category Selection */}
          <div className="bg-white rounded-lg shadow-lg p-4 mb-3">
            <h2 className="text-sm font-semibold text-slate-900 mb-2">Select Category</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {Object.entries(CONVERSION_UNITS).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => {
                    setCategory(key);
                    setFromUnit(Object.keys(value.units)[0]);
                    setToUnit(Object.keys(value.units)[1]);
                    setInputValue('');
                  }}
                  className={`p-3 rounded-lg font-bold transition duration-200 text-sm ${
                    category === key
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
                  }`}
                >
                  <span className="text-2xl">{value.icon}</span>
                  <p className="mt-2">{value.name}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Converter */}
          <div className="bg-white rounded-lg shadow-lg p-4 mb-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* From Unit */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">From</label>
                <input
                  type="number"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter value"
                  className="w-full px-3 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 text-slate-900 font-semibold text-sm mb-2"
                />
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 text-slate-900 font-semibold"
                >
                  {Object.entries(currentUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* To Unit */}
              <div>
                <label className="block text-sm font-bold text-slate-900 mb-2">To</label>
                <div className="px-3 py-2 border-2 border-green-300 rounded-lg bg-green-50 font-semibold text-sm text-green-700 mb-2 min-h-10 flex items-center">
                  {convert() || '0'}
                </div>
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="w-full px-3 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-blue-500 text-slate-900 font-semibold"
                >
                  {Object.entries(currentUnits).map(([key, unit]) => (
                    <option key={key} value={key}>
                      {unit.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Conversion Formula */}
            {inputValue && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                <p className="text-sm text-slate-700">
                  <strong>{inputValue}</strong> {currentUnits[fromUnit].name} = 
                  <strong className="text-blue-600 ml-2">{convert()}</strong> {currentUnits[toUnit].name}
                </p>
              </div>
            )}
          </div>

          {/* Quick Reference */}
          <div className="bg-white rounded-lg shadow-lg p-4 mb-3">
            <h3 className="text-lg font-bold text-slate-900 mb-2">📚 Quick Reference</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-slate-700">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-bold text-slate-900 text-sm mb-2">Length</h4>
                <p className="text-xs text-slate-700">1 km = 0.621371 miles</p>
                <p className="text-xs text-slate-700">1 m = 3.28084 feet</p>
              </div>
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="font-bold text-slate-900 text-sm mb-2">Weight</h4>
                <p className="text-xs text-slate-700">1 kg = 2.20462 pounds</p>
                <p className="text-xs text-slate-700">1 ton = 1000 kg</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h4 className="font-bold text-slate-900 text-sm mb-2">Volume</h4>
                <p className="text-xs text-slate-700">1 liter = 0.264172 gallons</p>
                <p className="text-xs text-slate-700">1 m³ = 1000 liters</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-l-4 border-blue-500">
              <h2 className="text-lg font-bold text-slate-900">
                ❓ Unit Converter FAQ
              </h2>
              <p className="text-slate-700 text-sm mt-1">Find answers to common questions about unit conversions and measurements</p>
            </div>

            {/* FAQ Items */}
            <div className="divide-y divide-slate-200">
              {UNIT_CONVERTER_FAQ.map((faq, index) => (
                <div key={index} className="p-6">
                  {/* Question */}
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-start justify-between gap-4 text-left hover:text-blue-600 transition duration-200"
                  >
                    <h3 className="font-semibold text-slate-900 flex-1">
                      {faq.question}
                    </h3>
                    <span className={`flex-shrink-0 text-2xl transition-transform duration-300 ${expandedFaqIndex === index ? 'rotate-180' : ''}`}>
                      📖
                    </span>
                  </button>

                  {/* Answer */}
                  {expandedFaqIndex === index && (
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <p className="text-slate-700 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Footer Info */}
          <div className="mt-12 p-6 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
            <p className="text-slate-700">
              <strong>💡 Tip:</strong> Use our Unit Converter for quick conversions in cooking, travel, fitness, and scientific work. For best accuracy with decimals, round to 2-4 significant figures for practical purposes. Visit the Help page for comprehensive information about all calculators.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
