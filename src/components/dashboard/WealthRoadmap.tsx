'use client'

import { motion } from 'framer-motion'

interface RoadmapStep {
  title: string
  description: string
  status: 'completed' | 'current' | 'pending'
  icon: string
}

const STEPS: RoadmapStep[] = [
  { title: 'Onboarding', description: 'Discovery call and initial data gathering', status: 'completed', icon: '📝' },
  { title: 'Analysis', description: 'Full portfolio audit and gap analysis', status: 'current', icon: '🔍' },
  { title: 'Strategy', description: 'Customized wealth and tax optimization plan', status: 'pending', icon: '🛠️' },
  { title: 'Implementation', description: 'Executing trades and insurance policies', status: 'pending', icon: '🚀' },
  { title: 'Management', description: 'Ongoing monitoring and quarterly reviews', status: 'pending', icon: '📈' },
]

export default function WealthRoadmap() {
  return (
    <div className="py-8">
      <h3 className="text-lg font-bold text-gray-900 mb-8">Your Wealth Journey</h3>
      <div className="relative flex flex-col md:flex-row justify-between gap-4">
        <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200 hidden md:block z-0" />
        {STEPS.map((step, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative z-10 flex flex-col items-center text-center md:w-1/5"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 shadow-sm border-2 ${
              step.status === 'completed' ? 'bg-green-500 border-green-600 text-white' : 
              step.status === 'current' ? 'bg-[#c9a84c] border-[#b38f3a] text-white animate-pulse' : 
              'bg-white border-gray-200 text-gray-400'
            }`}>
              {step.status === 'completed' ? '✓' : step.icon}
            </div>
            <p className={`text-xs font-bold mb-1 ${step.status === 'pending' ? 'text-gray-400' : 'text-gray-900'}`}>
              {step.title}
            </p>
            <p className="text-[10px] text-gray-500 leading-tight max-w-[120px]">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
