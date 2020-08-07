package com.instapp.agent.component;

import android.view.View;

import com.taobao.weex.ui.component.WXComponent;


public interface IQSWebView {
	public void weexCallJsHandler(String params);

	public void setParent(WXComponent wxparent);
	public WXComponent getParent();

	public View getView();
	public void destroy();
	public void loadUrl(String url);
	public void reload();
	public void goBack();
	public void goForward();
	public void setShowLoading(boolean shown);
	public void setOnErrorListener(IQSWebView.OnErrorListener listener);
	public void setOnPageListener(IQSWebView.OnPageListener listener);

	public interface OnErrorListener {
		public void onError(String type, Object message);
	}

	public interface OnPageListener {
		public void onReceivedTitle(String title);
		public void onPageStart(String url);
		public void onPageFinish(String url, boolean canGoBack, boolean canGoForward);
	}
}
