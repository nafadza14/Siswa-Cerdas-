
import { UserRole, Student, ClassGroup, Exam, Announcement, BlogPost } from './types';

export const MOCK_CLASSES: ClassGroup[] = [
  { id: 'c1', name: '10 IPA 1', gradeLevel: 10 },
  { id: 'c2', name: '10 IPS 2', gradeLevel: 10 },
  { id: 'c3', name: '11 IPA 1', gradeLevel: 11 },
];

// Updated to a reliable Unsplash image (Indonesian Student style) that loads correctly
export const CARD_PHOTO_MAIN = "https://i.pinimg.com/736x/c2/ec/95/c2ec953ef952d591b2b8ae0d98f59e96.jpg";
export const CARD_PHOTO_SECONDARY = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiQ5e7M-7tHymD28vWnJk2OqJ7yF6Y8oP5yT-dK3X9wG1b7L9rZ8n4qV3m0uE5jX1wF4k8lD2n9/s1600/pas-foto-siswa-sma-berjilbab.jpg"; 

export const MOCK_STUDENTS: Student[] = [
  { 
    id: 's1', 
    name: 'Clara Setiana Dewi', 
    role: UserRole.STUDENT, 
    // Using the working image
    avatar: CARD_PHOTO_MAIN, 
    email: 'clara@siswa.id', 
    classId: 'c1', 
    nisn: '0056781234', 
    parentPhone: '628123456789' 
  },
  { 
    id: 's2', 
    name: 'Budi Santoso', 
    role: UserRole.STUDENT, 
    avatar: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiDv-LjRi05qCuadGZX95WdtCpa-v5WtiaVzICghu5QsNbg6fTldbcQ_kPCLB2IMB7L0Rjzl9KpTU1bt2C6AwrNpYv3DfPl9wkh9Usnq30o0A5t9b_BgzBpu21RZptNaqxoaf-3sZZ4o5RP/s1600/mico-pasfoto-3x4.jpg', 
    email: 'budi@siswa.id', 
    classId: 'c1', 
    nisn: '0056781235', 
    parentPhone: '628123456790' 
  },
  { 
    id: 's3', 
    name: 'Rizky Ramadhan', 
    role: UserRole.STUDENT, 
    avatar: 'https://cdn.pengajartekno.co.id/q:i/r:0/wp:1/w:400/u:https://blog.pengajartekno.co.id/wp-content/uploads/2023/03/PAS-Foto-SMA-16.jpg', 
    email: 'rizky@siswa.id', 
    classId: 'c1', 
    nisn: '0056781236', 
    parentPhone: '628123456791' 
  },
  { 
    id: 's4', 
    name: 'Dewi Lestari', 
    role: UserRole.STUDENT, 
    avatar: 'https://i.pinimg.com/474x/89/f5/2c/89f52c332192fac82fd0d912d3e204b2.jpg', 
    email: 'dewi@siswa.id', 
    classId: 'c2', 
    nisn: '0056781237', 
    parentPhone: '628123456792' 
  },
  { 
    id: 's5', 
    name: 'Ahmad Dhani', 
    role: UserRole.STUDENT, 
    avatar: 'https://i.pinimg.com/originals/21/f8/58/21f8587b36f837225afd6754aacda567.jpg', 
    email: 'ahmad@siswa.id', 
    classId: 'c2', 
    nisn: '0056781238', 
    parentPhone: '628123456793' 
  },
];

export const MOCK_EXAM: Exam = {
  id: 'ex1',
  title: 'Ujian Tengah Semester - Matematika',
  subject: 'Mathematics',
  durationMinutes: 45,
  questions: [
    { id: 'q1', text: 'If 2x + 5 = 15, what is x?', options: ['2', '5', '10', '7.5'], correctOptionIndex: 1 },
    { id: 'q2', text: 'What is the square root of 144?', options: ['10', '11', '12', '14'], correctOptionIndex: 2 },
    { id: 'q3', text: 'Solve for y: 3y - 9 = 0', options: ['0', '3', '9', '1'], correctOptionIndex: 1 },
    { id: 'q4', text: 'What is 15% of 200?', options: ['20', '30', '25', '15'], correctOptionIndex: 1 },
  ]
};

export const MOCK_ANNOUNCEMENTS: Announcement[] = [
  { id: 'a1', title: 'Libur Nasional', content: 'School will be closed on Friday for National Holiday.', date: '2023-10-25', type: 'info' },
  { id: 'a2', title: 'UTS Schedule', content: 'Mid-term exams start next Monday. Please prepare accordingly.', date: '2023-10-24', type: 'urgent' },
  { id: 'a3', title: 'Class Meeting', content: 'Sports competition between classes will be held after exams.', date: '2023-10-20', type: 'event' },
];

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'SMA Xaverius Bandar Lampung Launches "Zero Plastic" Initiative',
    excerpt: 'Starting this semester, our school canteen will no longer provide single-use plastics.',
    content: 'SMA Xaverius Bandar Lampung is taking a bold step towards environmental sustainability with the launch of the "Zero Plastic" initiative. As of this Monday, all single-use plastic cups, straws, and bags are banned from the school canteen. Students are encouraged to bring their own tumblers and lunch boxes. "This is not just about reducing waste, but about changing the mindset of the next generation," says the Headmaster. Bins have been replaced with sorting stations, and organic waste is now processed into compost for the school garden.',
    author: 'Admin Sekolah',
    date: '2023-10-20',
    imageUrl: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=800&q=80',
    category: 'Waste Management'
  },
  {
    id: 'b2',
    title: 'Harvesting the Sun: Solar Panels Installed on Building A',
    excerpt: 'Our commitment to renewable energy takes physical form with new solar installations.',
    content: 'In an effort to reduce our carbon footprint, SMA Xaverius Bandar Lampung has installed 50 solar panels on the roof of Building A. These panels are expected to supply 30% of the school\'s daily electricity needs, powering the computer labs and library. This project serves as a real-world learning laboratory for Physics students studying renewable energy.',
    author: 'Pak Budi (Physics)',
    date: '2023-10-18',
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    category: 'Energy'
  },
  {
    id: 'b3',
    title: 'The "Green Wall" Project: Breathing Life into Classrooms',
    excerpt: 'Vertical gardens are now adorning the corridors of Class 10 and 11.',
    content: 'To improve air quality and aesthetics, the student council has initiated the Green Wall project. Vertical gardens using recycled plastic bottles have been installed along the corridors. Plants chosen are specifically those known for air purification, such as Sansevieria and Spider Plants. It creates a cooler, more conducive learning environment.',
    author: 'Siswa Council',
    date: '2023-10-15',
    imageUrl: 'https://images.unsplash.com/photo-1520484297508-804f89b9d9dd?auto=format&fit=crop&w=800&q=80',
    category: 'Green Living'
  },
  {
    id: 'b4',
    title: 'Biopore Infiltration Holes: Managing Water Runoff',
    excerpt: 'Biology students install 100 new biopore holes around the school field.',
    content: 'To prevent flooding during the rainy season and improve soil fertility, SMA Xaverius students have installed 100 biopore infiltration holes (Lubang Resapan Biopori). Filled with organic waste, these holes help water absorb into the ground and create compost. This activity was part of the Biology practical exam on Ecology.',
    author: 'Bu Siti (Biology)',
    date: '2023-10-12',
    imageUrl: 'https://images.unsplash.com/photo-1594488358838-892911b33342?auto=format&fit=crop&w=800&q=80',
    category: 'Water Conservation'
  },
  {
    id: 'b5',
    title: 'SMA Xaverius Wins National Adiwiyata Mandiri Award',
    excerpt: 'A testament to our years of consistent environmental dedication.',
    content: 'We are proud to announce that SMA Xaverius Bandar Lampung has been awarded the prestigious Adiwiyata Mandiri award by the Ministry of Environment and Forestry. This award recognizes schools that not only practice sustainability but also mentor other schools to do the same. Thank you to all teachers, students, and staff who made this possible.',
    author: 'Admin Sekolah',
    date: '2023-10-10',
    imageUrl: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?auto=format&fit=crop&w=800&q=80',
    category: 'Achievement'
  },
  {
    id: 'b6',
    title: 'Turning Trash to Treasure: The Eco-Brick Workshop',
    excerpt: 'Students turn non-recyclable plastic waste into building bricks.',
    content: 'Last Saturday, the extracurricular Green Club hosted an Eco-Brick workshop. Students collected clean, dry plastic wrappers and stuffed them tightly into plastic bottles. The resulting "bricks" are durable and will be used to build benches for the school park. This creates a circular economy within the school.',
    author: 'Green Club',
    date: '2023-10-05',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    category: 'Recycling'
  },
  {
    id: 'b7',
    title: 'Paperless Exams: Saving 50,000 Sheets of Paper',
    excerpt: 'The shift to CBT (Computer Based Test) has massive environmental impact.',
    content: 'By fully implementing the Siswa Cerdas CBT module for Mid-Term exams, SMA Xaverius has saved an estimated 50,000 sheets of paper this semester alone. This saves roughly 6 trees and significantly reduces ink cartridge waste. The transition to digital also means faster grading for teachers.',
    author: 'IT Department',
    date: '2023-10-01',
    imageUrl: 'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&w=800&q=80',
    category: 'Digitalization'
  },
  {
    id: 'b8',
    title: 'Medicinal Plant Garden (TOGA) Revitalization',
    excerpt: 'Reviving traditional knowledge through our school pharmacy garden.',
    content: 'The "Tanaman Obat Keluarga" (TOGA) garden behind the library has been revitalized. It now houses over 50 species of medicinal plants like Ginger, Turmeric, and Red Betel. Students learn about the biological properties of these plants and how to process them into traditional "Jamu".',
    author: 'PMR Unit',
    date: '2023-09-28',
    imageUrl: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=800&q=80',
    category: 'Biodiversity'
  },
  {
    id: 'b9',
    title: 'Community Clean-Up: River Care Day',
    excerpt: 'SMA Xaverius students volunteer to clean the local riverbanks.',
    content: 'Over 200 students participated in the "River Care Day". Armed with gloves and trash bags, they collected 500kg of waste from the riverbanks. This outreach program aims to connect students with the local ecosystem and understand the impact of upstream waste on downstream communities.',
    author: 'Scout Movement',
    date: '2023-09-20',
    imageUrl: 'https://images.unsplash.com/photo-1618477461853-5f8dd68aa395?auto=format&fit=crop&w=800&q=80',
    category: 'Community Service'
  },
  {
    id: 'b10',
    title: 'Rainwater Harvesting System Operational',
    excerpt: 'New tanks collect rainwater for watering plants and flushing toilets.',
    content: 'We have successfully installed a rainwater harvesting system connected to the gym roof guttering. The collected water is stored in two 1000-liter tanks and is used exclusively for watering the school gardens and flushing toilets in the west wing, reducing our reliance on municipal water.',
    author: 'Sarpras Team',
    date: '2023-09-15',
    imageUrl: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=800&q=80',
    category: 'Water Conservation'
  },
  {
    id: 'b11',
    title: 'Organic Composting 101: From Canteen to Garden',
    excerpt: 'How our cafeteria leftovers feed our flower beds.',
    content: 'The "Waste Warriors" team ensures that no organic scrap from the canteen goes to the landfill. All vegetable peels and fruit scraps are collected daily and processed in our composting house using Black Soldier Fly larvae (Maggot BSF), which accelerates decomposition and provides feed for the school fish pond.',
    author: 'Biotech Club',
    date: '2023-09-10',
    imageUrl: 'https://images.unsplash.com/photo-1591193686104-fddba4d0e4d8?auto=format&fit=crop&w=800&q=80',
    category: 'Waste Management'
  },
  {
    id: 'b12',
    title: 'Bike to School Day: Reducing Carbon Emissions',
    excerpt: 'Every Friday is now designated as "Bike or Walk to School Day".',
    content: 'To promote health and reduce exhaust emissions around the school zone, every Friday is "Bike to School Day". The parking lot is closed to student motorcycles on this day. We have seen a 40% increase in students cycling, and the air around the school gate feels noticeably fresher.',
    author: 'Student Council',
    date: '2023-09-05',
    imageUrl: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=800&q=80',
    category: 'Green Transport'
  },
  {
    id: 'b13',
    title: 'Energy Audit: Students Analyze Power Consumption',
    excerpt: 'Physics assignment leads to 15% reduction in energy waste.',
    content: 'Class 12 Physics students conducted a comprehensive energy audit of the school. They identified "vampire power" sources and inefficient lighting. As a result, the school has replaced all hallway lights with LEDs and installed motion sensors in restrooms.',
    author: 'Physics Dept',
    date: '2023-08-30',
    imageUrl: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=800&q=80',
    category: 'Energy'
  },
  {
    id: 'b14',
    title: 'No-Styrofoam Policy Strictly Enforced',
    excerpt: 'Food vendors around the school agree to switch to paper.',
    content: 'Extending our influence beyond the gates, SMA Xaverius has partnered with street food vendors outside the school. We provided them with paper packaging alternatives. Now, students buying snacks outside are also contributing to a Styrofoam-free zone.',
    author: 'Public Relations',
    date: '2023-08-25',
    imageUrl: 'https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=800&q=80',
    category: 'Policy'
  },
  {
    id: 'b15',
    title: 'Tree Planting: One Student, One Tree',
    excerpt: 'The annual tradition continues with 300 new saplings planted.',
    content: 'The new cohort of Grade 10 students participated in the "One Student, One Tree" program. Each student is responsible for planting and caring for one tree on the school grounds or in their neighborhood until they graduate. This teaches long-term responsibility and care for nature.',
    author: 'Headmaster',
    date: '2023-08-20',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    category: 'Reforestation'
  }
];
