(function() {
    var ajax = {
        get: function(url) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (xhttp.readyState === XMLHttpRequest.DONE) {
                    if (xhttp.status === 200) {
                        console.log(xhttp.responseText);
                    } else {
                        console.log("xhttp.status === " + xhttp.status);
                    }
                } else {
                    console.log("xhttp.readyState === " + xhttp.readyState);
                }
            }
            xhttp.open('GET', url, true);
            xhttp.send();
        },
        post: function(url, data, log) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (xhttp.readyState === XMLHttpRequest.DONE) {
                    if (xhttp.status === 200) {
                        //console.log(xhttp.responseText);
                        //console.log(1);
                        //console.log((decodeURIComponent(data.split("&")[1])).split("=")[1] + ": 密码修改成功！");
                        console.log(log);
                    } else {
                        console.log("xhttp.status === " + xhttp.status);
                    }
                } else {
                    console.log("xhttp.readyState === " + xhttp.readyState);
                }
            }
            xhttp.open('POST', url, true);
            xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhttp.send(data);
        }
    };

    var getValue = function(href, key) {
        var str = href.substring(href.indexOf("?") + 1);
        var arr = str.split("&");
        var arr2 = null;
        var value = null;
        for (var i=0; i<arr.length; i++) {
            arr2 = arr[i].split("=");
            if (key === arr2[0]) { value = arr2[1]; }
        }
        return value;
    };

    const list = $("div.manage-list").find("table tbody tr");
    var nickname = null;
    var mobile = null;
    var href = null;
    var account_id = null;
    var aid = null;
    const url_pre = "https://app.ym.163.com/ym/action/account/updateAccount?aid=";
    var url = null;
    var formData = null;
    const chgpass = "123456789";  //修改为此密码

    for (var i=0; i<list.length; i++) {
        if (list.eq(i).find("td.wd1 span").length === 0) {  //排除管理员
            nickname = list.eq(i).find("td.wd1").html();
            mobile = list.eq(i).find("td.wd3").html();
            href = list.eq(i).find("td.wd5 a").eq(0).attr("href");
            account_id = getValue(href, "account_id");
            aid = getValue(href, "aid");
            url = url_pre + aid;

            formData = {
                account_id: account_id,
                nickname: nickname,
                mobile: mobile,
                pass_re: chgpass,  //竟然明文的！
                u_id: "0"
            };

            let data = "";
            $.each(formData, function(key, value){
                data += "&" + key + "=" + encodeURIComponent(value);
            });
            data = data.substring(1);
            // console.log(url);
            // console.log(data);
            let log = nickname + ": 密码修改成功！";
            ajax.post(url, data, log);
        }
    }
})();
