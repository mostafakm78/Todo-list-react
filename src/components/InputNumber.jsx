

export default function Inputnumber( {InputNumber , inputCounter } ) {


    return (
        <>
            <div className="w-full px-4 py-4 mx-auto shadow lg:w-1/3  bg-white mt-4 mb-6 flex flex-row" >
                <p className="w-full">Number of lists : <p className="inline" onChange={inputCounter}> {InputNumber} </p></p>
            </div>
        </>
    )
}
