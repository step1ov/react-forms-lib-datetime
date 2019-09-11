import React from 'react';
import { FormGroup, Label, FormFeedback, FormText, Badge } from 'reactstrap';
import InputDefault from "./index";
import Datetime from 'react-datetime';

export const RenderLabel = (props) =>
    <Label for={props.id} {...props.labelProps}>
        {props.title} {props.languageName && <Badge color="secondary">{props.languageName}</Badge>}
    </Label>;

export const RenderInput = (props) =>
    <Datetime value={props.value} onChange={props.onChange}
              onFocus={props.onFocus} onBlur={props.onBlur} onViewModeChange={props.onViewModeChange}
              onNavigateBack={props.onNavigateBack} onNavigateForward={props.onNavigateForward} locale={props.locale}
              utc={props.utc} displayTimeZone={props.displayTimeZone} input={props.input} inputProps={props.inputProps}
              timeConstraints={props.timeConstraints} viewMode={props.viewMode} isValidDate={props.isValidDate}
              open={props.open} strictParsing={props.strictParsing} closeOnSelect={props.closeOnSelect}
              closeOnTab={props.closeOnTab}
               />;

export const RenderFormGroup = (props) =>
    <FormGroup {...props.formGroupProps}>
        {InputDefault.renderLabel(props)}
        {InputDefault.renderInput(props)}
        {InputDefault.renderFormFeedback(props)}
        {InputDefault.renderFormText(props)}
    </FormGroup>;

export const RenderFormFeedback = (props) =>
    <FormFeedback valid={props.valid}>
        {props.formFeedback}
    </FormFeedback>;

export const RenderFormText = (props) =>
    <FormText>{props.formText}</FormText>;