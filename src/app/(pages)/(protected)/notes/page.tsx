'use client'
import { useState } from 'react'
import { Plus, Search, Filter, Notebook, MoreVertical } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import AnimatedSection from '@/components/landing/animated-section'
import Pagination from '@/components/pagination'
import useQueryConfig from '@/hooks/use-query-config'
import useUpdateQueryParam from '@/hooks/use-update-query-param'

const notes = [
  {
    id: 1,
    title: 'React Basics',
    description: 'Introduction to React, components, props, and state.',
    createdAt: '2025-07-15',
    updatedAt: '2025-07-18',
    tags: ['react', 'frontend']
  },
  {
    id: 2,
    title: 'Java Fundamentals',
    description: 'OOP, classes, inheritance, and interfaces in Java.',
    createdAt: '2025-07-16',
    updatedAt: '2025-07-17',
    tags: ['java', 'backend']
  },
  {
    id: 3,
    title: 'Algorithms',
    description: 'Sorting, searching, and complexity analysis.',
    createdAt: '2025-07-14',
    updatedAt: '2025-07-15',
    tags: ['algorithms', 'cs']
  },
  {
    id: 4,
    title: 'Web Development',
    description: 'HTML, CSS, JavaScript, and responsive design.',
    createdAt: '2025-07-13',
    updatedAt: '2025-07-14',
    tags: ['web', 'frontend']
  },
  {
    id: 5,
    title: 'Database Management',
    description: 'SQL, NoSQL, and data modeling.',
    createdAt: '2025-07-12',
    updatedAt: '2025-07-13',
    tags: ['database', 'sql']
  },
  {
    id: 6,
    title: 'Machine Learning',
    description: 'Introduction to ML, algorithms, and applications.',
    createdAt: '2025-07-11',
    updatedAt: '2025-07-12',
    tags: ['ml', 'data science']
  },
  {
    id: 7,
    title: 'Cloud Computing',
    description: 'AWS, Azure, and cloud architecture.',
    createdAt: '2025-07-10',
    updatedAt: '2025-07-11',
    tags: ['cloud', 'aws']
  },
  {
    id: 8,
    title: 'Cybersecurity',
    description: 'Network security, encryption, and best practices.',
    createdAt: '2025-07-09',
    updatedAt: '2025-07-10',
    tags: ['cybersecurity', 'network']
  },
  {
    id: 9,
    title: 'DevOps',
    description: 'CI/CD, containerization, and automation.',
    createdAt: '2025-07-08',
    updatedAt: '2025-07-09',
    tags: ['devops', 'automation']
  },
  {
    id: 10,
    title: 'UI/UX Design',
    description: 'Design principles, user research, and prototyping.',
    createdAt: '2025-07-07',
    updatedAt: '2025-07-08',
    tags: ['ui', 'ux', 'design']
  },
  {
    id: 11,
    title: 'Mobile Development',
    description: 'iOS and Android app development basics.',
    createdAt: '2025-07-06',
    updatedAt: '2025-07-07',
    tags: ['mobile', 'ios', 'android']
  },
  {
    id: 12,
    title: 'Game Development',
    description: 'Introduction to game engines and development.',
    createdAt: '2025-07-05',
    updatedAt: '2025-07-06',
    tags: ['game', 'unity', 'unreal']
  },
  {
    id: 13,
    title: 'Blockchain Technology',
    description: 'Understanding blockchain, smart contracts, and DApps.',
    createdAt: '2025-07-04',
    updatedAt: '2025-07-05',
    tags: ['blockchain', 'crypto']
  },
  {
    id: 14,
    title: 'Data Structures',
    description: 'Arrays, linked lists, trees, and graphs.',
    createdAt: '2025-07-03',
    updatedAt: '2025-07-04',
    tags: ['data structures', 'cs']
  },
  {
    id: 15,
    title: 'Software Testing',
    description: 'Unit testing, integration testing, and TDD.',
    createdAt: '2025-07-02',
    updatedAt: '2025-07-03',
    tags: ['testing', 'tdd']
  },
  {
    id: 16,
    title: 'Agile Methodologies',
    description: 'Scrum, Kanban, and agile project management.',
    createdAt: '2025-07-01',
    updatedAt: '2025-07-02',
    tags: ['agile', 'scrum']
  },
  {
    id: 17,
    title: 'Network Protocols',
    description: 'TCP/IP, HTTP, and network communication.',
    createdAt: '2025-06-30',
    updatedAt: '2025-07-01',
    tags: ['network', 'protocols']
  },
  {
    id: 18,
    title: 'Artificial Intelligence',
    description: 'AI concepts, neural networks, and applications.',
    createdAt: '2025-06-29',
    updatedAt: '2025-06-30',
    tags: ['ai', 'neural networks']
  },
  {
    id: 19,
    title: 'Virtual Reality',
    description: 'VR technologies, development, and user experience.',
    createdAt: '2025-06-28',
    updatedAt: '2025-06-29',
    tags: ['vr', 'virtual reality']
  },
  {
    id: 20,
    title: 'Ethical Hacking',
    description: 'Penetration testing, vulnerabilities, and security.',
    createdAt: '2025-06-27',
    updatedAt: '2025-06-28',
    tags: ['ethical hacking', 'security']
  },
  {
    id: 21,
    title: 'Quantum Computing',
    description: 'Introduction to quantum principles and algorithms.',
    createdAt: '2025-06-26',
    updatedAt: '2025-06-27',
    tags: ['quantum', 'computing']
  },
  {
    id: 22,
    title: 'Internet of Things (IoT)',
    description: 'IoT devices, protocols, and applications.',
    createdAt: '2025-06-25',
    updatedAt: '2025-06-26',
    tags: ['iot', 'devices']
  },
  {
    id: 23,
    title: 'Big Data Technologies',
    description: 'Hadoop, Spark, and data processing techniques.',
    createdAt: '2025-06-24',
    updatedAt: '2025-06-25',
    tags: ['big data', 'hadoop', 'spark']
  },
  {
    id: 24,
    title: 'Natural Language Processing',
    description: 'NLP concepts, tools, and applications.',
    createdAt: '2025-06-23',
    updatedAt: '2025-06-24',
    tags: ['nlp', 'language processing']
  },
  {
    id: 25,
    title: 'Robotics',
    description: 'Introduction to robotics, sensors, and control systems.',
    createdAt: '2025-06-22',
    updatedAt: '2025-06-23',
    tags: ['robotics', 'sensors']
  },
  {
    id: 26,
    title: 'Computer Vision',
    description: 'Image processing, object detection, and applications.',
    createdAt: '2025-06-21',
    updatedAt: '2025-06-22',
    tags: ['computer vision', 'image processing']
  },
  {
    id: 27,
    title: 'Data Visualization',
    description: 'Techniques for visualizing data effectively.',
    createdAt: '2025-06-20',
    updatedAt: '2025-06-21',
    tags: ['data visualization', 'charts']
  },
  {
    id: 28,
    title: 'Content Management Systems',
    description: 'WordPress, Drupal, and CMS fundamentals.',
    createdAt: '2025-06-19',
    updatedAt: '2025-06-20',
    tags: ['cms', 'wordpress', 'drupal']
  },
  {
    id: 29,
    title: 'API Development',
    description: 'RESTful APIs, GraphQL, and best practices.',
    createdAt: '2025-06-18',
    updatedAt: '2025-06-19',
    tags: ['api', 'rest', 'graphql']
  },
  {
    id: 30,
    title: 'Software Architecture',
    description: 'Design patterns, microservices, and system design.',
    createdAt: '2025-06-17',
    updatedAt: '2025-06-18',
    tags: ['architecture', 'design patterns']
  },
  {
    id: 31,
    title: 'Version Control Systems',
    description: 'Git, branching strategies, and collaboration.',
    createdAt: '2025-06-16',
    updatedAt: '2025-06-17',
    tags: ['git', 'version control']
  },
  {
    id: 32,
    title: 'Cross-Platform Development',
    description: 'Building apps for multiple platforms with a single codebase.',
    createdAt: '2025-06-15',
    updatedAt: '2025-06-16',
    tags: ['cross-platform', 'flutter', 'react native']
  }
]

const NotesListPage = () => {
  const [search, setSearch] = useState('')

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.description.toLowerCase().includes(search.toLowerCase()) ||
      note.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  )

  const pageSize = 6
  const queryConfig = useQueryConfig()
  const setQueryParam = useUpdateQueryParam()
  const currentPage = Number(queryConfig.page) || 1

  const paginatedNotes = filteredNotes.slice((currentPage - 1) * pageSize, currentPage * pageSize)

  return (
    <div className='min-h-screen bg-gray-50 px-4 py-4 overflow-hidden'>
      {/* Header */}
      <AnimatedSection delay={0}>
        <div className='flex items-center justify-between mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 flex items-center gap-2'>
            <Notebook className='w-7 h-7 text-blue-600' />
            My Notes
          </h1>
          <Button className='flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold px-4 py-2 rounded-lg shadow hover:from-blue-600 hover:to-purple-600 transition'>
            <Plus className='w-5 h-5' />
            Add Note
          </Button>
        </div>
      </AnimatedSection>
      {/* End - Header */}

      {/* Search & Filter */}
      <AnimatedSection delay={0.1}>
        <div className='flex items-center gap-4 mb-6'>
          <div className='relative flex-1'>
            <Search className='absolute left-3 top-3 text-gray-400 w-5 h-5' />
            <input
              type='text'
              placeholder='Search notes...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-sm'
            />
          </div>
          <Button variant='outline' className='flex items-center gap-2'>
            <Filter className='w-5 h-5' />
            Filter
          </Button>
        </div>
      </AnimatedSection>

      {/* Notes Grid */}
      <AnimatedSection delay={0.2}>
        {filteredNotes.length === 0 ? (
          <div className='text-center text-gray-500 py-16'>
            <Notebook className='w-12 h-12 mx-auto mb-4 text-gray-300' />
            <p className='text-lg'>No notes found. Try a different search or add a new note!</p>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {paginatedNotes.map((note) => (
              <Card
                key={note.id}
                className='group border shadow-sm hover:shadow-lg transition-shadow duration-300 rounded-xl bg-white relative'
              >
                <CardContent className='p-5'>
                  <div className='flex items-center justify-between mb-2'>
                    <h2 className='font-semibold text-xl text-gray-800 truncate'>{note.title}</h2>
                    <Button variant='ghost' size='icon' className='opacity-0 group-hover:opacity-100 transition'>
                      <MoreVertical className='w-5 h-5 text-gray-400' />
                    </Button>
                  </div>
                  <p className='text-gray-600 mb-3 line-clamp-2'>{note.description}</p>
                  <div className='flex flex-wrap gap-2 mb-2'>
                    {note.tags.map((tag) => (
                      <span key={tag} className='bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-xs font-medium'>
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <div className='text-xs text-gray-400'>Last updated: {note.updatedAt}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </AnimatedSection>

      {/* Pagination */}
      <AnimatedSection delay={0.2}>
        {filteredNotes.length > pageSize && (
          <Pagination
            total={filteredNotes.length}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={(page) => setQueryParam('page', String(page))}
          />
        )}
      </AnimatedSection>
      {/* End - Pagination */}
    </div>
  )
}

export default NotesListPage
