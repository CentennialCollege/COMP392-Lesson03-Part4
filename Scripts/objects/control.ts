/// <reference path="../../typings/tsd.d.ts"/>

module objects {
    // CONTROL CLASS ++++++++++++++++++++++++++++++++++++++++++
    export class Control { 
        //PUBLIC INSTANCE VARIABLES +++++++++++++++++++++++++++
        public rotationSpeed:number;
        public bouncingSpeed:number;
        public ambientColour:string;
        public pointColour: string;
        public intensity: number;
        public distance: number;
        public exponent: number;
        public angle: number;
        public debug: boolean;
        public castShadow: boolean;
        public onlyShadow: boolean;
        public target: string;
        public stopMovingLight: boolean;
        // CONSTRUCTOR ++++++++++++++++++++++++++++++++++++++++
        constructor(rotationSpeed:number, bouncingSpeed:number, ambientColour:string, 
                    pointColour:string, intensity:number, distance: number,
                    exponent:number, angle:number, debug:boolean, 
                    castShadow:boolean, onlyShadow:boolean, target:string,
                    stopMovingLight:boolean) {
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
        
    }
}
