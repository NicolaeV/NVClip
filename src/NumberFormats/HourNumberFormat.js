import * as React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import TextField from '@mui/material/TextField';

const HourNumberFormat = React.forwardRef(function HourNumberFormat(props, ref) {
    const { onChange, name, maxvalue, ...other } = props;

    if(props.name === "hour"){

    }
    else if(props.name === "minute" || props.name === "second"){

    }
    else{
        console.log("fuck you");
    }

    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                props.onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            format="##"
            isAllowed={(values) => {
                const { formattedValue, floatValue } = values;
                return formattedValue === "" || floatValue <= 60;
            }}
        />
    );
});
HourNumberFormat.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default HourNumberFormat;