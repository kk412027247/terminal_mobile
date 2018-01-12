import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet,AsyncStorage} from 'react-native';
import {connect}  from 'react-redux';
import {Container,Content,Header,Body,Title,Text,Button,Card,Form,Item,Input,Toast} from 'native-base';
import {handleNav} from '../actions/navAction';
import {handleUsername, handlePassword,handleSignIn} from '../actions/signInAction';

class SignIn extends React.Component{
  componentDidMount(){
    (async ()=>{
      const userInfo = await AsyncStorage.multiGet(['username','password']);
      if(!!userInfo[0][1] && !!userInfo[1][1]){
        this.props.handleSignIn({userName:userInfo[0][1],passWord:userInfo[1][1]});
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
            onPress={handleSignIn}
          >
            <Text>登       录</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}



// const SignIn = ({handleUsername,handlePassword,handleSignIn}) =>(
//   <Container>
//     <Header>
//       <Body>
//         <Title> 用户登陆 </Title>
//       </Body>
//     </Header>
//     <Content>
//       <Card style={styles.card}>
//         <Form>
//           <Item>
//             <Input
//               onChangeText={handleUsername}
//               placeholder={'用户名:'}
//             />
//           </Item>
//           <Item last>
//             <Input
//               onChangeText={handlePassword}
//               secureTextEntry={true}
//               placeholder={'密码:'}/>
//           </Item>
//         </Form>
//       </Card>
//       <Button
//         block
//         title={''}
//         style={styles.button}
//         onPress={handleSignIn}
//       >
//         <Text>登       录</Text>
//       </Button>
//     </Content>
//   </Container>
// ) ;

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
