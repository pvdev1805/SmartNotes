import { ExternalLink, Mail } from 'lucide-react'
import Link from 'next/link'

// Company Info Configuration
const companyInfo = {
  name: 'SmartNotes',
  logo: '/logo.svg',
  description: 'Enhance your learning with smart note-taking and intelligent study tools.',
  tagline: 'Made with ❤️ for better learning.'
}

// Feature Links Configuration
const featureLinks = [
  {
    name: 'Notes',
    href: '/notes'
  },
  {
    name: 'Flashcards',
    href: '/flashcards'
  },
  {
    name: 'Quiz',
    href: '/quiz'
  }
]

// Support Links Configuration
const supportLinks = [
  {
    name: 'Help Center',
    href: '/help'
  },
  {
    name: 'Contact',
    href: '/contact'
  },
  {
    name: 'Privacy',
    href: '/privacy'
  }
]

// Social Links Configuration
const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/pvdev1805/SmartNotes',
    icon: ExternalLink,
    label: 'Visit our GitHub repository'
  },
  {
    name: 'Email',
    href: 'mailto:pvdev1805@gmail.com',
    icon: Mail,
    label: 'Contact us via email'
  }
]

// Legal Links Configuration
const legalLinks = [
  {
    name: 'Terms of Service',
    href: '/terms'
  },
  {
    name: 'Privacy Policy',
    href: '/privacy'
  }
]

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='bg-background border-t border-border mt-auto'>
      <div className='max-w-7xl mx-auto px-4 py-4'>
        {/* Main Footer Content */}
        <div className='flex flex-col sm:flex-row justify-between items-center gap-4 lg:gap-6'>
          {/* Logo and Description */}
          <div className='flex flex-col items-center md:items-start space-y-2'>
            {/* Logo */}
            <div className='flex items-center gap-2'>
              <div className='w-6 h-6 rounded bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center'>
                <img src={companyInfo.logo} alt={`${companyInfo.name} Logo`} className='w-4 h-4' />
              </div>
              <span className='text-lg font-bold text-foreground'>
                Smart<span className='text-blue-600 dark:text-blue-400'>Notes</span>
              </span>
            </div>
            {/* End - Logo */}

            {/* Description */}
            <p className='text-sm text-muted-foreground text-center md:text-left max-w-xs'>
              Enhance your learning with smart note-taking and intelligent study tools.
            </p>
            {/* End - Description */}
          </div>

          {/* Quick Links */}
          <div className='hidden sm:flex flex-row gap-8'>
            {/* Features */}
            <div className='flex flex-col space-y-3'>
              <h4 className='text-sm font-medium text-foreground'>Features</h4>
              <div className='flex flex-col space-y-2'>
                {featureLinks.map((feature) => (
                  <Link
                    key={feature.name}
                    href={feature.href}
                    className='text-sm text-muted-foreground hover:text-blue-600 transition-colors'
                  >
                    {feature.name}
                  </Link>
                ))}
              </div>
            </div>
            {/* End - Features */}

            {/* Support */}
            <div className='flex flex-col space-y-3'>
              <h4 className='text-sm font-medium text-foreground'>Support</h4>
              <div className='flex flex-col space-y-2'>
                {supportLinks.map((support) => (
                  <Link
                    key={support.name}
                    href={support.href}
                    className='text-sm text-muted-foreground hover:text-blue-600 transition-colors'
                  >
                    {support.name}
                  </Link>
                ))}
              </div>
            </div>
            {/* End - Support */}
          </div>

          {/* Social Links */}
          <div className='flex flex-col items-center md:items-end space-y-3'>
            <h4 className='text-sm font-medium text-foreground'>Connect</h4>
            <div className='flex items-center space-x-3'>
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className='p-2 text-muted-foreground hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 flex items-center gap-1'
                  aria-label={social.label}
                >
                  <social.icon className='w-4 h-4' />
                  <span className='text-xs'>{social.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className='border-t border-border my-4'></div>

        {/* Bottom Footer */}
        <div className='flex flex-col sm:flex-row justify-between items-center gap-4'>
          <div className='flex items-center gap-1 text-sm text-muted-foreground'>
            <span>
              © {currentYear} {companyInfo.name}. {companyInfo.tagline}
            </span>
          </div>

          <div className='flex items-center gap-6 text-sm text-muted-foreground'>
            {legalLinks.map((legal) => (
              <Link key={legal.name} href={legal.href} className='hover:text-blue-600 transition-colors'>
                {legal.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
