
import { UserRole, Student, ClassGroup, Achievement, Alumni, BlogPost, Exam, SchoolProfile, CardApplication } from './types';

export const CARD_PHOTO_MAIN = "https://i.pinimg.com/736x/c2/ec/95/c2ec953ef952d591b2b8ae0d98f59e96.jpg";

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
      // Create 3 parallel classes for each major/grade (e.g. 10 IPA 1, 10 IPA 2, etc)
      for (let i = 1; i <= 3; i++) {
        classes.push({
          id: `c-${grade}-${major.toLowerCase()}-${i}`,
          name: `${grade} ${major} ${i}`,
          gradeLevel: grade,
          major: major,
          homeroomTeacher: TEACHER_NAMES[Math.floor(Math.random() * TEACHER_NAMES.length)],
          studentCount: Math.floor(35 + Math.random() * 4) // 35-38 students
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
        email: `student${i}@xaverius.sch.id`,
        classId: cls.id,
        nisn: `${cls.gradeLevel}${Math.floor(10000000 + Math.random() * 90000000)}`,
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
  name: 'SMA Xaverius Bandar Lampung',
  npsn: '10801234',
  address: 'Jl. Cempaka No. 1, Bandar Lampung, Lampung 35111',
  email: 'admin@xaverius.sch.id',
  phone: '0721-123456',
  logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSq_7N5rK5LOnmX2L7xYqYqL3x_fX-Q-1-yGg&s',
  principal: 'Drs. H. Ahmad Santoso',
  accreditation: 'A',
  studentCount: MOCK_STUDENTS.length,
  teacherCount: 56,
  classCount: MOCK_CLASSES.length,
  status: 'ACTIVE',
  classes: MOCK_CLASSES,
  documents: {
    skOperasional: 'SK-OPER-2023-001.pdf',
    skAkreditasi: 'SK-AKRED-A-2022.pdf',
    logoHighRes: 'logo_xaverius_hr.png'
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
    schoolName: 'SMA Xaverius Bandar Lampung',
    requestDate: '2024-05-18',
    studentCount: 35,
    status: 'PENDING',
    batchName: 'Kelas 10 IPA 1 - Ganjil'
  },
  {
    id: 'app-2',
    schoolId: 'sch-2',
    schoolName: 'SMK Negeri 1 Surabaya',
    requestDate: '2024-05-15',
    studentCount: 120,
    status: 'COMPLETED',
    batchName: 'Siswa Baru Angkatan 2024'
  }
];

export const MOCK_ALUMNI: Alumni[] = [
  { id: 'al1', name: 'Andi Pratama', graduationYear: 2023, status: 'Kuliah', institution: 'Universitas Indonesia' },
  { id: 'al2', name: 'Sinta Bella', graduationYear: 2023, status: 'Kerja', institution: 'PT. Teknologi Maju' },
];

export const MOCK_ACHIEVEMENTS: Achievement[] = [
  { id: 'ac1', studentId: 's1', title: 'Juara 1 Lomba Biologi Nasional', date: '2023-08-15', category: 'Sains', rank: 'Provinsi' },
];

export const MOCK_ANNOUNCEMENTS = [
  { id: '1', title: 'Ujian Akhir Semester', content: 'Jadwal UAS ganjil telah dirilis di menu Jadwal.', date: '2024-05-10', type: 'urgent' },
  { id: '2', title: 'Pensi Sekolah', content: 'Daftarkan kelasmu untuk mengisi acara pentas seni.', date: '2024-05-12', type: 'event' },
  { id: '3', title: 'Libur Nasional', content: 'Sekolah libur sehubungan dengan hari raya.', date: '2024-05-15', type: 'info' },
];

export const MOCK_EXAM: Exam = {
  id: 'e1',
  title: 'Ujian Harian Matematika',
  subject: 'Matematika',
  durationMinutes: 60,
  questions: [
    { id: 'q1', text: 'Berapakah hasil dari 2 + 2?', options: ['2', '3', '4', '5'], correctOptionIndex: 2 },
    { id: 'q2', text: 'Berapakah akar dari 64?', options: ['6', '7', '8', '9'], correctOptionIndex: 2 },
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
  },
  {
    id: 'b2',
    title: 'Inovasi Panel Surya untuk Lab Fisika',
    excerpt: 'Memanfaatkan energi matahari untuk kebutuhan edukasi.',
    content: 'Pemasangan panel surya di atap laboratorium fisika...',
    date: '2024-02-15',
    author: 'Guru Fisika',
    category: 'Innovation',
    imageUrl: 'https://images.unsplash.com/photo-1509391366360-fe5bb58583bb?auto=format&fit=crop&q=80&w=1000'
  }
];
