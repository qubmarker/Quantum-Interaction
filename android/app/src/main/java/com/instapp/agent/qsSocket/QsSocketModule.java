package com.instapp.agent.qsSocket;

import com.taobao.weex.annotation.JSMethod;
import android.util.Log;
import java.util.Map;
import java.util.HashMap;
import com.taobao.weex.bridge.JSCallback;
import java.net.URISyntaxException;
import com.taobao.weex.common.WXModule;
import io.socket.client.Socket;
import io.socket.client.IO;
import io.socket.emitter.Emitter;
import org.json.JSONException;
import org.json.JSONObject;
import org.json.JSONStringer;
public class QsSocketModule extends WXModule {
	private Socket mSocket;
	private String _myid;
	private String _nickname;
	private String _username;
	private static Boolean isAgain = true;
	//run ui thread
	/**
	 *小琪
	 * @param myid  用户id
	 */
	@JSMethod (uiThread = true)
	public void startSocket( String myid ,String nickname,String username ){
		if(!isAgain)return;
		isAgain = false;
		//一般是weex页面传来的用户phone
		_myid = myid;
		_nickname = nickname;
		_username = username;
		Log.d("s","isAgainde的值："+isAgain.toString());
		try {
		 mSocket = IO.socket("http://120.25.221.94");
		 mSocket.on("confirm_connect", onConfirmConnectHandler);
			mSocket.on("putUserInfo_callback", onPutUserInfoHandler);
			mSocket.on("aTob_callback", onCallAtoBHandler);//浏览器发给weex的事件
		mSocket.connect();
		} catch (URISyntaxException e) {}
	}

	private Emitter.Listener onConfirmConnectHandler = new Emitter.Listener() {
		@Override
		public void call(Object... args) {
			//主线程调用
//			getActivity().runOnUiThread(new Runnable() {
//				@Override
//				public void run() {
					JSONObject data = (JSONObject) args[0];
					String username;
					String message;




					try {
						JSONObject s1=new JSONObject();
						s1.put("id",_myid);
						mSocket.emit("login_event",s1 );
						JSONObject s2=new JSONObject();
						s2.put("myid",_myid);
						mSocket.emit("userInfo_event", s2);
						JSONObject s3=new JSONObject();
						s3.put("myid",_myid);
						s3.put("username",_username);
						s3.put("nickname",_nickname);
						mSocket.emit("putUserInfo_event", s3);
						username = data.getString("username");
						message = data.getString("message");
					} catch (JSONException e) {
						return ;
					}

//				}
//			});
		}
	};

private Emitter.Listener onPutUserInfoHandler = new Emitter.Listener() {
	@Override
	public void call(Object... args) {
		Map<String,Object> params=new HashMap<>();
		//params.put("key","value");
		//params.put("")
		//mWXSDKInstance.fireGlobalEventCallback("putUserInfo",params);
		for(Object object : args)
		{

			System.out.println(object);
		//	mWXSDKInstance.fireGlobalEventCallback(object,object);
		}
	}


};
	private Emitter.Listener onCallAtoBHandler = new Emitter.Listener() {
		@Override
		public void call(Object... args) {
			Map<String,Object> params=new HashMap<>();
			//params.put("key","value");
			//params.put("")
			//mWXSDKInstance.fireGlobalEventCallback("putUserInfo",params);
			JSONObject data = (JSONObject) args[0];
			try {

			mWXSDKInstance.fireGlobalEventCallback(data.getString("eventName"),(Map)data);
			} catch (JSONException e) {
				return ;
			}

		}


	};
}
