
import { UserRole, Student, ClassGroup, Achievement, Alumni, BlogPost, Exam, SchoolProfile, CardApplication } from './types';

export const CARD_PHOTO_MAIN = "https://i.pinimg.com/736x/c2/ec/95/c2ec953ef952d591b2b8ae0d98f59e96.jpg";
export const PREVIEW_LOGO = "https://i.pinimg.com/736x/e4/fc/df/e4fcdfa9937a726e285649eb54615769.jpg";

const TEACHER_NAMES = [
  "Drs. Bambang Wijaya", "Siti Aminah, S.Pd", "Agus Setiawan, M.Pd", 
  "Eka Putri, S.Si", "Budi Santoso, S.Kom", "Ratna Sari, M.Pd"
];

// Generate Classes for SMA (10, 11, 12)
const generateClasses = (): ClassGroup[] => {
  const classes: ClassGroup[] = [];
  const grades = [10, 11, 12];
  const majors: ('IPA' | 'IPS')[] = ['IPA', 'IPS'];
  
  grades.forEach(grade => {
    majors.forEach(major => {
      for (let i = 1; i <= 3; i++) {
        classes.push({
          id: `c-${grade}-${major.toLowerCase()}-${i}`,
          name: `${grade} ${major} ${i}`,
          gradeLevel: grade,
          major: major,
          homeroomTeacher: TEACHER_NAMES[Math.floor(Math.random() * TEACHER_NAMES.length)],
          studentCount: Math.floor(35 + Math.random() * 4)
        });
      }
    });
  });
  return classes;
};

export const MOCK_CLASSES = generateClasses();

const generateMockStudents = (classes: ClassGroup[]): Student[] => {
  const students: Student[] = [];
  classes.forEach(cls => {
    for (let i = 0; i < cls.studentCount; i++) {
      students.push({
        id: `s-${cls.id}-${i}`,
        name: i === 0 && cls.id === 'c-10-ipa-1' ? 'Clara Setiana Dewi' : `Siswa ${cls.name} ${i + 1}`,
        role: UserRole.STUDENT,
        avatar: i === 0 && cls.id === 'c-10-ipa-1' ? CARD_PHOTO_MAIN : `https://i.pravatar.cc/150?u=s-${cls.id}-${i}`,
        email: `student${i}@cerdasmulia.sch.id`,
        classId: cls.id,
        nisn: `${cls.gradeLevel}${Math.floor(10000000 + Math.random() * 90000000)}`,
        whatsapp: `628${Math.floor(100000000 + Math.random() * 899999999)}`,
        parentWhatsapp: `628${Math.floor(100000000 + Math.random() * 899999999)}`,
        parentPhone: '628123456789',
        cardStatus: i < 15 ? 'PRINTED' : i < 25 ? 'APPROVED' : 'PENDING'
      });
    }
  });
  return students;
};

export const MOCK_STUDENTS = generateMockStudents(MOCK_CLASSES);

export const MOCK_SCHOOL_DATA: SchoolProfile = {
  id: 'sch-1',
  name: 'SMA CERDAS MULIA Bandar Lampung',
  npsn: '10801234',
  address: 'Jl. Pendidikan No. 88, Bandar Lampung, Lampung 35111',
  email: 'info@cerdasmulia.sch.id',
  phone: '0721-888999',
  logo: PREVIEW_LOGO,
  principal: 'Drs. H. Mulyadi, M.Pd.',
  accreditation: 'A',
  studentCount: MOCK_STUDENTS.length,
  teacherCount: 56,
  classCount: MOCK_CLASSES.length,
  status: 'ACTIVE',
  classes: MOCK_CLASSES,
  documents: {
    skOperasional: 'SK-OPER-2023-001.pdf',
    skAkreditasi: 'SK-AKRED-A-2022.pdf',
    logoHighRes: 'logo_hr.png'
  }
};

export const MOCK_SCHOOLS: SchoolProfile[] = [
  MOCK_SCHOOL_DATA,
  {
    id: 'sch-2',
    name: 'SMK Negeri 1 Surabaya',
    npsn: '20504567',
    address: 'Jl. Mastrip No. 17, Surabaya',
    email: 'info@smkn1sby.sch.id',
    phone: '031-7654321',
    logo: 'https://smkn1-sby.sch.id/wp-content/uploads/2021/08/logo-smkn1sby-1.png',
    principal: 'Dr. Retno Wahyuni',
    accreditation: 'A',
    studentCount: 1250,
    teacherCount: 82,
    classCount: 32,
    status: 'ACTIVE',
    classes: [],
    documents: {}
  }
];

export const MOCK_CARD_APPLICATIONS: CardApplication[] = [
  {
    id: 'app-1',
    schoolId: 'sch-1',
    schoolName: 'SMA CERDAS MULIA Bandar Lampung',
    requestDate: '2024-05-18',
    studentCount: 35,
    status: 'PENDING',
    batchName: 'Batch Ganjil 2024'
  }
];

export const MOCK_ALUMNI: Alumni[] = [
  { id: 'al1', name: 'Andi Pratama', graduationYear: 2023, status: 'Kuliah', institution: 'Universitas Indonesia' },
];

export const MOCK_ACHIEVEMENTS: Achievement[] = [
  { id: 'ac1', studentId: 's1', title: 'Juara 1 Lomba Biologi Nasional', date: '2023-08-15', category: 'Sains', rank: 'Provinsi' },
];

export const MOCK_ANNOUNCEMENTS = [
  { id: '1', title: 'Ujian Akhir Semester', content: 'Jadwal UAS ganjil telah dirilis di menu Jadwal.', date: '2024-05-10', type: 'urgent' },
];

export const MOCK_EXAM: Exam = {
  id: 'e1',
  title: 'Ujian Harian Matematika',
  subject: 'Matematika',
  durationMinutes: 60,
  questions: [
    { id: 'q1', text: 'Berapakah hasil dari 2 + 2?', options: ['2', '3', '4', '5'], correctOptionIndex: 2 },
  ]
};

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Langkah Menuju Sekolah Adiwiyata',
    excerpt: 'Program keberlanjutan lingkungan di SMA 1 Sooko.',
    content: 'Sekolah kami mulai menerapkan sistem pengolahan limbah mandiri...',
    date: '2024-01-20',
    author: 'Admin',
    category: 'Environment',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000'
  }
];
