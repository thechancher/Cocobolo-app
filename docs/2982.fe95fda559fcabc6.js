"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[2982],{2982:(u,i,n)=>{n.r(i),n.d(i,{pwa_camera_modal:()=>c});var r=n(467),s=n(1288);const c=class{constructor(e){(0,s.r)(this,e),this.onPhoto=(0,s.c)(this,"onPhoto",7),this.noDeviceError=(0,s.c)(this,"noDeviceError",7),this.facingMode="user"}present(){var e=this;return(0,r.A)(function*(){const o=document.createElement("pwa-camera-modal-instance");o.facingMode=e.facingMode,o.addEventListener("onPhoto",function(){var a=(0,r.A)(function*(t){e._modal&&e.onPhoto.emit(t.detail)});return function(t){return a.apply(this,arguments)}}()),o.addEventListener("noDeviceError",function(){var a=(0,r.A)(function*(t){e.noDeviceError.emit(t)});return function(t){return a.apply(this,arguments)}}()),document.body.append(o),e._modal=o})()}dismiss(){var e=this;return(0,r.A)(function*(){e._modal&&(e._modal&&e._modal.parentNode.removeChild(e._modal),e._modal=null)})()}render(){return(0,s.h)("div",null)}};c.style=":host{z-index:1000;position:fixed;top:0;left:0;width:100%;height:100%;display:-ms-flexbox;display:flex;contain:strict}.wrapper{-ms-flex:1;flex:1;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;background-color:rgba(0, 0, 0, 0.15)}.content{-webkit-box-shadow:0px 0px 5px rgba(0, 0, 0, 0.2);box-shadow:0px 0px 5px rgba(0, 0, 0, 0.2);width:600px;height:600px}"}}]);