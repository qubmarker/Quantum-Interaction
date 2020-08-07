package com.instapp.agent.component;

import android.content.Context;
import android.graphics.Color;
import android.support.annotation.NonNull;
import android.util.Log;
import android.view.inputmethod.InputMethodManager;
import android.widget.EditText;

import com.instapp.agent.WXQsActivity;
import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.bridge.JSCallback;
import com.taobao.weex.dom.WXDomObject;
import com.taobao.weex.ui.component.WXComponent;
import com.taobao.weex.ui.component.WXComponentProp;
import com.taobao.weex.ui.component.WXVContainer;

public class RichText extends WXComponent<EditText> {

	public RichText(WXSDKInstance instance, WXDomObject dom, WXVContainer parent) {
		super(instance, dom, parent);
	}

	@Override
	protected EditText initComponentHostView(@NonNull Context context) {
		EditText textView = new EditText(context);
		textView.setTextSize(20);
		//textView.setInputType();
		textView.setTextColor(Color.BLACK);
		return textView;
	}

	@WXComponentProp(name = "tel")
	public void setTel(String telNumber) {
		getHostView().setText("tel: " + telNumber);
	}

	@JSMethod
	public void focus(){
		getHostView().requestFocus();//获取焦点

	}

	@JSMethod
	public void blur(){
		getHostView().clearFocus();//失去焦点
		// 关闭输入法
		InputMethodManager imm = (InputMethodManager) WXQsActivity.getActivity().getSystemService(Context.INPUT_METHOD_SERVICE);
		imm.hideSoftInputFromWindow(getHostView().getWindowToken(), 0);
	}

	@JSMethod(uiThread = true)
	public void getTxt( JSCallback callback ){
		Log.i("richtext", "getTxt: "+ getHostView().getText()+"|"+ getHostView().getText().toString());
		callback.invokeAndKeepAlive(getHostView().getText().toString());

	}

	@JSMethod
	public void setTxt(String v){
		 getHostView().setText(v);

	}

}
