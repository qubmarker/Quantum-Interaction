package com.instapp.agent.module;

import android.widget.Toast;

import com.taobao.weex.WXSDKInstance;
import com.taobao.weex.annotation.JSMethod;
import com.taobao.weex.common.WXModule;
import com.taobao.weex.common.WXModuleAnno;

public class MessageModule extends WXModule {
    private Integer id;

    @JSMethod
    public Integer getMessage(){
        return this.id;
    }

    public void setId(Integer id){
        this.id=id;
    }
}
