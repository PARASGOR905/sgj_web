// Custom Tailwind CSS Configuration for SGJ Institute
// Academic Royal Blue + Soft Gold Theme

tailwind.config = {
  theme: {
    extend: {
      colors: {
        // Academic Royal Blue Theme
        primary: '#0B3C5D',
        secondary: '#1D70B8',
        accent: '#FFD700',
        light: '#F8F9FA',
        dark: '#212529',
        
        // Extended color palette
        'royal-blue': {
          50: '#e6f0f9',
          100: '#cde1f3',
          200: '#9bc3e7',
          300: '#69a5db',
          400: '#3787cf',
          500: '#1D70B8',
          600: '#0B3C5D',
          700: '#082d46',
          800: '#061e2f',
          900: '#030f18',
        },
        
        'soft-gold': {
          50: '#fffdf7',
          100: '#fffbee',
          200: '#fff6d5',
          300: '#ffefbf',
          400: '#ffe8a9',
          500: '#FFD700',
          600: '#e6c200',
          700: '#ccad00',
          800: '#b39800',
          900: '#998300',
        }
      },
      
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #0B3C5D 0%, #1D70B8 100%)',
        'card-gradient': 'linear-gradient(135deg, #F8F9FA 0%, #e9ecef 100%)',
        'accent-gradient': 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
      },
      
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '96': '24rem',
        '128': '32rem',
      },
      
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'medium': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'strong': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      },
      
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'bounce-slow': 'bounce 2s infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        }
      }
    },
  },
  
  variants: {
    extend: {
      backgroundColor: ['active', 'focus-visible'],
      borderColor: ['focus-visible'],
      boxShadow: ['active', 'focus-visible'],
      textColor: ['active', 'focus-visible'],
      transform: ['hover', 'focus'],
      scale: ['hover', 'focus'],
    },
  },
  
  plugins: [],
  
  // Safelist important classes that might be dynamically added
  safelist: [
    'bg-primary',
    'bg-secondary',
    'bg-accent',
    'text-primary',
    'text-secondary',
    'text-accent',
    'border-primary',
    'border-secondary',
    'hover:bg-primary',
    'hover:text-white',
    'focus:ring-primary',
    'btn-primary',
    'btn-secondary',
    'hero-gradient',
    'fade-up',
    'hover-lift',
    'visible'
  ]
}