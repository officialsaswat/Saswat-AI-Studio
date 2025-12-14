import { motion } from 'framer-motion';

interface PageTransitionProps {
    children: React.ReactNode;
}

const pageVariants = {
    initial: {
        opacity: 0,
        scale: 0.95,
        filter: "blur(10px)",
        y: 20
    },
    enter: {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeInOut" as const,
            staggerChildren: 0.1
        }
    },
    exit: {
        opacity: 0,
        scale: 1.05,
        filter: "blur(10px)",
        y: -20,
        transition: {
            duration: 0.4,
            ease: "easeInOut" as const
        }
    }
};

export function PageTransition({ children }: PageTransitionProps) {
    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="enter"
            exit="exit"
            className="w-full h-full"
        >
            {children}
        </motion.div>
    );
}
