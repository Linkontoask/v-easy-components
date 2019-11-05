import Vue from 'vue'
import Tip from './tip.vue'
import {addClass, getStyle, isInPage} from '@/utils/dom'
import {_isEqual} from '@/utils/ArrayExtend'

const tipDom = Vue.extend(Tip);
const tipDirective = {};
const mutationCallback = (mutationsList) => {
  for(let mutation of mutationsList) {
    let type = mutation.type;
    if (type === 'childList') {
      mutation.removedNodes.forEach(item => {
        if (item.tip && item.autoRemoveTip && isInPage(item.tip)) {
          document.body.removeChild(item.tip)
          if (item._observer) {
            item._observer.disconnect();
          }
        }
      })
    }
  }
};
// https://developer.mozilla.org/zh-CN/docs/Web/API/MutationObserverInit
let config = {
  childList: true,
};
let index = 233;

tipDirective.install = Vue => {
  const toggleTip = (el, binding) => {
    Vue.nextTick(() => {
      el.originalPosition = getStyle(el, 'position');

      let rectDom = el.getBoundingClientRect(),
        offset = binding.value.offset || 0;

      ['top', 'left'].forEach(property => {
        const scroll = property === 'top' ? 'scrollTop' : 'scrollLeft';
        el.tipStyle[property] = rectDom[property] +
          document.body[scroll] +
          document.documentElement[scroll]
      });

      switch (el.instance.placement) {
        case 'top':
          el.tipStyle['top'] -= (offset + 6);
          el.tipStyle['left'] += (rectDom['width'] / 2);
          break;
        case 'bottom':
          el.tipStyle['top'] += (rectDom['height'] + offset + 6);
          el.tipStyle['left'] += (rectDom['width'] / 2);
          break;
        case 'left':
          el.tipStyle['top'] += (rectDom['height'] / 2);
          el.tipStyle['left'] -= (6 + offset); // 支持IE
          break;
        case 'right':
          el.tipStyle['top'] += (rectDom['height'] / 2);
          el.tipStyle['left'] += (rectDom['width'] + offset);
          break;
      }

      insertDom(el, binding);
    })

  };

  const insertDom = (el, binding) => {
    if (getStyle(el, 'display') !== 'none' && getStyle(el, 'visibility') !== 'hidden') {
      Object.keys(el.tipStyle).forEach(property => {
        el.tip.style[property] = el.tipStyle[property] + 'px';
      });

      if (el.originalPosition !== 'absolute' && el.originalPosition !== 'fixed') {
        addClass(el, 've-tip-parent--relative');
      }

      !el.tip.isConnected && document.body.appendChild(el.tip);
      el._is_instance_remove_ = false;

    }
  };

  const enter = (el, binding, simple) => {
    if (el._uuid_tip_ && !el._is_instance_remove_) {
      el.instance.domVisible = true;
      el.instance.hover = true;
    } else {
      // First rendering
      el._uuid_tip_ = index;
      let value = binding.value;

      let data = simple ? {
        ...value,
        placement: value['placement'] || 'top',
        domVisible: true
      } : {
        content: value,
        domVisible: true,
      };
      const tip = new tipDom({
        el: document.createElement('div'),
        data,
      });
      tip._uuid_tip_ = index;
      // Whether to automatically remove the tip
      el.autoRemoveTip = typeof value.autoRemoveTip === 'undefined';
      el.instance = tip;
      el.tip = tip.$el;
      el.tipStyle = {};

      // Monitor whether the target DOM still exists in the DOM tree
      el._observer = new MutationObserver(mutationCallback);
      el._observer.observe(el.parentElement, config);
    }

    binding.value && toggleTip(el, binding);
  };

  const leave = (el) => {
    el.instance.leave();
  };

  const addEvent = (el, binding, simple) => {
    Vue.nextTick(() => {
      el.addEventListener('mouseenter', enter.bind(null, el, binding, simple), false);
      el.addEventListener('mouseleave', leave.bind(null, el), false);
    });
  };

  Vue.directive('tip', {
    bind: function (el, binding) {

      el._uuid_tip_ = 0;
      el._is_instance_remove_ = false;

      addEvent(el, binding, typeof binding.value !== 'string');

    },

    update: function (el, binding) {
      if (!_isEqual(binding.value, binding.oldValue)) {
        if (el.tip && el.tip.isConnected) {
          document.body.removeChild(el.tip);
          el.removeEventListener('mouseenter', enter, false);
          el.removeEventListener('mouseleave', leave, false);
          el._is_instance_remove_ = true;
        }
        enter(el, binding, typeof binding.value !== 'string');
        addEvent(el, binding, typeof binding.value !== 'string');
      }
    },

    unbind: function (el, binding) {
    }
  });
};

export default tipDirective
