package com.instapp.agent;

import android.app.Application;
import android.content.Context;
import android.support.annotation.Keep;
import android.util.Log;
import com.taobao.sophix.PatchStatus;
import com.taobao.sophix.SophixApplication;
import com.taobao.sophix.SophixEntry;
import com.taobao.sophix.SophixManager;
import com.taobao.sophix.listener.PatchLoadStatusListener;
import com.instapp.agent.WXApplication;
/**
 * Sophix入口类，专门用于初始化Sophix，不应包含任何业务逻辑。
 * 此类必须继承自SophixApplication，onCreate方法不需要实现。
 * 此类不应与项目中的其他类有任何互相调用的逻辑，必须完全做到隔离。
 * AndroidManifest中设置application为此类，而SophixEntry中设为原先Application类。
 * 注意原先Application里不需要再重复初始化Sophix，并且需要避免混淆原先Application类。
 * 如有其它自定义改造，请咨询官方后妥善处理。
 */
public class SophixStubApplication extends SophixApplication {
	private final String TAG = "SophixStubApplication";
	// 此处SophixEntry应指定真正的Application，并且保证RealApplicationStub类名不被混淆。
	@Keep
	@SophixEntry(WXApplication.class)
	static class RealApplicationStub {}
	@Override
	protected void attachBaseContext(Context base) {
		super.attachBaseContext(base);
//         如果需要使用MultiDex，需要在此处调用。
//         MultiDex.install(this);
		initSophix();
	}
	private void initSophix() {
		String appVersion = "1.1.4";
		try {
			appVersion = this.getPackageManager()
				.getPackageInfo(this.getPackageName(), 0)
				.versionName;
		} catch (Exception e) {
		}
		final SophixManager instance = SophixManager.getInstance();
		instance.setContext(this)
			.setAppVersion(appVersion)
			.setSecretMetaData("24986197-1", "9e862ada63de1e860cf6a612d5bae28f", "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDWtDvNxOX+5e9yIrKHLOwIscAVM9pYytxs7tuf6Vvl1aOL+kSW6icT59CFYaRVcbgxkItp46XsG7PRPTPdEE2FD+aekTjZnKpzmHfndPojSU9s1IZjHpEoGLQoIE4tTvzAM2JHwuCpCbDb4AYKz6eOSRu9P4TxoGkI8lQpE/IQzXC5TEw34s/gNQqlsvWvTFhlr+litKPd4/WIPGnRW0MXe9lv+rFP59Pk9I6eSbIS42s/7A7yqDMrH775HjX9Cpuccpdlxlt63aXo72kRxviWDEuTMKEvtNPhjJBdehvB3vlIEjqL6TFU8sfizUxc9WPeGihCUUsF3+hh8I5CiXp/AgMBAAECggEANSoD9Pvgh7GgDP8Sfe5ds/lvutBQLNRuqHqs33gFTXANQ0gBW+03J/Kq65w1+QJjvcIxA1Nfboudhx5EjWTQDTbWwETtctUcT+tdJW8N0VcB18z4Serzvp3/XkBBm26Hn4AZwfM7dh/0Lz3VwS+SKeVofQARh1NVLuXyeQl7UzVXOrjLjcVCgRKxHORcBS0y9y21cuGEcQGwi85Ukd38WGUPxbilRhtOVb1flzqQELmuZh/JoxKokerezUsPlGLuFDRBz/YUhljxEAgoFB5Xt936oGJ6Uc97fPftjsvkyBA/2u0OJ0+HJB5IBgmrbrRQebhzEVAkCSq/FDA6LU9CAQKBgQD/76YMOPsfi98j4E1OUus6DJVky1FWJwRR0oPv8VV1RaOVlPpfaIDRPWz/EY8Yp5MVxljz7orq9uVKdF+TuVNBnVONfFWvIwK9cTrGLNJEd4bnE3yCjo2ieFocJ4vDTI7bn8r9SZppsQkkwSY5RE+xVj6aZVhuPxiEivBIr0FVwQKBgQDWwfNi6cDgoLtVRGVS6GF+snGWUDn7tOJD5jMjXFqjwcuEHH5I9pm8iGzpRQMtJkEDot8FAwl5WbgT2HM28FIJLZb2KGqbnV57ik0WDIuEYVFr2CdMj/YUgO6k0YPGYWuAvRZRsqnr/e9gjhiiA4MxtbejKddlz5Gv9Mur5o1gPwKBgC057xDH3PCFKghP8bk+g9y9LoUiPJxJxsSiu7fh4KUZij+7lMbZU7Il9aXZN30215IIe92XMKs2t+wBRoZ3QFQe9g3Rg96wBCLv6F/uubVpncgltGHpyPOF6v6Aqnz3gWMkCJ3brNKyexgonZWPEboXsHZeJFNPCQka+D0P4y7BAoGBAL5eIs91giIcmLLW9DJwB6x1pbam2x9Ckqe5sW8Q+M/cg/lSAKfQ4Sp8jH6jTFODa3I7uBILRSSq4T/GSStUEIROQ1llLktPTmeYiwiWij4IvlIow31cx7gZKnIzvunlhZQTCWvWQkYNTVp7214SWwN/n48lEekP/IbLKpfwwTWlAoGBANfNVnLbdzxnAHhAhEfo2pWkWoOLSLSNClu5xu3iKuLydjuJpPsXK/GVS6aZjxirdi8IHrm6FpjA2EFwEAp7g7Cjl/L4vhDEs7pypG4p8QBqFDbOTwIvafnJDKEVvIEZwtZJVk8WtQIAxPCqVvt+INLTFGL7bPW/hWbxlt+gLe4e")
			.setEnableDebug(true)
			.setEnableFullLog()
			.setAesKey(null)
			.setPatchLoadStatusStub(new PatchLoadStatusListener() {
				@Override
				public void onLoad(final int mode, final int code, final String info, final int handlePatchVersion) {
					if (code == PatchStatus.CODE_LOAD_SUCCESS) {
						Log.i(TAG, "sophix load patch success!");
					} else if (code == PatchStatus.CODE_LOAD_RELAUNCH) {
						// 如果需要在后台重启，建议此处用SharePreference保存状态。
						Log.i(TAG, "sophix preload patch success. restart app to make effect.");
					}else{
						Log.i(TAG, "-----------------------!"+code);
					}
				}
			}).initialize();
	}
}
