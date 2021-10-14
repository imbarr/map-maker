var bundle = (function (exports) {
    'use strict';

    var GameMap = /** @class */ (function () {
        function GameMap() {
            this.markers = [];
        }
        GameMap.prototype.setImage = function (image) {
            this.image = image;
        };
        GameMap.prototype.addMarker = function (marker) {
            this.markers.push(marker);
        };
        GameMap.prototype.render = function (canvas) {
            var elem = this.getElement();
            canvas.html.appendChild(elem);
            this.markers.forEach(function (marker) { return marker.render(canvas); });
        };
        GameMap.prototype.getElement = function () {
            var template = document.createElement('template');
            template.innerHTML = "<img class=\"background-image\"\n                               src=\"" + this.image + "\"\n                               alt=\"not found\"/>";
            return template.content.firstChild;
        };
        return GameMap;
    }());

    function setCoords(elem, coords, scale) {
        elem.style.left = coords.x * scale + 'px';
        elem.style.top = coords.y * scale + 'px';
    }
    function setSize(elem, size, scale) {
        elem.style.width = size.width * scale + 'px';
        elem.style.height = size.height * scale + 'px';
    }

    var zoomStep = 1.1;
    var initSize = {
        width: 800,
        height: 600
    };
    var Canvas = /** @class */ (function () {
        function Canvas(html) {
            this.html = html;
            this.scale = 1;
            this.size = initSize;
            this.addEvents();
        }
        Canvas.prototype.setMap = function (map, size) {
            this.map = map;
            this.size = size;
        };
        Canvas.prototype.zoomIn = function (event) {
            this.zoom(event, function (scale) { return scale * zoomStep; });
        };
        Canvas.prototype.zoomOut = function (event) {
            this.zoom(event, function (scale) { return scale / zoomStep; });
        };
        Canvas.prototype.zoom = function (event, scaleFunc) {
            var original = {
                x: this.html.parentElement.scrollLeft,
                y: this.html.parentElement.scrollTop
            };
            var location = {
                x: event.pageX + original.x,
                y: event.pageY + original.y
            };
            var zoomPoint = {
                x: location.x / this.scale,
                y: location.y / this.scale
            };
            this.scale = scaleFunc(this.scale);
            var zoomPointNew = {
                x: zoomPoint.x * this.scale,
                y: zoomPoint.y * this.scale
            };
            var scrollNew = {
                x: zoomPointNew.x - event.pageX,
                y: zoomPointNew.y - event.pageY
            };
            this.html.parentElement.scrollLeft = scrollNew.x;
            this.html.parentElement.scrollTop = scrollNew.y;
            this.render();
        };
        Canvas.prototype.addEvents = function () {
            var _this = this;
            // Dragging
            this.html.addEventListener('mousedown', function (e) {
                e.preventDefault();
                _this.prevX = e.pageX;
                _this.prevY = e.pageY;
            });
            this.html.parentElement.addEventListener('mousemove', function (e) {
                if (e.buttons) {
                    e.preventDefault();
                    var drag = {
                        x: _this.prevX - e.pageX,
                        y: _this.prevY - e.pageY
                    };
                    _this.prevX = e.pageX;
                    _this.prevY = e.pageY;
                    if (drag.x != 0 || drag.y != 0) {
                        _this.html.parentElement.scrollBy(drag.x, drag.y);
                    }
                }
            });
            // Zoom in/out
            this.html.parentElement.addEventListener('wheel', function (e) {
                var event = e;
                if (event.ctrlKey) {
                    event.preventDefault();
                    if (event.deltaY < 0) {
                        _this.zoomIn(event);
                    }
                    else {
                        _this.zoomOut(event);
                    }
                }
            });
        };
        Canvas.prototype.render = function () {
            this.html.innerHTML = '';
            setSize(this.html, this.size, this.scale);
            if (this.map) {
                this.map.render(this);
            }
        };
        return Canvas;
    }());

    var canvas;
    function getCanvas() {
        if (canvas) {
            return canvas;
        }
        var html = document.getElementById('canvas');
        canvas = new Canvas(html);
        return canvas;
    }

    function onSetImage() {
        var input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = function (event) {
            var file = event.target.files[0];
            var img = new Image();
            img.onload = function () {
                var gameMap = new GameMap();
                gameMap.setImage(img.src);
                var size = {
                    width: img.naturalWidth,
                    height: img.naturalHeight
                };
                var canvas = getCanvas();
                canvas.setMap(gameMap, size);
                canvas.render();
            };
            img.onerror = function () {
                alert('Invalid image');
            };
            img.src = URL.createObjectURL(file);
        };
        input.click();
    }

    var Marker = /** @class */ (function () {
        function Marker(icon, coords) {
            this.icon = icon;
            this.coords = coords;
        }
        Marker.prototype.render = function (canvas) {
            var elem = this.getElement();
            setCoords(elem, this.coords, canvas.scale);
            canvas.html.appendChild(elem);
        };
        Marker.prototype.getElement = function () {
            var template = document.createElement('template');
            template.innerHTML = "<img class=\"marker\"\n                               src=\"" + this.icon + "\"\n                               alt=\"not found\"/>";
            return template.content.firstChild;
        };
        return Marker;
    }());

    exports.Canvas = Canvas;
    exports.GameMap = GameMap;
    exports.Marker = Marker;
    exports.getCanvas = getCanvas;
    exports.onSetImage = onSetImage;
    exports.setCoords = setCoords;
    exports.setSize = setSize;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}));
