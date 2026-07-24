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
  { month: 'T2', normal: 78, needHelp: 15, severe: 7 },
  { month: 'T3', normal: 74, needHelp: 18, severe: 8 },
  { month: 'T4', normal: 80, needHelp: 14, severe: 6 },
  { month: 'T5', normal: 71, needHelp: 20, severe: 9 },
  { month: 'T6', normal: 68, needHelp: 22, severe: 10 },
  { month: 'T7', normal: 73, needHelp: 19, severe: 8 },
]

export function getStudent(id: string) {
  return STUDENTS.find((s) => s.id === id)
}

export function getAssessments(studentId: string) {
  return ASSESSMENTS.filter((a) => a.studentId === studentId)
}

export function getCaseHistories(studentId: string) {
  return CASE_HISTORIES.filter((c) => c.studentId === studentId)
}
