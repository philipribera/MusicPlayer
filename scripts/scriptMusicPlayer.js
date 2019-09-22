/*
**************************************
****	SCRIPT FOR MUSIC PLAYER	  ****
****	AUTHOR:	PHILIP R		  ****	
**************************************
*/
	
$(document).ready(function() {	

(function () {
    "use strict";    
	var doc = document;
	
	var pressedPlayed = doc.getElementById('play-music');			
	pressedPlayed.addEventListener('click', pressedPlay, false);
		
	function pressedPlay() {		
		if( $(this).hasClass("playingPressed") ) {				
			$(this).removeClass('playingPressed');
		}
		else {
			$(this).addClass('playingPressed');
		}
	}
		
	function playList(src) 	{
	    var player = doc.getElementById('mplayer');
	    player.setAttribute("src", src);
	    player.play();
	    showDur();
	}
		
	// EVENT LISTENERS
	var btnPlayer = doc.getElementsByClassName('open-player')[0];
	var backPlayer = doc.getElementById('music-player');		
	btnPlayer.addEventListener('click', setMediaClass, false);
	btnPlayer.addEventListener('click', player, false);	
	var mp = doc.getElementById('music-player');	
	var listTracks = doc.getElementsByTagName('ul')[0].getElementsByTagName('button');
	
	for(var i = 0; i < listTracks.length; i++)	{
		listTracks[i].addEventListener('click', chooseTrack, false);	
	}
		
	
	// FUNCTION TO OPEN PLAYER	
	function setMediaClass()	{			
		var stop = doc.getElementById('mplayer');				
		if(backPlayer.className === "musicBefore")	{
			doc.getElementById('mc').className = "light";
			backPlayer.className = "";
			btnPlayer.className = btnPlayer.className.replace('open-player', 'openPlayerActive');
			btnPlayer.src = "images/powerGreen50.png";	
		} else {								
			doc.getElementById('mc').className = "";
			backPlayer.className = "musicBefore";
			btnPlayer.className = btnPlayer.className.replace('openPlayerActive', 'open-player');	
			btnPlayer.src = "images/powerNeutral50.png";	
			stop.currentTime = 0;				
			stop.pause();
		}
	}	
		
	// 	PLAY MUSIC FUNCTIONS
	function player()	{		
		var btnPlay = doc.getElementById('play-music');
		btnPlay.addEventListener('click', playMusic, false);		
		var btnPaus = doc.getElementById('paus-music');
		var foo = btnPaus.addEventListener('click', pausMusic, false);
		var playM = doc.getElementById('playMsg');			
		var btnStop = doc.getElementById('stop-music');
		btnStop.addEventListener('click', stopMusic, false);				
		var btnMute = doc.getElementById('mute-music');
		btnMute.addEventListener('click', muteMusic, false);	
		
		var ran = doc.getElementById('volume-range');		
		ran.align = 'vertical';	
		var volControl = doc.getElementById('volume-slider');		
		volControl.addEventListener('mousemove', changeVolume, false);
			
		// PANEL BUTTON FUNCTIONS
		function playMusic()	{			
			var play = doc.getElementById('mplayer');					
				play.play();				
				doc.getElementById('dot-static').className = 'dot-move';
		}
		
		function pausMusic()	{			
			var paus = doc.getElementById('mplayer');			
			if(paus.paused)	{				
				paus.play();
				doc.getElementById('dot-static').className = 'dot-move';				
			} else {
				doc.getElementById('dot-static').classList.remove('dot-move');		
				paus.pause();				
			}					
		}	
		
		function stopMusic()	{
			var stop = doc.getElementById('mplayer');	
				doc.getElementById('dot-static').classList.remove('dot-move');				
				stop.currentTime = 0;				
				stop.pause();									
		}

		function muteMusic()	{
			var mute = doc.getElementById('mplayer');
			if(mute.muted)	{
				mute.muted = false;	
				doc.getElementById('muted').style.display = 'none';		
			} else {
				mute.muted = true;	
				doc.getElementById('muted').style.display = 'initial';		
			}	
		}
	} //END PLAYER FUNCTIONS
	
	
	// VOLUME CONTROL	
	function changeVolume()	{					
		var play = doc.getElementById('mplayer');		
		var volControl = doc.getElementById('volume-slider');
		var displayVol = doc.getElementById('show-vol');				
		volControl.setAttribute('title', ("Volume " + play.volume * 100));
		
		volControl.addEventListener('mouseup', function() {
			displayVol.innerHTML = volControl.value;
		});				
		
		play.volume = volControl.value / 100;				
	}	
					
		
	// DISPLAY TRACK PROGRESS	
	function showDur()	{
		var playM = doc.getElementById('mplayer');	
		var bar = doc.getElementById('playMsg');	
		var setValue = doc.getElementById('showPr');
		var progressBar = doc.getElementById('demo-progress');	
		progressBar.value = 0;
		var seconds = 0;
		var minutes = 0;
		var showTimePlayed = setInterval(timePlayed, 1000);
				
		function show() {			
			var dur = playM.duration;							
			progressBar.setAttribute('max', dur);	
			progressBar.value = playM.currentTime;				
		
			if(playM.muted)	{
				setInterval(progressBar.value);	
			} 
			else if(playM.currentTime === 0)	{			
				progressBar.value = 0; 				
				}		
			else	{
				setInterval(progressBar.value);	
			}
		}	
				
		function timePlayed()	{
		    var dur = playM.duration;
		    seconds++;

		    if (seconds == 60)    {
		        minutes++;
		        seconds = 0;
		    }

			//var dmov = document.getElementById('dotStatic');			
			progressBar.setAttribute('max', dur);	
			progressBar.value = playM.currentTime;	
			var activeTrack = doc.getElementsByClassName('aside')[0]
			var activePlaying = doc.getElementsByClassName('active')[0].innerHTML;
			
			if(playM.paused)	{
					bar.innerHTML = " PAUSED ";
				}
				else if(playM.muted)	{
					//bar.innerHTML = " MUTED " + progressBar.value.toFixed(0);	
					bar.innerHTML = " MUTED ";	

				} 
				else if(playM.currentTime === 0)	{			
					progressBar.value = 0; 
					bar.innerHTML = progressBar.value.toFixed(0);	
				}		
				else {
				 //   var progressbarStatus = " PLAYING: " + act2 + ": ";
				    var progressbarStatus = " " + activePlaying + " ";

				    if (minutes > 0)
				    {
						if( minutes < 10) {							
							progressbarStatus += "0" + minutes + ":";
						} else {
							progressbarStatus += minutes + ":";
						}
				    }
					if( seconds > 0 && seconds < 10 && minutes < 1 ) {
						bar.innerHTML = progressbarStatus + "00:0" + seconds;
					}			
					else if( seconds > 9 && minutes < 1 ) {
						bar.innerHTML = progressbarStatus + "00:" + seconds;	   	
					} 
					else {						
						if( seconds < 10 ) {
						bar.innerHTML = progressbarStatus + "0" + seconds;
						} else {
							bar.innerHTML = progressbarStatus + seconds;
						}
					}	
					
				}
		}			
	}
		
	
	// CHOOSE TRACK FUNCTION	
	function chooseTrack()	{		
	    var result = this.getAttribute('id');
	    var track = this.getAttribute('data-track');
		var list = doc.getElementsByClassName('track-list')[0];
		var listbuttons = list.getElementsByTagName('button');	
		var playM = doc.getElementById('playMsg');			
		
		for(var i = 0; i < listbuttons.length; i++)	{			
			listbuttons[i].className = "";					
		}		
		
		if( this.className === "" )	{
			this.className = "active";
			doc.getElementById('dot-static').className = 'dot-move';
		} else {
			this.className = "";
		}
		playList(track);
	}	
			
}());
			
});	