import { Utils } from "@nativescript/core";

export function androidRequestAudioFocus() {
	// Request audio focus for playback
	const audioManager = Utils.android.getApplicationContext().getSystemService(android.content.Context.AUDIO_SERVICE);
	audioManager.requestAudioFocus(null, android.media.AudioManager.STREAM_MUSIC, android.media.AudioManager.AUDIOFOCUS_GAIN);
}