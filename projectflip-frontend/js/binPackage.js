/**@copyright The Financial Times Limited [All Rights Reserved] @license MIT License (see LICENCE.txt) *//*jslint browser:true, es5: true*//*global Node*//* Modified additional features added */
var binPackage = (function() {
    "use strict";
    var $window = $(window),
        Modernizr = window.Modernizr;
    Modernizr.addTest('csstransformspreserve3d', function() {
        var prop = Modernizr.prefixed('transformStyle');
        var val = 'preserve-3d';
        var computedStyle;
        if (!prop) return false;
        prop = prop.replace(/([A-Z])/g, function(str, m1) {
            return '-' + m1.toLowerCase();
        }).replace(/^ms-/, '-ms-');
        Modernizr.testStyles('#modernizr{' + prop + ':' + val + ';}', function(el, rule) {
            computedStyle = window.getComputedStyle ? getComputedStyle(el, null).getPropertyValue(prop) : '';
        });
        return (computedStyle === val);
    });
    var transformSupport = Modernizr.csstransitions && Modernizr.csstransforms3d && Modernizr.csstransformspreserve3d;

    function binPackageException(name, message) {
        this.name = 'binPackage' + name || 'binPackageException';
        this.message = message || '';
    }
    binPackageException.prototype = new Error();
    binPackageException.constructor = binPackageException;
    var
        layoutDimensionList = ['pageInnerWidth', 'pageInnerHeight', 'colDefaultTop', 'colDefaultLeft', 'columnCount', 'columnWidth', 'columnGap'],
        defaultConfig = {
            layoutDimensions: null,
            columnFragmentMinHeight: 0,
            viewportWidth: null,
            viewportHeight: null,
            columnWidth: 'auto',
            columnCount: 'auto',
            columnGap: 'normal',
            pageClass: 'bp-page',
            columnClass: 'bp-column',
            pageArrangement: 'horizontal',
            pagePadding: 0,
            debug: false,
            showGrid: false,
            standardiseLineHeight: false,
            minFixedPadding: 1,
            lineHeight: null,
            noWrapOnTags: [],
            allowReflow: true,
            baselineOffset: 0
        },
        cssStyles = '#[targetId] { position: relative; height: 100%; }\n' + '#[targetId] .[preloadAreaClassName].[pageClass] { visibility: hidden; position: absolute; overflow: hidden; }\n' + '#[targetId] .[preloadFixedAreaClassName] { visibility: hidden; position: absolute; }\n' + '#[targetId] .[pageClass] { position: absolute; width: [viewportWidth]px; height: [viewportHeight]px; [pageArrangement] }\n' + '#[targetId] .[columnClass] { position: absolute; width: [columnWidth]px; overflow: hidden; }\n' + '#[targetId] .[pageClass] .[fixedElementClassName] { position: absolute; }\n' + '#[targetId] .[pageClass] .[columnClass] > :first-child { margin-top: 0px; }\n',
        cssColumnStyles = '#[targetId] .[columnClass].[columnClass]-[columnNum] { left: [leftPos]px; }\n',
        showGridStyles = '#[targetId] .[pageClass] { background-image: -webkit-linear-gradient(skyblue 1px, transparent 1px); background-size: 100% [lh]px; background-origin: content-box; }',
        _outerHTML = (function() {
            var outerHTMLContainer;
            if (typeof document !== "undefined" && !document.documentElement.hasOwnProperty('outerHTML')) {
                outerHTMLContainer = document.createElementNS("http://www.w3.org/1999/xhtml", "_");
                return function _outerHTMLNode(node) {
                    var html;
                    outerHTMLContainer.appendChild(node.cloneNode(false));
                    html = outerHTMLContainer.innerHTML.replace("><", ">" + node.innerHTML + "<");
                    outerHTMLContainer.innerHTML = "";
                    return html;
                };
            } else {
                return function _outerHTMLNative(node) {
                    return node.outerHTML;
                };
            }
        }());

    function binPackage(target, viewport, userConfig) {
        var
            config = {},
            showGrid, flowedContent, fixedContent, colDefaultBottom, colMiddle, minPadding, renderArea, preloadColumn, fixedPreloadArea, headElement, headerStyles, targetIdPrefix = 'bp-target-',
            renderAreaClassName = 'bp-render-area',
            preloadAreaClassName = 'bp-preload',
            preloadFixedAreaClassName = 'bp-preload-fixed',
            fixedElementClassName = 'bp-fixed',
            nowrapClassName = 'nowrap',
            keepwithnextClassName = 'keepwithnext',
            lineHeightTestContents, pagedContent = [],
            pagedEndContent = [],
            borderElementIndex, indexedPageNum, indexedColumnNum, indexedColumnFrag, topElementOverflow, totalColumnHeight, workingPage, workingColumn, workingColumnFrag, that = this;
        this.target = target;
        this.viewport = viewport;
        this._checkInstanceArgs();
        _setConfig(userConfig);
        _setLayoutDimensions();

        function _setConfig(userConfig) {
            var i;
            that.config = config = {};
            for (i in defaultConfig) {
                if (defaultConfig.hasOwnProperty(i)) {
                    config[i] = defaultConfig[i];
                }
            }
            for (i in userConfig) {
                if (userConfig.hasOwnProperty(i)) {
                    if (config[i] === undefined) {
                        throw new binPackageException('ParameterException', 'Unknown config parameter [' + i + '].');
                    }
                    config[i] = userConfig[i];
                }
            }
            if (config.showGrid !== undefined) showGrid = !!config.showGrid;
            if ('horizontal' !== config.pageArrangement && 'vertical' !== config.pageArrangement) {
                throw new binPackageException('ArrangementException', config.pageArrangement + ' is not a valid Page Arrangement value.');
            }
            config.pagePadding = parseInt(config.pagePadding, 10);
            if (isNaN(config.pagePadding)) {
                throw new binPackageException('PaddingException', config.pagePadding + ' is not a valid Page Padding value.');
            }
            ['columnWidth', 'columnCount', 'columnGap', 'columnFragmentMinHeight'].forEach(function _checkColumnSpecification(type) {
                if (defaultConfig[type] === config[type]) return true;
                config[type] = parseInt(config[type], 10);
                if (isNaN(config[type]) || config[type] < 0) {
                    throw new binPackageException('ColumnDimensionException', type + ' must be an positive integer or "' + defaultConfig[type] + '".');
                }
            });
            if (typeof config.standardiseLineHeight !== 'boolean') {
                throw new binPackageException('StandardiseLineheightException', 'standardiseLineHeight must be a boolean value.');
            }
            config.minFixedPadding = parseFloat(config.minFixedPadding);
            if (isNaN(config.minFixedPadding)) {
                throw new binPackageException('MinFixedPaddingException', 'minFixedPadding must be a float or integer.');
            }
            if ((config.viewportWidth !== null) && isNaN(config.viewportWidth = parseInt(config.viewportWidth, 10))) {
                throw new binPackageException('ViewportWidthException', 'viewportWidth must be an integer.');
            }
            if ((config.viewportHeight !== null) && isNaN(config.viewportHeight = parseInt(config.viewportHeight, 10))) {
                throw new binPackageException('ViewportHeightException', 'viewportHeight must be an integer.');
            }
            if ((config.lineHeight !== null) && isNaN(config.lineHeight = parseInt(config.lineHeight, 10))) {
                throw new binPackageException('LineheightException', 'lineHeight must be an integer.');
            }
            // Check baselineOffset, if specified
						if ((config.baselineOffset !== null) && isNaN(config.baselineOffset = parseFloat(config.baselineOffset, 10))) {
							throw new binPackageException('baselineOffsetException', 'baselineOffset must be a float.');
						}
            config.pageClass = _normaliseClassName('pageClass', config.pageClass);
            config.columnClass = _normaliseClassName('columnClass', config.columnClass);
            if (!Array.isArray(config.noWrapOnTags)) {
                throw new binPackageException('NoWrapException', 'noWrapOnTags must be an Array.');
            }
            config.noWrapOnTags = config.noWrapOnTags.map(function _lowercase(item) {
                return item.toLowerCase();
            });
        }

        function _setLayoutDimensions() {
            var i, l, derivedColumnCount, computedStyle;
            if (config.layoutDimensions !== null) {
                for (i = 0, l = layoutDimensionList.length; i < l; i++) {
                    if (isNaN(Number(config.layoutDimensions[layoutDimensionList[i]]))) {
                        throw new binPackageException('DimensionCacheException', 'Must specify an integer value for ' + layoutDimensionList[i]);
                    }
                }
                return;
            }
            config.layoutDimensions = {};
            if (!config.viewportWidth) {
                computedStyle = window.getComputedStyle(that.viewport);
                config.viewportWidth = parseInt(computedStyle.getPropertyValue('width'), 10);
            }
            if (!config.viewportHeight) {
                if (!computedStyle) computedStyle = window.getComputedStyle(that.viewport);
                config.viewportHeight = parseInt(computedStyle.getPropertyValue('height'), 10);
            }
            if (!config.viewportWidth || !config.viewportHeight) {
                throw new binPackageException('ViewportException', 'Viewport element must have width and height.');
            }
            if ('normal' === config.columnGap) {
                if (!computedStyle) computedStyle = window.getComputedStyle(that.viewport);
                config.layoutDimensions.columnGap = parseInt(computedStyle.fontSize, 10);
            } else {
                config.layoutDimensions.columnGap = config.columnGap;
            }
            if ('horizontal' === config.pageArrangement) {
                config.layoutDimensions.pageInnerWidth = config.viewportWidth - (2 * config.pagePadding);
                config.layoutDimensions.pageInnerHeight = config.viewportHeight;
                config.layoutDimensions.colDefaultTop = 0;
                config.layoutDimensions.colDefaultLeft = config.pagePadding;
            } else {
                config.layoutDimensions.pageInnerWidth = config.viewportWidth;
                config.layoutDimensions.pageInnerHeight = config.viewportHeight - (2 * config.pagePadding);
                config.layoutDimensions.colDefaultTop = config.pagePadding;
                config.layoutDimensions.colDefaultLeft = 0;
            }
            if ('auto' === config.columnWidth && 'auto' === config.columnCount) {
                config.layoutDimensions.columnCount = 1;
                config.layoutDimensions.columnWidth = config.layoutDimensions.pageInnerWidth;
            } else if ('auto' === config.columnWidth && 'auto' !== config.columnCount) {
                config.layoutDimensions.columnCount = config.columnCount;
                config.layoutDimensions.columnWidth = (config.layoutDimensions.pageInnerWidth - ((config.columnCount - 1) * config.layoutDimensions.columnGap)) / config.columnCount;
            } else {
                derivedColumnCount = Math.max(1, Math.floor((config.layoutDimensions.pageInnerWidth + 1 + config.layoutDimensions.columnGap) / (config.columnWidth + config.layoutDimensions.columnGap)));
                if ('auto' === config.columnCount) {
                    config.layoutDimensions.columnCount = derivedColumnCount;
                    config.layoutDimensions.columnWidth = ((config.layoutDimensions.pageInnerWidth + config.layoutDimensions.columnGap) / config.layoutDimensions.columnCount) - config.layoutDimensions.columnGap;
                } else {
                    config.layoutDimensions.columnCount = Math.min(config.columnCount, derivedColumnCount);
                    config.layoutDimensions.columnWidth = ((config.layoutDimensions.pageInnerWidth + config.layoutDimensions.columnGap) / config.layoutDimensions.columnCount) - config.layoutDimensions.columnGap;
                }
            }
            //config.layoutDimensions.columnHeight = config.lineHeight ? _roundDownToGrid(config.layoutDimensions.pageInnerHeight) : config.layoutDimensions.pageInnerHeight;
            config.layoutDimensions.columnHeight = config.lineHeight ? _roundHeightDown(config.layoutDimensions.pageInnerHeight) : config.layoutDimensions.pageInnerHeight;
            config.layoutDimensions.baselineOffset = config.baselineOffset;
        }

        function _writeTargetStyles() {
            var styleContents, columnNum;
            if (!headElement) headElement = document.querySelector('head');
            if (!that.target.id) that.target.id = targetIdPrefix + Math.floor(Math.random() * (9000000000) + 1000000000);
            styleContents = _replaceStringTokens(cssStyles, {
                targetId: that.target.id,
                preloadAreaClassName: preloadAreaClassName,
                preloadFixedAreaClassName: preloadFixedAreaClassName,
                fixedElementClassName: fixedElementClassName,
                pageClass: config.pageClass,
                columnClass: config.columnClass,
                columnWidth: config.layoutDimensions.columnWidth,
                viewportWidth: config.viewportWidth,
                viewportHeight: config.viewportHeight,
                pageArrangement: ('horizontal' === config.pageArrangement) ? 'top: 0;' : 'left: 0;'
            });
            for (columnNum = 1; columnNum <= config.layoutDimensions.columnCount; columnNum++) {
                styleContents += _replaceStringTokens(cssColumnStyles, {
                    targetId: that.target.id,
                    columnClass: config.columnClass,
                    columnNum: columnNum,
                    leftPos: config.layoutDimensions.colDefaultLeft + (config.layoutDimensions.columnWidth * (columnNum - 1)) + (config.layoutDimensions.columnGap * (columnNum - 1))
                });
            }
            if (headerStyles) {
                while (headerStyles.hasChildNodes()) {
                    headerStyles.removeChild(headerStyles.firstChild);
                }
            } else {
                headerStyles = document.createElement('style');
                headerStyles.setAttribute('type', 'text/css');
            }
            headerStyles.appendChild(document.createTextNode(styleContents));
            headElement.appendChild(headerStyles);
        }

        function _createTargetElements() {
            var preloadElement, targetChildren;
            targetChildren = document.createDocumentFragment();
            preloadElement = targetChildren.appendChild(document.createElement('div'));
            renderArea = targetChildren.appendChild(document.createElement('div'));
            if ('string' === typeof flowedContent || !flowedContent) {
                preloadColumn = preloadElement.appendChild(document.createElement('div'));
                if (flowedContent) preloadColumn.innerHTML = flowedContent;
            } else if (flowedContent instanceof HTMLElement) {
                preloadColumn = flowedContent.cloneNode(true);
                preloadElement.appendChild(preloadColumn);
            } else {
                throw new binPackageException('FlowedContentException', 'flowedContent must be a HTML string or a DOM element.');
            }
            if ('string' === typeof fixedContent || !fixedContent) {
                fixedPreloadArea = targetChildren.appendChild(document.createElement('div'));
                if (fixedContent) fixedPreloadArea.innerHTML = fixedContent;
            } else if (fixedContent instanceof HTMLElement) {
                fixedPreloadArea = fixedContent.cloneNode(true);
                targetChildren.appendChild(fixedPreloadArea);
            } else {
                throw new binPackageException('FixedContentException', 'fixedContent must be a HTML string or a DOM element.');
            }
            preloadElement.className = preloadAreaClassName + ' ' + config.pageClass;
            renderArea.className = renderAreaClassName;
            preloadColumn.className = config.columnClass;
            fixedPreloadArea.className = preloadFixedAreaClassName;
            that.target.appendChild(targetChildren);
        }

        function _findLineHeight() {
            var lineHeights, i, l, node, testNode, testLineHeight;
            if (!config.lineHeight) {
                if (!lineHeightTestContents) {
                    lineHeightTestContents = new Array(10).join('x<br />') + 'x';
                }
                lineHeights = [];
                for (i = 0, l = Math.min(10, (preloadColumn.childNodes.length)); i < l; i++) {
                    node = preloadColumn.childNodes[i];
                    if (Node.ELEMENT_NODE !== node.nodeType) continue;
                    testLineHeight = parseInt(window.getComputedStyle(node).getPropertyValue('line-height'), 10);
                    if (!testLineHeight) {
                        testNode = node.cloneNode(false);
                        if (node.className) testNode.className = node.className;
                        testNode.style.padding = "0px";
                        testNode.style.border = "none";
                        testNode.style.height = "auto";
                        testNode.innerHTML = lineHeightTestContents;
                        preloadColumn.appendChild(testNode);
                        testLineHeight = testNode.offsetHeight / 10;
                        preloadColumn.removeChild(testNode);
                    }
                    lineHeights.push(testLineHeight);
                }
                if (lineHeights.length < 5) {
                    testNode = document.createElement('p');
                    testNode.style.padding = "0px";
                    testNode.style.border = "none";
                    testNode.style.height = "auto";
                    testNode.innerHTML = lineHeightTestContents;
                    preloadColumn.appendChild(testNode);
                    testLineHeight = testNode.offsetHeight / 10;
                    preloadColumn.removeChild(testNode);
                    for (i = lineHeights.length; i < 5; i++) lineHeights.push(testLineHeight);
                }
                config.lineHeight = _mode(lineHeights);
            }
            //config.layoutDimensions.columnHeight = config.lineHeight ? _roundDownToGrid(config.layoutDimensions.pageInnerHeight) : config.layoutDimensions.pageInnerHeight;
            //config.layoutDimensions.baselineOffset = config.baselineOffset ? (config.lineHeight - config.baselineOffset) : 0;
            config.layoutDimensions.columnHeight = config.lineHeight ? _roundHeightDown(config.layoutDimensions.pageInnerHeight) : config.layoutDimensions.pageInnerHeight;
            if (showGrid) {
                headerStyles.innerHTML += _replaceStringTokens(showGridStyles, {
                    targetId: that.target.id,
                    pageClass: config.pageClass,
                    'lh': config.lineHeight
                });
            }
        }

        function _setFixedElementHeight(element) {
            var computedStyle, indexedColStart, indexedColEnd, matches, anchorY, anchorX, colSpan, spanDir;
            if (Node.TEXT_NODE === element.nodeType) return false;
            computedStyle = window.getComputedStyle(element);
            if ('none' === computedStyle.getPropertyValue('display')) return false;
            matches = element.className.match(/(\s|^)anchor-(top|middle|bottom)-(left|right|(?:col-(\d+)))(\s|$)/);
            if (matches) {
                anchorY = matches[2];
                if (matches[4]) {
                    anchorX = Math.max(0, (Math.min(matches[4], config.layoutDimensions.columnCount) - 1));
                } else {
                    anchorX = matches[3];
                }
            } else {
                anchorY = 'top';
                anchorX = 'left';
            }
            matches = element.className.match(/(\s|^)col-span-(\d+|all)(-(left|right))?(\s|$)/);
            if (matches) {
                spanDir = matches[4] || 'right';
                if (matches[2] === 'all') {
                    colSpan = config.layoutDimensions.columnCount;
                } else {
                    colSpan = parseInt(matches[2], 10);
                }
                if ('left' === anchorX) {
                    indexedColStart = 0;
                    indexedColEnd = Math.min(colSpan, config.layoutDimensions.columnCount) - 1;
                } else if ('right' === anchorX) {
                    indexedColEnd = config.layoutDimensions.columnCount - 1;
                    indexedColStart = config.layoutDimensions.columnCount - Math.min(colSpan, config.layoutDimensions.columnCount);
                } else {
                    if ('right' === spanDir) {
                        indexedColStart = anchorX;
                        indexedColEnd = Math.min((indexedColStart + colSpan), config.layoutDimensions.columnCount) - 1;
                    } else {
                        indexedColEnd = anchorX;
                        indexedColStart = Math.max((indexedColEnd - colSpan - 1), 0);
                    }
                }
            } else {
                if ('left' === anchorX) {
                    indexedColStart = 0;
                } else if ('right' === anchorX) {
                    indexedColStart = config.layoutDimensions.columnCount - 1;
                } else {
                    indexedColStart = anchorX;
                }
                indexedColEnd = indexedColStart;
            }
            element.style.width = _round(((indexedColEnd - indexedColStart) * (config.layoutDimensions.columnWidth + config.layoutDimensions.columnGap)) + config.layoutDimensions.columnWidth) + 'px';
            return {
                element: element,
                preComputedStyle: computedStyle,
                indexedColStart: indexedColStart,
                indexedColEnd: indexedColEnd,
                anchorY: anchorY,
                anchorX: anchorX
            };
        }

        function _addFixedElement(elementDefinition) {
            var element = elementDefinition.element,
                matches, pageNum, workingPage, normalisedElementHeight, elementTopPos, elementBottomPos, lowestTopPos, highestBottomPos, topSplitPoint, bottomSplitPoint, firstColFragment, lastColFragment, newColumnFragment, newFragmentHeight, fragment, column, fragNum, fragLen, columnNum;
            if (element.classList.contains('attach-page-last')) {
                pagedEndContent.push({
                    'fixed': [{
                        content: _outerHTML(element),
                        top: config.layoutDimensions.colDefaultTop,
                        left: config.layoutDimensions.colDefaultLeft
                    }]
                });
                return;
            } else {
                matches = element.className.match(/(\s|^)attach-page-(\d+)(\s|$)/);
                if (matches) {
                    pageNum = matches[2] - 1;
                } else {
                    pageNum = 0;
                }
            }
            _createPageObjects(pageNum);
            workingPage = pagedContent[pageNum];
            normalisedElementHeight = element.offsetHeight + parseInt(elementDefinition.preComputedStyle.getPropertyValue('margin-top'), 10);
            switch (elementDefinition.anchorY) {
                case 'top':
                    elementTopPos = config.layoutDimensions.colDefaultTop;
                    lowestTopPos = colDefaultBottom - normalisedElementHeight;
                    for (columnNum = elementDefinition.indexedColStart; columnNum <= elementDefinition.indexedColEnd; columnNum++) {
                        firstColFragment = workingPage.columns[columnNum].fragments[0];
                        if (!firstColFragment) {
                            elementTopPos = lowestTopPos;
                        } else {
                            if (firstColFragment.top > elementTopPos) {
                                elementTopPos = (firstColFragment.top > lowestTopPos) ? lowestTopPos : firstColFragment.top;
                            }
                        }
                    }
                    elementBottomPos = elementTopPos + normalisedElementHeight;
                    topSplitPoint = elementTopPos - config.lineHeight;
                    //bottomSplitPoint = _roundUpToGrid(elementBottomPos, true);
                    bottomSplitPoint = _roundUpToGrid(elementBottomPos);
                    break;
                case 'middle':
                    elementTopPos = colMiddle - (normalisedElementHeight / 2);
                    //topSplitPoint = _roundDownToGrid(elementTopPos, true);
                    //bottomSplitPoint = _roundUpToGrid(elementTopPos + normalisedElementHeight, true);
                    topSplitPoint    = _roundDownToGrid(elementTopPos);
										bottomSplitPoint = _roundUpToGrid(elementTopPos + normalisedElementHeight);
                    if (topSplitPoint < 0) topSplitPoint = 0;
                    if (bottomSplitPoint > config.layoutDimensions.columnHeight) bottomSplitPoint = config.layoutDimensions.columnHeight;
                    break;
                case 'bottom':
                    elementBottomPos = colDefaultBottom;
                    highestBottomPos = normalisedElementHeight;
                    for (columnNum = elementDefinition.indexedColStart; columnNum <= elementDefinition.indexedColEnd; columnNum++) {
                        lastColFragment = workingPage.columns[columnNum].fragments[workingPage.columns[columnNum].fragments.length - 1];
                        if (!lastColFragment) {
                            elementBottomPos = highestBottomPos;
                        } else {
                            if (lastColFragment.bottom < elementBottomPos) {
                                elementBottomPos = (lastColFragment.bottom < highestBottomPos) ? highestBottomPos : lastColFragment.bottom;
                            }
                        }
                    }
                    elementTopPos = elementBottomPos - normalisedElementHeight;
                    //topSplitPoint = _roundDownToGrid(elementTopPos, true);
                    topSplitPoint    = _roundDownToGrid(elementTopPos);
                    bottomSplitPoint = elementBottomPos + config.lineHeight;
                    break;
            }
            for (columnNum = elementDefinition.indexedColStart; columnNum <= elementDefinition.indexedColEnd; columnNum++) {
                column = workingPage.columns[columnNum];
                for (fragNum = 0, fragLen = column.fragments.length; fragNum < fragLen; fragNum++) {
                    fragment = column.fragments[fragNum];
                    if (topSplitPoint < fragment.top && bottomSplitPoint > fragment.bottom) {
                        column.fragments.splice(fragNum, 1);
                        fragLen--;
                        continue;
                    } else if (topSplitPoint > fragment.bottom || bottomSplitPoint < fragment.top) {
                        continue;
                    }
                    newFragmentHeight = fragment.top + fragment.height - bottomSplitPoint;
                    fragment.height = topSplitPoint - fragment.top;
                    fragment.bottom = fragment.top + fragment.height;
                    if (!fragment.height || fragment.height < config.columnFragmentMinHeight) {
                        column.fragments.splice(fragNum--, 1);
                        fragLen--;
                    }
                    if (newFragmentHeight && newFragmentHeight >= config.columnFragmentMinHeight) {
                        newColumnFragment = _createColumnFragment();
                        newColumnFragment.top = bottomSplitPoint;
                        newColumnFragment.height = newFragmentHeight;
                        newColumnFragment.bottom = newColumnFragment.top + newColumnFragment.height;
                        column.fragments.splice(++fragNum, 0, newColumnFragment);
                        fragNum++;
                        fragLen++;
                    }
                }
            }
            workingPage.fixed.push({
                content: _outerHTML(element),
                top: elementTopPos,
                left: (config.layoutDimensions.colDefaultLeft + (('left' === elementDefinition.anchorX) ? 0 : ((config.layoutDimensions.columnWidth + config.layoutDimensions.columnGap) * elementDefinition.indexedColStart)))
            });
        }

        function _normaliseFlowedElement(element) {
            var p;
            if (Node.TEXT_NODE !== element.nodeType) return;
            if (element.nodeValue.match(/^\s*$/)) {
                element.parentNode.removeChild(element);
            } else {
                p = document.createElement('p');
                p.appendChild(document.createTextNode(element.nodeValue));
                element.parentNode.replaceChild(p, element);
            }
        }

        function _flowContent() {
            var fixedElementDefinitions = [],
                fixedElementDefinition, i, l;
            pagedContent = [];
            pagedEndContent = [];
            indexedPageNum = indexedColumnNum = indexedColumnFrag = borderElementIndex = indexedColumnNum = indexedColumnFrag = topElementOverflow = totalColumnHeight = 0;
            //colDefaultBottom = config.layoutDimensions.columnHeight + config.layoutDimensions.colDefaultTop;
            //colMiddle = config.layoutDimensions.colDefaultTop + (config.layoutDimensions.columnHeight / 2);
            //minFixedPadding = config.minFixedPadding * config.lineHeight;
            //minFixedPadding   = (config.minFixedPadding * config.lineHeight) - config.layoutDimensions.baselineOffset;
            //fixedPadding = _roundUpToGrid(minFixedPadding);
						colDefaultBottom = config.layoutDimensions.columnHeight + config.layoutDimensions.colDefaultTop;
						colMiddle        = config.layoutDimensions.colDefaultTop + (config.layoutDimensions.columnHeight / 2);
						minPadding       = config.minFixedPadding * config.lineHeight;            
            for (i = 0, l = fixedPreloadArea.childNodes.length; i < l; i++) {
                fixedElementDefinition = _setFixedElementHeight(fixedPreloadArea.childNodes[i]);
                if (fixedElementDefinition) fixedElementDefinitions.push(fixedElementDefinition);
            }
            for (i = 0, l = fixedElementDefinitions.length; i < l; i++) {
                _addFixedElement(fixedElementDefinitions[i]);
            }
            for (i = preloadColumn.childNodes.length - 1; i >= 0; i--) {
                _normaliseFlowedElement(preloadColumn.childNodes[i]);
            }
            if (!preloadColumn.childNodes.length) return;
            _createPageObjects(indexedPageNum);
            workingPage = pagedContent[indexedPageNum];
            workingColumn = workingPage.columns[indexedColumnNum];
            workingColumnFrag = workingColumn.fragments[indexedColumnFrag];
            if (!workingColumnFrag) {
                _advanceWorkingColumnFragment();
            }
            totalColumnHeight = workingColumnFrag.height;
            for (i = 0, l = preloadColumn.childNodes.length; i < l; i++) {
                _addFlowedElement(preloadColumn.childNodes[i], i);
            }
            _wrapColumn(l - 1, false);
            if (!config.allowReflow) {
                if (fixedPreloadArea.parentNode) fixedPreloadArea.parentNode.removeChild(fixedPreloadArea);
                fixedPreloadArea = null;
                if (preloadColumn.parentNode && preloadColumn.parentNode.parentNode) preloadColumn.parentNode.parentNode.removeChild(preloadColumn.parentNode);
                preloadColumn = null;
            }
        }

        function _addFlowedElement(element, index) {
            var originalMargin, existingMargin, nextElementOffset, elementHeight, newMargin, largestMargin, overflow, loopCount, nextElement = element.nextSibling;
            if (config.standardiseLineHeight) {
                existingMargin = parseFloat(window.getComputedStyle(element).getPropertyValue('margin-bottom'), 10);
                if (config.allowReflow) {
                    originalMargin = parseFloat(element.getAttribute('data-bp-original-margin'), 10) || null;
                    if (null === originalMargin) {
                        originalMargin = existingMargin;
                        element.setAttribute('data-bp-original-margin', originalMargin);
                    } else if (originalMargin !== existingMargin) {
                        element.style.marginBottom = originalMargin + 'px';
                    }
                } else {
                    originalMargin = existingMargin;
                }
                nextElementOffset = _getNextElementOffset(element, nextElement);
                elementHeight = element.offsetHeight;
                if (nextElementOffset % config.lineHeight) {
                    largestMargin = Math.max(existingMargin, nextElement ? parseFloat(window.getComputedStyle(nextElement).getPropertyValue('margin-top'), 10) : 0);
                    //newMargin = _roundUpToGrid(elementHeight) - elementHeight + _roundUpToGrid(largestMargin);
                    newMargin     = _roundHeightUp(elementHeight) - elementHeight + _roundHeightUp(largestMargin);
                    if (newMargin !== existingMargin) {
                        element.style.marginBottom = newMargin + 'px';
                    }
                }
            }
            element.offsetBottom = element.offsetTop + element.offsetHeight;
            loopCount = 0;
            while ((element.offsetBottom >= totalColumnHeight || (nextElement && nextElement.offsetTop >= totalColumnHeight)) && (loopCount++ < 30)) {
                overflow = (element.offsetBottom > totalColumnHeight);
                _wrapColumn(index, overflow);
            }
            if (loopCount >= 30) console.error('binPackage: Caught and destroyed a loop when wrapping columns for element', element.outerHTML.substr(0, 200) + '...');
        }

        function _getNextElementOffset(element, nextElement) {
            if (!element.getBoundingClientRect) {
                return nextElement ? (nextElement.offsetTop - element.offsetTop) : element.offsetHeight;
            }
            return nextElement ? nextElement.getBoundingClientRect().top - element.getBoundingClientRect().top : element.getBoundingClientRect().height;
        }

        function _wrapColumn(currentElementIndex, overflow) {
            var nowrap, keepwithnext, prevElementKeepwithnext, firstInColumn, finalColumnElementIndex, cropCurrentElement, pushElement, pushFromElementIndex, i, lastElement, element, currentElement = preloadColumn.childNodes[currentElementIndex],
                nextElement = currentElement.nextSibling,
                prevElement = currentElement.previousSibling;
            nowrap = currentElement.classList.contains(nowrapClassName);
            keepwithnext = currentElement.classList.contains(keepwithnextClassName);
            prevElementKeepwithnext = (prevElement && prevElement.classList.contains(keepwithnextClassName));
            if (-1 !== config.noWrapOnTags.indexOf(currentElement.tagName.toLowerCase())) {
                nowrap = true;
            }
            if (!nextElement) {
                lastElement = true;
            }
            if (currentElementIndex === borderElementIndex) {
                firstInColumn = true;
            }
            if (currentElement.offsetBottom === totalColumnHeight) {
                overflow = false;
                if (nextElement) totalColumnHeight = nextElement.offsetTop;
            }
            if ((nowrap || (keepwithnext && nextElement)) && overflow && (firstInColumn)) {
                cropCurrentElement = true;
            }
            if (!cropCurrentElement && !firstInColumn && ((nowrap && overflow) || (keepwithnext && nextElement))) {
                pushElement = true;
                pushFromElementIndex = currentElementIndex;
            }
            if ((currentElementIndex - 1) > borderElementIndex && prevElementKeepwithnext && overflow && nowrap) {
                pushElement = true;
                pushFromElementIndex = currentElementIndex - 1;
            }
            finalColumnElementIndex = pushElement ? pushFromElementIndex - 1 : currentElementIndex;
            if (finalColumnElementIndex < borderElementIndex) {
                return;
            }
            workingColumnFrag.overflow = topElementOverflow;
            for (i = borderElementIndex; i <= finalColumnElementIndex; i++) {
                element = preloadColumn.childNodes[i];
                workingColumnFrag.elements.push({
                    content: _outerHTML(element)
                });
            }
            if (pushElement) {
                borderElementIndex = pushFromElementIndex;
            } else if (overflow && !cropCurrentElement) {
                borderElementIndex = currentElementIndex;
            } else {
                borderElementIndex = currentElementIndex + 1;
            }
            if (pushElement) {
                totalColumnHeight = preloadColumn.childNodes[pushFromElementIndex].offsetTop;
            } else if (cropCurrentElement && nextElement) {
                totalColumnHeight = nextElement.offsetTop;
            }
            if (!overflow || (nowrap || (keepwithnext && nextElement))) {
                topElementOverflow = 0;
            } else {
                topElementOverflow = totalColumnHeight - currentElement.offsetTop;
            }
            _advanceWorkingColumnFragment();
            totalColumnHeight += workingColumnFrag.height;
        }

        function _renderFlowedContent() {
            var outputHTML = '',
                indexedPageNum, page_len, pageHTML, page, i, l, element, indexedColumnNum, column_len, column, indexedColumnFrag, fragLen, el, fragment;
            for (indexedPageNum = 0, page_len = pagedContent.length; indexedPageNum < page_len; indexedPageNum++) {
                pageHTML = '';
                page = pagedContent[indexedPageNum];
                for (i = 0, l = page.fixed.length; i < l; i++) {
                    element = page.fixed[i];
                    element.content = _addClass(element.content, fixedElementClassName);
                    pageHTML += _addStyleRule(element.content, 'top:' + _round(element.top) + 'px;left:' + _round(element.left) + 'px;');
                }
                for (indexedColumnNum = 0, column_len = page.columns.length; indexedColumnNum < column_len; indexedColumnNum++) {
                    column = page.columns[indexedColumnNum];
                    for (indexedColumnFrag = 0, fragLen = column.fragments.length; indexedColumnFrag < fragLen; indexedColumnFrag++) {
                        fragment = column.fragments[indexedColumnFrag];
                        if (0 === fragment.elements.length) {
                            continue;
                        }
                        pageHTML += _openColumn(fragment, indexedColumnNum);
                        for (el = 0, l = fragment.elements.length; el < l; el++) {
                            element = fragment.elements[el];
                            if (el === 0) {
                                element.content = _addStyleRule(element.content, 'margin-top:' + (-fragment.overflow) + 'px;');
                            }
                            pageHTML += element.content;
                        }
                        pageHTML += '</div>';
                    }
                }
                if ('' === pageHTML) {
                    pagedContent.splice(indexedPageNum, 1);
                    indexedPageNum--;
                    page_len--;
                    continue;
                }
                outputHTML += _openPage(indexedPageNum) + pageHTML + '</div>';
            }
            for (indexedPageNum = 0, page_len = pagedEndContent.length; indexedPageNum < page_len; indexedPageNum++) {
                pageHTML = '';
                page = pagedEndContent[indexedPageNum];
                for (i = 0, l = page.fixed.length; i < l; i++) {
                    element = page.fixed[i];
                    element.content = _addClass(element.content, fixedElementClassName);
                    pageHTML += _addStyleRule(element.content, 'top:' + _round(element.top) + 'px;left:' + _round(element.left) + 'px;');
                }
                outputHTML += _openPage(pagedContent.length + indexedPageNum) + pageHTML + '</div>';
            }
            renderArea.innerHTML = outputHTML;
            page_len = pagedContent.length + pagedEndContent.length;
            that.target.style.width = (config.viewportWidth * page_len) + 'px';
            that.pagedContentCount = page_len;
        }

        function _addClass(element, className) {
            return element.replace(/<(\w+)([^>]*)>/, function _addRuleToTag(string, tag, attributes) {
                if (!string.match(/class\s*=/)) {
                    string = '<' + tag + ' class="" ' + attributes + '>';
                }
                string = string.replace(/class=(["'])/, 'class=$1 ' + className + ' ');
                return string;
            });
        }

        function _addStyleRule(element, rule) {
            return element.replace(/<(\w+)([^>]*)>/, function _addRuleToTag(string, tag, attributes) {
                if (!string.match(/style\s*=/)) {
                    string = '<' + tag + ' style="" ' + attributes + '>';
                }
                string = string.replace(/style=(["'])/, 'style=$1 ' + rule);
                return string;
            });
        }

				function _roundHeightDown(height) {
						return height - (height % config.lineHeight);
				}

				function _roundHeightUp(height) {
						var delta = height % config.lineHeight;
						if (delta) {
								height += config.lineHeight - delta;
			 			}
            return height;
        }
				function _roundDownToGrid(height) {
						return _roundHeightDown(height - minPadding - config.layoutDimensions.baselineOffset);
				}
				function _roundUpToGrid(height) {
						var delta = _roundHeightUp(height) - height;
						if (delta < (minPadding - config.layoutDimensions.baselineOffset)) {
								height += minPadding;
			 			}
            return _roundHeightUp(height);
        }

        function _round(val) {
            return Math.round(val * 100) / 100;
        }

        function _replaceStringTokens(string, tokens) {
            return string.replace(/\[(\w+)\]/g, function _replace(a, b) {
                var r = tokens[b];
                return typeof r === 'string' || typeof r === 'number' ? r : a;
            });
        }

        function _normaliseClassName(type, value) {
            if (typeof value !== 'string') {
                throw new binPackageException('ClassnameException', type + ' must be a string.');
            }
            return value.replace(/[^\w]/g, '-');
        }

        function _createPageObjects(indexedPageNum) {
            var pageNum, indexedColNum;
            for (pageNum = pagedContent.length; pageNum <= indexedPageNum; pageNum++) {
                pagedContent.push({
                    'fixed': [],
                    'columns': []
                });
                for (indexedColNum = 0; indexedColNum < config.layoutDimensions.columnCount; indexedColNum++) {
                    pagedContent[pageNum].columns.push({
                        fragments: [_createColumnFragment()]
                    });
                }
            }
        }

        function _createColumnFragment() {
            return {
                elements: [],
                overflow: 0,
                height: config.layoutDimensions.columnHeight,
                top: config.layoutDimensions.colDefaultTop,
                bottom: colDefaultBottom
            };
        }

        function _advanceWorkingColumnFragment() {
            if (!workingColumn.fragments[++indexedColumnFrag]) {
                indexedColumnFrag = 0;
                if (!workingPage.columns[++indexedColumnNum]) {
                    indexedColumnNum = 0;
                    indexedPageNum++;
                    _createPageObjects(indexedPageNum);
                }
            }
            workingPage = pagedContent[indexedPageNum];
            workingColumn = workingPage.columns[indexedColumnNum];
            workingColumnFrag = workingColumn.fragments[indexedColumnFrag];
            if (!workingColumnFrag) {
                _advanceWorkingColumnFragment();
            }
        }

        function _openPage(indexedPageNum) {
            var pagePos;
            if ('horizontal' === config.pageArrangement) {
                pagePos = 'left: ' + (indexedPageNum * config.viewportWidth) + 'px;';
            } else {
                pagePos = 'top: ' + (indexedPageNum * config.viewportHeight) + 'px;';
            }
            if (!transformSupport) {
                return '<div class="bb-item ' + config.pageClass + ' ' + config.pageClass + '-' + (indexedPageNum + 1) + '"' + '' + '"' + ' id="item' + (indexedPageNum + 1) + '">';
            } else {
                return '<div class="bb-item ' + config.pageClass + ' ' + config.pageClass + '-' + (indexedPageNum + 1) + '"' + '' + '"' + ' id="item' + (indexedPageNum + 1) + '">';
            }
        }

        function _openColumn(column, indexedColumnNum) {
            return '<div class="' + config.columnClass + ' ' + config.columnClass + '-' + (indexedColumnNum + 1) + '" style="height: ' + _round(column.height) + 'px; top: ' + (_round(column.top) + config.layoutDimensions.baselineOffset) + 'px;">';
        }

        function _mode(array) {
            var modeMap = {},
                maxEl, maxCount, i, el;
            if (array.length === 0) {
                return null;
            }
            maxEl = array[0];
            maxCount = 1;
            for (i = 0; i < array.length; i++) {
                el = array[i];
                if (modeMap[el] === undefined) {
                    modeMap[el] = 1;
                } else {
                    modeMap[el] ++;
                }
                if (modeMap[el] > maxCount) {
                    maxEl = el;
                    maxCount = modeMap[el];
                }
            }
            return maxEl;
        }

        function getSearchParameters() {
            var prmstr = window.location.search.substr(1);
            return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {};
        }

        function transformToAssocArray(prmstr) {
            var params = {};
            var prmarr = prmstr.split("&");
            for (var i = 0; i < prmarr.length; i++) {
                var tmparr = prmarr[i].split("=");
                params[tmparr[0]] = tmparr[1];
            }
            return params;
        }
        var paramsFinal = getSearchParameters();
        this.flow = function(flowed, fixed) {
            flowedContent = flowed;
            fixedContent = fixed;
            _writeTargetStyles();
            _createTargetElements();
            _findLineHeight();
            _flowContent();
            _renderFlowedContent();
            return this;
        };
        this.reflow = function(newConfig) {
            if (!config.allowReflow) {
                throw new binPackageException('ReflowException', 'reflow() was called but "allowReflow" config option was false.');
            }
            if (newConfig) {
                _setConfig(newConfig);
            }
            _setLayoutDimensions();
            _writeTargetStyles();
            _findLineHeight();
            _flowContent();
            _renderFlowedContent();
            return this;
        };
        this.destroy = function() {
            if (headerStyles) {
                headerStyles.parentNode.removeChild(headerStyles);
                headerStyles = null;
            }
            if (that.target) {
                that.target.parentNode.removeChild(that.target);
                that.target = null;
            }
        };
    }
    binPackage.prototype = {get layoutDimensions() {
            return this.config.layoutDimensions;
        },
        set layoutDimensions(value) {
            throw new binPackageException('SetterException', 'Setter not defined for layoutDimensions.');
        },
        get pageClass() {
            return this.config.pageClass;
        },
        set pageClass(value) {
            throw new binPackageException('SetterException', 'Setter not defined for pageClass.');
        },
        get columnClass() {
            return this.config.columnClass;
        },
        set columnClass(value) {
            throw new binPackageException('SetterException', 'Setter not defined for columnClass.');
        },
        get pageCount() {
            return this.pagedContentCount;
        },
        set pageCount(value) {
            throw new binPackageException('SetterException', 'Setter not defined for pageCount.');
        },
        _checkInstanceArgs: function() {
            var that = this;
            ['target', 'viewport'].forEach(function _checkArg(name) {
                var arg = that[name];
                switch (typeof arg) {
                    case 'string':
                        arg = document.getElementById(arg);
                        if (!arg) throw new binPackageException('SelectorException', name + ' must be a valid DOM element.');
                        break;
                    case 'object':
                        if (!(arg instanceof HTMLElement)) {
                            throw new binPackageException('ParameterException', name + ' must be a string ID or DOM element.');
                        }
                        break;
                    default:
                        throw new binPackageException('ParameterException', name + ' must be a string ID or DOM element.');
                }
                that[name] = arg;
            });
            if (this.viewport.compareDocumentPosition(this.target) < this.viewport.DOCUMENT_POSITION_CONTAINED_BY) {
                throw new binPackageException('InheritanceException', 'Target element must be a child of the viewport.');
            }
            while (this.target.lastChild) {
                this.target.removeChild(this.target.lastChild);
            }
        }
    };
    return binPackage;
}());
