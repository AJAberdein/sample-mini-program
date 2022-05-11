
Page({

  async GetAuthCodeOnDevice(){
    const authScopes = ['auth_user'];
    const response = await new Promise((res, rej) => my.getAuthCode(
      { scopes: authScopes, success: res, fail: rej }
    ));

    my.alert({
      title: 'Auth on Device', 
      content: response.authCode
    });
    
    return response.authCode;
  }, 

  async GetAuthCodeOnSimulator(){
    const clientId = "2020122325111778413994";
    const userId = "216610000000446291765"

    const options = {
      method: 'POST',
      url: 'https://vodapay-gateway.sandbox.vfs.africa/v2/authorizations/applyAuthCode',
      headers: {
        'Content-Type': 'application/json',
        'client-id': clientId,
        'request-time': '2021-02-22T17:49:26.913+08:00',
        signature: 'algorithm=RSA256, keyVersion=1, signature=testing_signatur',
        'SOFA-TraceId': '20210224000010086009',
        'SOFA-RpcId': '0'
      },
      data: {
        clientId,
        userId,
        scopes: 'auth_user'
      }
    };
  const response = await my.request(options);
    my.alert({
      title: 'Auth on Simulator', 
      content: response.data.authCode
    });

    return response.data.authCode;
  },

  async GetAuthCodeOnBoth(){
    let authCode;
    if(process.env.NODE_ENV === 'production' ) {
      authCode = await this.GetAuthCodeOnDevice();
    }
    if(process.env.NODE_ENV === 'development' ) {
      authCode = await this.GetAuthCodeOnSimulator();
    }
    return authCode;
  }

});
