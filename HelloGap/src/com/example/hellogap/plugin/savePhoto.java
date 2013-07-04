package com.example.hellogap.plugin;

import java.io.File;
import java.io.FileOutputStream;
import java.util.Random;

import org.apache.cordova.api.CallbackContext;
import org.apache.cordova.api.CordovaPlugin;
import org.json.JSONArray;
import org.json.JSONException;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Environment;
import android.util.Base64;

public class savePhoto extends CordovaPlugin {

	@Override
	public boolean execute(String action, JSONArray args,
			CallbackContext callbackContext) throws JSONException {
		if (action.equals("saveJPG")) {
			String imgUrl = args.getString(0);
			
			//decode string
			byte[] byteArray=Base64.decode(imgUrl,Base64.DEFAULT);
			Bitmap img=BitmapFactory.decodeByteArray(byteArray,0,byteArray.length);
			
			savePhotos(img);

			this.saveJPG(imgUrl, callbackContext);
			return true;
		}
		return false;
	}
	
	 private void saveJPG(String imgUrl, CallbackContext callbackContext) {
	        if (imgUrl != null && imgUrl.length() > 0) { 
	            callbackContext.success("Saved image: in gallery");
	        } else {
	            callbackContext.error("Expected one non-empty string argument.");
	        }
	    }
	
	private void savePhotos(Bitmap bmp){
		File pictureFolder = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_PICTURES);
		File imageFileFolder = new File(pictureFolder, "HelloGap");
	 	if(!imageFileFolder.exists())
			imageFileFolder.mkdir();
	 	
	 	Random generator = new Random();
	 	int n = 10000;
	 	n = generator.nextInt(n);
	 	String fname = "Image-"+ n +".jpg";
	 	File file = new File (imageFileFolder, fname);
	 	if (file.exists ()) file.delete (); 
	 	try {
	 	       FileOutputStream out = new FileOutputStream(file);
	 	       bmp.compress(Bitmap.CompressFormat.JPEG, 50, out);
	 	       out.flush();
	 	       out.close();

	 	} catch (Exception e) {
	 	       e.printStackTrace();
	 	}
	 	
	 	scanPhoto(file.toString());
	
	}
	 
	private void scanPhoto(String imageFileName){
		Intent mediaScanIntent = new Intent(Intent.ACTION_MEDIA_SCANNER_SCAN_FILE);
		File f = new File(imageFileName);
		Uri contentUri = Uri.fromFile(f);
		mediaScanIntent.setData(contentUri);
		this.cordova.getActivity().sendBroadcast(mediaScanIntent);
	}

}
