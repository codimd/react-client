/*
 * SPDX-FileCopyrightText: 2021 The HedgeDoc developers (see AUTHORS file)
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

import { Editor, EditorChange, EditorConfiguration, ScrollInfo } from 'codemirror'
// codemirror addons
import 'codemirror/addon/comment/comment'
import 'codemirror/addon/dialog/dialog'
import 'codemirror/addon/display/autorefresh'
import 'codemirror/addon/display/fullscreen'
import 'codemirror/addon/display/placeholder'
import 'codemirror/addon/edit/closebrackets'
import 'codemirror/addon/edit/closetag'
import 'codemirror/addon/edit/continuelist'
import 'codemirror/addon/edit/matchbrackets'
import 'codemirror/addon/edit/matchtags'
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/fold/markdown-fold'
import 'codemirror/addon/hint/show-hint'
import 'codemirror/addon/search/jump-to-line'
import 'codemirror/addon/search/match-highlighter'
import 'codemirror/addon/search/search'
import 'codemirror/addon/selection/active-line'
// codemirror keymaps
import 'codemirror/keymap/emacs'
import 'codemirror/keymap/sublime'
import 'codemirror/keymap/vim'
// codemirror syntax highlighting modes
import 'codemirror/mode/apl/apl'
import 'codemirror/mode/asciiarmor/asciiarmor'
import 'codemirror/mode/asn.1/asn.1'
import 'codemirror/mode/asterisk/asterisk'
import 'codemirror/mode/brainfuck/brainfuck'
import 'codemirror/mode/clike/clike'
import 'codemirror/mode/clojure/clojure'
import 'codemirror/mode/cmake/cmake'
import 'codemirror/mode/cobol/cobol'
import 'codemirror/mode/coffeescript/coffeescript'
import 'codemirror/mode/commonlisp/commonlisp'
import 'codemirror/mode/crystal/crystal'
import 'codemirror/mode/css/css'
import 'codemirror/mode/cypher/cypher'
import 'codemirror/mode/d/d'
import 'codemirror/mode/dart/dart'
import 'codemirror/mode/diff/diff'
import 'codemirror/mode/django/django'
import 'codemirror/mode/dockerfile/dockerfile'
import 'codemirror/mode/dtd/dtd'
import 'codemirror/mode/dylan/dylan'
import 'codemirror/mode/ebnf/ebnf'
import 'codemirror/mode/ecl/ecl'
import 'codemirror/mode/eiffel/eiffel'
import 'codemirror/mode/elm/elm'
import 'codemirror/mode/erlang/erlang'
import 'codemirror/mode/factor/factor'
import 'codemirror/mode/fcl/fcl'
import 'codemirror/mode/forth/forth'
import 'codemirror/mode/fortran/fortran'
import 'codemirror/mode/gas/gas'
import 'codemirror/mode/gfm/gfm'
import 'codemirror/mode/gherkin/gherkin'
import 'codemirror/mode/go/go'
import 'codemirror/mode/groovy/groovy'
import 'codemirror/mode/haml/haml'
import 'codemirror/mode/handlebars/handlebars'
import 'codemirror/mode/haskell/haskell'
import 'codemirror/mode/haskell-literate/haskell-literate'
import 'codemirror/mode/haxe/haxe'
import 'codemirror/mode/htmlembedded/htmlembedded'
import 'codemirror/mode/htmlmixed/htmlmixed'
import 'codemirror/mode/http/http'
import 'codemirror/mode/idl/idl'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/jinja2/jinja2'
import 'codemirror/mode/jsx/jsx'
import 'codemirror/mode/julia/julia'
import 'codemirror/mode/livescript/livescript'
import 'codemirror/mode/lua/lua'
import 'codemirror/mode/markdown/markdown'
import 'codemirror/mode/mathematica/mathematica'
import 'codemirror/mode/mbox/mbox'
import 'codemirror/mode/mirc/mirc'
import 'codemirror/mode/mllike/mllike'
import 'codemirror/mode/modelica/modelica'
import 'codemirror/mode/mscgen/mscgen'
import 'codemirror/mode/mumps/mumps'
import 'codemirror/mode/nginx/nginx'
import 'codemirror/mode/nsis/nsis'
import 'codemirror/mode/ntriples/ntriples'
import 'codemirror/mode/octave/octave'
import 'codemirror/mode/oz/oz'
import 'codemirror/mode/pascal/pascal'
import 'codemirror/mode/pegjs/pegjs'
import 'codemirror/mode/perl/perl'
import 'codemirror/mode/php/php'
import 'codemirror/mode/pig/pig'
import 'codemirror/mode/powershell/powershell'
import 'codemirror/mode/properties/properties'
import 'codemirror/mode/protobuf/protobuf'
import 'codemirror/mode/pug/pug'
import 'codemirror/mode/puppet/puppet'
import 'codemirror/mode/python/python'
import 'codemirror/mode/q/q'
import 'codemirror/mode/r/r'
import 'codemirror/mode/rpm/rpm'
import 'codemirror/mode/rst/rst'
import 'codemirror/mode/ruby/ruby'
import 'codemirror/mode/rust/rust'
import 'codemirror/mode/sas/sas'
import 'codemirror/mode/sass/sass'
import 'codemirror/mode/scheme/scheme'
import 'codemirror/mode/shell/shell'
import 'codemirror/mode/sieve/sieve'
import 'codemirror/mode/slim/slim'
import 'codemirror/mode/smalltalk/smalltalk'
import 'codemirror/mode/smarty/smarty'
import 'codemirror/mode/solr/solr'
import 'codemirror/mode/soy/soy'
import 'codemirror/mode/sparql/sparql'
import 'codemirror/mode/spreadsheet/spreadsheet'
import 'codemirror/mode/sql/sql'
import 'codemirror/mode/stex/stex'
import 'codemirror/mode/stylus/stylus'
import 'codemirror/mode/swift/swift'
import 'codemirror/mode/tcl/tcl'
import 'codemirror/mode/textile/textile'
import 'codemirror/mode/tiddlywiki/tiddlywiki'
import 'codemirror/mode/tiki/tiki'
import 'codemirror/mode/toml/toml'
import 'codemirror/mode/tornado/tornado'
import 'codemirror/mode/troff/troff'
import 'codemirror/mode/ttcn/ttcn'
import 'codemirror/mode/ttcn-cfg/ttcn-cfg'
import 'codemirror/mode/turtle/turtle'
import 'codemirror/mode/twig/twig'
import 'codemirror/mode/vb/vb'
import 'codemirror/mode/vbscript/vbscript'
import 'codemirror/mode/velocity/velocity'
import 'codemirror/mode/verilog/verilog'
import 'codemirror/mode/vhdl/vhdl'
import 'codemirror/mode/vue/vue'
import 'codemirror/mode/wast/wast'
import 'codemirror/mode/webidl/webidl'
import 'codemirror/mode/xml/xml'
import 'codemirror/mode/xquery/xquery'
import 'codemirror/mode/yacas/yacas'
import 'codemirror/mode/yaml/yaml'
import 'codemirror/mode/yaml-frontmatter/yaml-frontmatter'
import 'codemirror/mode/z80/z80'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Controlled as ControlledCodeMirror } from 'react-codemirror2'
import { useTranslation } from 'react-i18next'
import { MaxLengthWarningModal } from '../editor-modals/max-length-warning-modal'
import { ScrollProps, ScrollState } from '../synced-scroll/scroll-props'
import { allHinters, findWordAtCursor } from './autocompletion'
import './editor-pane.scss'
import { defaultKeyMap } from './key-map'
import { createStatusInfo, defaultState, StatusBar, StatusBarInfo } from './status-bar/status-bar'
import { ToolBar } from './tool-bar/tool-bar'
import { handleUpload } from './upload-handler'
import { handleFilePaste, handleTablePaste, PasteEvent } from './tool-bar/utils/pasteHandlers'
import { useApplicationState } from '../../../hooks/common/use-application-state'

export interface EditorPaneProps {
  onContentChange: (content: string) => void
  content: string
}

const onChange = (editor: Editor) => {
  for (const hinter of allHinters) {
    const searchTerm = findWordAtCursor(editor)
    if (hinter.wordRegExp.test(searchTerm.text)) {
      editor.showHint({
        hint: hinter.hint,
        completeSingle: false,
        completeOnSingleClick: false,
        alignWithWord: true
      })
      return
    }
  }
}

interface DropEvent {
  pageX: number
  pageY: number
  dataTransfer: {
    files: FileList
    effectAllowed: string
  } | null
  preventDefault: () => void
}

export const EditorPane: React.FC<EditorPaneProps & ScrollProps> = ({
  onContentChange,
  content,
  scrollState,
  onScroll,
  onMakeScrollSource
}) => {
  const { t } = useTranslation()
  const maxLength = useApplicationState((state) => state.config.maxDocumentLength)
  const smartPasteEnabled = useApplicationState((state) => state.editorConfig.smartPaste)
  const [showMaxLengthWarning, setShowMaxLengthWarning] = useState(false)
  const maxLengthWarningAlreadyShown = useRef(false)
  const [editor, setEditor] = useState<Editor>()
  const [statusBarInfo, setStatusBarInfo] = useState<StatusBarInfo>(defaultState)
  const editorPreferences = useApplicationState((state) => state.editorConfig.preferences)
  const ligaturesEnabled = useApplicationState((state) => state.editorConfig.ligatures)

  const lastScrollPosition = useRef<number>()
  const [editorScroll, setEditorScroll] = useState<ScrollInfo>()
  const onEditorScroll = useCallback((editor: Editor, data: ScrollInfo) => setEditorScroll(data), [])

  const onPaste = useCallback(
    (pasteEditor: Editor, event: PasteEvent) => {
      if (!event || !event.clipboardData) {
        return
      }
      if (smartPasteEnabled) {
        const tableInserted = handleTablePaste(event, pasteEditor)
        if (tableInserted) {
          return
        }
      }
      handleFilePaste(event, pasteEditor)
    },
    [smartPasteEnabled]
  )

  useEffect(() => {
    if (!editor || !onScroll || !editorScroll) {
      return
    }
    const line = editor.lineAtHeight(editorScroll.top, 'local')
    const startYOfLine = editor.heightAtLine(line, 'local')
    const lineInfo = editor.lineInfo(line)
    if (lineInfo === null) {
      return
    }
    const heightOfLine = (lineInfo.handle as { height: number }).height
    const percentageRaw = Math.max(editorScroll.top - startYOfLine, 0) / heightOfLine
    const percentage = Math.floor(percentageRaw * 100)

    const newScrollState: ScrollState = { firstLineInView: line + 1, scrolledPercentage: percentage }
    onScroll(newScrollState)
  }, [editor, editorScroll, onScroll])

  useEffect(() => {
    if (!editor || !scrollState) {
      return
    }
    const startYOfLine = editor.heightAtLine(scrollState.firstLineInView - 1, 'local')
    const heightOfLine = (editor.lineInfo(scrollState.firstLineInView - 1).handle as { height: number }).height
    const newPositionRaw = startYOfLine + (heightOfLine * scrollState.scrolledPercentage) / 100
    const newPosition = Math.floor(newPositionRaw)
    if (newPosition !== lastScrollPosition.current) {
      lastScrollPosition.current = newPosition
      editor.scrollTo(0, newPosition)
    }
  }, [editor, scrollState])

  const onBeforeChange = useCallback(
    (editor: Editor, data: EditorChange, value: string) => {
      if (value.length > maxLength && !maxLengthWarningAlreadyShown.current) {
        setShowMaxLengthWarning(true)
        maxLengthWarningAlreadyShown.current = true
      }
      if (value.length <= maxLength) {
        maxLengthWarningAlreadyShown.current = false
      }
      onContentChange(value)
    },
    [onContentChange, maxLength, maxLengthWarningAlreadyShown]
  )
  const onEditorDidMount = useCallback(
    (mountedEditor: Editor) => {
      setStatusBarInfo(createStatusInfo(mountedEditor, maxLength))
      setEditor(mountedEditor)
    },
    [maxLength]
  )

  const onCursorActivity = useCallback(
    (editorWithActivity: Editor) => {
      setStatusBarInfo(createStatusInfo(editorWithActivity, maxLength))
    },
    [maxLength]
  )

  const onDrop = useCallback((dropEditor: Editor, event: DropEvent) => {
    if (
      event &&
      dropEditor &&
      event.pageX &&
      event.pageY &&
      event.dataTransfer &&
      event.dataTransfer.files &&
      event.dataTransfer.files.length >= 1
    ) {
      event.preventDefault()
      const top: number = event.pageY
      const left: number = event.pageX
      const newCursor = dropEditor.coordsChar({ top, left }, 'page')
      dropEditor.setCursor(newCursor)
      const files: FileList = event.dataTransfer.files
      handleUpload(files[0], dropEditor)
    }
  }, [])

  const onMaxLengthHide = useCallback(() => setShowMaxLengthWarning(false), [])

  const codeMirrorOptions: EditorConfiguration = useMemo<EditorConfiguration>(
    () => ({
      ...editorPreferences,
      mode: 'gfm',
      viewportMargin: 20,
      styleActiveLine: true,
      lineNumbers: true,
      lineWrapping: true,
      showCursorWhenSelecting: true,
      highlightSelectionMatches: true,
      inputStyle: 'textarea',
      matchBrackets: true,
      autoCloseBrackets: true,
      matchTags: {
        bothTags: true
      },
      autoCloseTags: true,
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'authorship-gutters', 'CodeMirror-foldgutter'],
      extraKeys: defaultKeyMap,
      flattenSpans: true,
      addModeClass: true,
      autoRefresh: true,
      // otherCursors: true,
      placeholder: t('editor.placeholder')
    }),
    [t, editorPreferences]
  )

  return (
    <div className={'d-flex flex-column h-100 position-relative'} onMouseEnter={onMakeScrollSource}>
      <MaxLengthWarningModal show={showMaxLengthWarning} onHide={onMaxLengthHide} maxLength={maxLength} />
      <ToolBar editor={editor} />
      <ControlledCodeMirror
        className={`overflow-hidden w-100 flex-fill ${ligaturesEnabled ? '' : 'no-ligatures'}`}
        value={content}
        options={codeMirrorOptions}
        onChange={onChange}
        onPaste={onPaste}
        onDrop={onDrop}
        onCursorActivity={onCursorActivity}
        editorDidMount={onEditorDidMount}
        onBeforeChange={onBeforeChange}
        onScroll={onEditorScroll}
      />
      <StatusBar {...statusBarInfo} />
    </div>
  )
}
