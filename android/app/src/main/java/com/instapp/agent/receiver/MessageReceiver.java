package com.instapp.agent.receiver;

import android.app.NotificationManager;
import android.content.Context;
import android.text.TextUtils;
import android.util.Log;
import android.widget.Toast;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONException;
import com.alibaba.fastjson.JSONObject;
import com.instapp.agent.WXPageActivity;
import com.instapp.agent.WXQsActivity;
import com.instapp.agent.module.MessageModule;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.appfram.storage.WXStorageModule;
import com.taobao.weex.bridge.JSCallback;
import com.taobao.weex.bridge.SimpleJSCallback;
import com.taobao.weex.common.WXRenderStrategy;
import com.taobao.weex.http.WXStreamModule;
import com.taobao.weex.utils.WXFileUtils;
import com.tencent.android.tpush.XGPushBaseReceiver;
import com.tencent.android.tpush.XGPushClickedResult;
import com.tencent.android.tpush.XGPushRegisterResult;
import com.tencent.android.tpush.XGPushShowedResult;
import com.tencent.android.tpush.XGPushTextMessage;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

public class MessageReceiver extends XGPushBaseReceiver {
    //private Intent intent = new Intent("com.instapp.natex.");
    public static final String LogTag = "TPushReceiver";

    private void show(Context context, String text) {
        Toast.makeText(context, text, Toast.LENGTH_SHORT).show();
    }
    //注册的回调
    @Override
    public void onRegisterResult(Context context, int errorCode, XGPushRegisterResult message) {
        // TODO Auto-generated method stub
        if (context == null || message == null) {
            return;
        }
        String text = "";
        if (errorCode == XGPushBaseReceiver.SUCCESS) {
            text = message + "注册成功";
            // 在这里拿token
            String token = message.getToken();
            WXStorageModule storageModule=new WXStorageModule();
            storageModule.setItem("xingeToken", token, new JSCallback() {
                @Override
                public void invoke(Object o) {
                    Log.d(LogTag, o.toString());
                }

                @Override
                public void invokeAndKeepAlive(Object o) {
                    Log.d(LogTag, o.toString());
                }
            });
            storageModule.setItem("xingeDeviceId", message.getDeviceId(), new JSCallback() {
                @Override
                public void invoke(Object o) {
                    Log.d(LogTag, o.toString());
                }

                @Override
                public void invokeAndKeepAlive(Object o) {
                    Log.d(LogTag, o.toString());
                }
            });
        } else {
            text = message + "注册失败错误码：" + errorCode;
        }
        //getToken();
        Log.d(LogTag, text);
    }

    public void getToken(){
        WXStorageModule storageModule=new WXStorageModule();
        storageModule.getItem("xingeToken", new JSCallback() {
            @Override
            public void invoke(Object o) {
                Log.d(LogTag, "获取token成功："+o.toString());
            }
            @Override
            public void invokeAndKeepAlive(Object o) {
                Log.d(LogTag, "ssss"+o.toString());
            }
        });
    }

    //反注册的回调
    @Override
    public void onUnregisterResult(Context context, int errorCode) {
        if (context == null) {
            return;
        }
        String text = "";
        if (errorCode == XGPushBaseReceiver.SUCCESS) {
            text = "反注册成功";
        } else {
            text = "反注册失败" + errorCode;
        }
        Log.d(LogTag, text);
        show(context, text);
    }
    //设置tag的回调
    @Override
    public void onSetTagResult(Context context, int errorCode, String tagName) {
        if (context == null) {
            return;
        }
        String text = "";
        if (errorCode == XGPushBaseReceiver.SUCCESS) {
            text = "\"" + tagName + "\"设置成功";
        } else {
            text = "\"" + tagName + "\"设置失败,错误码：" + errorCode;
        }
        Log.d(LogTag, text);
        show(context, text);
    }
    //删除tag的回调
    @Override
    public void onDeleteTagResult(Context context, int errorCode, String tagName) {
        if (context == null) {
            return;
        }
        String text = "";
        if (errorCode == XGPushBaseReceiver.SUCCESS) {
            text = "\"" + tagName + "\"删除成功";
        } else {
            text = "\"" + tagName + "\"删除失败,错误码：" + errorCode;
        }
        Log.d(LogTag, text);
        show(context, text);
    }

    // 消息透传的回调
    @Override
    public void onTextMessage(Context context, XGPushTextMessage message) {
        // TODO Auto-generated method stub
        String text = "收到消息:" + message.toString();
        // 获取自定义key-value
        String customContent = message.getCustomContent();
        if (customContent != null && customContent.length() != 0) {
            try {
                JSONObject obj = JSON.parseObject(customContent);

                // key1为前台配置的key
                if (!obj.containsKey("key")) {
                    String value = obj.getString("key");
                    Log.d(LogTag, "get custom value:" + value);
                }
                // ...
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }
        Log.d("LC", "++++++++++++++++透传消息");
        // APP自主处理消息的过程...
        Log.d(LogTag, text);
        show(context, text);
    }

    // 通知点击回调 actionType=1为该消息被清除，actionType=0为该消息被点击。此处不能做点击消息跳转，详细方法请参照官网的Android常见问题文档
    @Override
    public void onNotifactionClickedResult(Context context, XGPushClickedResult message) {
        Log.e("LC", "+++++++++++++++ 通知被点击 跳转到指定页面。");
        NotificationManager notificationManager = (NotificationManager) context
                .getSystemService(Context.NOTIFICATION_SERVICE);
        notificationManager.cancelAll();
        if (context == null || message == null) {
            return;
        }
        String text = "";
        Integer id=null;
        // 获取自定义key-value
        String customContent = message.getCustomContent();
        if (customContent != null && customContent.length() != 0) {
            try {
                JSONObject obj = JSON.parseObject(customContent);
                // key1为前台配置的key
                if (obj.containsKey("id")) {
                    Integer value = obj.getInteger("id");
                    id=value;
                    Log.d(LogTag, "get custom value:" + value);
                }
                // ...
            } catch (JSONException e) {
                e.printStackTrace();
            }
        }

        // APP自主处理的过程。。。
        /*MessageModule module=new MessageModule();module.setId(id);*/
        /*WXSDKInstance instance=new WXSDKInstance(context);
        Map<String,Object> params = new HashMap<String, Object>();
        params.put("id",id);
        instance.fireGlobalEventCallback("openIndexEvent",params);*/
        //show(context, text);

		//如果存在ID，则传递到前端
		if (null != id) {
			// 对数据进行处理
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("messageId", id);
			WXQsActivity activity = (WXQsActivity) WXQsActivity.getActivity();
			((WXQsActivity) WXQsActivity.getActivity()).getWxInstance().fireGlobalEventCallback("message", (Map) jsonObject);
		}



	}

    @Override
    public void onNotifactionShowedResult(Context context, XGPushShowedResult xgPushShowedResult) {
    }
    private String httpRequest(String urlPath,String json){

        HttpURLConnection conn = null;
        String result="";
        try {
            URL url = new URL(urlPath);
            conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("POST");
            conn.setDoOutput(true);
            conn.setDoInput(true);
            conn.setUseCaches(false);
            conn.setReadTimeout(10000);
            conn.setRequestProperty("Connection", "Keep-Alive");
            conn.setRequestProperty("Charset", "UTF-8");
            // 设置文件类型:
            conn.setRequestProperty("Content-Type","application/x-www-form-urlencoded");
            // 往服务器里面发送数据
            if (json != null && !TextUtils.isEmpty(json)) {
                byte[] writebytes = json.getBytes();
                // 设置文件长度
                conn.setRequestProperty("Content-Length", String.valueOf(writebytes.length));
                conn.connect();
                OutputStreamWriter writer = new OutputStreamWriter(conn.getOutputStream());
                writer.write(json);
                writer.flush();
                Log.d("http click", "json: conn"+conn.getResponseCode());
            }
            if (conn.getResponseCode() == 200) {
                BufferedReader br = new BufferedReader(new InputStreamReader(conn.getInputStream(),"UTF-8")) ;
                String line;
                StringBuffer buffer=new StringBuffer();
                while ((line = br.readLine()) != null) {
                    buffer.append(line);
                }
                System.out.println(buffer.toString());
            }
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            conn.disconnect();
        }
        return result;
    }
}
