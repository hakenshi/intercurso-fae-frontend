import {forwardRef} from 'react'
import ReactInputMask from 'react-input-mask'

export const Input = forwardRef(({mask, name, label, className, value, placholder}, ref) => {
    return (
        <div className="flex flex-col justify-center p-2">
            <label htmlFor={name}>{label}</label>
            <ReactInputMask ref={ref} mask={mask} type="text" className={`${className}`} name={name}
                            defaultValue={value} placeholder={placholder}/>
        </div>
    )
})

Input.displayName = 'Input'
