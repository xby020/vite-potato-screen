<template>
  <div
    class="font-number inline-flex flex items-center"
    :class="placement"
    :style="numStyle"
    ref="container"
  >
    <n-number-animation
      ref="numAnime"
      :from="0"
      :to="num"
      :precision="precision"
      @finish="animePlay"
      :show-separator="comma"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  // 跳转到的数字
  num: {
    type: Number,
    default: 0
  },
  // 小数后几位
  precision: {
    type: Number,
    default: 0
  },
  // 科学计数法
  comma: {
    type: Boolean,
    default: false
  },
  place: {
    type: String,
    default: 'center'
  }
});

const numAnime = ref();

const placement = computed(() => {
  switch (props.place) {
    case 'left':
      return 'justify-start';
    case 'right':
      return 'justify-end';
    case 'center':
      return 'justify-center';
    default:
      return 'justify-center';
  }
});

// get component width
const numStyle = computed(() => {
  return `min-width:${numWidth.value}px`;
});

const container = ref<HTMLElement>();
const textSize = ref(16);

onMounted(() => {
  if (container.value) {
    const containerStyle = window.getComputedStyle(container.value);
    textSize.value = parseInt(containerStyle.fontSize);
  }
});

function getTextWidth(text: string | number) {
  // 创建临时元素
  const _span = document.createElement('span');
  // 放入文本
  _span.innerText = text.toString();
  // 设置文字大小
  _span.style.fontSize = textSize.value + 'px';
  // 设置字体
  _span.className = 'font-number';
  // span元素转块级
  _span.style.position = 'absolute';
  // span放入body中
  document.body.appendChild(_span);
  // 获取span的宽度
  let width = _span.offsetWidth;
  // 从body中删除该span
  document.body.removeChild(_span);
  // 返回span宽度
  return width;
}
const numWidth = computed(() => {
  return getTextWidth(props.num);
});

const hasDecimal = (num: number) => {
  return num.toString().indexOf('.') > -1;
};

const precision = ref(0);

if (props.precision) {
  precision.value = props.precision;
} else {
  precision.value = hasDecimal(props.num) ? 2 : 0;
}
function animePlay() {
  const randomTimeout = Math.floor(Math.random() * 500);
  setTimeout(() => {
    numAnime.value?.play();
  }, 1000 + randomTimeout);
}
</script>

<style scoped></style>
