import { useState } from 'react';
import { mockAgent } from './mocks/mockAgent';

interface Response {
  emoji: string;
  advice: string;
}

interface HistoryEntry extends Response {
  timestamp: Date;
}

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState<Response | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      const result = await mockAgent.invoke('analyzeMood', { text: input });
      setResponse(result);
      setHistory(prev => [
        { ...result, timestamp: new Date() },
        ...prev.slice(0, 2)
      ]);
      setInput('');
    } catch (error) {
      console.error('Error analyzing mood:', error);
    }
  };

  const getEmotionColor = (emoji: string) => {
    if (emoji.includes('😊') || emoji.includes('🌞') || emoji.includes('✨')) return 'bg-yellow-50 text-yellow-700';
    if (emoji.includes('😔') || emoji.includes('😢') || emoji.includes('💔')) return 'bg-blue-50 text-blue-700';
    if (emoji.includes('😡') || emoji.includes('😤') || emoji.includes('🤬')) return 'bg-red-50 text-red-700';
    if (emoji.includes('😟') || emoji.includes('💫') || emoji.includes('💭')) return 'bg-purple-50 text-purple-700';
    return 'bg-gray-50 text-gray-700';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-2">
            🧠 Mood Advisor
          </h1>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="How are you feeling today?"
              className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
              rows={4}
            />
          </div>
          
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:scale-95 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            <span className="mr-2">🧠</span> Get Advice
          </button>
        </form>

        {response && (
          <div className="mt-8">
            <div className={`p-6 rounded-2xl shadow-md ${getEmotionColor(response.emoji)}`}>
              <div className="flex items-center space-x-4">
                <span className="text-3xl">{response.emoji}</span>
                <div className="flex-1">
                  <p className="text-lg font-medium">{response.advice}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {history.length > 0 && (
          <div className="mt-8 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Mood History</h2>
            {history.map((entry, index) => (
              <div key={index} className="relative">
                <div className={`p-6 rounded-2xl shadow-md ${getEmotionColor(entry.emoji)}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-3xl">{entry.emoji}</span>
                      <div className="flex-1">
                        <p className="text-lg font-medium">{entry.advice}</p>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 text-sm text-gray-500">
                      {new Date(entry.timestamp).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
