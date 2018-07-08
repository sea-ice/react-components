import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './markdown-parser.css'

import {escapeHtmlFragment} from '../../utils'

// 防止XSS攻击
class MarkdownParser extends React.Component {
  constructor (props) {
    super(props)
    this.transformMarkdown = this.transformMarkdown().bind(this)
    this.handleTextChange = this.handleTextChange.bind(this)

    this.props.notifyCompileResult = this.props.notifyCompileResult || (() => {})
  }
  handleTextChange (e) {
    let compileResult = this.transformMarkdown(e.target.value)
    this.props.notifyCompileResult(compileResult)
  }
  transformMarkdown () {
    let strategies = [{
      test: /^#+ +(.*)$/,
      template (line, match) {
        let titleLevel = line.split(/ +/)[0].length
        return `<h${titleLevel}>${match[1]}</h${titleLevel}>`
      }
    }, {
      test: /^> +(.*)$/,
      template (line, match) {
        return `<blockquote><p>${match[1]}</p></blockquote>`
      }
    }, {
      test: /^!\[(.*)\]\((.*)\)$/,
      template (line, match) {
        return `<figure>
                  <img src=${match[1]} alt=""/>
                  <figcaption>
                    <p className="figure-caption">${match[2]}</p>
                  </figcaption>
                </figure>`
      }
    }]
    let nestStrategies = [{
      test: /\*\*((\\\*|[^\*\\(?=\*)])+)\*\*/g,
      template (catchGroup) {
        return `<strong>${catchGroup[0]}</strong>`
      }
    }, {
      test: /\*((\\\*|[^\*\\(?=\*)])+)\*/g,
      template (catchGroup) {
        return `<em>${catchGroup[0]}</em>`
      }
    }, {
      test: /`([^`]+)`/g,
      template (catchGroup) {
        return `<span class="emphasize">${catchGroup[0]}</span>`
      }
    }, {
      test: /\[(.+?)\]\((\S+?)\)/g,
      template (catchGroup) {
        return `<a href="${catchGroup[1]}">${catchGroup[0]}</a>`
      }
    }]
    let listStrategies = {
      ol: {
        test: /^(\s*)(\d+)\. \s*(\S.*)$/,
        template (match) {
          return `<li>${match[2]}、${match[3]}</li>`
        }
      },
      ul: {
        test: /^(\s*)\- \s*(\S.*)$/,
        template (match) {
          return `<li>${match[2]}</li>`
        }
      }
    }
    return (text) => {
      if (!text.trim()) return ''
      let lines = text.split('\n')
      let result = ''
      let codeRegExpOpen = /^```(\w+)$/,
          codeRegExpClose = /^```$/,
          codeLang = '',
          codeConcatFlag = false,
          codeFragment = ''
  
      let listConstructFlag = false,
          nestListConstructFlag = false,
          outerListFragment = '',
          nestListFragment = '',
          matchList, matchUl
      for (let i = 0, len = lines.length; i < len; i++) {
        if (lines[i].trim()) {
          let codeMatch
          // 代码区块
          if (codeMatch = lines[i].match(codeRegExpOpen)) {
            codeConcatFlag = true
            codeLang = codeMatch[1]
            continue
          } else if (lines[i].match(codeRegExpClose)) {
            codeConcatFlag = false
            result += `<section class="code-wrapper"><pre><code class="language-${codeLang}">${codeFragment}</code></pre></section>`
            codeFragment = ''
            codeLang = ''
            continue
          }
          if (codeConcatFlag) {
            codeFragment += `${escapeHtmlFragment(lines[i])}\n`
          } else {
            if (
              (matchList = lines[i].match(listStrategies.ol.test))
                || (matchUl = lines[i].match(listStrategies.ul.test))
            ) {
              // console.log(matchUl)
              if (matchList) {
                matchList.tag = 'ol'
              } else {
                matchList = matchUl
                matchList.tag = 'ul'
              }
              let tag = matchList.tag
              if (!listConstructFlag) {
                listConstructFlag = true
                outerListFragment = `<${tag}>${listStrategies[tag].template(matchList)}`
              } else {
                if (matchList[1]) {
                  // 嵌套列表
                  if (!nestListConstructFlag) {
                    nestListConstructFlag = true
                    nestListFragment = `<${tag}>`
                  }
                  nestListFragment += listStrategies[tag].template(matchList)
                } else {
                  if (nestListConstructFlag) {
                    nestListConstructFlag = false
                    nestListFragment += `</${nestListFragment.substr(1, 2)}>`
                    outerListFragment += `<li>${nestListFragment}</li>`
                  }
                  outerListFragment += listStrategies[tag].template(matchList)
                }
              }
            } else {
              let match, isPlainText = true
              for (let s = 0, sLen = strategies.length; s < sLen; s++) {
                if (match = lines[i].match(strategies[s].test)) {
                  isPlainText = false
                  result += strategies[s].template(lines[i], match)
                  break
                }
              }
              if (isPlainText) {
                result += `<p>${lines[i]}</p>`
              }
            }
          }
        } else {
          if (listConstructFlag) {
            if (nestListConstructFlag) {
              nestListConstructFlag = false
              nestListFragment += `</${nestListFragment.substr(1, 2)}>`
              outerListFragment += `<li>${nestListFragment}</li>`
            }
            listConstructFlag = false
            outerListFragment += `</${outerListFragment.substr(1, 2)}>`
            result += outerListFragment
          }
        }
      }
      for (let n = 0, nLen = nestStrategies.length; n < nLen; n++) {
        result = result.replace(nestStrategies[n].test, (subStr, ...catchGroup) => {
          return nestStrategies[n].template(catchGroup)
        })
      }
      console.log(result)
      result = result.replace(/\\\*/g, '*')
      return result
    }
  }
  render () {
    return (<textarea
      onInput={this.handleTextChange}
      styleName="md-input"
    ></textarea>)
  }
}

export default CSSModules(MarkdownParser, styles)
