function getA(paramObject) {
    return _getNode(`a`, paramObject);
}

function getBody(paramObject) {
    return _getNode(`body`, paramObject);
}

function getBr(paramObject) {
    return _getNode(`br`, paramObject);
}

function getButton(paramObject) {
    return _getNode(`button`, paramObject);
}

function getCanvas(paramObject) {
    return _getNode(`canvas`, paramObject);
}

function getDiv(paramObject) {
    return _getNode(`div`, paramObject);
}

function getFooter(paramObject) {
    return _getNode(`footer`, paramObject);
}

function getForm(paramObject) {
    return _getNode(`form`, paramObject);
}

function getH1(paramObject) {
    return _getNode(`h1`, paramObject);
}

function getH2(paramObject) {
    return _getNode(`h2`, paramObject);
}

function getH3(paramObject) {
    return _getNode(`h3`, paramObject);
}

function getH4(paramObject) {
    return _getNode(`h4`, paramObject);
}

function getH5(paramObject) {
    return _getNode(`h5`, paramObject);
}

function getHead(paramObject) {
    return _getNode(`head`, paramObject);
}

function getHeader(paramObject) {
    return _getNode(`header`, paramObject);
}

function getHTML(paramObject) {
    return _getNode(`html`, paramObject);
}

function getI(paramObject) {
    return _getNode(`i`, paramObject);
}

function getImg(paramObject) {
    return _getNode(`img`, paramObject);
}

function getInput(paramObject) {
    return _getNode(`input`, paramObject);
}

function getLabel(paramObject) {
    return _getNode(`label`, paramObject);
}

function getLink(paramObject) {
    return _getNode(`link`, paramObject);
}

function getLI(paramObject) {
    return _getNode(`li`, paramObject);
}

function getMeta(paramObject) {
    return _getNode(`meta`, paramObject);
}

function getNav(paramObject) {
    return _getNode(`nav`, paramObject);
}

function getOL(paramObject) {
    return _getNode(`ol`, paramObject);
}

function getOption(paramObject) {
    return _getNode(`option`, paramObject);
}

function getP(paramObject) {
    return _getNode(`p`, paramObject);
}

function getSelect(paramObject) {
    return _getNode(`select`, paramObject);
}

function getSmall(paramObject) {
    return _getNode(`small`, paramObject);
}

function getSpan(paramObject) {
    return _getNode(`span`, paramObject);
}

function getStrong(paramObject) {
    return _getNode(`strong`, paramObject);
}

function getStyle(paramObject) {
    return _getNode(`style`, paramObject);
}

function getTable(paramObject) {
    return _getNode(`table`, paramObject);
}

function getTD(paramObject) {
    return _getNode(`td`, paramObject);
}

function getTextarea(paramObject) {
    return _getNode(`textarea`, paramObject);
}

function getTH(paramObject) {
    return _getNode(`th`, paramObject);
}

function getTitle(paramObject) {
    return _getNode(`title`, paramObject);
}

function getTR(paramObject) {
    return _getNode(`tr`, paramObject);
}

function getUL(paramObject) {
    return _getNode(`ul`, paramObject);
}

function _getNode(type, paramObject) {
    let node = document.createElement(type);
    if (paramObject) {
        let {
            accept,
            action,
            alt,
            ariaControls,
            ariaExpanded,
            ariaHaspopup,
            ariaHidden,
            ariaLabel,
            ariaLabelledby,
            charset,
            checked,
            className,
            colspan,
            content,
            dataBSDismiss,
            dataBSParent,
            dataBSTarget,
            dataBSToggle,
            dataDismiss,
            dataLogoAlignment,
            dataParent,
            dataShape,
            dataSize,
            dataTarget,
            dataText,
            dataTheme,
            dataToggle,
            dataType,
            disabled,
            forName,
            height,
            hidden,
            href,
            id,
            itemprop,
            itemscope,
            itemtype,
            method,
            name,
            placeholder,
            property,
            rel,
            role,
            rowspan,
            selected,
            src,
            style,
            tabindex,
            target,
            title,
            type,
            value,
            width,
        } = paramObject;
        if (accept) {
            node.setAttribute(`accept`, accept);
        }
        if (action) {
            node.setAttribute(`action`, action);
        }
        if (alt) {
            node.setAttribute(`alt`, alt);
        }
        if (ariaControls) {
            node.setAttribute(`aria-controls`, ariaControls);
        }
        if (ariaExpanded) {
            node.setAttribute(`aria-expanded`, ariaExpanded);
        }
        if (ariaHaspopup) {
            node.setAttribute(`aria-haspopup`, ariaHaspopup);
        }
        if (ariaHidden) {
            node.setAttribute(`aria-hidden`, ariaHidden);
        }
        if (ariaLabel) {
            node.setAttribute(`aria-label`, ariaLabel);
        }
        if (ariaLabelledby) {
            node.setAttribute(`aria-labelledby`, ariaLabelledby);
        }
        if (charset) {
            node.setAttribute(`charset`, charset);
        }
        if (checked) {
            node.setAttribute(`checked`, ``);
        }
        if (className) {
            node.setAttribute(`class`, className);
        }
        if (colspan) {
            node.setAttribute(`colspan`, colspan);
        }
        if (content) {
            node.setAttribute(`content`, content);
        }
        if (dataBSDismiss) {
            node.setAttribute(`data-bs-dismiss`, dataBSDismiss);
        }
        if (dataBSParent) {
            node.setAttribute(`data-bs-parent`, dataBSParent);
        }
        if (dataBSTarget) {
            node.setAttribute(`data-bs-target`, dataBSTarget);
        }
        if (dataBSToggle) {
            node.setAttribute(`data-bs-toggle`, dataBSToggle);
        }
        if (dataDismiss) {
            node.setAttribute(`data-dismiss`, dataDismiss);
        }
        if (dataLogoAlignment) {
            node.setAttribute(`data-logo_alignment`, dataLogoAlignment);
        }
        if (dataParent) {
            node.setAttribute(`data-parent`, dataParent);
        }
        if (dataShape) {
            node.setAttribute(`data-shape`, dataShape);
        }
        if (dataSize) {
            node.setAttribute(`data-size`, dataSize);
        }
        if (dataTarget) {
            node.setAttribute(`data-target`, dataTarget);
        }
        if (dataText) {
            node.setAttribute(`data-text`, dataText);
        }
        if (dataTheme) {
            node.setAttribute(`data-theme`, dataTheme);
        }
        if (dataToggle) {
            node.setAttribute(`data-toggle`, dataToggle);
        }
        if (dataType) {
            node.setAttribute(`data-type`, dataType);
        }
        if (disabled) {
            node.setAttribute(`disabled`, ``);
        }
        if (forName) {
            node.setAttribute(`for`, forName);
        }
        if (height) {
            node.setAttribute(`height`, height);
        }
        if (hidden) {
            node.setAttribute(`hidden`, ``);
        }
        if (href) {
            node.setAttribute(`href`, href);
        }
        if (id) {
            node.setAttribute(`id`, id);
        }
        if (itemprop) {
            node.setAttribute(`itemprop`, itemprop);
        }
        if (itemscope) {
            node.setAttribute(`itemscope`, ``);
        }
        if (itemtype) {
            node.setAttribute(`itemtype`, itemtype);
        }
        if (method) {
            node.setAttribute(`method`, method);
        }
        if (name) {
            node.setAttribute(`name`, name);
        }
        if (placeholder) {
            node.setAttribute(`placeholder`, placeholder);
        }
        if (property) {
            node.setAttribute(`property`, property);
        }
        if (rel) {
            node.setAttribute(`rel`, rel);
        }
        if (role) {
            node.setAttribute(`role`, role);
        }
        if (rowspan) {
            node.setAttribute(`rowspan`, rowspan);
        }
        if (selected) {
            node.setAttribute(`selected`, ``);
        }
        if (src) {
            node.setAttribute(`src`, src);
        }
        if (style) {
            node.setAttribute(`style`, style);
        }
        if (tabindex) {
            node.setAttribute(`tabindex`, tabindex);
        }
        if (target) {
            node.setAttribute(`target`, target);
        }
        if (title) {
            node.setAttribute(`title`, title);
        }
        if (type) {
            node.setAttribute(`type`, type);
        }
        if (value || value === 0) {
            node.setAttribute(`value`, value);
        }
        if (width) {
            node.setAttribute(`width`, width);
        }
    }
    return node;
}