/*global window */
(function (window) {
    "use strict";
    function SuperLite(elements) {
        this.elements = elements;

        // Sometimes we perform operations on the first element only
        if (elements.length > 0)
        {
            this.e = elements[0];
        }
    }

    SuperLite.prototype.html = function (html) {
        this.elements.forEach(function (e) {
            e.innerHTML = html;
        });
    };

    SuperLite.prototype.append = function (element) {
        this.elements.forEach(function (e) {
            e.appendChild(element);
        });
    };

    SuperLite.prototype.on = function (eventNames, handler) {
        var events = eventNames.split(" ");
        var that = this;
        events.forEach(function (event) {
            that.elements.forEach(function (e) {
                e.addEventListener(event, handler);
            });
        });
    };

    SuperLite.prototype.attr = function (name, value) {
        if (value) {
            this.elements.forEach(function (e) {
                e.setAttribute(name, value);
            });
        } else {
            if (value !== null) {
                return this.e.getAttribute(name);
            }

            this.elements.forEach(function (e) {
                e.removeAttribute(name);
            });
        }
    };

    SuperLite.prototype.style = function () {
        return window.getComputedStyle(this.e);
    };

    SuperLite.prototype.visible = function (show) {
        if (show === undefined) {
            return this.style.display !== "none";
        }

        this.e.style.display = show
            ? "block"
            : "none";
    };

    SuperLite.prototype.val = function () {
        return this.e.value;
    };

    function _superLite(arg) {
        if (typeof(arg) === "function") {
            window.addEventListener("load", function load() {
                window.removeEventListener("load", load, false);
                arg();
            }, false);
        } else {
            if (arg.indexOf("#") === 0) {
                return new SuperLite([document.getElementById(arg.substr(1))]);
            }
            if (arg.indexOf(".") === 0) {
                return new SuperLite(Array.prototype.slice.call(document.getElementsByClassName(arg.substr(1))));
            }

            return new SuperLite(Array.prototype.slice.call(document.getElementsByTagName(arg)));
        }
    }

    _superLite.ajax = function (url, callback) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                callback(JSON.parse(this.responseText));
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    };

    window.$ = _superLite;

}(window));
