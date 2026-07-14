// ==UserScript==
// @name         bilibili直播间 无感去除高斯模糊遮罩
// @namespace    anti_blur_mask
// @version      0.1.0
// @description  无感去除高斯模糊遮罩
// @author       Mifan-T
// @homepageURL  https://github.com/BetterMikuFans/Bilibili-Live-NoBlurMask
// @match        *://*.live.bilibili.com/*
// @icon         https://www.bilibili.com/favicon.ico
// @grant        GM_addStyle
// @supportURL   https://github.com/BetterMikuFans/Bilibili-Live-NoBlurMask/issues
// @license      GPL-3.0
// ==/UserScript==

(function () {
  'use strict';

  // 主定义：调整相关CSS的相关样式值（魔法特性真好用（逃）
  let css = `
    #web-player-module-area-mask-panel {opacity: 0.393939 !important;}
  `
  // 主逻辑：提前进行样式添加
  let styleNode; // 暂存样式变量，以便可能的移除操作
  // 调用 GM_addStyle，如果不支持 GM_addStyle ，则使用备用方案
  if (typeof GM_addStyle !== "undefined") {
    styleNode = GM_addStyle(css);
  } else {
    styleNode = document.createElement("style");
    styleNode.appendChild(document.createTextNode(css));
    (document.querySelector("head") || document.documentElement).appendChild(styleNode);
  }

  // 定义遮罩清理任务，如果没有遮罩则进行清理
  setTimeout(() => {
    if (!(document.querySelector('#web-player-module-area-mask-panel'))) {
      console.log('%c[NoMask] 未侦测到遮罩，即将清理样式', "color: #39c5bb");
      if (styleNode && styleNode.parentNode) {
        styleNode.remove();
        console.log('%c[NoMask] 清理成功！', "color: #39c5bb");
      } else {
        console.log('%c[NoMask] 清理失败！可能是节点已被移除', "color: #c5393a");
      }
    } else {
      console.log('%c[NoMask] 侦测到遮罩，已经被提前清除啦(∠・ω< )⌒★', "color: #39c5bb");
    }
  }, 12000);

  //参考&鸣谢：https://greasyfork.org/zh-CN/scripts/474444-bilibili-20-21%E5%B9%B4%E6%97%A7%E7%89%88
})();