import React from 'react'

import {motion} from "framer-motion"

export const CardRoot = ({children, onClick}) => {
    return (
        <motion.div
        whileHover={{ scale: 1.03 }}
        onClick={onClick}
            className='w-96 min-h-96 text-center bg-white rounded-lg shadow-md hover:shadow-lg border border-collapse border-unifae-green-1'>
            {children}
        </motion.div>
    )
}
