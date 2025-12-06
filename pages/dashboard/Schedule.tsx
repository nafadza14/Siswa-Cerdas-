import React from 'react';
import { Clock, MapPin } from 'lucide-react';

const Schedule: React.FC = () => {
  const schedule = [
    { time: '07:00 - 08:30', subject: 'Mathematics', teacher: 'Mr. Budi', room: 'Lab 1', color: 'bg-blue-100 text-blue-700' },
    { time: '08:30 - 10:00', subject: 'Physics', teacher: 'Mrs. Siti', room: 'Room 10A', color: 'bg-purple-100 text-purple-700' },
    { time: '10:00 - 10:30', subject: 'Break', teacher: '-', room: 'Canteen', color: 'bg-green-100 text-green-700' },
    { time: '10:30 - 12:00', subject: 'Bahasa Indonesia', teacher: 'Mr. Ahmad', room: 'Room 10A', color: 'bg-orange-100 text-orange-700' },
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
           <h1 className="text-2xl font-bold text-dark">Class Schedule</h1>
           <p className="text-gray-500">Today, {new Date().toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      <div className="space-y-4">
        {schedule.map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row items-start sm:items-center gap-6 hover:shadow-md transition">
             <div className="min-w-[140px]">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg text-sm font-bold ${item.color}`}>
                  <Clock size={16} />
                  {item.time.split(' - ')[0]}
                </div>
                <p className="text-xs text-gray-400 mt-1 pl-1">Until {item.time.split(' - ')[1]}</p>
             </div>

             <div className="flex-1">
                <h3 className="text-lg font-bold text-dark">{item.subject}</h3>
                <p className="text-gray-500 text-sm">Teacher: {item.teacher}</p>
             </div>

             <div className="flex items-center gap-2 text-gray-400 text-sm font-medium">
                <MapPin size={16} />
                {item.room}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Schedule;