import { FolderPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface Collection {
  id: number
  title: string
}

interface AddToCollectionModalProps {
  objId: number // object's id
  objTitle: string // object's title
  collections: Collection[] // Available choices
  isAdding: boolean
  onCancel: () => void
  onConfirm: (collectionId: number) => void
}

const AddToCollectionModal = ({
                                objId,
                                objTitle,
                                collections,
                                isAdding,
                                onCancel,
                                onConfirm
                              }: AddToCollectionModalProps) => {
  const [selectedCollectionId, setSelectedCollectionId] = useState<number | null>(null)

  const handleConfirm = () => {
    if (selectedCollectionId !== null) {
      onConfirm(selectedCollectionId)
    }
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
                <h3 className="text-xl font-semibold text-gray-900">Add Quiz to Collection</h3>
                <p className="text-sm text-gray-500">Select a collection for this quiz</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <p className="text-gray-700 mb-4">
              Add quiz <span className="font-semibold text-gray-900">"{objTitle}"</span> to:
            </p>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {collections.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No collections available</p>
              ) : (
                collections.map((collection) => (
                  <label
                    key={collection.id}
                    className={`flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      selectedCollectionId === collection.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="collection"
                      value={collection.id}
                      checked={selectedCollectionId === collection.id}
                      onChange={() => setSelectedCollectionId(collection.id)}
                      className="mt-1 w-4 h-4 text-blue-600 focus:ring-blue-500"
                      disabled={isAdding}
                    />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{collection.title}</div>
                    </div>
                  </label>
                ))
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-gray-50 rounded-b-xl flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={onCancel}
              className="px-4 py-2 border-gray-300 text-gray-700 hover:bg-gray-100"
              disabled={isAdding}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-2"
              disabled={isAdding || selectedCollectionId === null}
            >
              {isAdding ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Adding...
                </>
              ) : (
                <>
                  <FolderPlus className="w-4 h-4" />
                  Add to Collection
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddToCollectionModal