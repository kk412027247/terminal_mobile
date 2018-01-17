import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Container, Header, Right, Body, Title, Left, Button, Icon, Content, Footer, FooterTab, Card, Text} from 'native-base';

const Rewrite = () =>(
  <Container>
    <Header>
      <Left>
        <Button
          title={''}
          onPress={()=>{}}
        >
          <Icon name={'ios-arrow-back'}/>
        </Button>
      </Left>
      <Body>
        <Title>修改</Title>
      </Body>
    </Header>
    <Content>
      <Card>
        <Text>修改后</Text>
        <Text>修改后</Text>
        <Text>修改后</Text>
      </Card>

      <Card>
        <Text>修改前</Text>
        <Text>修改前</Text>
        <Text>修改前</Text>
      </Card>
    </Content>
  </Container>
);


export default connect()(Rewrite)
