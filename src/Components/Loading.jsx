import React from 'react'
import {Oval} from 'react-loader-spinner'

export const Loading = () => {



    return (
        <div className="w-full h-full flex justify-center items-center"><Oval visible={true} height="50" width="50"
                                                                              color="#3BBFA7" secondaryColor="#38A69B"/>
        </div>
    )
}
