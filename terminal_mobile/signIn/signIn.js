import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {connect}  from 'react-redux';
import {Container,Content,Header,Body,Title,Text,Button,Card,Form,Item,Input} from 'native-base';
import {handleNav} from '../actions/navAction';
import {handleUsername, handlePassword,handleSignIn} from '../actions/signInAction';
import realm from '../realm/schema';



class SignIn extends React.Component{

  componentDidMount(){
    (async ()=>{
      if(!!realm.objects('userInfo')[0]){
        const userInfo = realm.objects('userInfo')[0];
        this.props.handleSignIn({
          userName:userInfo.username,
          passWord:userInfo.password,
        })
      }
    })()
  }
  render(){
    const {handleUsername,handlePassword,handleSignIn} = this.props;
    return(
      <Container>
        <Header>
          <Body>
          <Title> 用户登陆 </Title>
          </Body>
        </Header>
        <Content>
          <Card style={styles.card}>
            <Form>
              <Item>
                <Input
                  onChangeText={handleUsername}
                  placeholder={'用户名:'}
                />
              </Item>
              <Item last>
                <Input
                  onChangeText={handlePassword}
                  secureTextEntry={true}
                  placeholder={'密码:'}/>
              </Item>
            </Form>
          </Card>
          <Button
            block
            title={''}
            style={styles.button}
            onPress={handleSignIn.bind(null,undefined)}
          >
            <Text>登       录</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}

SignIn.propTypes = {
  handleUsername: PropTypes.func,
  handlePassword: PropTypes.func,
  handleSignIn:PropTypes.func,
};


const mapDispatchToProps = dispatch =>({
  handleNav: nav =>dispatch(handleNav(nav)) ,
  handleUsername: username =>dispatch(handleUsername(username)),
  handlePassword: password =>dispatch(handlePassword(password)),
  handleSignIn: (info) => dispatch(handleSignIn(info))
});

const styles = StyleSheet.create({
  card:{
    marginTop:30,
    width:'90%',
    alignSelf:'center',
    borderRadius:6,
  },
  button:{
    marginTop:30,
    width:'90%',
    alignSelf:'center',
  }
});

export default connect(null,mapDispatchToProps)(SignIn);
