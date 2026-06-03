'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import StatsCard from '@/components/dashboard/StatsCard'

const onboardingTasks = [
  { id: 1, task: 'Complete Insurance Fundamentals Module', category: 'Learning', completed: false },
  { id: 2, task: 'Set up CRM Profile & Signature', category: 'Admin', completed: true },
  { id: 3, task: 'Shadow 3 Client Discovery Calls', category: 'Experience', completed: false },
  { id: 4, task: 'Pass the Life Insurance Practice Quiz', category: 'Certification', completed: false },
  { id: 5, task: 'Submit First 5 Lead Research Reports', category: 'Sales', completed: false },
]

export default function InternHub() {
  const ranks = [
    { rank: 'Junior Associate', threshold: 0, color: 'text-gray-500' },
    { rank: 'Associate', threshold: 2, color: 'text-blue-500' },
    { rank: 'Senior Associate', threshold: 5, color: 'text-indigo-500' },
    { rank: 'Lead Advisor', threshold: 10, color: 'text-[#c9a84c]' },
  ]

  const currentRank = ranks.reverse().find(r => 4 >= r.threshold) || ranks[0]

  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Intern Growth Hub</h1>
          <p className="text-gray-500">Welcome to the team! Here is your path to becoming a licensed advisor.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-xs font-semibold text-gray-400 uppercase">Current Rank</p>
            <p className={`text-sm font-bold ${currentRank.color}`}>{currentRank.rank}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#1e3a5f] to-[#c9a84c] border-2 border-white shadow-sm" />
        </div>
      </header>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard title="Modules Completed" value="4 / 42" icon={<span>📚</span>} color="#1e3a5f" />
        <StatsCard title="Quiz Avg Score" value="82%" icon={<span>🎯</span>} color="#c9a84c" />
        <StatsCard title="Leads Processed" value="12" icon={<span>👥</span>} color="#059669" />
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Learning Roadmap */}
         <div className="lg:col-span-2 space-y-6">
           <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
             <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
               <span>🚀</span> Your Onboarding Roadmap
             </h2>
             <div className="space-y-3">
               {onboardingTasks.map((task) => (
                 <div key={task.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50 hover:bg-gray-100 transition-colors">
                   <div className="flex items-center gap-3">
                     <input type="checkbox" checked={task.completed} readOnly className="h-4 w-4 rounded border-gray-300 text-[#1e3a5f] focus:ring-[#1e3a5f]" />
                     <div>
                       <p className={`text-sm font-medium ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>{task.task}</p>
                       <span className="text-[10px] uppercase tracking-wider text-gray-400">{task.category}</span>
                     </div>
                   </div>
                   {task.completed ? (
                     <span className="text-xs font-bold text-green-600">Done ✓</span>
                   ) : (
                     <button className="text-xs font-semibold text-[#1e3a5f] hover:underline">Start Now</button>
                   )}
                 </div>
               ))}
             </div>
           </div>
         </div>


        {/* Mentor & Support */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">My Mentors</h2>
            <div className="space-y-4">
              {[
                { name: 'Brooke Adams', role: 'Founder', focus: 'Insurance & Planning', color: 'bg-blue-100 text-blue-700' },
                { name: 'Connor Savenas', role: 'Founder', focus: 'Securities & Wholesale', color: 'bg-amber-100 text-amber-700' },
              ].map((mentor) => (
                <div key={mentor.name} className="flex items-center justify-between p-3 rounded-xl border border-gray-100">
                  <div>
                    <p className="text-sm font-bold">{mentor.name}</p>
                    <p className="text-xs text-gray-500">{mentor.role} • {mentor.focus}</p>
                  </div>
                  <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">💬</button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#1e3a5f] to-[#2d5a8e] rounded-2xl p-6 text-white shadow-lg">
            <h3 className="font-bold mb-2">Intern Tip of the Day</h3>
            <p className="text-sm text-white/80 leading-relaxed">
              "The secret to closing is listening more than you talk. In discovery calls, ask 'Why' three times to find the real pain point."
            </p>
            <div className="mt-4 text-xs font-medium text-[#c9a84c]">— Brooke Adams</div>
          </div>
        </div>
      </div>
    </div>
  )
}
