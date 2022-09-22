import { forwardRef, Input, InputProps, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";
import { palette } from "../theme";

export interface EnterSubmittableProps {
    onEnterKeyPressed: (value: any) => void
}

export const EnterSubmittableInput = forwardRef<InputProps & EnterSubmittableProps, 'div'>((props, ref) => {
    const p = useColorModeValue(palette.light, palette.dark);
    const [value, setValue] = useState<any>(props.value);
    
    return (
        <Input bg={p.bgDim} ref={ref} {...props as InputProps} value={value} onKeyDown={e => {
            if (e.key == 'Enter') {
                setValue("");
                props.onEnterKeyPressed(value);
            }
        }} onChange={e => {
            setValue(e.target.value);
            props.onChange && props.onChange(e);
        }}/>
    )
})