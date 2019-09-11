import {BaseInput} from "react-forms-lib";
import {RenderLabel, RenderInput, RenderFormGroup, RenderFormFeedback, RenderFormText} from "./views";
import PropTypes from "prop-types";
import moment from "moment";

const viewModes = Object.freeze({
    YEARS: 'years',
    MONTHS: 'months',
    DAYS: 'days',
    TIME: 'time',
});

export default class InputDatetime extends BaseInput
{
    static propTypes = Object.assign(
        {
            onFocus: PropTypes.func,
            onBlur: PropTypes.func,
            onViewModeChange: PropTypes.func,
            onNavigateBack: PropTypes.func,
            onNavigateForward: PropTypes.func,
            locale: PropTypes.string,
            utc: PropTypes.bool,
            displayTimeZone: PropTypes.string,
            input: PropTypes.bool,
            inputProps: PropTypes.object,
            timeConstraints: PropTypes.object,
            viewMode: PropTypes.oneOf([viewModes.YEARS, viewModes.MONTHS, viewModes.DAYS, viewModes.TIME]),
            isValidDate: PropTypes.func,
            open: PropTypes.bool,
            strictParsing: PropTypes.bool,
            closeOnSelect: PropTypes.bool,
            closeOnTab: PropTypes.bool
        },
        // eslint-disable-next-line
        BaseInput.propTypes
    );

    static defaultProps = Object.assign(
        {
            className: '',
            inputProps: {},
            input: true,
            onFocus: function() {},
            onBlur: function() {},
            onViewModeChange: function() {},
            onNavigateBack: function() {},
            onNavigateForward: function() {},
            timeFormat: true,
            timeConstraints: {},
            dateFormat: true,
            strictParsing: true,
            closeOnSelect: false,
            closeOnTab: true,
            utc: false
        },
        BaseInput.defaultProps
    );

    static renderLabel(props)
    {
        return RenderLabel(props);
    }

    static renderInput(props)
    {

        return RenderInput(props);
    }

    static renderFormGroup(props)
    {
        return RenderFormGroup(props);
    }

    static renderFormFeedback(props)
    {
        return !!props.formFeedback && RenderFormFeedback(props);
    }

    static renderFormText(props)
    {
        return !!props.formText && RenderFormText(props);
    }

    static getInitialValue(props)
    {
        return '';
    }

    static getRenderValue(props)
    {
        if (props.formatter) return props.formatter(props.value, props.values, props);
        return props.value.toLocaleString();
    };

    static getValue(value)
    {
        return { value: moment(value) };
    }

    static getProps(props)
    {
        return Object.assign({}, props,
            {
                id: props.idPrefix + props.field,
                name: props.name ? props.name : props.field,
                onChange: (day, data) => this.handleChange(day, data, props)
            });
    }
}