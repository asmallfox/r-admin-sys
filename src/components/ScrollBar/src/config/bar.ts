export const BAR_OPTION = {
  horizontal: {
    size: 'width',
    offset: 'offsetWidth',
    offsetScroll: 'offsetScrollWidth',
    scrollDir: 'scrollLeft',
    position: 'left',
    offsetDir: 'offsetX',
    client: 'clientX',
    dir: 'X'
  },
  vertical: {
    size: 'height',
    offset: 'offsetHeight',
    offsetScroll: 'offsetScrollHeight',
    scrollDir: 'scrollTop',
    position: 'top',
    offsetDir: 'offsetY',
    client: 'clientY',
    dir: 'Y'
  }
} as const