import React, { useState } from 'react';
import styled from 'styled-components'

const Suggestion = styled.li`
    margin: 0px 5px;
    padding: 10px;
    cursor: pointer;
    :first-child {margin-top: 5px;}
    :last-child {margin-bottom: 5px;}
    :hover {
        background-color: lightyellow;
    }
`



const Typeahead = ({ books, handleSelect, genre }) => {
    const [input, setInput] = useState('')
    const [selection, setSelection] = useState(0)
    const [display, setDisplay] = useState(false)
    const suggestions = books.filter(book => {
        return input.length > 1 ? book.title.toLowerCase().includes(input.toLowerCase()) : book === null
    }).map(book => ({ ...book, parts: [book.title.slice(0, book.title.indexOf(input)+input.length), book.title.slice(book.title.indexOf(input)+input.length)]}))

    const handleInput = (event) => {
        setInput(event.target.value);
        setDisplay(true)
    }

    const handleSubmit = (event) => {
        if (suggestions.length > 0) {
        switch (event.key) {
            case 'Enter': {
                handleSelect(suggestions[selection].title)
                return
            }
            case "ArrowUp": {
                if (selection > 0) setSelection(selection-1)
                return
            }
            case "ArrowDown": {
                if (selection < suggestions.length-1) setSelection(selection+1)
                return
            }
            case "Escape": {
                setDisplay(false)
                return
            }
        }
    }
    }

    const isSelected = (item) => {
        return suggestions.indexOf(item) === selection ? true : false
    }

    const overrideSelected = (item) => {
        setSelection(suggestions.indexOf(item))
    }

    const handleClear = () => {
        setInput('')
    }

    const listStyle = suggestions ? {
        position: 'absolute',
        width: 330,
        boxShadow: '0 0 8px 0px lightgray',
        marginTop: 5,
        visibility: display ? 'visible' : 'hidden'
    } : {}

    return (
        <div>
        <input className='input'value={input} onChange={handleInput} onKeyDown={handleSubmit}></input>
        <button className='btn' onClick={handleClear}>Clear</button> 
        <ul style={listStyle}>
            {suggestions.map(item => {
                return <Suggestion style={{background: isSelected(item) ? 'hsla(50deg, 100%, 80%, 0.25)' : 'transparent'}} 
                        onMouseOver={() => overrideSelected(item)}
                        key={item.id} onClick={() => handleSelect(item.title)}>
                    {item.parts[0]}<span style={{fontWeight: 'bold'}}>{item.parts[1]}</span>
                    <span style={{fontSize: 10}}> in <span style={{color: 'purple'}}>{genre[item.categoryId].name}</span></span>
                    </Suggestion>
            })}
        </ul>
         
        </div>
    )

}

export default Typeahead