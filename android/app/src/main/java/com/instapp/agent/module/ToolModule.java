package com.instapp.agent.module;

import android.app.Application;
import android.app.DownloadManager;
import android.content.Context;
import android.net.Uri;
import android.os.Environment;
import android.util.Log;
import android.view.ViewGroup;

import com.instapp.agent.WXApplication;
import com.instapp.agent.WXPageActivity;
import com.instapp.agent.WXQsActivity;
import com.instapp.agent.util.DownloadManagerUtil;
import com.taobao.weex.bridge.JSCallback;
import com.taobao.weex.common.WXModule;
import com.taobao.weex.annotation.JSMethod;
import com.instapp.agent.util.CleanMessageUtil;

import java.io.File;
import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okio.BufferedSink;
import okio.Okio;
import okio.Sink;

public class ToolModule extends WXModule {

	public static double lng;
	public static double lat;

	//系统下载通知栏
	public DownloadManagerUtil  downloadManagerUtil;
	long downloadId = 0;


	@JSMethod(uiThread = false)
	public void closeApp() {
	//	LogUtil.e("触发关闭效果");
		//CacheActivity.finishActivity();
		System.exit(0);
	}


	/**
	 * 清除缓存
	 */
	@JSMethod(uiThread = false)
	public void clearAllCache() {

		CleanMessageUtil.clearAllCache(WXApplication.getMyApplication());
	}

	/**
	 * 获取缓存
	 */
	@JSMethod(uiThread = false)
	public void getAllCache(JSCallback callback) {
		//callback.invokeAndKeepAlive();
		//CleanMessageUtil.getTotalCacheSize(WXApplication.getMyApplication());
		try {
			callback.invokeAndKeepAlive(CleanMessageUtil.getTotalCacheSize(WXApplication.getMyApplication()));
		}catch (Exception e) {
			e.printStackTrace();
		}

	}
	/**
	 * 获取版本号
	 */
	@JSMethod(uiThread = false)
	public void getAppVersionCode(JSCallback callback) {

		callback.invokeAndKeepAlive(CleanMessageUtil.getAppVersionCode(WXApplication.getMyApplication()));
	}

	/**
	 * 当前程序版本名
	 */
	@JSMethod(uiThread = false)
	public void getAppVersionName(JSCallback callback) {
		callback.invokeAndKeepAlive(CleanMessageUtil.getAppVersionName(WXApplication.getMyApplication()));

	}

	/**
	 * loading动画
	 */
	@JSMethod(uiThread = true)
	public void showLoading(int flag) {
		//小米的安卓7上这个报错
		if(flag==0)
			WXPageActivity.loadingshow();
		else
			WXQsActivity.loadingshow();
	}

	/**
	 * loading动画
	 */
	@JSMethod(uiThread = true)
	public void hideLoading(int flag) {
		//小米的安卓7上这个报错
		if(flag==0)
			WXPageActivity.loadinghide();
		else
			WXQsActivity.loadinghide();
	}

	/**
	 * 设置loading动画
	 */
	@JSMethod(uiThread = true)
	public void setLoading(String indicator) {

		WXPageActivity.setloading(indicator);
	}

	/**
	 * 判断文件存不存在
	 */
	@JSMethod(uiThread = true)
	public void  checkFile(String url,JSCallback callback){
			callback.invokeAndKeepAlive(fileIsExists(url));
	}


	public boolean fileIsExists(String strFile)
    {
        try
        {
            java.io.File f=new java.io.File(strFile);
            if(!f.exists())
            {


   				 f.createNewFile();//多级目录

                    return false;
            }

        }
        catch (Exception e)
        {
            return false;
        }

        return true;
    }

	/**
	 * 下载文件
	 */
	@JSMethod(uiThread = true)
	public void downloadFile3(String _url,JSCallback _callback){
		//下载路径，如果路径无效了，可换成你的下载路径
		final String url = _url;//"http://c.qijingonline.com/test.mkv";
		final long startTime = System.currentTimeMillis();
		final JSCallback callback = _callback;
		Log.i("DOWNLOAD","startTime="+startTime);

		Request request = new Request.Builder().url(url).build();
		new OkHttpClient().newCall(request).enqueue(new Callback() {
			@Override
			public void onFailure(Call call, IOException e) {
				// 下载失败
				e.printStackTrace();
				Log.i("DOWNLOAD","download faileds");
			}
			@Override
			public void onResponse(Call call, Response response) throws IOException {
				Sink sink = null;
				BufferedSink bufferedSink = null;
				try {
					String mSDCardPath= Environment.getExternalStorageDirectory().getAbsolutePath();
					Log.i("DOWNLOAD",mSDCardPath);
					File dest = new File(mSDCardPath,   url.substring(url.lastIndexOf("/") + 1));
					sink = Okio.sink(dest);
					bufferedSink = Okio.buffer(sink);
					bufferedSink.writeAll(response.body().source());

					bufferedSink.close();
					callback.invokeAndKeepAlive(mSDCardPath+"/"+url.substring(url.lastIndexOf("/") + 1));
					Log.i("DOWNLOAD","download success");
					Log.i("DOWNLOAD","totalTime="+ (System.currentTimeMillis() - startTime));
				} catch (Exception e) {
					e.printStackTrace();
					callback.invokeAndKeepAlive("fialed");
					Log.i("DOWNLOAD","download failed");
				} finally {
					if(bufferedSink != null){
						bufferedSink.close();
					}

				}
			}
		});
	}

	/**
	 * 下载文件
	 */
	@JSMethod(uiThread = true)
	public void downloadFile2(String _url,JSCallback _callback){
		//创建下载任务,downloadUrl就是下载链接
		DownloadManager.Request request = new DownloadManager.Request(Uri.parse(_url));
//指定下载路径和下载文件名
		request.setDestinationInExternalPublicDir("/download/", _url.substring(_url.lastIndexOf("/") + 1));
//获取下载管理器,就不能再引导页用了
		DownloadManager downloadManager= (DownloadManager) WXQsActivity.getActivity().getSystemService(Context.DOWNLOAD_SERVICE);
//将下载任务加入下载队列，否则不会进行下载
		downloadManager.enqueue(request);

		/*作者：Marno
		链接：https://www.jianshu.com/p/46fd1c253701
		來源：简书
		简书著作权归作者所有，任何形式的转载都请联系作者获得授权并注明出处。*/
	}

	/**
	 * 当weex渲染完毕后WXQsActivity背景由透明变成白色
	 */
	@JSMethod(uiThread = true)
	public void changeBlack(){
//		ViewGroup mContainer = (ViewGroup)  WXQsActivity.getActivity().findViewById(R.id.container);
//		mContainer.setBackgroundColor(0xffffff);
//		ViewGroup mContainers = (ViewGroup)  WXPageActivity.getActivity().findViewById(R.id.container);
//		mContainers.setBackgroundColor(0xffffff);
	}

	/**
	 * 获取当前位置
	 */
	@JSMethod(uiThread = true)
	public void getLocation(JSCallback _callback){
		//_callback.invokeAndKeepAlive("{lng:"+lng+",lat:"+lat+"}");
		_callback.invokeAndKeepAlive("{\"longitude\":"+lng+",\"latitude\":"+lat+"}");
	}


	/**
	 * 加载，使用系统通知栏
	 */
	@JSMethod(uiThread = true)
	public void getFileFromSystem( String url, String title,String desc ){
		if(null == downloadManagerUtil){

			downloadManagerUtil = new DownloadManagerUtil(WXQsActivity.getActivity());
		}

		if (downloadId != 0) {
			downloadManagerUtil.clearCurrentTask(downloadId);
		}
		downloadId = downloadManagerUtil.download(url, title, desc);


	}
}
