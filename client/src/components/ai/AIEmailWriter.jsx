import { useState } from 'react'
import { SparklesIcon, XIcon, Loader2, CopyIcon, RefreshCwIcon } from 'lucide-react'
import api from '../../api/axios'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const emailTypes = [
    { value: 'leave_application', label: 'Leave Application', adminOnly: false },
    { value: 'leave_response', label: 'Leave Response', adminOnly: true },
    { value: 'hr_announcement', label: 'HR Announcement', adminOnly: true },
    { value: 'attendance_reminder', label: 'Attendance Reminder', adminOnly: true },
    { value: 'custom', label: 'Custom Email', adminOnly: false },
]

const AIEmailWriter = ({ open, onClose }) => {
    const { user } = useAuth()
    const isAdmin = user?.role === 'ADMIN'

    const [emailType, setEmailType] = useState('leave_application')
    const [context, setContext] = useState({})
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState(null)

    const filteredTypes = emailTypes.filter((t) => !t.adminOnly || isAdmin)

    const updateContext = (key, value) => {
        setContext((prev) => ({ ...prev, [key]: value }))
    }

    const handleTypeChange = (value) => {
        setEmailType(value)
        setContext({})
        setResult(null)
    }

    const handleGenerate = async () => {
        setLoading(true)
        try {
            const res = await api.post('/ai/email', { type: emailType, context })
            setResult(res.data)
        } catch (error) {
            toast.error(error?.response?.data?.error || 'Failed to generate email')
        } finally {
            setLoading(false)
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(`Subject: ${result.subject}\n\n${result.body}`)
        toast.success('Copied to clipboard!')
    }

    const handleRegenerate = () => {
        handleGenerate()
    }

    if (!open) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm" onClick={onClose}>
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg animate-fade-in max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-50 rounded-lg">
                            <SparklesIcon className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div>
                            <h2 className="text-base font-semibold text-slate-900">AI Email Writer</h2>
                            <p className="text-xs text-slate-500">Generate professional emails instantly</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-1">
                        <XIcon className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-5 space-y-4">
                    {/* Email Type Selector */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Type</label>
                        <select value={emailType} onChange={(e) => handleTypeChange(e.target.value)}>
                            {filteredTypes.map((t) => (
                                <option key={t.value} value={t.value}>{t.label}</option>
                            ))}
                        </select>
                    </div>

                    {/* Dynamic Context Fields */}
                    {emailType === 'leave_application' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Leave Type</label>
                                <select value={context.leaveType || ''} onChange={(e) => updateContext('leaveType', e.target.value)}>
                                    <option value="">Select type</option>
                                    <option value="SICK">Sick Leave</option>
                                    <option value="CASUAL">Casual Leave</option>
                                    <option value="ANNUAL">Annual Leave</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Start Date</label>
                                    <input type="date" value={context.startDate || ''} onChange={(e) => updateContext('startDate', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1.5">End Date</label>
                                    <input type="date" value={context.endDate || ''} onChange={(e) => updateContext('endDate', e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Reason</label>
                                <textarea rows={3} placeholder="Brief reason for leave..." value={context.reason || ''} onChange={(e) => updateContext('reason', e.target.value)} />
                            </div>
                        </>
                    )}

                    {emailType === 'leave_response' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Employee Name</label>
                                <input type="text" placeholder="Employee name" value={context.employeeName || ''} onChange={(e) => updateContext('employeeName', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Action</label>
                                <select value={context.action || ''} onChange={(e) => updateContext('action', e.target.value)}>
                                    <option value="">Select action</option>
                                    <option value="Approving">Approving</option>
                                    <option value="Rejecting">Rejecting</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Note</label>
                                <textarea rows={3} placeholder="Additional note..." value={context.note || ''} onChange={(e) => updateContext('note', e.target.value)} />
                            </div>
                        </>
                    )}

                    {emailType === 'hr_announcement' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Topic</label>
                                <input type="text" placeholder="Announcement topic" value={context.topic || ''} onChange={(e) => updateContext('topic', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Key Points</label>
                                <textarea rows={3} placeholder="Key points to include..." value={context.keyPoints || ''} onChange={(e) => updateContext('keyPoints', e.target.value)} />
                            </div>
                        </>
                    )}

                    {emailType === 'attendance_reminder' && (
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">Note</label>
                            <textarea rows={3} placeholder="Additional context..." value={context.note || ''} onChange={(e) => updateContext('note', e.target.value)} />
                        </div>
                    )}

                    {emailType === 'custom' && (
                        <>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Recipient</label>
                                <input type="text" placeholder="Recipient name or role" value={context.recipient || ''} onChange={(e) => updateContext('recipient', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Subject Hint</label>
                                <input type="text" placeholder="What is this email about?" value={context.subjectHint || ''} onChange={(e) => updateContext('subjectHint', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1.5">Key Points</label>
                                <textarea rows={3} placeholder="Key points to include..." value={context.keyPoints || ''} onChange={(e) => updateContext('keyPoints', e.target.value)} />
                            </div>
                        </>
                    )}

                    {/* Generate Button */}
                    <button onClick={handleGenerate} disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2">
                        {loading ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <SparklesIcon className="w-4 h-4" />
                        )}
                        {loading ? 'Generating...' : 'Generate Email ✨'}
                    </button>

                    {/* Result Preview */}
                    {result && (
                        <div className="bg-emerald-50 rounded-xl p-4 space-y-3">
                            <div>
                                <p className="text-xs font-medium text-emerald-500 uppercase tracking-wide mb-1">Subject</p>
                                <p className="text-sm font-semibold text-slate-900">{result.subject}</p>
                            </div>
                            <div>
                                <p className="text-xs font-medium text-emerald-500 uppercase tracking-wide mb-1">Body</p>
                                <p className="text-sm text-slate-700 whitespace-pre-wrap">{result.body}</p>
                            </div>
                            <div className="flex gap-2 pt-1">
                                <button onClick={handleCopy} className="btn-secondary flex items-center gap-1.5 text-xs !px-3 !py-2">
                                    <CopyIcon className="w-3.5 h-3.5" /> Copy to Clipboard
                                </button>
                                <button onClick={handleRegenerate} disabled={loading} className="btn-secondary flex items-center gap-1.5 text-xs !px-3 !py-2">
                                    <RefreshCwIcon className="w-3.5 h-3.5" /> Regenerate
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default AIEmailWriter
