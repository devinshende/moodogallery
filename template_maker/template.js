var answer = ``
function make_section(){
	function get_section_inputs(){
		var ul = document.getElementById("metadata")
		//collect name and print it
		var name = prompt("what name should the section have?")
		ul.innerHTML +=
			`<li><em>NAME: </em>
		${name}</li>`

		//lowercase, one word
		var noSpaces = name.split(' ').join('')
		var name_id = noSpaces.toLowerCase()
		ul.innerHTML += "<li><em>CLOSE BUTTON ID: </em>" + name_id + "</li>"
		return [name, name_id]
	}
	
	// select html elements for later access, and add h1
	var ul = document.getElementById("metadata")
	var h1 = document.getElementById("makenewsection")
	var div1 = document.getElementById("h1anddata")
	var section_open = document.getElementById("section_open")
	var section_close = document.getElementById("section_close")
	var add_video = document.getElementById("add_video")
	var code_heading = document.getElementById("code_heading")
	code_heading.innerHTML += "<h1>Code for new section</h1>" // add a heading
	code_heading.style.fontSize = "1em" //for some reason it is massive, and putting this in css doesn't work

	var inputs = get_section_inputs()
	var name = inputs[0] //title of subsection
	var name_id = inputs[1] // id used to select element and parameter passed into close_collapsible() on clicks
	//COLLECTED ALL THE NECESSARY INPUTS, TIME TO MAKE THE HTML
	
	// the result follows this pattern, with the varying parts being replaced with variables (name,name_id)
	var open = `
	<!-- ${name} -->
	<button class="collapsible">${name}</button>
	<div class="content">`
	var close = 
	`<div class="close" id="${name_id}" onclick="close_collapsible('${name_id}')">close</div>
	</div>`
	
	var line;
	var lines = open.split('\n');
	for (var i=0; i<lines.length; i++){
		line = document.createTextNode(lines[i]);
		if(i!=0){section_open.innerHTML+="<br>"}
		section_open.appendChild(line)
	}
	lines = close.split('\n');
	for (var i=0; i<lines.length; i++){
		line = document.createTextNode(lines[i]);
		if(i!=0){section_close.innerHTML+="<br>"}
		section_close.appendChild(line)
	}
	div1.style.display = "none"
	add_video.style.display = "block";
}

function add_video(){
	function get_video_inputs(){
		// get embed code
		var url = prompt("what is the link in the embed code for the video?")

		// extract url from the src attribute in iframe
		var url_start = url.indexOf("http")
		var url_end = url.indexOf('" frameborder')
		var src = url.slice(url_start, url_end)
		// use that to piece together embed code with only the essential attributes
		var embed = '<iframe src="' + src + '" frameborder=0 allowfullscreen></iframe>'
		// print EMBED CODE
		ul.innerHTML += "<li><em>EMBED CODE: </em>"
		//use hacky way to print out html as text, not real elements
		var embedtext = document.createTextNode(embed);
		ul.appendChild(embedtext)

		// collect caption and print it
		var caption = prompt("what caption should that video have?")
		ul.innerHTML += "<li><em>CAPTION: </em>" + caption + "</li>"
		
		return [embed,caption]
	}
	// select html elements for later access
	var ul = document.getElementById("metadata")
	var videos = document.getElementById("videos")

	var inputs = get_video_inputs()
	var embed = inputs[0] //full embed code, minus some unimportant attributes
	var caption = inputs[1] //caption for the video
	//COLLECTED ALL THE NECESSARY INPUTS, TIME TO MAKE THE HTML

	// the result follows this pattern, with the varying parts being replaced with variables (embed,caption)
	var video = 
	`<div class="video-container">
		<div class="video">
			${embed}
		</div>
		<p class="caption">${caption}</p>
	</div>
	`

	var lines = video.split('\n');
	for (var i=0; i<lines.length; i++){
		line = document.createTextNode(lines[i]);
		if(i!=0){videos.innerHTML+="<br>"}
		videos.appendChild(line)
	}
}

function make_video_code(){
	var add_video = document.getElementById("add_video")
	var div1 = document.getElementById("h1anddata")	
	var code_heading = document.getElementById("code_heading")
	code_heading.innerHTML += "<h1>Code for additional video(s)</h1>" // add a heading
	code_heading.style.fontSize = "1em" //for some reason it is massive, and putting this in css doesn't work

	div1.style.display = "none"
	add_video.style.display = "block";
	add_video()
}