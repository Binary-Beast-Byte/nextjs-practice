'use client'

import React, { useEffect } from 'react'

type AllowedInputTypes = 'password' | 'text' | 'number';

interface OTPINputProps {
    numInputs?: number;
    value?: string;
    onChange: (otp: string) => void;
    placeholder?: string;
    inputType?: AllowedInputTypes;


}

const index = ({ numInputs, value, onChange, placeholder, inputType }: OTPINputProps) => {
    const [activeInput, setActiveInput] = React.useState(0);
    const inputRefs = React.useRef<Array<HTMLInputElement | null>>([]);

    const getOTPValue = () => (value ? value.toString().split('') : []); //convert otp to array

    const isInputNum = inputType === 'number'



    useEffect(() => {
        inputRefs.current = inputRefs.current.slice(0, numInputs);
    }, [numInputs])

    const getPlaceHolderValue = () => {
        if (typeof placeholder === 'string') {
            if (placeholder.length === numInputs) {
                return placeholder;
            }

            if (placeholder.length > 0) {
                console.error('Length of the placeholder should be equal to the number of inputs')
            }
            return undefined;
        }
    }



    const isInputValueValid = (value: string) => {
        const isTypeValid = isInputNum ? !isNaN(Number(value)) : typeof value === 'string';
        return isTypeValid && value.trim().length === 1;
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;

        if (isInputValueValid(value)) {
            changeCodeAtFocus(value);
            focusInput(activeInput + 1)
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { nativeEvent } = event;


        if (!isInputValueValid(event.target.value)) {
            // @ts-ignore
            if (nativeEvent.data === null && nativeEvent.inputType === 'deleteContentBackward') {
                console.log('back space native 🔥🔥')
                event.preventDefault();
                changeCodeAtFocus('');
                focusInput(activeInput - 1);
            }

            event.target.value = '';
        }
    }





    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => (index: number) => {
        setActiveInput(index);
        event.target.select();
    }

    const handleBlur = () => {
        setActiveInput(activeInput - 1)
    }
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const otp = getOTPValue();
        if ([event.code, event.key].includes('Backspace')) {
            event.preventDefault();
            changeCodeAtFocus('');
            focusInput(activeInput - 1);
            // @ts-ignore
            event.target.value = ''
        } else if (event.code === 'Delete') {
            event.preventDefault();
            changeCodeAtFocus('');
        } else if (event.code === 'ArrowLeft') {
            event.preventDefault();
            focusInput(activeInput - 1);
        } else if (event.code === 'ArrowRight') {
            event.preventDefault();
            focusInput(activeInput + 1);
        }
        // React does not trigger onChange when the same value is entered
        // again. So we need to focus the next input manually in this case.
        else if (event.key === otp[activeInput]) {
            event.preventDefault();
            focusInput(activeInput + 1);
        } else if (
            event.code === 'Spacebar' ||
            event.code === 'Space' ||
            event.code === 'ArrowUp' ||
            event.code === 'ArrowDown'
        ) {
            event.preventDefault();
        }
    };


    const focusInput = (index: number) => {
        // pass the index of input which you want to focus
        const activeInput = Math.max(Math.min(numInputs - 1, index), 0); //ensure that index is valid not less than 0

        if (inputRefs.current[activeInput]) {
            inputRefs.current[activeInput]?.focus();
            inputRefs.current[activeInput]?.select();
            setActiveInput(activeInput)
        }

    }
    const changeCodeAtFocus = (value: string) => {
        const otp = getOTPValue();
        otp[activeInput] = value[0];
        handleOTPChange(otp);
    }

    const handleOTPChange = (otp: Array<string>) => {
        const otpValue = otp.join('');
        onChange(otpValue)
    }

    return (
        <div>
            {/* @ts-ignore */}
            {Array.from({ length: numInputs }, (_, index) => index).map((index:any) => (
                <React.Fragment key={index}>
                    <input
                        ref={(element) => (inputRefs.current[index] = element)}
                        type="text"
                        className='w-12 h-10 ring ring-blue-500 mx-2 text-black text-3xl'
                        maxLength={1}
                        onChange={handleChange}
                        onFocus={(event) => handleFocus(event)(index)}
                        onKeyDown={handleKeyDown}
                        onBlur={handleBlur}
                        autoComplete='off'
                        onInput={handleInputChange}
                        placeholder={getPlaceHolderValue()?.[index] ?? undefined}

                    />
                </React.Fragment>
            ))}
        </div>
    )
}

export default index