import React, { useState } from 'react';
import { MOCK_ANNOUNCEMENTS } from '../../constants';
import { Sparkles, Calendar, Book, MessageCircle, Send, Camera } from 'lucide-react';
import { askAiTutor } from '../../services/geminiService';
import { useNavigate } from 'react-router-dom';

const StudentHome: React.FC = () => {
  const navigate = useNavigate();
  // AI State
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleAiAsk = async () => {
    if (!aiQuery.trim()) return;
    setIsAiLoading(true);
    setAiResponse('');
    const answer = await askAiTutor(aiQuery, 'General School Subject');
    setAiResponse(answer);
    setIsAiLoading(false);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Welcome Card */}
        <div className="col-span-1 md:col-span-2 bg-gradient-to-r from-primary to-teal-400 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-teal-100">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-2">Hello, Clara! 👋</h1>
            <p className="opacity-90 mb-6">You have 2 exams coming up this week. Don't forget to study!</p>
            <button 
              onClick={() => navigate('/dashboard/schedule')}
              className="bg-white text-primary px-6 py-2 rounded-full font-bold text-sm shadow hover:bg-gray-50 transition"
            >
              View Schedule
            </button>
          </div>
          <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-10 translate-y-10">
            <Book size={200} />
          </div>
        </div>

        {/* Quick Attendance Widget */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
          <button 
            onClick={() => navigate('/dashboard/student-attendance')}
            className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center text-secondary mb-4 hover:scale-110 transition-transform shadow-sm"
          >
             <Camera size={32} />
          </button>
          <h3 className="font-bold text-dark text-lg">Absen Sekarang</h3>
          <p className="text-gray-500 text-sm">Belum melakukan presensi hari ini</p>
          <button 
             onClick={() => navigate('/dashboard/student-attendance')}
             className="mt-4 text-sm font-bold text-primary hover:underline"
          >
            Buka Kamera
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Announcements */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-xl text-dark">Announcements</h2>
            <button className="text-primary text-sm font-semibold">View All</button>
          </div>
          <div className="space-y-4">
            {MOCK_ANNOUNCEMENTS.map((ann) => (
              <div key={ann.id} className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-blue-50 transition">
                <div className={`w-2 h-full min-h-[40px] rounded-full ${
                  ann.type === 'urgent' ? 'bg-red-400' : ann.type === 'event' ? 'bg-secondary' : 'bg-primary'
                }`} />
                <div>
                  <h4 className="font-bold text-dark">{ann.title}</h4>
                  <p className="text-gray-500 text-sm line-clamp-2">{ann.content}</p>
                  <p className="text-xs text-gray-400 mt-2">{ann.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Tutor Widget */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
              <Sparkles size={16} />
            </div>
            <h2 className="font-bold text-xl text-dark">AI Tutor</h2>
          </div>
          
          <div className="flex-1 bg-gray-50 rounded-2xl p-4 mb-4 overflow-y-auto max-h-[300px]">
            {aiResponse ? (
              <div className="prose prose-sm text-gray-700">
                <p>{aiResponse}</p>
              </div>
            ) : (
              <p className="text-gray-400 text-center text-sm italic mt-10">
                Ask me anything about your homework! <br/> e.g., "Explain Pythagorean theorem"
              </p>
            )}
            {isAiLoading && (
              <div className="flex items-center justify-center mt-4 space-x-2">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
              </div>
            )}
          </div>

          <div className="relative">
            <input
              type="text"
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              placeholder="Ask a question..."
              className="w-full bg-gray-100 border-none rounded-xl py-3 pl-4 pr-12 text-sm focus:ring-2 focus:ring-primary focus:bg-white transition"
              onKeyDown={(e) => e.key === 'Enter' && handleAiAsk()}
            />
            <button 
              onClick={handleAiAsk}
              className="absolute right-2 top-2 p-1.5 bg-primary text-white rounded-lg hover:bg-teal-600 transition"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentHome;