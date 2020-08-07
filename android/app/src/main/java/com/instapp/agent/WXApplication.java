package com.instapp.agent;

import android.app.Application;
import android.content.Context;
import android.os.Build;
import android.os.StrictMode;
import android.util.Log;

import com.instapp.agent.component.RichText;
import com.instapp.agent.component.WXQSWeb;
import com.instapp.agent.component.WXQSWebView;
import com.instapp.agent.extend.ImageAdapter;
import com.instapp.agent.extend.WXEventModule;
import com.alibaba.weex.plugin.loader.WeexPluginContainer;
import com.instapp.agent.module.PayModule;
import com.instapp.agent.module.ToolModule;
import com.instapp.agent.module.WXQSNavigatorModule;
import com.instapp.agent.util.AppConfig;
import com.taobao.sophix.SophixManager;
import com.taobao.weex.InitConfig;
import com.taobao.weex.WXSDKEngine;
import com.taobao.weex.common.WXException;
import com.avos.avoscloud.AVOSCloud;
import com.avos.avoscloud.AVAnalytics;
import com.instapp.agent.sqrCode.ScanModule;
import com.instapp.agent.qsSocket.QsSocketModule;

import com.tencent.android.tpush.XGIOperateCallback;
import com.tencent.android.tpush.XGPushConfig;
import com.tencent.android.tpush.XGPushManager;

import cn.dv4.weeximagecroppicker.ImageCropPickerModule;

public class WXApplication extends Application {

	private static WXApplication instance;

  @Override
  public void onCreate() {
	  registerPush();
	  instance = this;
    if (Build.VERSION.SDK_INT>=18) {
      StrictMode.VmPolicy.Builder builder = new StrictMode.VmPolicy.Builder();
      StrictMode.setVmPolicy(builder.build());
      builder.detectFileUriExposure();
    }

    super.onCreate();
	  SophixManager.getInstance().queryAndLoadNewPatch();
    WXSDKEngine.addCustomOptions("appName", "NatExplorer");
    WXSDKEngine.addCustomOptions("appGroup", "Instapp");
    WXSDKEngine.initialize(this,
        new InitConfig.Builder().setImgAdapter(new ImageAdapter()).build()
    );

    AVOSCloud.useAVCloudUS();
    AVOSCloud.initialize(this, ApiKey.LC_APPID, ApiKey.LC_APPKEY);
    AVAnalytics.enableCrashReport(this, true);

    try {

      WXSDKEngine.registerModule("event", WXEventModule.class);
      WXSDKEngine.registerModule("zfjg-scan", ScanModule.class);// 这里module名称可以自定义 ,二维码扫描
		WXSDKEngine.registerModule("qsSocket", QsSocketModule.class);//websocket衔接
		WXSDKEngine.registerModule("qsUtil", ToolModule.class);//一些工具类，比如监听返回按钮等
		//解决在weex页面中通过 navigator.push的方式跳转页面，而在android端是通过startActivity方法隐式跳转页面
		WXSDKEngine.registerModule("qsnavigator", WXQSNavigatorModule.class);
		//小琪自己写的web用于网页调用原生开发
		WXSDKEngine.registerComponent("qsweb", WXQSWeb.class);
		//注入pin++支付测试请求
		WXSDKEngine.registerModule("payModule",PayModule.class);

		//裁剪图片插件
		WXSDKEngine.registerModule("imageCropPicker", ImageCropPickerModule.class);

		//自定义扩展的组件
		WXSDKEngine.registerComponent("richText", RichText.class);

    } catch (WXException e) {
      e.printStackTrace();
    }
    AppConfig.init(this);
    WeexPluginContainer.loadAll(this);
  }


	/**
	 * 注册推送Token
	 */
	private void registerPush(){
		XGPushConfig.enableDebug(this,true);
		XGPushManager.registerPush(this, new XGIOperateCallback() {

			@Override
			public void onSuccess(Object data, int flag) {
				//token在设备卸载重装的时候有可能会变
				Log.d("TPush", "注册成功，设备token为：" + data);
			}

			@Override
			public void onFail(Object data, int errCode, String msg) {
				Log.d("TPush", "注册失败，错误码：" + errCode + ",错误信息：" + msg);
			}
		});
	}

	// 获取ApplicationContext
	public static Context getMyApplication() {
		return instance;
	}

}
