import { Card, CardContent } from '@/components/ui/card'
import { BookText } from 'lucide-react'

interface FlashcardProps {
  id: number
  question: string
  answer: string
  collections?: { id: number; name: string }[]
}

const Flashcard = ({ id, question, answer, collections }: FlashcardProps) => {
  return (
    <>
      <Card key={id} className='py-4 w-full shadow-lg rounded-xl bg-white'>
        <CardContent className='px-4 h-full flex flex-col'>
          <div className='font-semibold text-lg mb-2 text-gray-900'>{question}</div>
          <div className='text-gray-700 mb-3'>{answer}</div>
          {collections && collections.length > 0 && (
            <div className='mt-auto flex items-center gap-2 flex-wrap'>
              <BookText className='w-5 h-5 text-muted-foreground' />
              {collections.map((collection) => (
                <span key={collection.id} className='bg-gray-200 text-xs px-2 py-1 rounded'>
                  {collection.name}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </>
  )
}

export default Flashcard
