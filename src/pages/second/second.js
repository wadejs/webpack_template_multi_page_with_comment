import './second.css'
import $ from 'jquery'
import Swiper from 'swiper'
import { getQueryString } from 'js/common.js'
// 初始化banner滚动
var bannerSwiper = new Swiper('.banner-container', { // eslint-disable-line
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  }
})

function test() {
  console.log($())
  console.log(getQueryString('code'))
}

test()