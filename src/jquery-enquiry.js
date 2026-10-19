import {validateEnquiry} from './enquiry-validation';
export async function attachValidation(form,onErrors){
 const {default:$}=await import('jquery');await import('jquery-validation');
 function errors(element){const values=Object.fromEntries(new FormData(element.form));values.consent=values.consent==='on';return validateEnquiry(values).errors}
 $.validator.addMethod('enquiryField',function(value,element){return !errors(element)[element.name]},function(params,element){return errors(element)[element.name]||'Please check this field.'});
 const rules=Object.fromEntries(['name','email','company','phone','service','budget','message','consent'].map(name=>[name,{enquiryField:true}]));
 const validator=$(form).validate({rules,ignore:'[name=website]',onsubmit:false,onkeyup:false,onfocusout(element){this.element(element)},onclick(element){if(element.type==='checkbox'||element.tagName==='SELECT')this.element(element)},showErrors(){onErrors({...this.errorMap})}});
 return {validate:()=>validator.form(),reset:()=>validator.resetForm(),destroy:()=>validator.destroy()};
}
