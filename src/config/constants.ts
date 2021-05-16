export const consts = {
  jwtSecret: "BAF8EE9124D35817F6C18EB7D93AA56F8A10FEE9711CF5416BE225B6ECCAA988",
  MODULES: {
    CREATE_ACCOUNT: "create_account",
    UPDATE_ACCOUNT: "update_account",
  },
  QUEUES: {
    EMAIL: "http://localhost:4566/000000000000/createAccount",
  },
  AWS: {
    API_VERSION: "2012-11-05",
    REGION: "us-east-1",
    SENDER_EMAIL: 'ownshop@ownshop.com',
    BUCKET_NAME: 'seller',
    BUCKET_ADDRESS: 'http://localhost:4566',
    ACCESS_KEY: 'temp-key',
    SECRET_KEY: 'temp-secret'
  },
};
