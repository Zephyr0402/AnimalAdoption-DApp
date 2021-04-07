import React from 'react';
import {getMyUsername, getMyTotalToken, setMyUsername, setMyPassword} from '../user_middleware';
import {PageHeader, Tag, Button, Statistic, Row, Input, Form, Modal, message} from 'antd';
import {isUniqueName} from '../user_middleware'


class UserProfilePage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            settingUname : false,
            settingPwd : false,
            unique_name : 0,
            setPwdSuccess : 0,
            pwd_format : 0, //-1 for wrong format, 0 for not yet set pwd, 1 for corrent format
            pwd_confirmed : 0, //-1 for not confirmed, 0 for not yet set pwd, 1 for confirmed
        }
    }

    getUsername(){
        return getMyUsername(this.props.uuid);
    }

    getPostsNum(){
        return 1;
    }

    getAdoptedNum(){
        return 10;
    }

    changeUsername(){
        this.setState({
            settingUname : true
        })
    }

    changePwd(){
        this.setState({
            setPwdSuccess : 0,
            settingPwd : true
        })
    }

    checkPwdFormat(){
        var input_password = document.getElementById("new_pwd").value;
        var re = /\w{6,20}/;
        if(input_password.length == 0){
            this.setState({
                pwd_format : 0
            })
        }
        else{
            this.setState({
                pwd_format : re.exec(input_password) == input_password ? 1 : -1
            })
        }
    }

    checkPwdConfirmed(){
        var input_password = document.getElementById("new_pwd").value;
        var input_confirmed = document.getElementById("confirm_pwd").value;
        console.log(input_password,input_confirmed)
        this.setState({
            pwd_confirmed : input_password.length > 0 && input_confirmed.length > 0 ? (input_confirmed == input_password ? 1 : -1) : 0 
        })
    }

    updateUsername(){
        var new_name = document.getElementById("new_username").value;
        setMyUsername(this.props.uuid, new_name);
        this.setState({
            settingUname : false,
            unique_name : 0
        })
    }

    updatePwd(){
        var old_pwd = document.getElementById("old_pwd").value;
        var new_pwd = document.getElementById("new_pwd").value;
        var info = setMyPassword(this.props.uuid, old_pwd, new_pwd);
        if(info.success){
            this.setState({
                settingPwd : false,
                pwd_format : 0,
                pwd_confirmed : 0
            })
            message.success("password has been reset!")
        }
        else{
            message.error(info.msg)
        }
    }

    cancelChangePwd(){
        this.setState({
            settingPwd : false,
            setPwdSuccess : 0,
            pwd_format : 0,
            pwd_confirmed : 0
        })
    }

    cancelChangeUname(){
        this.setState({
            settingUname : false,
            unique_name : 0
        })
    }

    getTotalToken(){
        return getMyTotalToken(this.props.uuid);
    }

    checkUniqueUsername(){
        var input_usernmame = document.getElementById("new_username").value;
        if(input_usernmame.length == 0){
            this.setState({
                unique_name: 0
            })
        }
        else{
            this.setState({
                unique_name: isUniqueName(input_usernmame) ? 1 : -1
            })
        }
    }

    render(){
        return(
            <div>
                <PageHeader 
                    title = {this.getUsername()}
                    tags={<Tag color="green">Online</Tag>}
                    extra={[
                        <Button key="3" onClick = {()=>this.changeUsername()} >Change Username</Button>,
                        <Button key="2" onClick = {()=>this.changePwd()}>Change Password</Button>,
                        <Button key="1" type="primary">
                          Buy Tokens
                        </Button>,
                      ]}
                >
                    <Row>
                        <Statistic title="Posts" value={this.getPostsNum()} />
                        <Statistic
                            title="Adopted"
                            value={this.getAdoptedNum()}
                            style={{
                                margin: '0 32px',
                            }}
                        />
                        <Statistic title="Tokens" value= {this.getTotalToken()} />
                    </Row>
                    <Modal
                        title = "Reset username"
                        width = {600}
                        visible = {this.state.settingUname}
                        onOk = {()=>this.updateUsername()}
                        okText = "Reset"
                        okButtonProps = {{disabled : this.state.unique_name != 1}}
                        onCancel = {()=>this.cancelChangeUname()}
                        destroyOnClose
                    >
                        <Form
                            style={{padding:0}}
                        >
                            <Form.Item
                                label="New Username" 
                                hasFeedBack
                                validateStatus = {this.state.unique_name == -1 ? "error" : "success"}
                                help = {this.state.unique_name == -1 ? "Your name has been taken! Chooese another one" : " "  }
                                style = {{textAlign:"left"}}
                            >
                                <Input placeholder = "new username" id = "new_username" onChange = {()=>this.checkUniqueUsername()} style = {{width:400}} />
                            </Form.Item>
                        </Form>
                    </Modal>
                    <Modal
                        title = "Reset password"
                        visible = {this.state.settingPwd}
                        onOk = {()=>this.updatePwd()}
                        okText = "Reset"
                        okButtonProps = {{disabled : this.state.pwd_format != 1 || this.state.pwd_confirmed != 1}}
                        onCancel = {()=>this.cancelChangePwd()}
                        destroyOnClose
                    >
                        <Form
                            style = {{padding : 0}}
                        >
                            <Form.Item label = "old password" style = {{textAlign:"left"}}>
                                <Input type = "password" id = "old_pwd" placeholder = "enter your old password" style = {{width:390}}/>
                            </Form.Item>
                            <Form.Item 
                                label = "new password"
                                hasFeedback = {this.state.pwd_format != 0}
                                validateStatus = {this.state.pwd_format == -1 ? "error" : "success"}
                                help = {this.state.pwd_format == -1 ? "Password must only contains alphanumeric digits! And should be within 6-20 digits!" : " "}
                                style = {{textAlign:"left"}}
                            >
                                <Input type = "password" id = "new_pwd" placeholder = "enter a new password" onChange = {()=>this.checkPwdFormat()} style = {{width:385}}/>
                            </Form.Item>
                            <Form.Item 
                                label = "confrim new password"
                                hasFeedback = {this.state.pwd_confirmed != 0} 
                                validateStatus = {this.state.pwd_confirmed == -1 ? "error" : "success"}
                                help = {this.state.pwd_confirmed == -1 ? "Password does not match!" : " "  }
                                style = {{textAlign:"left"}}
                            >
                                <Input type = "password" id = "confirm_pwd" placeholder = "confirm your new password" onChange = {()=>this.checkPwdConfirmed()} style = {{width:335}}/>
                            </Form.Item>
                        </Form>
                    </Modal>
                </PageHeader>
            </div>
        )
    }
}

export default UserProfilePage