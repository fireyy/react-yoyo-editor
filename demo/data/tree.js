export default {
  type: 'Article',
  props: {
    title: '文章标题',
    children: [
      {
        type: 'Heading',
        props: {
          children: '这里是次要标题'
        }
      },
      {
        type: 'Paragraph',
        props: {
          style: {
            fontSize: 18
          },
          children: '排版是一个麻烦的问题 # 附录一，需要精心设计，而这个设计却是常被视觉设计师所忽略的。前端工程师更常看到这样的问题，但不便变更。因为在多个 OS 中的不同浏览器渲染不同，改动需要多的时间做回归测试，所以改变变得更困难。'
        }
      },
      {
        type: 'Paragraph',
        props: {
          style: {
            fontSize: 18
          },
          children: '在中文排版中，HTML4 的很多标准在语义在都有照顾到。但从视觉效果上，却很难利用单独的 CSS 来实现，像着重号（例：这里强调一下）。在 HTML4 中，专名号标签（<u>）已经被放弃，而 HTML5 被重新提起。'
        }
      },
      {
        type: 'Layout',
        props: {
          children: [
            {
              type: 'LayoutColumn',
              props: {
                children: [
                  {
                    type: 'Heading',
                    props: {
                      level: 3,
                      children: '中文排版的重点和难点'
                    }
                  },
                  {
                    type: 'List',
                    props: {
                      type: 'ordered',
                      children: [
                        {
                          type: 'ListItem',
                          props: {
                            children: '语义：语义对应的用法和样式是否与中文排版一致'
                          }
                        },
                        {
                          type: 'ListItem',
                          props: {
                            children: '表现：在各浏览器中的字体、大小和缩放是否如排版预期'
                          }
                        }
                      ]
                    }
                  }
                ]
              }
            },
            {
              type: 'LayoutColumn',
              props: {
                children: [
                  {
                    type: 'Heading',
                    props: {
                      level: 3,
                      children: '排版实例'
                    }
                  },
                  {
                    type: 'Paragraph',
                    props: {
                      children: '中文实例来自于来自于张燕婴的《论语》，由于古文排版涉及到的元素比较多，所以采用《论语》中《学而》的第一篇作为排版实例介绍。'
                    }
                  }
                ]
              }
            }
          ]
        }
      }
    ]
  }
};
