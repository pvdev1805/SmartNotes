import AnimatedList from '@/components/animations/animated-list'
import FadeInItem from '@/components/animations/fade-in-item'
import AnimatedSection from '@/components/landing/animated-section'
import NoteCard from '@/components/notes/note-card'
import PDFItem from '@/components/PDFs/PDFItem'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { pdfs } from '@/data/pdfs'
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
const uploadedPDFs = pdfs

const Home = () => {
  return (
    <>
      <div className='min-h-screen bg-gray-50 px-4 py-4 space-y-8 overflow-hidden'>
        {/* Header Section */}
        <AnimatedSection delay={0}>
          <section className='mb-4 flex items-center justify-between gap-4'>
            <div>
              <h1 className='text-xl md:text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-2'>
                Welcome back!
                <span className='text-3xl'>👋</span>
              </h1>
              <p className='mt-1 text-sm text-muted-foreground'>Ready to continue your learning journey?</p>
            </div>
            <Link href='/notes/new'>
              <Button className='bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 flex gap-2'>
                <Plus className='w-4 h-4' />
                New Note
              </Button>
            </Link>
          </section>
        </AnimatedSection>
        {/* End - Header Section */}

        {/* Stats Cards Section */}
        <AnimatedSection delay={0.1}>
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
        </AnimatedSection>
        {/* End - Stats Cards Section */}

        {/* Recent Notes Section */}
        <AnimatedSection delay={0.1}>
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

            <AnimatedList className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {recentNotes.map((note) => (
                <FadeInItem key={note.id}>
                  <NoteCard
                    id={note.id}
                    title={note.title}
                    description={note.description}
                    createdAt={note.createdAt}
                    tags={note.tags}
                  />
                </FadeInItem>
              ))}
            </AnimatedList>
          </section>
        </AnimatedSection>
        {/* End - Recent Notes Section */}

        {/* Upload PDFs Section */}
        <AnimatedSection delay={0.1}>
          <section className='mb-4 space-y-4'>
            <div className='flex items-center justify-between'>
              <h2 className='text-xl font-semibold text-foreground'>Upload PDFs</h2>
              <Button className='bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 flex items-center'>
                <Upload className='w-4 h-4 mr-2' />
                Upload PDF
              </Button>
            </div>

            <div className='space-y-3'>
              {uploadedPDFs.length === 0 ? (
                <div className='text-center text-gray-500 py-16'>
                  <p className='text-lg'>No PDFs uploaded yet.</p>
                </div>
              ) : (
                <AnimatedList className='flex items-center flex-wrap gap-4'>
                  {uploadedPDFs.map((pdf) => (
                    <FadeInItem key={pdf.id}>
                      <PDFItem
                        fileName={pdf.fileName}
                        size={pdf.size}
                        downloadUrl={pdf.downloadUrl}
                        createdAt={pdf.uploadedAt}
                      />
                    </FadeInItem>
                  ))}
                </AnimatedList>
              )}
            </div>
          </section>
        </AnimatedSection>
        {/* End - Upload PDFs Section */}
      </div>
    </>
  )
}

export default Home
