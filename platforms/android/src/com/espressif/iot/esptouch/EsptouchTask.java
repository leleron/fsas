package com.espressif.iot.esptouch;

import android.content.Context;

import com.iot.espressif.esptouch.i;

public class EsptouchTask implements IEsptouchTask {

	public i _mEsptouchTask;

	/**
	 * Constructor of EsptouchTask
	 * 
	 * @param apSsid
	 *            the Ap's ssid
	 * @param apPassword
	 *            the Ap's password
	 * @param context
	 * 			  the Context of the Application
	 */
	public EsptouchTask(String apSsid, String apPassword, Context context) {
		_mEsptouchTask = new i(apSsid, apPassword, context);
	}

	@Override
	public void interrupt() {
		_mEsptouchTask.a();

	}

	@Override
	public boolean execute() throws RuntimeException {
		return _mEsptouchTask.b();
		
	}

	@Override
	public IEsptouchResult executeForResult() throws RuntimeException {
		return _mEsptouchTask.c();
	}

}
