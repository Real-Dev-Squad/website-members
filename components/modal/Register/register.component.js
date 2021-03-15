import React, { Component } from 'react';
import { Form, Input, Label, FormGroup, FormFeedback } from 'reactstrap';
import { isEmail, isDecimal } from 'validator';
import classNames from './register.component.module.scss';
class Register extends Component {

    constructor(props) {
        super(props);
        this.state = this.getInitialState(props);
    }

    getInitialState = (props) => ({
        recruiterData: {
            param: props.rdsusername,
            company: '',
            first_name: '',
            last_name: '',
            designation: '',
            reason: '',
            email: '',
            currency: '',
            package: ''
        },
        errors: {},
    });

    getMembersIntroURL = (rdsId) => `https://api.realdevsquad.com/members/${rdsId}`;

    handleSubmit = (e) => {
        e.preventDefault();
        const { recruiterData } = this.state;
        const errors = this.validate();

        function charRem(paramstr) {
            return paramstr.replace('@', '');
        }

        const parameter = charRem(recruiterData.param);
        const rdsApiURL = this.getMembersIntroURL(parameter);
        console.log(rdsApiURL);

        if (Object.keys(errors).length === 0) {
            console.log(recruiterData);
            fetch(rdsApiURL, {
                method: "POST",
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            }).then(
                (response) => (response.json())
            ).then((response) => {
                if (response.status === 'success') {
                    alert("Message Sent.");
                    this.resetForm()
                } else if (response.status === 'fail') {
                    alert("Message failed to send.")
                }
            })
        }
         else
             this.setState({ errors });
    }

    handleChange = (e) => {
        this.setState({
            recruiterData: {
                ...this.state.recruiterData,
                [e.target.name]: e.target.value
            },
            errors: {
                ...this.state.errors,
                [e.target.name]: ''
            }
        });

    }
    validate = () => {
        const { recruiterData } = this.state;
        let errors = {};

        if (recruiterData.company === '') errors.company = 'Company cannot be blank';
        if (recruiterData.first_name === '') errors.first_name = 'First name cannot be blank';
        if (recruiterData.last_name === '') errors.last_name = 'last name cannot be blank';
        if (recruiterData.designation === '') errors.designation = 'Designation cannot be blank';
        if (recruiterData.reason === '') errors.reason = 'Reason cannot be blank';
        if (!isEmail(recruiterData.email)) errors.email = 'Provide a valid email';
        if (recruiterData.email === '') errors.email = 'Email cannot be blank';
        if (recruiterData.currency === '') errors.currency = 'Currency must be valid';
        if (!isDecimal(recruiterData.package)) errors.package = 'Package must be a decimal number';
        if (recruiterData.package === '') errors.package = 'Package cannot be blank';

        return errors;
    }

    render() {
        const { recruiterData, errors } = this.state;
        //        console.log(props.rdsusername);
        return (
            <Form onSubmit={this.handleSubmit} id="exampleModalLong">
                <FormGroup>
                    <Label className={classNames.tagWord} for="company">Company</Label>
                    <br />
                    <Input className={classNames.inputBox} id="company" value={recruiterData.company}
                        type="text"
                        placeholder="Eg: Amazon"
                        invalid={errors.company ? true : false}
                        name="company" onChange={this.handleChange} />
                    <span className={classNames.errorPrompt}><FormFeedback>{errors.company}</FormFeedback></span>

                </FormGroup>
                <br />
                <FormGroup>
                    <Label className={classNames.tagWord} for="first_name">First Name</Label>
                    <br />
                    <Input className={classNames.inputBox} id="first_name" value={recruiterData.first_name}
                        type="name"
                        placeholder="Your First Name"
                        invalid={errors.first_name ? true : false}
                        name="first_name" onChange={this.handleChange} />
                    <span className={classNames.errorPrompt}><FormFeedback>{errors.first_name}</FormFeedback></span>
                </FormGroup>
                <br />

                <FormGroup>
                    <Label className={classNames.tagWord} for="last_name">Last Name</Label>
                    <br />
                    <Input className={classNames.inputBox} id="last_name" value={recruiterData.last_name}
                        type="name"
                        placeholder="Your Last Name"
                        invalid={errors.last_name ? true : false}
                        name="last_name" onChange={this.handleChange} />
                    <span className={classNames.errorPrompt}><FormFeedback>{errors.last_name}</FormFeedback></span>
                </FormGroup>
                <br />

                <FormGroup>
                    <Label className={classNames.tagWord} for="designation">Designation</Label>
                    <br />
                    <Input className={classNames.inputBox} id="designation" value={recruiterData.designation}
                        placeholder="Eg. HR"
                        type="text"
                        invalid={errors.designation ? true : false}
                        name="designation" onChange={this.handleChange} />
                    <span className={classNames.errorPrompt}><FormFeedback>{errors.designation}</FormFeedback></span>
                </FormGroup>
                <br />
                <div className="reason">
                    <FormGroup>
                        <Label className={classNames.tagWord} for="reason">Reason</Label>
                        <br />
                        <Input className={classNames.inputBox} id="reason" value={recruiterData.reason}
                            type="text"
                            placeholder="Your reason to approach this candidate"
                            invalid={errors.reason ? true : false}
                            name="reason" onChange={this.handleChange} />
                        <span className={classNames.errorPrompt}><FormFeedback>{errors.reason}</FormFeedback></span>
                    </FormGroup>
                </div>
                <br />

                <FormGroup>
                    <Label className={classNames.tagWord} for="email">Email Address</Label>
                    <br />
                    <Input id="email" value={recruiterData.email}
                        className={classNames.inputBox}
                        type="email"
                        placeholder="someone@something.com"
                        invalid={errors.email ? true : false}
                        name="email" onChange={this.handleChange} />
                    <span className={classNames.errorPrompt}><FormFeedback>{errors.email}</FormFeedback></span>
                </FormGroup>
                <br />

                <FormGroup>
                    <Label className={classNames.tagWord}>Currency</Label>
                    <br />
                    <div className="select">
                        <Input type="select" name="currency" value={recruiterData.currency}
                            className={classNames.inputBoxCur} invalid={errors.currency ? true : false} onChange={this.handleChange}>
                            <option value="">--Select--</option>
                            <option value="INR">Indian Rupee(INR)</option>
                            <option value="USD">United States Dollar(USD)</option>
                            <option value="EUR">Euro(EUR)</option>
                            <option value="GBP">Great Britain Pound(GBP)</option>
                            <option value="AUD">Australian Dollar(AUD)</option>
                            <option value="CAD">Canadian Dollar(CAD)</option>
                            <option value="SGD">Singapore Dollar(SGD)</option>
                            <option value="JPY">Japanese Yen(JPY)</option>
                        </Input>
                        <span className={classNames.errorPrompt}><FormFeedback>{errors.currency}</FormFeedback></span>
                    </div>
                </FormGroup>
                <br />

                <FormGroup>
                    <Label className={classNames.tagWord} for="package">Annual Package Offered</Label>
                    <br />
                    <Input className={classNames.inputBox} id="package" value={recruiterData.package}
                        type="number"
                        placeholder="2000000"
                        invalid={errors.package ? true : false}
                        name="package" onChange={this.handleChange} />
                    <span className={classNames.errorPrompt}><FormFeedback>{errors.package}</FormFeedback></span>
                </FormGroup>
                <button color="primary" type="submit" className={classNames["submitButton"]}>Submit</button>
            </Form>

        );
    }
}

export default Register;