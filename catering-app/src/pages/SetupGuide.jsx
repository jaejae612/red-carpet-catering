import React from 'react'
import { Database, Key, Shield, CheckCircle, ExternalLink } from 'lucide-react'

export default function SetupGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Database className="text-red-700" size={40} />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Setup Required</h1>
          <p className="text-gray-600">Connect your Supabase database to get started</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 bg-red-700 text-white rounded-full flex items-center justify-center text-sm">1</span>
            Create a Supabase Project
          </h2>
          <ol className="space-y-3 text-gray-600 ml-10">
            <li>Go to <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-red-700 hover:underline inline-flex items-center gap-1">supabase.com <ExternalLink size={14} /></a></li>
            <li>Sign up or log in to your account</li>
            <li>Click "New Project" and fill in the details</li>
            <li>Wait for your database to be created (takes ~2 minutes)</li>
          </ol>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 bg-red-700 text-white rounded-full flex items-center justify-center text-sm">2</span>
            Run the Database Schema
          </h2>
          <p className="text-gray-600 mb-4 ml-10">Go to SQL Editor in your Supabase dashboard and run the SQL from <code className="bg-gray-100 px-2 py-1 rounded">database-schema.sql</code></p>
          <div className="bg-gray-900 text-gray-100 rounded-xl p-4 text-sm overflow-x-auto ml-10">
            <pre>{`-- This creates all the tables needed:
-- profiles, bookings, staff, equipment

-- See database-schema.sql file for full SQL`}</pre>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 bg-red-700 text-white rounded-full flex items-center justify-center text-sm">3</span>
            Get Your API Keys
          </h2>
          <ol className="space-y-3 text-gray-600 ml-10">
            <li>Go to Project Settings → API</li>
            <li>Copy your <strong>Project URL</strong></li>
            <li>Copy your <strong>anon/public</strong> key</li>
          </ol>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 bg-red-700 text-white rounded-full flex items-center justify-center text-sm">4</span>
            Configure Environment Variables
          </h2>
          <p className="text-gray-600 mb-4 ml-10">Create a <code className="bg-gray-100 px-2 py-1 rounded">.env</code> file in your project root:</p>
          <div className="bg-gray-900 text-gray-100 rounded-xl p-4 text-sm overflow-x-auto ml-10">
            <pre>{`VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here`}</pre>
          </div>
          <p className="text-gray-500 text-sm mt-4 ml-10">Or edit <code className="bg-gray-100 px-2 py-1 rounded">src/lib/supabase.js</code> directly with your credentials.</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 bg-red-700 text-white rounded-full flex items-center justify-center text-sm">5</span>
            Create Admin User
          </h2>
          <ol className="space-y-3 text-gray-600 ml-10">
            <li>Sign up through the app normally</li>
            <li>Go to Supabase Dashboard → Table Editor → profiles</li>
            <li>Find your user and change <code className="bg-gray-100 px-2 py-1 rounded">role</code> from "customer" to "admin"</li>
          </ol>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
          <h3 className="font-semibold text-green-800 flex items-center gap-2 mb-2">
            <CheckCircle size={20} />
            You're All Set!
          </h3>
          <p className="text-green-700">After completing these steps, restart your development server and refresh the page.</p>
        </div>

        <div className="mt-8 text-center">
          <a href="https://supabase.com/docs" target="_blank" rel="noopener noreferrer" className="text-red-700 hover:underline inline-flex items-center gap-1">
            Supabase Documentation <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </div>
  )
}
