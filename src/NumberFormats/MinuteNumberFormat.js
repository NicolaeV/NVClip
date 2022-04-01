import * as React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

const HourNumberFormat = React.forwardRef(function HourNumberFormat(props, ref) {
    const { onChange, ...other } = props;
    return (
        <NumberFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                onChange({
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
    onChange: PropTypes.func.isRequired,
};

export default HourNumberFormat;