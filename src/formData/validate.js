
const validateEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export const regexBase = {
  onlyNumbers: /^[0-9]{1,}$/,
  amountRegex: /^[0-9]+(\.[0-9]{1,2})?$/,
  emailRegex: /^[\w!#$%&'*-/=?^`{|}~]+@([\w-]+\.)+[\w]{2,4}$/,
  wholeValueRegex: /^[0-9]+$/,
}

export const phoneNumberValid = (value) => {
  return !(value === '' || !regexBase.amountRegex.test(value) || value.length !== 11)
}
export default (fields, submit = false) => {
  var isError = true
  let errors = {};

  var passwordValue = null
  var confirmPasswordValue = null
  var confirmPasswordTouched = false
  for (let field in fields) {
    if (submit) {
      fields[field].touched = true;
    }


    const currentField = fields[field];
    if (currentField.name === 'confirmpassword' && currentField.touched === true) {
      confirmPasswordTouched = true
      confirmPasswordValue = currentField.value
    }

    if (currentField.name === 'password' && currentField.touched === true) {
      passwordValue = currentField.value
    }


    function setLog() {
      isError = errors[field] === undefined ? true : false;
    }


    if (currentField.required && (currentField.value === '' || !currentField.value) && currentField.touched) {
      errors[field] = currentField.requiredMessage ? currentField.requiredMessage : 'This field is required!';
      setLog();
    }

    if (currentField.file && currentField.required && Object.keys(currentField.value).length === 0 && currentField.touched) {
      errors[field] = currentField.requiredMessage ? currentField.requiredMessage : 'This field is required!';
      setLog();
    }

    if (isError && currentField.name === 'email' && !validateEmail(currentField.value) && currentField.touched) {
      errors[field] = currentField.emailMessage ? currentField.emailMessage : 'Invalid email address!';
      setLog();
    }
    if (isError && confirmPasswordTouched && passwordValue !== confirmPasswordValue) {
      errors[field] = currentField.emailMessage ? currentField.emailMessage : 'Confrim Password and Password must!';
      setLog();
    }

    if (isError && currentField.name === 'phonenumber' && !phoneNumberValid(currentField.value) && currentField.touched) {
      errors[field] = currentField.emailMessage ? currentField.emailMessage : 'Invalid phone Number format!';
      setLog();
    }



    if (isError && currentField.name === 'firstname' && Object.keys(currentField.value).length < 3 && currentField.touched) {
      errors[field] = currentField.emailMessage ? currentField.emailMessage : 'First Name cannot be less than 3!';
      setLog();
    }
    if (isError && currentField.name === 'lastname' && Object.keys(currentField.value).length < 3 && currentField.touched) {
      errors[field] = currentField.emailMessage ? currentField.emailMessage : 'Last Name cannot be less than 3!';
      setLog();
    }

    if (isError && currentField.name === 'password' && Object.keys(currentField.value).length < 6 && currentField.touched) {
      errors[field] = currentField.emailMessage ? currentField.emailMessage : 'Password Length must be greter than 6';
      setLog();
    }

    if (isError && currentField.matchWith && currentField.value !== fields[currentField.matchWith].value && currentField.touched) {
      errors[field] = currentField.matchWithMessage ? currentField.matchWithMessage : 'Fields values are not equal!';
      setLog();
    }

    if (isError && currentField.minLength && currentField.value !== '' && currentField.value.length < currentField.minLength && currentField.touched) {
      errors[field] = currentField.minLengthMessage ? currentField.minLengthMessage : `This field must have at least ${currentField.minLength} characters`;
      setLog();
    }

    if (isError && currentField.maxLength && currentField.value !== '' && currentField.value.length > currentField.maxLength && currentField.touched) {
      errors[field] = currentField.maxLengthMessage ? currentField.maxLengthMessage : `This field must have less than ${currentField.maxLength} characters`;
      setLog();
    }

    if (isError && currentField.file && currentField.touched && currentField.allowedTypes && !currentField.allowedTypes.includes(currentField.value[0].type.split('/')[1])) {
      errors[field] = currentField.allowedTypesMessage ? currentField.allowedTypesMessage : 'Invalid file type!';
      setLog();
    }

    if (isError && currentField.file && currentField.touched && currentField.maxFileSize && (currentField.maxFileSize * 1024) < Math.round(currentField.value[0].size)) {
      errors[field] = currentField.maxFileSizeMessage ? currentField.maxFileSizeMessage : `File is too large(${Math.round(currentField.value[0].size / 1024)}KB), it cannot be larger than ${currentField.maxFileSize}KB`;
      setLog();
    }
  }


  return errors;
}