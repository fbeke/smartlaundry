var v_tolerance = "Not set...";
var v_delay = "Not set...";
var v_ssid = "Not set...";
var v_password = "Not set...";

function update()
{
	$.getJSON("/status", function(data) {
		if (debug) console.log(JSON.stringify(data));
		$("#relay").html(data.relay);
		$("#motion").html(data.motion);
		$("#temp").html(data.temperature+'&deg;C');
		$("#dev").html(data.std_dev);
		$("#version").html(data.configuration.version);
		v_tolerance = data.configuration.tolerance;
		v_delay = data.configuration.delay;
		v_ssid = data.configuration.ssid;
		v_password = data.configuration.password;
		if (!edit_settings)
		{
			$("#tolerance").val(v_tolerance);
			$("#delay").val(v_delay);
			$("#ssid").val(v_ssid);
			$("#pass").val(v_password);
		}
	});
}

function toggleDebug()
{
	debug = !debug;
	alert('Debug enabled: '+debug);
}

function toggleConfig()
{
	show_config = !show_config;
	if (show_config)
	{
		$("#tolerance").val(v_tolerance);
		$("#delay").val(v_delay);
		$("#ssid").val(v_ssid);
		$("#pass").val(v_password);

		$("#toggle").rotate({duration:1000,angle:0,animateTo:90});
		$(".config").fadeIn();
		$("#button").show();
	} else
	{
		$("#toggle").rotate({duration:1000,angle:90,animateTo:0});
		$(".config").fadeOut();
		$("#button").hide();
	}
}

function edit()
{
	if ($("#button").text() == "Edit Settings")
	{
		edit_settings = true;
		$(".input").prop("disabled",false);
		$("#button").html("Save Settings");
		$("#cancel").show();
	} else
	{
		edit_settings = false;
		$(".input").prop("disabled",true);
		$("#button").html("Edit Settings");
		$("#cancel").hide();
		save();
	}
}

function cancel()
{
	edit_settings = false;
	if (!edit_settings)
	{
		$("#tolerance").val(v_tolerance);
		$("#delay").val(v_delay);
		$("#ssid").val(v_ssid);
		$("#pass").val(v_password);

		$(".input").prop("disabled",true);
		$("#button").html("Edit Settings");
		$("#cancel").hide();
	}
}

function save()
{
	$.ajax({
		type: "POST",
		url: "/update",
		data: { tolerance: $("#tolerance").val(), wait: $("#delay").val(), ssid: $("#ssid").val(), pass: $("#password").val() },
		success: function(data) { alert(data); },
		dataType: "text"
	});
}
