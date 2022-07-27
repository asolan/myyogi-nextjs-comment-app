import React from 'react';
import classes from './Input.css';

const Input = ( props ) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }

//    className={inputClasses.join(' ')}
    // {...props.elementConfig}
    // value={props.value}
    // changed={props.changed}
        switch ( props.elementType ) {
        case ( 'input' ):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'textarea' ):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
            break;
        case ( 'radio' ):
            inputElement = (
                <div className={classes.Radio}>
                    <div>{props.elementTitle}
                        <ul>
                        {props.elementConfig.options.map((option,i) => (
                            <li>
                                <span>
                                    <input 
                                        className={inputClasses.join(' ')}
                                        name={props.elementId}
                                        id={props.elementId+i}
                                        onChange={props.changed}
                                        key={option.value+i} 
                                        data-val={option.value} 
                                        data-val-required="Required" 
                                        type="radio" value={option.value}  />
                                    <label for={props.elementId+i}>{option.displayValue}</label>
                                </span>
                            </li>
                        ))}                        
                        </ul>
                    </div>
                </div> 
            );
            break;
        case ( 'select' ):
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.changed}
                    defaultValue={{ label: props.elementTitle, value: 0 }}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );

};

export default Input;