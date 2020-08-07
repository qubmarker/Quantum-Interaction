package com.instapp.agent.module;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.util.Log;

import com.instapp.agent.WXQsActivity;
import com.pingplusplus.android.Pingpp;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.common.WXModule;

import com.alibaba.fastjson.JSONException;
import com.alibaba.fastjson.JSONObject;
import java.util.HashMap;
import java.util.Map;

public class PayModule extends WXModule {

    private static final String TAG = "payModule";

    @JSMethod
    public void callPayment(String data){
        Log.d(TAG,"callPayment ==> Params:"+data);
        //参数一：Activity 当前调起支付的Activity
        //参数二：data 获取到的 Charge/Order/Recharge 的 JSON 字符串
        Log.d(TAG,"开始调用支付插件");
        Pingpp.createPayment(WXQsActivity.getActivity(), data);
    }

    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        Log.d(TAG,"开始执行支付回调结果处理");
        //支付页面返回处理
        if (requestCode == Pingpp.REQUEST_CODE_PAYMENT) {
            if (resultCode == Activity.RESULT_OK) {
                String result = data.getExtras().getString("pay_result");

                Log.d(TAG,"执行事件监听回调给Weex ==> fireGlobalEventCallback ==> result:"+result);
                String message="";
                if("success".equals(result)){
                    message="支付成功";
                }else if("fail".equals(result)){
                    message="支付失败";
                }else if("cancel".equals(result)){
                    message="取消支付成功";
                }else if("invalid".equals(result)){
                    message="支付插件未安装";
                }else if("unknown".equals(result)){
                    message="app进程异常被杀死";
                }

                JSONObject jsonObject=new JSONObject();
                jsonObject.put("payMessage",message);
                jsonObject.put("payCode",result);
                try {
                    Log.d(TAG,"拼接返回结果:"+jsonObject.toString());
                    mWXSDKInstance.fireGlobalEventCallback("payment", (Map)jsonObject);
                }catch (Exception e){
                    Log.e(TAG,e.getMessage(),e.fillInStackTrace());
                }
            }
        }
    }
}
