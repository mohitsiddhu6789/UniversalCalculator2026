import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

const TEMPERATURE_CONVERTER_FAQ = [
  {
    question: 'How do temperature scales differ?',
    answer: 'Celsius: Water freezes at 0°C and boils at 100°C. Common in most countries. Fahrenheit: Water freezes at 32°F and boils at 212°F. Used mainly in USA. Kelvin: Absolute temperature scale where 0K is absolute zero (coldest possible). Used in science and physics.'
  },
  {
    question: 'What is absolute zero?',
    answer: 'Absolute zero (0K or −273.15°C or −459.67°F) is the lowest possible temperature - the point where all molecular motion stops theoretically. Nothing can be colder than absolute zero. It\'s the starting point for the Kelvin scale.'
  },
  {
    question: 'When should I use Kelvin?',
    answer: 'Use Kelvin in scientific and engineering calculations, physics experiments, chemistry formulas, and advanced calculations. Kelvin is the SI (International System) unit for temperature. It avoids negative numbers and is essential for gas laws and thermodynamics.'
  },
  {
    question: 'Can I convert between all three temperature scales?',
    answer: 'Yes! This converter supports bidirectional conversion between Celsius ↔ Fahrenheit, Celsius ↔ Kelvin, and Fahrenheit ↔ Kelvin. Enter any temperature in any scale, and it automatically converts to the other two scales in real-time.'
  },
  {
    question: 'What is room temperature in all scales?',
    answer: 'Room temperature ≈ 20°C = 68°F = 293.15K. This is a comfortable indoor temperature for most people. It\'s useful as a reference point for everyday temperature conversions.'
  },
  {
    question: 'Are the conversion formulas always the same?',
    answer: 'Yes, the conversion formulas are constant and universal: °F = (°C × 9/5) + 32, K = °C + 273.15, °C = (°F − 32) × 5/9. These are internationally standardized formulas used worldwide.'
  },
  {
    question: 'Why is Celsius based on water freezing/boiling?',
    answer: 'Celsius scale was designed for practicality: 0°C is water\'s freezing point and 100°C is water\'s boiling point (at sea level). This makes it easy to understand and remember, especially for everyday use and cooking.'
  },
  {
    question: 'Why does Fahrenheit seem like strange numbers?',
    answer: 'Fahrenheit scale was created by Daniel Fahrenheit who used different reference points. 32°F for water freezing and 212°F for water boiling may seem odd, but historically it made sense. It provides finer gradations for everyday temperatures.'
  },
  {
    question: 'What is the difference between Celsius and Centigrade?',
    answer: 'Celsius and Centigrade are the same temperature scale! "Centigrade" was the old name meaning "100 degrees" (referring to 100 degrees between freezing and boiling water). The name was officially changed to "Celsius" in 1948 after Anders Celsius who invented it.'
  },
  {
    question: 'How accurate do temperature conversions need to be?',
    answer: 'For cooking: 1-2 decimal places is sufficient. For weather: whole number is fine. For scientific work: 2-4 decimal places. For medical purposes: 1 decimal place is typically used. This converter provides 2 decimal places for most practical purposes.'
  },
  {
    question: 'What temperature scale do scientists use?',
    answer: 'Scientists primarily use Kelvin (K) as it\'s the SI unit. Celsius is used for general scientific work and comfort measurements. Fahrenheit is rarely used in scientific contexts. For thermodynamic equations, Kelvin is essential because it\'s an absolute scale starting at true zero.'
  },
  {
    question: 'Can temperature be negative in Kelvin?',
    answer: 'No, temperature in Kelvin cannot be negative. 0K is absolute zero - the lowest possible temperature. All Kelvin temperatures are positive. This is one advantage of the Kelvin scale for scientific calculations.'
  },
  {
    question: 'What is the most common temperature for body temperature?',
    answer: 'Normal human body temperature: 37°C = 98.6°F = 310.15K. A fever is typically defined as 38°C (100.4°F) or higher. For medical purposes, temperature is usually measured in Celsius in most countries and Fahrenheit in the USA.'
  },
  {
    question: 'What is the freezing point of other liquids?',
    answer: 'Different liquids freeze at different temperatures: Alcohol −114°C, Mercury −39°C, Olive Oil 0°C, Seawater −2°C. Only water is used for the standard reference points because it\'s common and its freezing/boiling points are consistent.'
  },
  {
    question: 'How do I quickly convert Celsius to Fahrenheit mentally?',
    answer: 'Quick approximation: °F ≈ (°C × 2) + 30. For example: 20°C ≈ 70°F, 30°C ≈ 90°F. For more accuracy, use the exact formula: °F = (°C × 9/5) + 32. The approximation is useful for quick mental calculations.'
  },
  {
    question: 'What is the boiling point of water at different altitudes?',
    answer: 'At sea level: 100°C (212°F). At high altitude, air pressure is lower, so water boils at lower temperatures. For example, at 2000m elevation: ~98°C (208°F). This affects cooking times and is important for high-altitude cooking.'
  },
  {
    question: 'Is there a temperature scale used in everyday life besides Celsius and Fahrenheit?',
    answer: 'No, Celsius and Fahrenheit are the only two commonly used temperature scales in daily life. Kelvin is used exclusively in science and engineering. Rankine (Fahrenheit-based absolute scale) exists but is rarely used today.'
  },
  {
    question: 'What temperature range can humans tolerate?',
    answer: 'Humans can survive: External exposure to roughly −50°C to 65°C (−58°F to 149°F) for short periods. Core body temperature must stay between 20°C−42°C (68°F−108°F) to survive. Normal functioning is around 37°C (98.6°F).'
  },
  {
    question: 'How do thermometers measure temperature?',
    answer: 'Different types: Mercury/Alcohol expansion thermometers use liquid expansion. Digital thermometers use electrical resistance changes. Infrared thermometers measure heat radiation. Thermocouples measure voltage changes. All convert physical changes into temperature readings.'
  },
  {
    question: 'Why is Kelvin important in chemistry?',
    answer: 'Kelvin is essential because gas laws (like ideal gas law: PV=nRT) require absolute temperature. Using Celsius would give incorrect results. Many chemical reactions\' rates depend on temperature in Kelvin. Scientific precision demands the use of Kelvin.'
  }
];

export default function TemperatureConverter({ onNavigate }) {
  const [celsius, setCelsius] = useState('');
  const [fahrenheit, setFahrenheit] = useState('');
  const [kelvin, setKelvin] = useState('');
  const [expandedFaqIndex, setExpandedFaqIndex] = useState(null);

  const handleCelsiusChange = (value) => {
    setCelsius(value);
    if (value === '' || isNaN(value)) {
      setFahrenheit('');
      setKelvin('');
    } else {
      const c = parseFloat(value);
      setFahrenheit(((c * 9/5) + 32).toFixed(2));
      setKelvin((c + 273.15).toFixed(2));
    }
  };

  const handleFahrenheitChange = (value) => {
    setFahrenheit(value);
    if (value === '' || isNaN(value)) {
      setCelsius('');
      setKelvin('');
    } else {
      const f = parseFloat(value);
      const c = (f - 32) * 5/9;
      setCelsius(c.toFixed(2));
      setKelvin((c + 273.15).toFixed(2));
    }
  };

  const handleKelvinChange = (value) => {
    setKelvin(value);
    if (value === '' || isNaN(value)) {
      setCelsius('');
      setFahrenheit('');
    } else {
      const k = parseFloat(value);
      const c = k - 273.15;
      setCelsius(c.toFixed(2));
      setFahrenheit(((c * 9/5) + 32).toFixed(2));
    }
  };

  const toggleFaq = (index) => {
    setExpandedFaqIndex(expandedFaqIndex === index ? null : index);
  };

  return (
    <>
      <Helmet>
        <title>Temperature Converter</title>
        <meta name="description" content="Convert between Celsius, Fahrenheit, and Kelvin" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-900 mb-2">🌡️ Temperature Converter</h1>
            <p className="text-lg text-slate-700">
              Convert between Celsius, Fahrenheit, and Kelvin scales
            </p>
          </div>

          {/* Converter */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="space-y-6">
              {/* Celsius */}
              <div className="border-l-4 border-blue-500 pl-6">
                <label className="block text-sm font-bold text-slate-900 mb-3">°C (Celsius)</label>
                <input
                  type="number"
                  value={celsius}
                  onChange={(e) => handleCelsiusChange(e.target.value)}
                  placeholder="Enter temperature"
                  className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:outline-none focus:border-blue-500 text-slate-900 font-semibold text-lg"
                />
              </div>

              {/* Fahrenheit */}
              <div className="border-l-4 border-orange-500 pl-6">
                <label className="block text-sm font-bold text-slate-900 mb-3">°F (Fahrenheit)</label>
                <input
                  type="number"
                  value={fahrenheit}
                  onChange={(e) => handleFahrenheitChange(e.target.value)}
                  placeholder="Enter temperature"
                  className="w-full px-4 py-3 border-2 border-orange-300 rounded-lg focus:outline-none focus:border-orange-500 text-slate-900 font-semibold text-lg"
                />
              </div>

              {/* Kelvin */}
              <div className="border-l-4 border-purple-500 pl-6">
                <label className="block text-sm font-bold text-slate-900 mb-3">K (Kelvin)</label>
                <input
                  type="number"
                  value={kelvin}
                  onChange={(e) => handleKelvinChange(e.target.value)}
                  placeholder="Enter temperature"
                  className="w-full px-4 py-3 border-2 border-purple-300 rounded-lg focus:outline-none focus:border-purple-500 text-slate-900 font-semibold text-lg"
                />
              </div>
            </div>

            {/* Conversion Formulas */}
            <div className="mt-8 p-6 bg-slate-50 rounded-lg border-2 border-slate-200">
              <h3 className="font-bold text-slate-900 mb-4">📐 Conversion Formulas</h3>
              <div className="space-y-3 text-sm text-slate-700 font-mono">
                <p><strong>°C to °F:</strong> (°C × 9/5) + 32</p>
                <p><strong>°F to °C:</strong> (°F − 32) × 5/9</p>
                <p><strong>°C to K:</strong> °C + 273.15</p>
                <p><strong>K to °C:</strong> K − 273.15</p>
                <p><strong>°F to K:</strong> (°F − 32) × 5/9 + 273.15</p>
              </div>
            </div>
          </div>

          {/* Reference Points */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-slate-900 mb-4">📚 Reference Points</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="font-bold text-slate-900">Water Freezes</p>
                <p>0°C = 32°F = 273.15K</p>
              </div>
              <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-500">
                <p className="font-bold text-slate-900">Room Temperature</p>
                <p>20°C = 68°F = 293.15K</p>
              </div>
              <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                <p className="font-bold text-slate-900">Water Boils</p>
                <p>100°C = 212°F = 373.15K</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
                <p className="font-bold text-slate-900">Absolute Zero</p>
                <p>−273.15°C = −459.67°F = 0K</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-l-4 border-blue-500">
              <h2 className="text-2xl font-bold text-slate-900">
                ❓ Temperature Converter FAQ
              </h2>
              <p className="text-slate-700 text-sm mt-1">Find answers to common questions about temperature scales and conversions</p>
            </div>

            {/* FAQ Items */}
            <div className="divide-y divide-slate-200">
              {TEMPERATURE_CONVERTER_FAQ.map((faq, index) => (
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
              <strong>💡 Tip:</strong> Use our Temperature Converter for quick conversions between temperature scales. Perfect for cooking, science experiments, weather information, and travel. Visit the Help page for comprehensive information about all calculators.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
