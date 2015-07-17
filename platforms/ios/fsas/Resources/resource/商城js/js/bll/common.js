$(function () {
    // load complete
    
    $("#mallIndex").on("loadcomplete", function () {
        console.log("show me:mall index...");
        showfooter(true);
        $.afui.setBackButtonVisibility(false);
        showSelected("mallIndex", true);
    });
    $("#mallIndex").on("panelload", function () {
        console.log("show me:mall index...");
        showfooter(true);
        $.afui.setBackButtonVisibility(false);
        showSelected("mallIndex", true);
    });
    $("#mallIndex").on("panelunload", function () {
        console.log("show me:mall index...");
        showfooter(false);
        $.afui.setBackButtonVisibility(true);
        showSelected("mallIndex", true);
    });
    $("#main").on("loadcomplete", function () {
        console.log("show me:main...");
        showfooter(true);
        setPlusButton(true);
        $.afui.setBackButtonVisibility(false);
        showSelected("deviceList", true);
    });
    $("#deviceList").on("loadcomplete", function () {
        console.log("show me:deviceList...");
        showfooter(true);
        setPlusButton(true);
        $.afui.setBackButtonVisibility(false);
        showSelected("deviceList", true);

        //this.setBackButtonVisibility(true);
        $(".categoryButton").hide();
        $(".cartButton").hide();
        $(".headSearchIcon").hide();
        $("#headSearch").hide();
    });
    $("#followDeviceList").on("loadcomplete", function () {
        showfooter(true);
        setPlusButton(false);
        $.afui.setBackButtonVisibility(false);
    });
    $("#find").on("loadcomplete", function () {
        showfooter(true);
        $.afui.setBackButtonVisibility(false);
        showSelected("find", true);
    });
    $("#my").on("loadcomplete", function () {
        showfooter(true);
        $.afui.setBackButtonVisibility(false);
        showSelected("my", true);
    });
    $("#shop").on("loadcomplete", function () {
        showfooter(true);
        $.afui.setBackButtonVisibility(false);
        showSelected("shop", true);
    });

    // panel load
    $("#main,#deviceList").on("panelload", function () {
        showfooter(true);
        setPlusButton(true);
        $.afui.setBackButtonVisibility(false);
        showSelected("deviceList", true);
    });
    $("#followDeviceList").on("panelload", function () {
        showfooter(true);
        setPlusButton(false);
        $.afui.setBackButtonVisibility(false);
    });
    $("#find").on("panelload", function () {
        showfooter(true);
        $.afui.setBackButtonVisibility(false);
        showSelected("find", true);
    });
    $("#my").on("panelload", function () {
        showfooter(true);
        $.afui.setBackButtonVisibility(false);
        showSelected("my", true);
    });

    // panel unload
    $("#main,#deviceList").on("panelunload", function () {
        showfooter(false);
        setPlusButton(false);
        $.afui.setBackButtonVisibility(true);
        showSelected("deviceList", false);
    });
    $("#followDeviceList").on("panelunload", function () {
        showfooter(false);
        $.afui.setBackButtonVisibility(true);
    });
    $("#find").on("panelunload", function () {
        showfooter(false);
        $.afui.setBackButtonVisibility(true);
        showSelected("find", false);
    });
    $("#my").on("panelunload", function () {
        showfooter(false);
        $.afui.setBackButtonVisibility(true);
        showSelected("my", false);
    });
    $("#shop").on("panelunload", function () {
        showfooter(false);
        $.afui.setBackButtonVisibility(true);
    });

    // public
    var showfooter = function (bool) {
        if (bool == true)
            $("footer").show();
        else
            $("footer").hide();
    };

    // selected icons
    var showSelected = function (objid, bool) {
        $("footer a").removeClass("selected");
        if (bool == true) {
            $("footer a[href=#" + objid + "]").addClass("selected");
        }
        else
            $("footer a[href=#" + objid + "]").removeClass("selected");
    };

    $.afui.ready(function () {
        // show welecome page..

        if (loj.WelecomePage == true) {
            loj.setWelecomePage(false);
            //$.afui.loadContent("#welcome");
            return;
        }

        if (loj.IsLogin == true) {
            // show gestrue password page.
            if (loj.patternPw > 0) {
                $.afui.loadContent("#gesturePWsetting");
                return;
            }
        } else {
            ShowLoginMsg(true);
        }

        $.afui.loadContent("#deviceList");
    });
});