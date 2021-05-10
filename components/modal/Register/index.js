import React from 'react';
import { useForm } from 'react-hook-form';
import { isEmail, isDecimal } from 'validator';
import PropTypes from 'prop-types';
import classNames from './register.module.scss';

const Register = (props) => {
  const { rdsUserName, setShowModal } = props;

  const { register, handleSubmit, errors } = useForm();

  const getMembersIntroURL = (RDSID) => `https://api.realdevsquad.com/members/intro/${RDSID}`;
  const parameters = rdsUserName;

  const onSubmit = (data) => {
    const cleanUserName = (paramstr) => {
      return paramstr.replace('@', '');
    };
    const parameter = cleanUserName(parameters);
    const rdsApiURL = getMembersIntroURL(parameter);
    fetch(rdsApiURL, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.status === 'success') {
          alert('Message Sent.');
          resetForm();
        }
      })
      .catch((error) => {
        alert('Error!!!\n' + error);
      })
      .finally(() => {
        if (!confirm('Some error occurred!!! \nRETRY?')) {
          resetForm();
        }
      });
  };

  const resetForm = () => setShowModal(false);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label className={classNames.tagWord} htmlFor="company">
          Company
        </label>
        <input
          id="company"
          className={classNames.inputBox}
          type="text"
          placeholder="Eg: Amazon"
          name="company"
          ref={register({
            required: true
          })}
        />
        {errors.company && <p className={classNames['errorPrompt']}>Company cannot be blank</p>}
        <br />
        <label className={classNames.tagWord} htmlFor="first_name">
          First Name
        </label>
        <input
          id="first_name"
          className={classNames.inputBox}
          type="text"
          placeholder="Eg: John"
          name="first_name"
          ref={register({
            required: true
          })}
        />
        {errors.first_name && (
          <p className={classNames['errorPrompt']}>First Name cannot be blank</p>
        )}
        <br />
        <label className={classNames.tagWord} htmlFor="last_name">
          Last Name
        </label>
        <input
          id="last_name"
          className={classNames.inputBox}
          type="text"
          placeholder="Eg: Doe"
          name="last_name"
          ref={register({
            required: true
          })}
        />
        {errors.last_name && <p className={classNames['errorPrompt']}>Last Name cannot be blank</p>}
        <br />
        <label className={classNames.tagWord} htmlFor="designation">
          Designation
        </label>
        <input
          id="designation"
          className={classNames.inputBox}
          type="text"
          placeholder="Eg: HR executive"
          name="designation"
          ref={register({
            required: true,
            minLength: 2
          })}
        />
        {errors.designation?.type === 'required' && (
          <p className={classNames['errorPrompt']}>Designation cannot be blank</p>
        )}
        {errors.designation?.type === 'minLength' && (
          <p className={classNames['errorPrompt']}>Designation too short</p>
        )}
        <br />
        <label className={classNames.tagWord} htmlFor="reason">
          Reason
        </label>
        <input
          id="reason"
          className={classNames.inputBox}
          type="text"
          placeholder="Why you are interested in this candidate(Max 100 characters)"
          name="reason"
          ref={register({
            required: true,
            maxlength: 100
          })}
        />
        {errors.reason && <p className={classNames['errorPrompt']}>Reason cannot be blank</p>}
        {errors.reason?.type === 'maxLength' && (
          <p className={classNames['errorPrompt']}>Character exceeded</p>
        )}
        <br />
        <label className={classNames.tagWord} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          className={classNames.inputBox}
          type="email"
          placeholder="Your Email address"
          name="email"
          ref={register({
            required: true,
            validate: (value) => isEmail(value) === true
          })}
        />
        {errors.email?.type === 'required' && (
          <p className={classNames['errorPrompt']}>Email cannot be blank</p>
        )}
        {errors.email?.type === 'validate' && (
          <p className={classNames['errorPrompt']}>Provide a valid email address</p>
        )}
        <br />
        <label className={classNames.tagWord} htmlFor="currency">
          Currency
        </label>
        <br />
        <div className={classNames.select}>
          <select
            id="currency"
            type="select"
            name="currency"
            className={classNames.inputBoxCur}
            ref={register({
              validate: (value) => value !== ''
            })}>
            <option value="">--Select--</option>
            <option value="INR">Indian Rupee(INR)</option>
            <option value="USD">United States Dollar(USD)</option>
            <option value="EUR">Euro(EUR)</option>
            <option value="GBP">Great Britain Pound(GBP)</option>
            <option value="AUD">Australian Dollar(AUD)</option>
            <option value="CAD">Canadian Dollar(CAD)</option>
            <option value="SGD">Singapore Dollar(SGD)</option>
            <option value="JPY">Japanese Yen(JPY)</option>
          </select>
          {errors.currency?.type === 'validate' && (
            <p className={classNames['errorPrompt']}>Provide a valid currency</p>
          )}
        </div>
        <br />
        <label className={classNames.tagWord} htmlFor="package">
          Annual Package Offered
        </label>
        <input
          id="package"
          className={classNames.inputBox}
          type="number"
          placeholder="2000000"
          name="package"
          ref={register({
            required: true,
            validate: (value) => isDecimal(value) === true
          })}
        />
        {errors.package && (
          <p className={classNames['errorPrompt']}>Package offered cannot be blank</p>
        )}
        {errors.package?.type === 'validate' && (
          <p className={classNames['errorPrompt']}>Package must be a number</p>
        )}
        <br />
        <button color="primary" type="submit" className={classNames['submitButton']}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;

Register.propTypes = {
  rdsUserName: PropTypes.string.isRequired,
  setShowModal: PropTypes.func.isRequired
};
