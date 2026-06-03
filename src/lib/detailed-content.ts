import type { LearningModule } from '@/components/education/LearningModuleCard'

export type LessonType = 'text' | 'video' | 'quiz' | 'ai_sim'

export interface QuizQuestion {
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export interface Lesson {
  title: string
  type: LessonType
  content: string // Used for text or video URL
  quiz?: QuizQuestion[]
  aiPrompt?: string
}

export interface DetailedModule extends LearningModule {
  lessons: Lesson[]
}

export type TrackId = 'all' | 'insurance' | 'financial' | 'wholesale' | 'business' | 'ai' | 'majors' | 'state-laws'

// --- Detailed Content Repository ---
export const detailedModules: Record<string, DetailedModule> = {
  'fin-1': {
    id: 'fin-1',
    title: 'Financial Planning Process',
    description: 'CFP-style process from discovery through implementation and review.',
    format: 'course',
    duration: '6 hrs',
    difficulty: 'intermediate',
    track: 'financial',
    lessons: [
      { 
        title: 'The Discovery Phase', 
        type: 'text', 
        content: 'Discovery is the foundation of any plan. It is not just about numbers, but about values and goals. A great advisor listens 80% of the time.' 
      },
      { 
        title: 'Gathering Client Data', 
        type: 'video', 
        content: 'https://youtube.com/embed/placeholder1' 
      },
      { 
        title: 'Discovery Quiz', 
        type: 'quiz', 
        content: 'Test your discovery skills.',
        quiz: [
          { question: 'What is the primary goal of the discovery phase?', options: ['Selling a product', 'Building rapport and understanding goals', 'Calculating taxes', 'Setting fees'], correctAnswer: 1, explanation: 'Discovery is about understanding the client\'s a-ha moments and life goals.' }
        ]
      },
      { 
        title: 'AI Roleplay: The First Meeting', 
        type: 'ai_sim', 
        content: 'Practice your discovery call with our AI client.',
        aiPrompt: 'You are a 45-year-old business owner who is successful but feels they are not saving enough for retirement. Be slightly skeptical of financial advisors.' 
      }
    ]
  },
  'ins-1': {
    id: 'ins-1',
    title: 'Life Insurance Fundamentals',
    description: 'Core concepts: death benefit, beneficiaries, insurable and policy types.',
    format: 'course',
    duration: '4 hrs',
    difficulty: 'beginner',
    track: 'insurance',
    lessons: [
      { 
        title: 'Introduction to Life Insurance', 
        type: 'text', 
        content: 'Life insurance provides a death benefit to beneficiaries, ensuring financial security for survivors.' 
      },
      { 
        title: 'Death Benefit Options', 
        type: 'video', 
        content: 'https://youtube.com/embed/placeholder2' 
      },
      { 
        title: 'Fundamentals Quiz', 
        type: 'quiz', 
        content: 'Test your fundamentals.',
        quiz: [
          { question: 'Which of the following is a primary benefit of life insurance?', options: ['Instant wealth', 'Death benefit for beneficiaries', 'Guaranteed 100% return', 'No premiums required'], correctAnswer: 1, explanation: 'The core purpose is providing a financial safety net for survivors.' }
        ]
      },
      { 
        title: 'AI Simulation: Explaining the Death Benefit', 
        type: 'ai_sim', 
        content: 'Explain the death benefit to a skeptical client.',
        aiPrompt: 'You are a young parent who thinks life insurance is a waste of money because you are healthy. Challenge the advisor.' 
      }
    ]
  },
  'bus-1': {
    id: 'bus-1',
    title: 'Effective Communication',
    description: 'Client meetings, presentations, and difficult conversations.',
    format: 'course',
    duration: '2.5 hrs',
    difficulty: 'beginner',
    track: 'business',
    lessons: [
      { 
        title: 'The Power of Active Listening', 
        type: 'text', 
        content: 'Active listening involves reflecting back what the client said to ensure understanding and build trust.' 
      },
      { 
        title: 'Body Language in Meetings', 
        type: 'video', 
        content: 'https://youtube.com/embed/placeholder3' 
      },
      { 
        title: 'Communication Quiz', 
        type: 'quiz', 
        content: 'Test your listening skills.',
        quiz: [
          { question: 'What is a key component of active listening?', options: ['Interrupting to correct', 'Paraphrasing the client\'s words', 'Talking more than the client', 'Ignoring non-verbal cues'], correctAnswer: 1, explanation: 'Paraphrasing confirms you have heard and understood the client.' }
        ]
      },
      { 
        title: 'AI Roleplay: The Difficult Conversation', 
        type: 'ai_sim', 
        content: 'Handle a client who is upset about market losses.',
        aiPrompt: 'You are a client who just saw your portfolio drop 10% and you are panicking. You want to sell everything.' 
      }
    ]
  }
}

// Keep existing imports and logic...
// I will merge this into the actual file in the next step.
