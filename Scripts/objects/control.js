/// <reference path="../../typings/tsd.d.ts"/>
var objects;
(function (objects) {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    var Control = (function () {
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        function Control(rotationSpeed, bouncingSpeed, ambientColour, pointColour, intensity, distance, exponent, angle, debug, castShadow, onlyShadow, target, stopMovingLight) {
            this.rotationSpeed = rotationSpeed;
            this.bouncingSpeed = bouncingSpeed;
            this.ambientColour = ambientColour;
            this.pointColour = pointColour;
            this.intensity = intensity;
            this.distance = distance;
            this.exponent = exponent;
            this.angle = angle;
            this.debug = debug;
            this.castShadow = castShadow;
            this.onlyShadow = onlyShadow;
            this.target = target;
            this.stopMovingLight = stopMovingLight;
        }
        return Control;
    })();
    objects.Control = Control;
})(objects || (objects = {}));
//# sourceMappingURL=control.js.map