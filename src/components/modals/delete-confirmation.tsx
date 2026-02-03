import { Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createPortal } from 'react-dom'

interface ConfirmationModalProps {
  type: string
  id: number
  title: string
  isDeleting: boolean
  onCancel: () => void // should trigger hiding modal in parent component
  onConfirm: () => void // should trigger next action in parent component
}

const DeleteConfirmationModal = ({ type, id, title, isDeleting, onCancel, onConfirm } : ConfirmationModalProps) => {
  return createPortal(
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
        <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 animate-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <Trash className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Delete {type}: {title}</h3>
                <p className="text-sm text-gray-500">This action cannot be undone</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-gray-700 leading-relaxed">
              Are you sure you want to delete this {type} with id <span className="font-semibold text-gray-900">{id}</span>?
              This will permanently remove {type} from your account.
            </p>
          </div>

          {/* Footer */}
          <div className="p-6 bg-gray-50 rounded-b-xl flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={onCancel}
              className="px-4 py-2 border-gray-300 text-gray-700 hover:bg-gray-100"
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              onClick={onConfirm}
              className="px-4 py-2 bg-red-600 text-white hover:bg-red-700 flex items-center gap-2"
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Deleting...
                </>
              ) : (
                <>
                  <Trash className="w-4 h-4" />
                  Delete {type}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>,
    document.body
  )
}

export default DeleteConfirmationModal