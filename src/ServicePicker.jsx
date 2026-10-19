import React from 'react';
import InlineSelect from './InlineSelect';
import {serviceChoices} from './enquiry-validation';
export default function ServicePicker({id,error,onChange}){return <fieldset className={'service-picker enquiry-wide '+(error?'has-error':'')}><legend>What can we help you with? <span aria-hidden="true">*</span></legend><InlineSelect id={id} name="service" label="What can we help you with?" options={serviceChoices} placeholder="Select a service" required error={error} onChange={onChange}/>{error&&<small id={id+'-error'} className="field-error">{error}</small>}</fieldset>}
