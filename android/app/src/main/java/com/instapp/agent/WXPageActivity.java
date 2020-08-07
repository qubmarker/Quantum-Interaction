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
import com.instapp.nat.weex.plugin.Geolocation.Geolocation;
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

import android.content.pm.PackageManager;
import android.support.v4.content.ContextCompat;
import android.os.Build;
import android.support.v4.app.ActivityCompat;
import android.Manifest;

public class WXPageActivity extends AbsWeexActivity implements
    WXSDKInstance.NestedInstanceInterceptor {

	private static  Boolean isExit=false;
  private static final String TAG = "WXPageActivity";
	private static WXPageActivity wxqs;
  private ProgressBar mProgressBar;
  private TextView mTipView;
  private boolean mFromSplash = false;
  private HotReloadManager mHotReloadManager;
  private JSCallback onScanFinishCallback=null;
  private static AVLoadingIndicatorView avi;

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


      if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {

            // 判断是否有这个权限，是返回PackageManager.PERMISSION_GRANTED，否则是PERMISSION_DENIED
            // 这里我们要给应用授权所以是!= PackageManager.PERMISSION_GRANTED
            if (ContextCompat.checkSelfPermission(this,
                    android.Manifest.permission.WRITE_EXTERNAL_STORAGE)
                    != PackageManager.PERMISSION_GRANTED) {

                // 如果应用之前请求过此权限但用户拒绝了请求,且没有选择"不再提醒"选项 (后显示对话框解释为啥要这个权限)，此方法将返回 true。
                if (ActivityCompat.shouldShowRequestPermissionRationale(this,
                        Manifest.permission.WRITE_EXTERNAL_STORAGE)) {


                } else {

                    // requestPermissions以标准对话框形式请求权限。123是识别码（任意设置的整型），用来识别权限。应用无法配置或更改此对话框。
                    //当应用请求权限时，系统将向用户显示一个对话框。当用户响应时，系统将调用应用的 onRequestPermissionsResult() 方法，向其传递用户响应。您的应用必须替换该方法，以了解是否已获得相应权限。回调会将您传递的相同请求代码传递给 requestPermissions()。
                    ActivityCompat.requestPermissions(this,
                            new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE},
                            123);

                }
            }

        }






    mContainer = (ViewGroup) findViewById(R.id.container);
    mProgressBar = (ProgressBar) findViewById(R.id.progress);
    mTipView = (TextView) findViewById(R.id.index_tip);

    avi = (AVLoadingIndicatorView)findViewById(R.id.avi);
	//avi.setVisibility(View.VISIBLE);
	 // avi.setIndicator("BallGridPulseIndicator");

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
                    Toast.makeText(WXPageActivity.this, "Hot reload", Toast.LENGTH_SHORT).show();
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
                    Toast.makeText(WXPageActivity.this, "Render: " + bundleUrl, Toast.LENGTH_SHORT).show();
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


   switch (requestCode) {
            case 123: {
                // If request is cancelled, the result arrays are empty.
                if (grantResults.length > 0
                        && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    //这里的两句语句是我写的创建文件的语句，在授权成功是时候会调用这里的语句。
                  //  FileManager.initFile();

                   try
					{
						java.io.File f=new java.io.File("file:///storage/emulated/0/beauty/nat/download/");
						if(!f.exists())
						{


							 f.mkdirs();//多级目录


						}

					}
					catch (Exception e)
					{

					}
                    Toast.makeText(this,"文件目录已经创建好了",Toast.LENGTH_SHORT).show();
                    // permission was granted, yay! Do the
                    // contacts-related task you need to do.

                } else {

                    // permission denied, boo! Disable the
                    // functionality that depends on this permission.
                }
                return;
            }
		}

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
				  Intent intent = new Intent(WXPageActivity.this, WXPageActivity.class);
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
			Toast.makeText(this,"再按一次退出程序",Toast.LENGTH_SHORT).show();
			tExit=new Timer();
			tExit.schedule(new TimerTask() {
				@Override
				public void run() {
					isExit=false;//取消退出
				}
			},2000);// 如果2秒钟内没有按下返回键，则启动定时器取消掉刚才执行的任务
		}else{
			finish();
			System.exit(0);

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
}
