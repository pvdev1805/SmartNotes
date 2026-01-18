import { FolderPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface QuizSetModalProps {
  previousTitle?: string
  isProcessing: boolean
  onCancel: () => void
  onConfirm: (title: string) => void
}

const QuizSetInfoModal = ({ previousTitle, isProcessing, onCancel, onConfirm }: QuizSetModalProps) => {
  const actionType = previousTitle ? "Update" : "Create"
  const [title, setTitle] = useState(previousTitle || '')
  const [error, setError] = useState('')

  const handleSubmit = () => {
    // Validation
    if (!title.trim()) {
      setError('Title is required')
      return
    }
    if (title.trim().length < 3) {
      setError('Title must be at least 3 characters')
      return
    }

    // Clear error and submit
    setError('')
    onConfirm(title.trim())
  }

  const handleCancel = () => {
    setTitle('')
    setError('')
    onCancel()
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm animate-in fade-in duration-200">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <FolderPlus className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{actionType} collection</h3>
                <p className="text-sm text-gray-500">{actionType} collection for your quizzes</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                  setError('') // Clear error on input
                }}
                placeholder="Enter quiz set title..."
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
                  ${error
                  ? 'border-red-300 focus:ring-red-400'
                  : 'border-gray-300 focus:ring-blue-400'
                }`}
                disabled={isProcessing}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !isProcessing) {
                    handleSubmit()
                  }
                }}
              />
              {error && (
                <p className="text-sm text-red-600 mt-1">{error}</p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-gray-50 rounded-b-xl flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="px-4 py-2 border-gray-300 text-gray-700 hover:bg-gray-100"
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
              disabled={isProcessing || !title.trim()}
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Processing...
                </>
              ) : (
                <>
                  <FolderPlus className="w-4 h-4" />
                  Confirm
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default QuizSetInfoModal