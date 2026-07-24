// Shared domain types + mock data for the MIND-CARE UI scaffold.
// Mirrors the Prisma schema (Student, Assessment, CaseHistory) but uses
// in-memory sample data so the interface can be previewed without a database.

export type RiskStatus = 'NORMAL' | 'NEED_HELP' | 'SEVERE'
export type AssessmentStatus = 'NORMAL' | 'MILD' | 'SEVERE'

export interface Student {
  id: string
  name: string
  grade: string
  riskScore: number
  status: RiskStatus
  lastCheckIn: string
  createdAt: string
}

export interface Assessment {
  id: string
  studentId: string
  totalScore: number
  status: AssessmentStatus
  month: number
  createdAt: string
}

export interface CaseHistory {
  id: string
  studentId: string
  author: string
  notes: string
  isUrgent: boolean
  createdAt: string
}

export interface MoodEntry {
  date: string
  mood: number // 1 (rất tệ) - 5 (rất tốt)
  note?: string
}

// ---------------------------------------------------------------------------
// Risk status metadata (labels + token-based styling)
// ---------------------------------------------------------------------------

export const RISK_META: Record<
  RiskStatus,
  { label: string; short: string; badge: string; dot: string; description: string }
> = {
  NORMAL: {
    label: 'Bình thường',
    short: 'NORMAL',
    badge: 'bg-success/15 text-success border-success/30',
    dot: 'bg-success',
    description: 'Sức khỏe tinh thần ổn định, tiếp tục theo dõi định kỳ.',
  },
  NEED_HELP: {
    label: 'Cần tham vấn',
    short: 'NEED_HELP',
    badge: 'bg-warning/20 text-warning-foreground border-warning/40',
    dot: 'bg-warning',
    description: 'Có dấu hiệu căng thẳng, nên sắp xếp một buổi trò chuyện.',
  },
  SEVERE: {
    label: 'Báo động đỏ',
    short: 'SEVERE',
    badge: 'bg-danger/15 text-danger border-danger/30',
    dot: 'bg-danger',
    description: 'Cần can thiệp và hỗ trợ khẩn cấp từ chuyên viên.',
  },
}

// ---------------------------------------------------------------------------
// Assessment questionnaire (PHQ-9 / GAD-7 inspired, Vietnamese school version)
// ---------------------------------------------------------------------------

export interface AssessmentQuestion {
  id: number
  text: string
}

export const ASSESSMENT_OPTIONS = [
  { label: 'Không bao giờ', value: 0 },
  { label: 'Thỉnh thoảng', value: 1 },
  { label: 'Hơn nửa số ngày', value: 2 },
  { label: 'Gần như mỗi ngày', value: 3 },
]

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  { id: 1, text: 'Em cảm thấy ít hứng thú hoặc niềm vui khi làm việc gì đó.' },
  { id: 2, text: 'Em cảm thấy buồn chán, chán nản hoặc tuyệt vọng.' },
  { id: 3, text: 'Em gặp khó khăn khi đi vào giấc ngủ, ngủ chập chờn hoặc ngủ quá nhiều.' },
  { id: 4, text: 'Em cảm thấy mệt mỏi hoặc có ít năng lượng.' },
  { id: 5, text: 'Em cảm thấy lo lắng, bồn chồn hoặc căng thẳng.' },
  { id: 6, text: 'Em khó tập trung vào việc học hoặc những việc thường ngày.' },
  { id: 7, text: 'Em cảm thấy áp lực từ việc học tập hoặc kỳ vọng của mọi người.' },
  { id: 8, text: 'Em cảm thấy cô đơn hoặc khó chia sẻ với người khác.' },
  { id: 9, text: 'Em có suy nghĩ tiêu cực về bản thân mình.' },
]

// Total range 0-27. Classify similar to PHQ-9 severity bands.
export function classifyScore(total: number): {
  status: AssessmentStatus
  risk: RiskStatus
  advice: string
} {
  if (total <= 6) {
    return {
      status: 'NORMAL',
      risk: 'NORMAL',
      advice:
        'Tinh thần của em đang khá ổn định. Hãy tiếp tục duy trì thói quen ngủ đủ giấc, vận động và trò chuyện với người thân nhé!',
    }
  }
  if (total <= 14) {
    return {
      status: 'MILD',
      risk: 'NEED_HELP',
      advice:
        'Em đang có một vài dấu hiệu căng thẳng. Đừng ngại chia sẻ với thầy cô tư vấn — một buổi trò chuyện nhỏ có thể giúp em nhẹ nhõm hơn.',
    }
  }
  return {
    status: 'SEVERE',
    risk: 'SEVERE',
    advice:
      'Có vẻ em đang trải qua giai đoạn rất khó khăn. Em không hề đơn độc. Hãy liên hệ ngay với chuyên viên tư vấn của trường hoặc nhấn nút SOS để được hỗ trợ.',
  }
}

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

export const STUDENTS: Student[] = [
  { id: 's1', name: 'Nguyễn Minh An', grade: 'Lớp 10A1', riskScore: 21, status: 'SEVERE', lastCheckIn: '2026-07-23', createdAt: '2026-02-10' },
  { id: 's2', name: 'Trần Thảo Vy', grade: 'Lớp 11B2', riskScore: 18, status: 'SEVERE', lastCheckIn: '2026-07-22', createdAt: '2026-02-11' },
  { id: 's3', name: 'Lê Hoàng Long', grade: 'Lớp 12A3', riskScore: 11, status: 'NEED_HELP', lastCheckIn: '2026-07-21', createdAt: '2026-02-12' },
  { id: 's4', name: 'Phạm Gia Hân', grade: 'Lớp 10A1', riskScore: 9, status: 'NEED_HELP', lastCheckIn: '2026-07-20', createdAt: '2026-02-12' },
  { id: 's5', name: 'Võ Đức Duy', grade: 'Lớp 11B1', riskScore: 8, status: 'NEED_HELP', lastCheckIn: '2026-07-19', createdAt: '2026-02-13' },
  { id: 's6', name: 'Đặng Khánh Ngọc', grade: 'Lớp 12A1', riskScore: 4, status: 'NORMAL', lastCheckIn: '2026-07-23', createdAt: '2026-02-14' },
  { id: 's7', name: 'Bùi Tuấn Kiệt', grade: 'Lớp 10A2', riskScore: 3, status: 'NORMAL', lastCheckIn: '2026-07-22', createdAt: '2026-02-15' },
  { id: 's8', name: 'Hoàng Yến Nhi', grade: 'Lớp 11B2', riskScore: 5, status: 'NORMAL', lastCheckIn: '2026-07-21', createdAt: '2026-02-16' },
  { id: 's9', name: 'Ngô Bảo Châu', grade: 'Lớp 12A3', riskScore: 2, status: 'NORMAL', lastCheckIn: '2026-07-20', createdAt: '2026-02-17' },
  { id: 's10', name: 'Dương Nhật Minh', grade: 'Lớp 10A2', riskScore: 6, status: 'NORMAL', lastCheckIn: '2026-07-18', createdAt: '2026-02-18' },
]

export const ASSESSMENTS: Assessment[] = [
  { id: 'a1', studentId: 's1', totalScore: 21, status: 'SEVERE', month: 7, createdAt: '2026-07-23' },
  { id: 'a2', studentId: 's1', totalScore: 17, status: 'SEVERE', month: 6, createdAt: '2026-06-20' },
  { id: 'a3', studentId: 's1', totalScore: 12, status: 'MILD', month: 5, createdAt: '2026-05-18' },
  { id: 'a4', studentId: 's2', totalScore: 18, status: 'SEVERE', month: 7, createdAt: '2026-07-22' },
  { id: 'a5', studentId: 's3', totalScore: 11, status: 'MILD', month: 7, createdAt: '2026-07-21' },
]

export const CASE_HISTORIES: CaseHistory[] = [
  { id: 'c1', studentId: 's1', author: 'CV. Nguyễn Thu Hà', notes: 'Kích hoạt SOS lúc 21:14. Đã liên hệ và trấn an học sinh, hẹn gặp trực tiếp sáng mai. Thông báo cho GVCN.', isUrgent: true, createdAt: '2026-07-23' },
  { id: 'c2', studentId: 's1', author: 'CV. Nguyễn Thu Hà', notes: 'Buổi tham vấn đầu tiên. Học sinh chia sẻ áp lực điểm số và mâu thuẫn gia đình. Xây dựng kế hoạch theo dõi hằng tuần.', isUrgent: false, createdAt: '2026-06-21' },
  { id: 'c3', studentId: 's2', author: 'CV. Lê Minh Quân', notes: 'Học sinh có biểu hiện lo âu trước kỳ thi. Hướng dẫn kỹ thuật thở và quản lý thời gian.', isUrgent: false, createdAt: '2026-07-22' },
]

// Mood tracker sample (student view) — last 7 days
export const MOOD_HISTORY: MoodEntry[] = [
  { date: '18/07', mood: 3, note: 'Bình thường' },
  { date: '19/07', mood: 2, note: 'Nhiều bài tập' },
  { date: '20/07', mood: 4, note: 'Đi chơi với bạn' },
  { date: '21/07', mood: 3 },
  { date: '22/07', mood: 4, note: 'Ngủ đủ giấc' },
  { date: '23/07', mood: 5, note: 'Được điểm cao' },
  { date: '24/07', mood: 4, note: 'Thoải mái' },
]

export const MOODS = [
  { value: 5, label: 'Rất vui', emoji: '' },
  { value: 4, label: 'Vui', emoji: '' },
  { value: 3, label: 'Bình thường', emoji: '' },
  { value: 2, label: 'Buồn', emoji: '' },
  { value: 1, label: 'Rất tệ', emoji: '' },
]

// Coverage analytics per grade block
export const COVERAGE_BY_GRADE = [
  { grade: 'Khối 10', surveyed: 142, total: 160 },
  { grade: 'Khối 11', surveyed: 128, total: 155 },
  { grade: 'Khối 12', surveyed: 96, total: 150 },
]

export const MONTHLY_TREND = [
  { month: 'T8', normal: 82, needHelp: 13, severe: 5 },
  { month: 'T9', normal: 79, needHelp: 16, severe: 5 },
  { month: 'T10', normal: 76, needHelp: 17, severe: 7 },
  { month: 'T11', normal: 74, needHelp: 18, severe: 8 },
  { month: 'T12', normal: 77, needHelp: 16, severe: 7 },
  { month: 'T1', normal: 75, needHelp: 17, severe: 8 },
  { month: 'T2', normal: 78, needHelp: 15, severe: 7 },
  { month: 'T3', normal: 74, needHelp: 18, severe: 8 },
  { month: 'T4', normal: 80, needHelp: 14, severe: 6 },
  { month: 'T5', normal: 71, needHelp: 20, severe: 9 },
  { month: 'T6', normal: 68, needHelp: 22, severe: 10 },
  { month: 'T7', normal: 73, needHelp: 19, severe: 8 },
]

// DASS-21 dimension averages across the school (0-21 per subscale)
export const DASS21_BREAKDOWN = [
  { dimension: 'Trầm cảm', value: 8.4, color: '#3b82f6' },
  { dimension: 'Lo âu', value: 10.2, color: '#f59e0b' },
  { dimension: 'Căng thẳng', value: 9.1, color: '#ef4444' },
]

// Risk distribution by grade block
export const RISK_BY_GRADE = [
  { grade: 'Khối 10', normal: 120, needHelp: 15, severe: 7 },
  { grade: 'Khối 11', normal: 100, needHelp: 20, severe: 8 },
  { grade: 'Khối 12', normal: 75, needHelp: 14, severe: 7 },
]

// SOS queue (real-time mock)
export interface SosAlert {
  id: string
  studentId: string
  studentName: string
  grade: string
  triggeredAt: string
  status: 'PENDING' | 'HANDLING'
}

export const SOS_ALERTS: SosAlert[] = [
  { id: 'sos1', studentId: 's1', studentName: 'Nguyễn Minh An', grade: 'Lớp 10A1', triggeredAt: '2026-07-24T21:14:00', status: 'PENDING' },
  { id: 'sos2', studentId: 's2', studentName: 'Trần Thảo Vy', grade: 'Lớp 11B2', triggeredAt: '2026-07-24T20:42:00', status: 'HANDLING' },
]

// AI-generated intervention suggestions
export interface AiInsight {
  id: string
  priority: 'HIGH' | 'MEDIUM' | 'LOW'
  title: string
  detail: string
  affectedStudents: number
}

export const AI_INSIGHTS: AiInsight[] = [
  {
    id: 'ai1',
    priority: 'HIGH',
    title: 'Gia tăng lo âu ở khối 12 trước thi học kỳ',
    detail: 'Điểm lo âu DASS-21 trung bình khối 12 tăng 23% trong 4 tuần qua. Đề xuất tổ chức buổi workshop quản lý căng thẳng thi cử và mở thêm khung giờ tham vấn chiều thứ 7.',
    affectedStudents: 14,
  },
  {
    id: 'ai2',
    priority: 'HIGH',
    title: 'Cụm 7 học sinh lớp 10A1 có dấu hiệu trầm cảm liên quan',
    detail: 'Phân tích cho thấy 7 học sinh cùng lớp 10A1 có điểm trầm cảm tăng đồng thời. Nên phối hợp GVCN khảo sát môi trường lớp học và kiểm tra tình bạn bạo lực tinh tế.',
    affectedStudents: 7,
  },
  {
    id: 'ai3',
    priority: 'MEDIUM',
    title: 'Học sinh nam có xu hướng giấu kín cảm xúc',
    detail: 'Tỷ lệ học sinh nam tự đánh giá "không bao giờ" nhưng điểm quan sát từ GVCN cho thấy mâu thuẫn. Khuyến nghị thêm câu hỏi gián tiếp trong khảo sát tới và tổ chức nhóm chia sẻ nam riêng.',
    affectedStudents: 23,
  },
  {
    id: 'ai4',
    priority: 'LOW',
    title: 'Mối tương quan giữa thiếu ngủ và điểm căng thẳng',
    detail: 'Học sinh ngủ dưới 6 tiếng có điểm căng thẳng DASS-21 cao hơn 40%. Đề xuất chiến dịch "Ngủ đủ giấc" và nhắc nhở qua app vào 22:30.',
    affectedStudents: 45,
  },
]

// DASS-21 per-student dimension scores (mock)
export interface DassScore {
  studentId: string
  depression: number
  anxiety: number
  stress: number
}

export const DASS_SCORES: DassScore[] = [
  { studentId: 's1', depression: 14, anxiety: 16, stress: 13 },
  { studentId: 's2', depression: 10, anxiety: 15, stress: 11 },
  { studentId: 's3', depression: 7, anxiety: 9, stress: 6 },
  { studentId: 's4', depression: 6, anxiety: 8, stress: 5 },
  { studentId: 's5', depression: 5, anxiety: 7, stress: 4 },
  { studentId: 's6', depression: 2, anxiety: 3, stress: 2 },
  { studentId: 's7', depression: 1, anxiety: 2, stress: 1 },
  { studentId: 's8', depression: 3, anxiety: 4, stress: 3 },
  { studentId: 's9', depression: 1, anxiety: 1, stress: 1 },
  { studentId: 's10', depression: 4, anxiety: 5, stress: 4 },
]

export function getDassScore(studentId: string) {
  return DASS_SCORES.find((d) => d.studentId === studentId)
}

export function getStudent(id: string) {
  return STUDENTS.find((s) => s.id === id)
}

export function getAssessments(studentId: string) {
  return ASSESSMENTS.filter((a) => a.studentId === studentId)
}

export function getCaseHistories(studentId: string) {
  return CASE_HISTORIES.filter((c) => c.studentId === studentId)
}
