import Realm from 'realm';

export const UserInfoSchema = {
  name:'userInfo',
  primaryKey:'id',
  properties:{
    id:'int',
    username:'string',
    password:'string',
  }
};


class UserInfo extends Realm.Object{}
UserInfo.schema = {
  name:'userInfo',
  primaryKey:'id',
  properties:{
    id:'int',
    username:'string',
    password:'string',
  }
};


export default  new Realm({schema:[UserInfo]});
