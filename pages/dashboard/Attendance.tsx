
import React, { useState } from 'react';
import { MOCK_CLASSES, MOCK_STUDENTS } from '../../constants';
import { AttendanceStatus } from '../../types';
import { Save, UserCheck, MessageCircle, MapPin } from 'lucide-react';

const Attendance: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState(MOCK_CLASSES[0].id);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceData, setAttendanceData] = useState<Record<string, AttendanceStatus>>({});
  const [loading, setLoading] = useState(false);

  // Filter students by selected class
  const students = MOCK_STUDENTS.filter(s => s.classId === selectedClass);

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendanceData(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const submitAttendance = () => {
    setLoading(true);
    // Simulate API Call
    setTimeout(() => {
      setLoading(false);
      
      // Simulate WhatsApp Logic
      const absentees = students.filter(s => 
        attendanceData[s.id] === AttendanceStatus.ABSENT || 
        attendanceData[s.id] === AttendanceStatus.LATE
      );

      if (absentees.length > 0) {
        alert(`Attendance Saved! \n\nWhatsApp Notifications sent to ${absentees.length} parents via Webhook.`);
        console.log("Mock Webhook triggered for:", absentees.map(s => s.parentPhone));
      } else {
        alert("Attendance Saved! Everyone is present.");
      }
    }, 1500);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-dark">Smart Attendance</h1>
          <p className="text-gray-500">Mark attendance for your class</p>
        </div>
        
        <div className="flex gap-4">
            <select 
              value={selectedClass} 
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {MOCK_CLASSES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)}
              className="px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
            />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 font-semibold text-gray-600">Student Name</th>
                <th className="p-4 font-semibold text-gray-600">NISN</th>
                <th className="p-4 font-semibold text-gray-600">Method</th>
                <th className="p-4 font-semibold text-gray-600 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="p-4 flex items-center gap-3">
                    <img 
                      src={student.avatar} 
                      alt="" 
                      className="w-10 h-10 rounded-full object-cover" 
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="font-bold text-dark">{student.name}</p>
                      <p className="text-xs text-gray-400">Class {selectedClass === 'c1' ? '10 IPA 1' : '10 IPS 2'}</p>
                    </div>
                  </td>
                  <td className="p-4 text-gray-500 font-mono text-sm">{student.nisn}</td>
                  <td className="p-4">
                     <span className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded">
                       <MapPin size={12} /> Geo-Fence
                     </span>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-center bg-gray-100 p-1 rounded-lg w-max mx-auto">
                      {[AttendanceStatus.PRESENT, AttendanceStatus.LATE, AttendanceStatus.ABSENT, AttendanceStatus.SICK].map((status) => (
                        <button
                          key={status}
                          onClick={() => handleStatusChange(student.id, status)}
                          className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                            attendanceData[student.id] === status
                              ? status === AttendanceStatus.PRESENT 
                                ? 'bg-green-500 text-white shadow'
                                : status === AttendanceStatus.ABSENT
                                ? 'bg-red-500 text-white shadow'
                                : status === AttendanceStatus.LATE
                                ? 'bg-orange-400 text-white shadow'
                                : 'bg-blue-400 text-white shadow'
                              : 'text-gray-400 hover:text-gray-600'
                          }`}
                        >
                          {status.charAt(0)}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 bg-gray-50 flex justify-end">
          <button 
            onClick={submitAttendance}
            disabled={loading}
            className="flex items-center gap-2 bg-primary hover:bg-teal-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-teal-200 transition disabled:opacity-70"
          >
            {loading ? 'Saving...' : (
              <>
                <Save size={18} />
                Save & Notify Parents
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
