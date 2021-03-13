import React, { Component } from 'react';
import { Form, Input, Label, FormGroup, FormFeedback, Button } from 'reactstrap';
import { isEmail, isDecimal } from 'validator';
import classNames from './register.component.module.scss';

class Register extends Component {

    userdata;

    constructor(props) {
        super(props);

        this.state = this.getInitialState();
    }

    getInitialState = () => ({
        data: {
            company: '',
            first_name: '',
            last_name: '',
            designation: '',
            reason: '',
            email: '',
            currency: '',
            package: ''
        },
        errors: {}
    });

    handleSubmit = (e) => {
        e.preventDefault();
        const { data } = this.state;
        const errors = this.validate();
        const url="https://api.member.realdevsquad.com/`${username}";

        if (Object.keys(errors).length === 0) {
            console.log(data);
            // fetch(url)
            // .then((res)=>console.log(data))
            // .catch((err) => console.log(err))
            // this.setState(this.getInitialState());
        }
        else
            this.setState({ errors });
    }

    handleChange = (e) => {
        this.setState({
            data: {
                ...this.state.data,
                [e.target.name]: e.target.value
            },
            errors: {
                ...this.state.errors,
                [e.target.name]: ''
            }
        });

    }
    validate = () => {
        const { data } = this.state;
        let errors = {};

        if (data.company === '') errors.company = 'Company cannot be blank';
        if (data.first_name === '') errors.first_name = 'First name cannot be blank';
        if (data.last_name === '') errors.last_name = 'last name cannot be blank';
        if (data.designation === '') errors.designation = 'Designation cannot be blank';
        if (data.reason === '') errors.reason = 'Reason cannot be blank';
        if (!isEmail(data.email)) errors.email = 'Provide a valid email';
        if (data.email === '') errors.email = 'Email cannot be blank';
        if (data.currency === '') errors.currency = 'Currency must be valid';
        if (!isDecimal(data.package)) errors.package = 'Package must be a decimal number';
        if (data.package === '') errors.package = 'Package cannot be blank';

        return errors;
    }

    // componentDidMount() {
    //     this.userdata = JSON.parse(localStorage.getItem('user'));

    //     if(localStorage.getItem('user')) {
    //         this.setState({
    //             company: this.state.data.company,
    //             first_ame: this.state.data.first_name,
    //             last_name: this.state.data.last_name,
    //             designation: this.state.data.designation,
    //             reason: this.state.data.reason,
    //             email: this.state.data.email,
    //             currency: this.state.data.currency,
    //             package : this.state.data.package
    //         })
    //     } else {
    //         this.setState(this.getInitialState());
    //     }
    // }

    // componentWillUpdate(nextProps, nextState) {
    //     localStorage.setItem('user', JSON.stringify(nextState));
    // }


    render() {
        const { data, errors } = this.state;
        console.log(data);
        return (
            <Form onSubmit={this.handleSubmit} id = "exampleModalLong">
                <FormGroup>
                    <Label className={classNames.tagWord} for="company">Company</Label>
                    <br/>
                    <Input className={classNames.inputBox} id="company" value={data.company}
                    type="text" 
                    placeholder="Eg: Amazon"
                    invalid={errors.company ? true : false} 
                    name="company" onChange={this.handleChange} />
                    <span className={classNames.errorComp}><FormFeedback>{errors.company}</FormFeedback></span>
                    
                </FormGroup>
                <br/>
                <FormGroup>
                    <Label className={classNames.tagWord} for="first_name">First Name</Label>
                    <br/>
                    <Input className={classNames.inputBox}  id="first_name" value={data.first_name}
                    type="name"
                    placeholder="Your First Name" 
                    invalid={errors.first_name ? true : false} 
                    name="first_name" onChange={this.handleChange} />
                    <span className={classNames.errorComp}><FormFeedback>{errors.first_name}</FormFeedback></span>
                </FormGroup>
                <br/>

                <FormGroup>
                    <Label className={classNames.tagWord} for="last_name">Last Name</Label>
                    <br/>
                    <Input className={classNames.inputBox} id="last_name" value={data.last_name} 
                    type="name"
                    placeholder="Your Last Name"
                    invalid={errors.last_name ? true : false} 
                    name="last_name" onChange={this.handleChange} />
                    <span className={classNames.errorComp}><FormFeedback>{errors.last_name}</FormFeedback></span>
                </FormGroup>
                <br/>

                <FormGroup>
                    <Label className={classNames.tagWord} for="designation">Designation</Label>
                    <br/>
                    <Input className={classNames.inputBox} id="designation" value={data.designation}
                    placeholder="Eg. HR"
                    type="text" 
                    invalid={errors.designation ? true : false} 
                    name="designation" onChange={this.handleChange} />
                    <span className={classNames.errorComp}><FormFeedback>{errors.designation}</FormFeedback></span>
                </FormGroup>
                <br/>               
                <div className="reason">
                <FormGroup>
                    <Label className={classNames.tagWord} for="reason">Reason</Label>
                    <br/>                   
                    <Input className={classNames.inputBox} id="reason" value={data.reason}
                    type="text"
                    placeholder="Your reason to approach this candidate" 
                    invalid={errors.reason ? true : false} 
                    name="reason" onChange={this.handleChange} />
                    <span className={classNames.errorComp}><FormFeedback>{errors.reason}</FormFeedback></span>                   
                </FormGroup>
                </div>
                <br/>

                <FormGroup>
                    <Label className={classNames.tagWord} for="email">Email Address</Label>
                    <br/>
                    <Input id="email" value={data.email}
                    className={classNames.inputBox} 
                    type="email"
                    placeholder="someone@something.com"
                    invalid={errors.email ? true : false} 
                    name="email" onChange={this.handleChange} />
                    <span className={classNames.errorComp}><FormFeedback>{errors.email}</FormFeedback></span>
                </FormGroup>
                <br/>

                <FormGroup>
                    <Label className={classNames.tagWord}>Currency</Label>
                    <br />
                    <div className="select">                   
                        <Input type="select" name="currency" value={data.currency}
                        className={classNames.inputBox} invalid={errors.currency ? true : false} onChange={this.handleChange}>
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
                        <span className={classNames.errorComp}><FormFeedback>{errors.currency}</FormFeedback></span>
                    </div>
                </FormGroup>
                <br/>

                <FormGroup>
                    <Label className={classNames.tagWord} for="package">Annual Package Offered</Label>
                    <br/>
                    <Input className={classNames.inputBox} id="package" value={data.package}
                    type="number"
                    placeholder="2000000" 
                    invalid={errors.package ? true : false} 
                    name="package" onChange={this.handleChange} />
                    <span className={classNames.errorComp}><FormFeedback>{errors.package}</FormFeedback></span>
                </FormGroup>
                <button color="primary" type="submit" className={classNames["submitButton"]}>Submit</button>               
            </Form>
            
        );
    }
}

export default Register;