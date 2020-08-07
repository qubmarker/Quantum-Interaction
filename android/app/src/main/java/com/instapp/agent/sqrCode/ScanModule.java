package com.instapp.agent.sqrCode;

import com.instapp.agent.WXQsActivity;
import com.taobao.weex.annotation.JSMethod;
import com.instapp.agent.WXPageActivity;
import com.taobao.weex.bridge.JSCallback;
import com.taobao.weex.common.WXModule;
import com.google.zxing.integration.android.IntentIntegrator;
public class ScanModule extends WXModule {
	@JSMethod
	public void scanCode(JSCallback callback) {
		WXPageActivity act=(WXPageActivity)mWXSDKInstance.getContext();
		act.setOnScanFinishCallback(callback);
		IntentIntegrator integrator = new IntentIntegrator(act);
		integrator.initiateScan();
	}

	@JSMethod
	public void qsscanCode(JSCallback callback) {
		WXQsActivity act=(WXQsActivity)mWXSDKInstance.getContext();
		act.setOnScanFinishCallback(callback);
		IntentIntegrator integrator = new IntentIntegrator(act);
		integrator.initiateScan();
	}
}
