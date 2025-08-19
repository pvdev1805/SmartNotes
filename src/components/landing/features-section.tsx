import { Card, CardContent } from '@/components/ui/card'
import { FileText, Book, GraduationCap, Zap, LineChart, Tag } from 'lucide-react'

const features = [
  {
    title: 'Create Notes',
    description:
      'Write and format rich text notes with our intuitive editor. Add images, links, and organize your thoughts beautifully.',
    icon: FileText,
    style: 'w-7 h-7 text-blue-600'
  },
  {
    title: 'Create Flashcards',
    description: 'Easily generate flashcards from your notes. Perfect for memorization and quick review sessions.',
    icon: Zap,
    style: 'w-7 h-7 text-green-600'
  },
  {
    title: 'Organize by Categories',
    description:
      'Group your notes and flashcards into categories for better organization. Keep everything structured and accessible.',
    icon: Book,
    style: 'w-7 h-7 text-pink-500'
  },
  {
    title: 'Add Tags',
    description: 'Tag your notes and flashcards for lightning-fast filtering and search. Find what you need instantly.',
    icon: Tag,
    style: 'w-7 h-7 text-orange-400'
  },
  {
    title: 'Generate Quiz',
    description: 'Use AI to automatically generate quiz questions from your notes. Test your knowledge effortlessly.',
    icon: GraduationCap,
    style: 'w-7 h-7 text-purple-600'
  },
  {
    title: 'Track Progress',
    description:
      'View your quiz history and score trends over time. Monitor your learning journey with detailed analytics.',
    icon: LineChart,
    style: 'w-7 h-7 text-cyan-600'
  }
]

const FeaturesSection = () => {
  return (
    <>
      <section className='w-full'>
        <div className='max-w-7xl flex flex-col items-center mx-auto py-12 px-4 rounded-lg'>
          <div className='max-w-3xl mx-auto text-center'>
            <h2 className='mb-2 text-2xl md:text-3xl lg:text-4xl text-gray-900 font-bold'>
              Everything you need to learn smarter
            </h2>
            <p className='lg:text-lg text-gray-600 mb-4'>
              Powerful features designed to enhance your learning experience and boost retention
            </p>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {features.map((item) => (
              <Card
                key={item.title}
                className='border shadow-sm hover:shadow-lg transition-shadow duration-300 rounded-lg'
              >
                <CardContent>
                  <div className='flex gap-2 items-center justify-start space-y-2'>
                    <div className='bg-blue-50 p-2 rounded-lg flex items-center justify-center'>
                      <item.icon className={`${item.style}`} />
                    </div>
                    <h3 className='font-semibold text-foreground'>{item.title}</h3>
                  </div>
                  <p className='text-sm text-muted-foreground lg:min-h-10'>{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default FeaturesSection
