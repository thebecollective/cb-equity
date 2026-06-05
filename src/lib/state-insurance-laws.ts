import type { LearningModule } from '@/components/education/LearningModuleCard'

export type LineOfAuthority = 'life' | 'health'

export interface Lesson {
  title: string
  content: string
}

export interface StateCourse {
  id: string
  state: string
  stateCode: string
  lineOfAuthority: LineOfAuthority
  title: string
  lessons: Lesson[]
}

const STATES = [
  { name: 'Alabama', code: 'AL' }, { name: 'Alaska', code: 'AK' }, { name: 'Arizona', code: 'AZ' }, { name: 'Arkansas', code: 'AR' }, { name: 'California', code: 'CA' },
  { name: 'Colorado', code: 'CO' }, { name: 'Connecticut', code: 'CT' }, { name: 'Delaware', code: 'DE' }, { name: 'Florida', code: 'FL' }, { name: 'Georgia', code: 'GA' },
  { name: 'Hawaii', code: 'HI' }, { name: 'Idaho', code: 'ID' }, { name: 'Illinois', code: 'IL' }, { name: 'Indiana', code: 'IN' }, { name: 'Iowa', code: 'IA' },
  { name: 'Kansas', code: 'KS' }, { name: 'Kentucky', code: 'KY' }, { name: 'Louisiana', code: 'LA' }, { name: 'Maine', code: 'ME' }, { name: 'Maryland', code: 'MD' },
  { name: 'Massachusetts', code: 'MA' }, { name: 'Michigan', code: 'MI' }, { name: 'Minnesota', code: 'MN' }, { name: 'Mississippi', code: 'MS' }, { name: 'Missouri', code: 'MO' },
  { name: 'Montana', code: 'MT' }, { name: 'Nebraska', code: 'NE' }, { name: 'Nevada', code: 'NV' }, { name: 'New Hampshire', code: 'NH' }, { name: 'New Jersey', code: 'NJ' },
  { name: 'New Mexico', code: 'NM' }, { name: 'New York', code: 'NY' }, { name: 'North Carolina', code: 'NC' }, { name: 'North Dakota', code: 'ND' }, { name: 'Ohio', code: 'OH' },
  { name: 'Oklahoma', code: 'OK' }, { name: 'Oregon', code: 'OR' }, { name: 'Pennsylvania', code: 'PA' }, { name: 'Rhode Island', code: 'RI' }, { name: 'South Carolina', code: 'SC' },
  { name: 'South Dakota', code: 'SD' }, { name: 'Tennessee', code: 'TN' }, { name: 'Texas', code: 'TX' }, { name: 'Utah', code: 'UT' }, { name: 'Vermont', code: 'VT' },
  { name: 'Virginia', code: 'VA' }, { name: 'Washington', code: 'WA' }, { name: 'West Virginia', code: 'WV' }, { name: 'Wisconsin', code: 'WI' }, { name: 'Wyoming', code: 'WY' },
  { name: 'District of Columbia', code: 'DC' },
]

const COMMON_LESSONS = {
  life: [
    { title: 'Licensing Requirements', content: 'Examination requirements, pre-licensing education, and appointment processes.' },
    { title: 'Life Insurance Basics', content: 'Term vs Permanent life, whole life, universal life, and variable products.' },
    { title: 'Replacement & Suitability', content: 'Ethical standards for replacing existing policies and suitability requirements for senior citizens.' },
    { title: 'Unfair Trade Practices', content: 'Twisting, churning, defamation, and illegal rebates.' },
    { title: 'Administrative Law', content: 'State Department of Insurance powers, hearings, and penalties.' },
    { title: 'Claims & Beneficiaries', content: 'Settlement options and beneficiary designation rules.' },
    { title: 'Exam Checklist', content: 'Final review of critical state-specific laws and exam strategies.' },
    { title: 'FINAL STATE EXAM', content: 'Comprehensive practice test covering all state-specific laws.', isExam: true },
  ],
  health: [
    { title: 'Health Insurance Basics', content: 'Medical, disability, long-term care, and group health insurance.' },
    { title: 'Accident & Health Laws', content: 'Mandatory provisions, optional provisions, and grace periods.' },
    { title: 'Health Replacement', content: 'Specific rules for replacing health insurance and notification requirements.' },
    { title: 'Unfair Trade Practices', content: 'Illegal advertising, misrepresentation, and unfair discrimination.' },
    { title: 'HIPAA & Privacy', content: 'Protection of PHI (Protected Health Information) and data security requirements.' },
    { title: 'Claims & Processing', content: 'Claim filing timelines and fair claims settlement practices.' },
    { title: 'Exam Checklist', content: 'Final review of state-specific health laws and exam strategies.' },
    { title: 'FINAL STATE EXAM', content: 'Comprehensive practice test covering all state-specific laws.', isExam: true },
  ]
}

export function generateStateCourses(): StateCourse[] {
  const courses: StateCourse[] = []
  
  STATES.forEach(state => {
    courses.push({
      id: `course-life-${state.code.toLowerCase()}`,
      state: state.name,
      stateCode: state.code,
      lineOfAuthority: 'life',
      title: `${state.name} Life Insurance Law`,
      lessons: COMMON_LESSONS.life.map(l => ({
        ...l,
        content: `${l.content} Specific to ${state.name} jurisdiction rules.`
      }))
    })
    
    courses.push({
      id: `course-health-${state.code.toLowerCase()}`,
      state: state.name,
      stateCode: state.code,
      lineOfAuthority: 'health',
      title: `${state.name} Accident & Health Law`,
      lessons: COMMON_LESSONS.health.map(l => ({
        ...l,
        content: `${l.content} Specific to ${state.name} jurisdiction rules.`
      }))
    })
  })
  
  return courses
}

export function stateCoursesAsLearningModules(): LearningModule[] {
  return generateStateCourses().map(c => ({
    id: c.id,
    title: c.title,
    description: `Detailed study guide for ${c.state} ${c.lineOfAuthority} licensing exam.`,
    format: 'course',
    lessons: c.lessons.length,
    duration: '5-10 hrs',
    difficulty: 'intermediate',
    tags: ['State Law', c.state],
    track: 'state-laws' as any
  }))
}

export const stateLawStats = {
  courses: STATES.length * 2,
  states: STATES.length,
  totalLessons: STATES.length * 2 * 7,
  categories: ['Life', 'Health']
}
