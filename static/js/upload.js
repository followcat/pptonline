(function(){

	function Upload(formname){
		this.form = document.getElementById(formname);
	}


	Upload.prototype.Uploadfile = function(func){
		var aForm = this.form;

		if( aForm["file"].files.length > 0 )
		{
			var file = aForm["file"].files[0];
			//build formdata object
			var formData = new FormData();
			formData.append('file', file);
			

			var xhr = new XMLHttpRequest();
			// var upload = xhr.upload;

			// var p = document.createElement('p');
			// p.textContent = "0%";
			// progressbar.appendChild(p);
			// upload.progressbar = progressbar;
			xhr.open("POST", aForm.action);
			//add upload file evnet function
			var progressmsg = document.getElementById("progressmsg");
			xhr.addEventListener('loadstart', function(event){
				var span = document.createElement("span");
				span.innerHTML = "Uploading";
				progressmsg.appendChild(span);

				var a = document.createElement("a");
				a.href = "javascript:;";
				a.innerHTML = "cancel";
				progressmsg.appendChild(a);
				a.onclick = function(){
					xhr.abort();
					xhr = null;
				};
			}, false);

			xhr.addEventListener('abort', function(){
				progressmsg.innerHTML = "";
			}, false);

			xhr.addEventListener("progress", function(event){

				if(event.lengthComputable)
				{
					progressmsg.innerHTML = "Received " + event.loaded + " of " + event.total + " bytes" + "<br>";
				}
			}, false);

			xhr.addEventListener("load", function(event){
				if( (xhr.status >= 200 && xhr.status < 300) || xhr.status == 304 )
				{
					var successMsg = document.createElement('span');
					var text = document.createTextNode("Upload Success! Skipping page.");
					successMsg.appendChild(text);
					progressmsg.appendChild(successMsg);
					func();
					if(event.currentTarget.responseText == 'True'){
						var link = document.createElement("a");
						link.setAttribute("href", "/preview");
						link.click();
					}
				}
				else
				{
					var failMsg = document.createElement('span');
					var text = document.createTextNode("Upload Fail! Please Try it again.");
					failMsg.appendChild(text);;
					progressmsg.appendChild(failMsg);
				}
			}, false);

			xhr.addEventListener("error", function(event){
				console.log(event);
				progressmsg.innerHTML = "Error." + Upload.Error;
			}, false);

			//upload file
			
			xhr.overrideMimeType("application/octet-stream");
			xhr.send(formData);
		}
		else
		{
			var msg = document.createElement('p');
			msg.appendChild("Plese choose a file");
			aForm.appendChild(p);
		}
	};



	var uploadBtn = document.getElementById("upload-btn");

	uploadBtn.onclick = function(){
			var upload = new Upload("file-form");
			upload.Uploadfile(function(){
				alert("upload successfully");
			});
	}

}());