import ReactInputMask from "react-input-mask"

export const FileInput = ({handleFileChange, className, name, label}) => {
    return (
        <div className="flex flex-col justify-center p-2">
            <label className="" htmlFor={name}>{label}</label>
            <input
                className={"py-2 file:bg-unifae-green-1 file:border-none file:p-2 file:rounded-lg file:text-white cursor-pointer text-black/50"}
                type="file" accept=".jpg, .jpeg, .png" onChange={handleFileChange} name={name}/>
        </div>
    )
}
