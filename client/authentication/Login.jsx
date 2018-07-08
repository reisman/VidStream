import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { login } from './LoginActions';

const Login = (lastUser, loginUser) => {
    const submitLoginData = (e) => {
        e.preventDefault();
        const { user: { value: user }, password: { value: password } } = e.target;
        loginUser({ user, password });
    };

    return (
        <Container className="mx-auto my-auto col-sm-4">
            <Row>
                <Col>
                    <Form onSubmit={submitLoginData} className="LoginScreen">
                        <FormGroup>
                            <Label for="logon">Logon</Label>
                            <Input type="text" name="user" id="user">{lastUser}</Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" />
                        </FormGroup>
                        <Button color="primary">Login</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        loginUser: login,
    }, dispatch);
};

export default connect(null, mapDispatchToProps)(Login);
