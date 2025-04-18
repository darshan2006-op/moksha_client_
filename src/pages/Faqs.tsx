import { useState, memo, useRef } from 'react'
import { Helmet } from 'react-helmet'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { slugify } from '@arpansaha13/utils'
import Sheet from '~common/Sheet'
import Container from '~common/Container'
import faqs, { type Faq as FaqType } from '~/data/faqs'
import { motion, useInView, AnimatePresence } from 'framer-motion'



export function Component() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  return (
    <Container className="py-10">
      <Helmet>
        <title>Moksha | FAQs</title>
      </Helmet>

      <section className="markdown relative" id="moksha-faqs" ref={sectionRef}>
        {/* Background decorative elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          {/* Animated light rays */}
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 8 }).map((_, idx) => (
              <motion.div
                key={`ray-${idx}`}
                className="absolute h-full w-1 bg-gradient-to-t from-transparent via-green-300/30 to-transparent"
                style={{
                  left: `${10 + idx * 12}%`,
                  transform: `rotate(${-10 + idx * 3}deg)`,
                  transformOrigin: 'bottom center',
                }}
                animate={{
                  opacity: [0.1, 0.3, 0.1],
                  height: ['100%', '120%', '100%'],
                }}
                transition={{
                  duration: 8 + idx,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: idx * 0.5,
                }}
              />
            ))}
          </div>

          {/* Glowing orbs */}
          {Array.from({ length: 4 }).map((_, idx) => (
            <motion.div
              key={`orb-${idx}`}
              className="absolute rounded-full blur-md"
              style={{
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
                background: idx % 3 === 0
                  ? 'rgba(47, 175, 116, 0.15)' // Green (#2FAF74)
                  : idx % 3 === 1
                    ? 'rgba(180, 195, 179, 0.15)' // Light green/coffee (#B4C3B3)
                    : 'rgba(52, 25, 13, 0.15)', // Coffee brown (#34190D)
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1
              className="text-4xl sm:text-5xl font-extrabold text-center text-white mb-12 drop-shadow-lg font-[Orbitron] relative inline-block w-full"
              animate={{
                textShadow: [
                  '0 0 5px rgba(47, 175, 116, 0.5)',
                  '0 0 20px rgba(47, 175, 116, 0.8)',
                  '0 0 5px rgba(47, 175, 116, 0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.span
                className="absolute -inset-1 rounded-lg blur-sm bg-green-400/20 z-0"
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.h1>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {faqs.map((faq, index) => {
              const slug = slugify(faq.question)
              return <Faq key={slug} faq={faq} slug={slug} index={index} />
            })}
          </motion.div>
        </div>
      </section>
    </Container>
  )
}

Component.displayName = 'Faqs'

interface FaqProps {
  faq: FaqType
  slug: string
  index: number
}

const Faq = memo(
  ({ faq, slug, index }: FaqProps) => {
    const [open, setOpen] = useState(false)
    const contentRef = useRef<HTMLDivElement>(null)

    // Animation variants
    const containerVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.5,
          delay: index * 0.1
        }
      }
    }

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Sheet
          id={slug}
          className={`p-6 sm:p-8 rounded-2xl shadow-xl transition-all duration-300 relative overflow-hidden group`}
        >
          {/* Glass effect background */}
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/30 via-brown/20 to-darkBrown/30 backdrop-blur-md border border-white/10 -z-10" />

          {/* Animated border glow on hover */}
          <motion.div
            className="absolute -inset-0.5 bg-gradient-to-r from-green-500/30 via-green-700/30 to-brown/30 rounded-2xl opacity-0 group-hover:opacity-100 blur-sm -z-20"
            animate={{
              background: [
                'linear-gradient(90deg, rgba(47, 175, 116, 0.3) 0%, rgba(180, 195, 179, 0.3) 50%, rgba(52, 25, 13, 0.3) 100%)',
                'linear-gradient(180deg, rgba(47, 175, 116, 0.3) 0%, rgba(180, 195, 179, 0.3) 50%, rgba(52, 25, 13, 0.3) 100%)',
                'linear-gradient(270deg, rgba(47, 175, 116, 0.3) 0%, rgba(180, 195, 179, 0.3) 50%, rgba(52, 25, 13, 0.3) 100%)',
                'linear-gradient(0deg, rgba(47, 175, 116, 0.3) 0%, rgba(180, 195, 179, 0.3) 50%, rgba(52, 25, 13, 0.3) 100%)',
              ]
            }}
            transition={{ duration: 10, repeat: Infinity }}
          />

          {/* Decorative elements */}
          <div className="absolute top-3 left-3 w-8 h-8 opacity-20">
            <svg viewBox="0 0 24 24" className="w-full h-full text-green-400">
              <path fill="currentColor" d="M12,3C16.97,3 21,7.03 21,12C21,16.97 16.97,21 12,21C7.03,21 3,16.97 3,12C3,7.03 7.03,3 12,3M12,5C8.14,5 5,8.14 5,12C5,15.86 8.14,19 12,19C15.86,19 19,15.86 19,12C19,8.14 15.86,5 12,5Z" />
            </svg>
          </div>

          <div className="flex items-center justify-between mb-4 flex-col sm:flex-row relative z-10">
            <h2 className="text-xl sm:text-2xl sm:w-3/4 font-bold text-white drop-shadow-sm">{faq.question}</h2>
            <motion.button
              onClick={() => setOpen(!open)}
              className="mt-3 sm:mt-0 text-sm font-semibold sm:w-1/4 px-4 py-2 bg-gradient-to-r from-green-600/90 to-brown/90 text-white rounded-xl shadow-md hover:from-green-500/90 hover:to-darkBrown/90 transition backdrop-blur-sm border border-white/10"
              aria-expanded={open}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {open ? (
                <div className="flex items-center gap-1 justify-center">
                  <ChevronUp className="w-4 h-4" /> Hide Answer
                </div>
              ) : (
                <div className="flex items-center gap-1 justify-center">
                  <ChevronDown className="w-4 h-4" /> Show Answer
                </div>
              )}
            </motion.button>
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <motion.div
                  ref={contentRef}
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="pt-2 pb-1"
                >
                  <p className="text-white font-medium leading-relaxed">{faq.answer}</p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </Sheet>
      </motion.div>
    )
  },
  (prev, next) => prev.slug === next.slug && prev.index === next.index
)
