import { DownloadIcon, FileText } from 'lucide-react'
import TimeAgo from '@/components/time-ago'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'

interface PDFItemProps {
  fileName: string
  size: string
  downloadUrl: string
  createdAt: Date
}

const PDFItem = ({ fileName, size, downloadUrl, createdAt }: PDFItemProps) => {
  return (
    <div className='w-full md:w-[320px] xl:w-[400px] 2xl:w-[480px] flex items-center justify-between gap-4 rounded-md border p-4 shadow-sm hover:shadow-lg transition-shadow duration-300'>
      <div className='flex flex-grow items-center gap-4 min-w-0'>
        <div className='p-2 rounded-md bg-red-100 text-red-600'>
          <FileText className='w-6 h-6' />
        </div>

        <div className='flex-grow min-w-0'>
          <p className='font-semibold text-foreground truncate' title={fileName}>
            {fileName}
          </p>
          <div className='flex items-center gap-2 text-sm text-gray-500'>
            <span>{size}</span>
            <span className='text-muted-foreground'>•</span>
            <TimeAgo date={createdAt} />
          </div>
        </div>
      </div>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant='ghost' size='icon' asChild>
              <a href={downloadUrl} download>
                <DownloadIcon className='h-5 w-5' />
              </a>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Download</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}

export default PDFItem
