

const Numbers = ({ id, updateQuestion, number }) => {

    const arr = Array.from(Array(number).keys());

    return (
        <div className='questions-numbers-div'>
            {
                arr.map((index) => {
                    return (
                        <div key={index} className='numbers-div'>
                            <button
                                name={index}
                                className={`numbers-btn ${id === index ? `numbers-selected` : ``}`}
                                onClick={(e) => updateQuestion(Number(e.target.name))}>
                                {index + 1}
                            </button>
                        </div>
                    )
                })
            }
        </div>
    )
}
export default Numbers;