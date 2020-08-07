package com.instapp.agent;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.support.annotation.NonNull;
import android.support.v4.content.LocalBroadcastManager;
import android.text.TextUtils;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.baidu.location.LocationClient;
import com.baidu.location.LocationClientOption;
import com.instapp.agent.baidumap.MyLocationListener;
import com.instapp.agent.hotreload.HotReloadManager;
import com.instapp.agent.util.AppConfig;
import com.instapp.agent.util.Constants;
import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;
import com.taobao.weex.WXEnvironment;
import com.taobao.weex.WXRenderErrorCode;
import com.taobao.weex.WXSDKEngine;
import com.taobao.weex.WXSDKInstance;

import com.taobao.weex.ui.component.NestedContainer;

import com.taobao.weex.ui.component.WXWeb;
import com.taobao.weex.utils.WXLogUtils;
import com.taobao.weex.utils.WXSoInstallMgrSdk;

import org.json.JSONException;
import org.json.JSONObject;
import com.taobao.weex.bridge.JSCallback;
import java.util.HashMap;
import java.util.Map;

import java.util.Timer;
import java.util.TimerTask;
import com.wang.avi.AVLoadingIndicatorView;

public class WXQsActivity extends AbsWeexActivity implements
	WXSDKInstance.NestedInstanceInterceptor {

	private static  Boolean isExit=false;
	private static final String TAG = "WXQsActivity";
	private static WXQsActivity wxqs;
	private ProgressBar mProgressBar;
	private TextView mTipView;
	private boolean mFromSplash = false;
	private HotReloadManager mHotReloadManager;
	private JSCallback onScanFinishCallback=null;
	private static AVLoadingIndicatorView avi;

	//
	public LocationClient mLocationClient = null;
	private MyLocationListener myListener = new MyLocationListener();

	public void setOnScanFinishCallback(JSCallback callback){
		this.onScanFinishCallback=callback;
	}
	@Override
	public void onCreateNestInstance(WXSDKInstance instance, NestedContainer container) {
		Log.d(TAG, "Nested Instance created.");
	}

	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_wxpage);
		mContainer = (ViewGroup) findViewById(R.id.container);
		mProgressBar = (ProgressBar) findViewById(R.id.progress);
		mTipView = (TextView) findViewById(R.id.index_tip);
		avi = (AVLoadingIndicatorView)findViewById(R.id.avi);


		//----------------------------------------------------------------
		mLocationClient = new LocationClient(getApplicationContext());
		//声明LocationClient类
		mLocationClient.registerLocationListener(myListener);
//注册监听函数
		LocationClientOption option = new LocationClientOption();

		option.setLocationMode(LocationClientOption.LocationMode.Hight_Accuracy);
//可选，设置定位模式，默认高精度
//LocationMode.Hight_Accuracy：高精度；
//LocationMode. Battery_Saving：低功耗；
//LocationMode. Device_Sensors：仅使用设备；

		option.setCoorType("bd09ll");
//可选，设置返回经纬度坐标类型，默认GCJ02
//GCJ02：国测局坐标；
//BD09ll：百度经纬度坐标；
//BD09：百度墨卡托坐标；
//海外地区定位，无需设置坐标类型，统一返回WGS84类型坐标

		option.setScanSpan(1000);
//可选，设置发起定位请求的间隔，int类型，单位ms
//如果设置为0，则代表单次定位，即仅定位一次，默认为0
//如果设置非0，需设置1000ms以上才有效

		option.setOpenGps(true);
//可选，设置是否使用gps，默认false
//使用高精度和仅用设备两种定位模式的，参数必须设置为true

		option.setLocationNotify(true);
//可选，设置是否当GPS有效时按照1S/1次频率输出GPS结果，默认false

		option.setIgnoreKillProcess(false);
//可选，定位SDK内部是一个service，并放到了独立进程。
//设置是否在stop的时候杀死这个进程，默认（建议）不杀死，即setIgnoreKillProcess(true)

		option.SetIgnoreCacheException(false);
//可选，设置是否收集Crash信息，默认收集，即参数为false

		option.setWifiCacheTimeOut(5*60*1000);
//可选，V7.2版本新增能力
//如果设置了该接口，首次启动定位时，会先判断当前Wi-Fi是否超出有效期，若超出有效期，会先重新扫描Wi-Fi，然后定位

		option.setEnableSimulateGps(false);
//可选，设置是否需要过滤GPS仿真结果，默认需要，即参数为false

		mLocationClient.setLocOption(option);
//mLocationClient为第二步初始化过的LocationClient对象
//需将配置好的LocationClientOption对象，通过setLocOption方法传递给LocationClient对象使用
//更多LocationClientOption的配置，请参照类参考中LocationClientOption类的详细说明

		mLocationClient.start();

		//-------------------------------百度地图-----------------------------------------

		wxqs = this;
		Intent intent = getIntent();
		Uri uri = intent.getData();
		String from = intent.getStringExtra("from");
		mFromSplash = "splash".equals(from);

		if (uri == null) {
			uri = Uri.parse("{}");
		}
		if (uri != null) {
			String sUrl = uri.toString();

			if (sUrl.startsWith("file://")) {
				mUri = uri;
			} else {
				try {
					JSONObject initData = new JSONObject(uri.toString());
					String bundleUrl = initData.optString("WeexBundle", null);
					if (bundleUrl != null) {
						mUri = Uri.parse(bundleUrl);
					}

					String ws = initData.optString("Ws", null);
					if (!TextUtils.isEmpty(ws)) {
						mHotReloadManager = new HotReloadManager(ws, new HotReloadManager.ActionListener() {
							@Override
							public void reload() {
								runOnUiThread(new Runnable() {
									@Override
									public void run() {
										Toast.makeText(WXQsActivity.this, "Hot reload", Toast.LENGTH_SHORT).show();
										createWeexInstance();
										renderPage();
									}
								});
							}

							@Override
							public void render(final String bundleUrl) {
								runOnUiThread(new Runnable() {
									@Override
									public void run() {
										Toast.makeText(WXQsActivity.this, "Render: " + bundleUrl, Toast.LENGTH_SHORT).show();
										createWeexInstance();
										loadUrl(bundleUrl);
									}
								});
							}
						});
					} else {
						WXLogUtils.w("Weex", "can not get hot reload config");
					}
				} catch (JSONException e) {
					e.printStackTrace();
					mUri = Uri.parse(uri.toString());
				}
			}
		}

		if (mUri == null) {
			mUri = Uri.parse(AppConfig.getLaunchUrl());
		}

		if (!WXSoInstallMgrSdk.isCPUSupport()) {
			mProgressBar.setVisibility(View.INVISIBLE);
			mTipView.setText(R.string.cpu_not_support_tip);
			return;
		}

		String url = getUrl(mUri);
		if (getSupportActionBar() != null) {
			getSupportActionBar().setTitle(url);
			getSupportActionBar().hide();
		}
		loadUrl(url);
	}

	private String getUrl(Uri uri) {
		String url = uri.toString();
		String scheme = uri.getScheme();
		if (uri.isHierarchical()) {
			if (TextUtils.equals(scheme, "http") || TextUtils.equals(scheme, "https")) {
				String weexTpl = uri.getQueryParameter(Constants.WEEX_TPL_KEY);
				if (!TextUtils.isEmpty(weexTpl)) {
					url = weexTpl;
				}
			}
		}
		return url;
	}

	protected void preRenderPage() {
		mProgressBar.setVisibility(View.VISIBLE);
	}

	@Override
	public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
		super.onRequestPermissionsResult(requestCode, permissions, grantResults);
		Intent intent = new Intent("requestPermission");
		intent.putExtra("REQUEST_PERMISSION_CODE", requestCode);
		intent.putExtra("permissions", permissions);
		intent.putExtra("grantResults", grantResults);
		LocalBroadcastManager.getInstance(this).sendBroadcast(intent);
	}


	@Override
	public void onRenderSuccess(WXSDKInstance instance, int width, int height) {
		mProgressBar.setVisibility(View.GONE);
		mTipView.setVisibility(View.GONE);
	}

	@Override
	public void onException(WXSDKInstance instance, String errCode, String msg) {
		mProgressBar.setVisibility(View.GONE);
		//mTipView.setVisibility(View.VISIBLE);
//    if (TextUtils.equals(errCode, WXRenderErrorCode.WX_NETWORK_ERROR)) {
		if (TextUtils.equals(errCode, WXRenderErrorCode.DegradPassivityCode.WX_DEGRAD_ERR_NETWORK_BUNDLE_DOWNLOAD_FAILED.toString())) {
			mTipView.setText(R.string.index_tip);
		} else {
			mTipView.setText("render error:" + errCode);
		}
	}

	@Override
	public boolean onCreateOptionsMenu(Menu menu) {
		getMenuInflater().inflate(mFromSplash ? R.menu.main_scan : R.menu.main, menu);
		return super.onCreateOptionsMenu(menu);
	}

	@Override
	public boolean onOptionsItemSelected(MenuItem item) {
		switch (item.getItemId()) {
			case R.id.action_refresh:
				createWeexInstance();
				renderPage();
				break;
			case R.id.action_scan:
				IntentIntegrator integrator = new IntentIntegrator(this);
				integrator.setDesiredBarcodeFormats(IntentIntegrator.QR_CODE_TYPES);
				integrator.setPrompt("Scan a barcode");
				//integrator.setCameraId(0);  // Use a specific camera of the device
				integrator.setBeepEnabled(true);
				integrator.setOrientationLocked(false);
				integrator.setBarcodeImageEnabled(true);
				integrator.setPrompt(getString(R.string.capture_qrcode_prompt));
				integrator.initiateScan();
				break;
			case android.R.id.home:
				finish();
			default:
				break;
		}

		return super.onOptionsItemSelected(item);
	}

	@Override
	public void onActivityResult(int requestCode, int resultCode, Intent data) {
		IntentResult result = IntentIntegrator.parseActivityResult(requestCode, resultCode, data);
		if (result != null) {
			if (result.getContents() == null) {
				Toast.makeText(this, "Cancelled", Toast.LENGTH_LONG).show();
			} else {
				handleDecodeInternally(result.getContents());
			}
		}
		super.onActivityResult(requestCode, resultCode, data);
	}

	// Put up our own UI for how to handle the decoded contents.
	private void handleDecodeInternally(String code) {

		if (!TextUtils.isEmpty(code)) {
			Uri uri = Uri.parse(code);
			if (uri.getQueryParameterNames().contains("bundle")) {
				WXEnvironment.sDynamicMode = uri.getBooleanQueryParameter("debug", false);
				WXEnvironment.sDynamicUrl = uri.getQueryParameter("bundle");
				String tip = WXEnvironment.sDynamicMode ? "Has switched to Dynamic Mode" : "Has switched to Normal Mode";
				Toast.makeText(this, tip, Toast.LENGTH_SHORT).show();
				finish();
				return;
			} else if (uri.getQueryParameterNames().contains("_wx_devtool")) {
				WXEnvironment.sRemoteDebugProxyUrl = uri.getQueryParameter("_wx_devtool");
				WXEnvironment.sDebugServerConnectable = true;
				WXSDKEngine.reload();
				Toast.makeText(this, "devtool", Toast.LENGTH_SHORT).show();
				return;
			} else if (code.contains("_wx_debug")) {
				uri = Uri.parse(code);
				String debug_url = uri.getQueryParameter("_wx_debug");
//        WXSDKEngine.switchDebugModel(true, debug_url);
				WXSDKEngine.restartBridge(true);
				finish();
			} else {

				//新增自定义处理代码
				if(this.onScanFinishCallback!=null){
					Map data = new HashMap();
					data.put("result",true);
					data.put("data",code);
					this.onScanFinishCallback.invokeAndKeepAlive(data);
				}else {
					//----------------此处原有代码不在else里面---------------------
					JSONObject data = new JSONObject();
					try {
						data.put("WeexBundle", Uri.parse(code).toString());
						Intent intent = new Intent(WXQsActivity.this, WXQsActivity.class);
						intent.setData(Uri.parse(data.toString()));
						startActivity(intent);
					} catch (JSONException e) {
						e.printStackTrace();
					}
					//----------------------------------------------------------------
				}



			}
		}
	}

	@Override
	public void onDestroy() {
		super.onDestroy();
		if (mHotReloadManager != null) {
			mHotReloadManager.destroy();
		}
	}

	@Override
	public void onBackPressed(){
		Map<String,Object> params=new HashMap<>();
		params.put("click","back");
		mInstance.fireGlobalEventCallback("androidback",params);
		exitByDoubleClick();
	}

	private void exitByDoubleClick() {
		Timer tExit=null;
		if(!isExit){
			isExit=true;
			Toast.makeText(this,"再按一次后台运行程序 !",Toast.LENGTH_SHORT).show();
			tExit=new Timer();
			tExit.schedule(new TimerTask() {
				@Override
				public void run() {
					isExit=false;//取消退出
				}
			},2000);// 如果2秒钟内没有按下返回键，则启动定时器取消掉刚才执行的任务
		}else{
			//finish();
			//System.exit(0);
			Intent home = new Intent(Intent.ACTION_MAIN);
			home.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
			home.addCategory(Intent.CATEGORY_HOME);
			startActivity(home);
		}
	}

	/**
	 *https://blog.csdn.net/qq_40090482/article/details/78984206
	 */
	public static void loadingshow(){
		//avi.setVisibility(View.VISIBLE);//show();
		avi.smoothToShow();
	}

	/**
	 *此方法目前还不太灵
	 */
	public static void loadinghide(){
		//avi.setVisibility(View.INVISIBLE);
		avi.smoothToHide();
	}
	/**
	 *
	 */
	public static void setloading(String indicator){
		avi.setIndicator(indicator);
		avi.show();

	}

	public static Activity getActivity(){

		return wxqs;
	}


	//推送
	public WXSDKInstance getWxInstance(){
		return super.mInstance;
	}

}
