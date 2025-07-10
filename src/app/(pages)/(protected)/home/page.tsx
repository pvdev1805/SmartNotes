import TimeAgo from '@/components/time-ago'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { BookOpen, ChevronRight, Edit, FileText, Plus, Tag, Target, Trash, Upload, Zap } from 'lucide-react'
import Link from 'next/link'

// Mock data for stats
const statsData = [
  {
    title: 'Total Notes',
    value: '2',
    icon: FileText,
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    iconColor: 'text-blue-500'
  },
  {
    title: 'Flashcards',
    value: '24',
    icon: Zap,
    bgColor: 'bg-green-50',
    textColor: 'text-green-600',
    iconColor: 'text-green-500'
  },
  {
    title: 'Average Score',
    value: '7/10',
    icon: Target,
    bgColor: 'bg-purple-50',
    textColor: 'text-purple-600',
    iconColor: 'text-purple-500'
  },
  {
    title: 'PDFs',
    value: '3',
    icon: BookOpen,
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-600',
    iconColor: 'text-orange-500'
  }
]

// Mock data for recent notes
const recentNotes = [
  {
    id: 1,
    title: 'Understanding React Hooks',
    createdAt: new Date('2025-07-01'),
    description: 'A deep dive into the world of React Hooks and how they can simplify your code',
    tags: ['ReactJS', 'Hooks']
  },
  {
    id: 2,
    title: 'Next.js for Beginners',
    createdAt: new Date('2025-07-01'),
    description:
      'An introductory guide to Next.js, the React framework for production. Learn how to build server-rendered React applications with ease.',
    tags: ['NextJS', 'ReactJS']
  },
  {
    id: 3,
    title: 'CSS Grid Layout',
    createdAt: new Date('2025-07-01'),
    description: 'Learn how to create responsive layouts using CSS Grid',
    tags: ['CSS', 'Web Design']
  }
]

// Mock data for PDFs
const uploadedPDFs = [
  {
    id: 1,
    fileName: 'React_Hooks_Guide.pdf',
    size: '1.2 MB',
    uploadedAt: new Date('2025-07-01')
  },
  {
    id: 2,
    fileName: 'AI_and_Machine_Learning.pdf',
    size: '2.5 MB',
    uploadedAt: new Date('2025-07-02')
  },
  {
    id: 3,
    fileName: 'Web_Development_Trends.pdf',
    size: '1.8 MB',
    uploadedAt: new Date('2025-07-03')
  },
  {
    id: 4,
    fileName: 'NextJS_Basics.pdf',
    size: '1.0 MB',
    uploadedAt: new Date('2025-07-04')
  }
]

const Home = () => {
  return (
    <>
      <div className='py-2 space-y-8'>
        {/* Header Section */}
        <section className='mb-4 flex items-center justify-between gap-4'>
          <div>
            <h1 className='text-xl md:text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-2'>
              Welcome back!
              <span className='text-3xl'>👋</span>
            </h1>
            <p className='mt-1 text-sm text-muted-foreground'>Ready to continue your learning journey?</p>
          </div>
          <Button className='bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600  hover:to-purple-600 flex'>
            <Plus className='w-4 h-4' />
            New Note
          </Button>
        </section>
        {/* End - Header Section */}

        {/* Stats Cards Section */}
        <section className='mb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {statsData.map((stat, index) => (
            <Card
              key={index}
              className={`${stat.bgColor} py-2 justify-center border shadow-sm hover:shadow-lg transition-shadow duration-300 rounded-lg`}
            >
              <CardContent className='px-4'>
                <div className='flex items-center justify-between gap-2'>
                  <div className='space-y-1'>
                    <div className={`lg:text-sm font-semibold ${stat.textColor}`}>{stat.title}</div>
                    <p className='lg:text-xl font-bold text-foreground'>{stat.value}</p>
                  </div>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </section>
        {/* End - Stats Cards Section */}

        {/* Recent Notes Section */}
        <section className='mb-4 space-y-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-semibold text-foreground'>Recent Notes</h2>
            <Link
              href='/notes'
              className='text-sm text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1'
            >
              View All
              <ChevronRight className='w-4 h-4' />
            </Link>
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
            {recentNotes.map((note) => (
              <Card
                key={note.id}
                className='border shadow-sm hover:shadow-lg transition-shadow duration-300 rounded-lg'
              >
                <CardContent>
                  <div className='flex items-start justify-between'>
                    <h3 className='font-semibold text-foreground truncate max-w-[200px] sm:max-w-[220px]'>
                      {note.title}
                    </h3>
                    <div className='flex items-center'>
                      <Button variant={'ghost'} className=''>
                        <Edit className='w-4 h-4 text-muted-foreground' />
                      </Button>
                      <Button variant={'ghost'} className=''>
                        <Trash className='w-4 h-4 text-red-600' />
                      </Button>
                    </div>
                  </div>

                  <TimeAgo date={note.createdAt} className='mb-3' />

                  <p className='mb-4 text-sm text-muted-foreground lg:min-h-10 line-clamp-2'>{note.description}</p>

                  <div className='flex items-center gap-2'>
                    <Tag className='w-4 h-4 text-muted-foreground' />
                    <div className='flex gap-2'>
                      {note.tags.map((tag) => (
                        <Badge key={tag} variant={'secondary'} className='text-xs'>
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        {/* End - Recent Notes Section */}

        {/* Upload PDFs Section */}
        <section className='mb-4 space-y-4'>
          <div className='flex items-center justify-between'>
            <h2 className='text-xl font-semibold text-foreground'>Upload PDFs</h2>
            <Button className='bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 flex items-center'>
              <Upload className='w-4 h-4 mr-2' />
              Upload PDF
            </Button>
          </div>

          <div className='space-y-3'>
            {uploadedPDFs.map((pdf) => (
              <Card key={pdf.id} className='border shadow-sm hover:shadow-lg transition-shadow duration-300 rounded-lg'>
                <CardContent className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <div className='p-2 rounded-md bg-red-100 text-red-600'>
                      <FileText className='w-6 h-6' />
                    </div>
                    <div>
                      <p
                        className='font-semibold text-foreground truncate max-w-[140px] sm:max-w-[160px]'
                        title={pdf.fileName}
                      >
                        {pdf.fileName}
                      </p>
                      <p className='text-sm text-muted-foreground'>{pdf.size}</p>
                    </div>
                  </div>
                  <TimeAgo date={pdf.uploadedAt} className='text-sm text-muted-foreground' />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
        {/* End - Upload PDFs Section */}
      </div>
    </>
  )
}

export default Home
