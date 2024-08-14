import React, {forwardRef, useState} from 'react'

export const TextArea = forwardRef(({name, label, className, value, children}, ref) => {

    const [letterCounter, setLetterCounter] = useState(0)

    return (
        <div className="flex flex-col justify-center p-2">
            <label className='flex justify-between w-full' htmlFor={name}>{label} {letterCounter ?
                <p className='text-unifae-green-3'>{`${letterCounter} / 120`}</p> : ""}</label>
            <textarea ref={ref} type="text" className={`${className}`} name={name} id={name} defaultValue={value}
                      maxLength={"120"} onChange={(e) => setLetterCounter(lc => lc = e.target.value.length)}>
                {children}
            </textarea>
        </div>)
})

TextArea.displayName = 'TextArea'
