class DynamicTable {

    constructor(paramObject) {
        this.paramObject = paramObject;
        this.divNode = this._getNode(`div`);
        this._clearNode(this.divNode);
        this.filterNode = this._getNode(`input`, { type: `text`, className: `form-control`, placeholder: `Type here to search...` });
        this.limitNode = this._getLimitNode();
        this.countNode = this._getNode(`div`);
        this.bodyNode = this._getNode(`tbody`, { id: `tBody` });
    }

    createTable() {
        let { tableId, headData, head2Data, footData, addFilter } = this.paramObject;
        if (addFilter) {
            this.divNode.appendChild(this.filterNode);
        }
        this._addLimitRowNode();
        let tableNode = this._getNode(`table`, { id: tableId, className: `table table-striped table-bordered table-hover table-sm` });
        this.divNode.appendChild(tableNode);
        this._addTableDivision(tableNode, `thead`, headData, head2Data);
        tableNode.appendChild(this.bodyNode);
        this._appendTableData();
        if (footData) {
            this._addTableDivision(tableNode, `tfoot`, footData);
        } else {
            this._addTableDivision(tableNode, `tfoot`, headData, head2Data);
        }
        return this.divNode;
    }

    _appendTableData() {
        let { addFilter, addLimit } = this.paramObject;
        this._addTableDataRows();
        if (addFilter) {
            this.filterNode.onkeyup = () => {
                this._addTableDataRows();
            }
        }
        if (addLimit) {
            this.limitNode.onchange = () => {
                this._addTableDataRows();
            }
        }
    }

    _checkboxToggle(divisionName) {
        let { checkboxClass } = this.paramObject;
        let currentNodeId, isChecked;
        if (checkboxClass) {
            document.getElementById(`${checkboxClass}_${divisionName}`).onclick = function() {
                currentNodeId = this.id.split(`_`)[1];
                isChecked = this.checked;
                let checkboxNodes = document.getElementsByClassName(checkboxClass);
                for (let i = 0; i < checkboxNodes.length; i++) {
                    checkboxNodes[i].checked = isChecked;
                }
            }
        }
    }

    _addLimitRowNode() {
        let rowNode = this._getNode(`div`, { className: `row` });
        this.divNode.appendChild(rowNode);
        this._addLimitFormNode(rowNode);
        let colNode = this._getNode(`div`, { className: `col text-right` });
        rowNode.appendChild(colNode);
        colNode.appendChild(this.countNode);
        return rowNode;
    }

    _addLimitFormNode(rowNode) {
        let { addLimit } = this.paramObject;
        let colNode = this._getNode(`div`, { className: `col text-right` });
        rowNode.appendChild(colNode);
        if (addLimit) {
            let formNode = this._getNode(`form`, { className: `form-inline` });
            colNode.appendChild(formNode);
            let textNode = document.createTextNode(`Show `);
            formNode.appendChild(textNode);
            formNode.appendChild(this.limitNode);
            textNode = document.createTextNode(` entries`);
            formNode.appendChild(textNode);
        }
    }

    _getLimitNode() {
        let selectNode = this._getNode(`select`, { className: `form-control` });
        this._addLimitOption(selectNode, 50, 50);
        this._addLimitOption(selectNode, 100, 100);
        this._addLimitOption(selectNode, 250, 250);
        this._addLimitOption(selectNode, `all`, `ALL`);
        return selectNode;
    }

    _addLimitOption(selectNode, value, text) {
        let optionNode = this._getNode(`option`, { value });
        selectNode.appendChild(optionNode);
        let textNode = document.createTextNode(text);
        optionNode.appendChild(textNode);
    }

    _clearNode(node) {
        while (node.firstChild) {
            node.removeChild(node.firstChild);
        }
    }

    _getNode(nodeType, nodeParamObject) {
        let newNode = document.createElement(nodeType);
        if (nodeParamObject) {
            let { additionalClass, align, className, colspan, id, placeholder, rowspan, subNode, text, textUrl, type, value } = nodeParamObject;
            if (align) {
                newNode.setAttribute(`class`, `text-${align}`);
            }
            if (className) {
                newNode.setAttribute(`class`, className);
            }
            if (additionalClass) {
                this._addToAttribute(newNode, `class`, additionalClass);
            }
            if (colspan) {
                newNode.setAttribute(`colspan`, colspan);
            }
            if (id) {
                newNode.setAttribute(`id`, id);
            }
            if (placeholder) {
                newNode.setAttribute(`placeholder`, placeholder);
            }
            if (rowspan) {
                newNode.setAttribute(`rowspan`, rowspan);
            }
            if (subNode) {
                newNode.appendChild(subNode);
            }
            if (text && textUrl) {
                let aNode = document.createElement(`a`);
                newNode.appendChild(aNode);
                aNode.setAttribute(`href`, textUrl);
                aNode.insertAdjacentHTML(`beforeend`, text);
            } else if (text) {
                newNode.insertAdjacentHTML(`beforeend`, text);
            }
            if (type) {
                newNode.setAttribute(`type`, type);
            }
            if (value) {
                newNode.setAttribute(`value`, value);
            }
        }
        return newNode;
    }

    _addTableDivision(tableNode, divisionName, dataArray, dataArray2) {
        let { addCheckboxes, checkboxClass } = this.paramObject;
        let divisionNode = this._getNode(divisionName);
        tableNode.appendChild(divisionNode);
        let trNode = this._getNode(`tr`);
        divisionNode.appendChild(trNode);
        this._addData(trNode, `S.No.`, dataArray, `th`, divisionName);
        if (dataArray2 && dataArray2.length) {
            trNode = this._getNode(`tr`);
            divisionNode.appendChild(trNode);
            this._addData(trNode, `S.No.`, dataArray2, `th`, divisionName);
        }
        this._checkboxToggle(divisionName);
    }

    _addTableDataRows() {
        let { dataRows, functionArray } = this.paramObject;
        this._clearNode(this.bodyNode);
        if (typeof dataRows === `string`) {
            this.bodyNode.insertAdjacentHTML(`beforeend`, dataRows);
        } else {
            this._addTableDataRowsFromObject();
        }
        if (functionArray) {
            functionArray.forEach(currentObject => {
                let { className, eventName, functionName } = currentObject;
                this._attachFunctionToClassNodes(className, eventName, functionName);
            });
        }
    }

    _addTableDataRowsFromObject() {
        let { dataRows, addFilter, addLimit } = this.paramObject;
        let filterTerm;
        if (addFilter) {
            filterTerm = this.filterNode.value.toLowerCase();
        }
        let serialNumber = 0;
        let limitNumber = 0;
        let rowNode;
        dataRows.forEach(currentRow => {
            let { className, data, id } = currentRow;
            if (!addFilter || this._filterData(filterTerm, currentRow.data)) {
                serialNumber++;
                if (!addLimit || this.limitNode.value === `all` || this.limitNode.value >= serialNumber) {
                    limitNumber++;
                    rowNode = this._getNode(`tr`, { className, id });
                    this.bodyNode.appendChild(rowNode);
                    this._addData(rowNode, serialNumber, currentRow.data, `td`, currentRow);
                }
            }
        });
        this._clearNode(this.countNode);
        let textNode = document.createTextNode(`Showing 1 to ${limitNumber} of ${serialNumber} entries`);
        this.countNode.appendChild(textNode);
    }

    _attachFunctionToClassNodes(className, eventName, functionName) {
        let classNodes = document.getElementsByClassName(className);
        Array.from(classNodes).forEach(element => {
            element.removeEventListener(eventName, functionName);
            element.addEventListener(eventName, functionName);
        });
    }

    _filterData(filterTerm, dataArray) {
        let isDisplay = false;
        let isFilter = false;
        dataArray.forEach(dataObject => {
            let { filterText } = dataObject;
            if (filterText) {
                isFilter = true;
                if (filterText.toLowerCase().includes(filterTerm)) {
                    isDisplay = true;
                }
            }
        });
        if (isFilter) {
            return isDisplay;
        }
        return true;
    }

    _addData(rowNode, serialNumber, dataArray, typeName, trAttributes) {
        let { addCheckboxes, checkboxClass } = this.paramObject;
        if (addCheckboxes) {
            let id;
            if (typeName === `td` && trAttributes.checkboxId) {
                id = trAttributes.checkboxId;
            } else if (typeName === `th`) {
                id = `${checkboxClass}_${trAttributes}`;
            }
            let checkboxNode = this._getNode(`input`, { className: `form-control ${checkboxClass}`, id, type: `checkbox` });
            let checkboxTDNode = this._getNode(typeName, { subNode: checkboxNode });
            rowNode.appendChild(checkboxTDNode);
        }
        let serialNumberNode = this._getNode(typeName, { text: serialNumber });
        rowNode.appendChild(serialNumberNode);
        let cellNode;
        dataArray.forEach(dataObject => {
            cellNode = this._getNode(typeName, dataObject);
            rowNode.appendChild(cellNode);
        });
    }

    _addToAttribute(currentElement, name, newText) {
        let oldValue = currentElement.getAttribute(name);
        let newValue;
        if (oldValue) {
            newValue = `${oldValue} ${newText}`;
        } else {
            newValue = newText;
        }
        return currentElement.setAttribute(name, newValue)
    }
    
    /*****************************************************
 * Paginator Function                                *
 *****************************************************
 * config : {
 *     get_rows : function used to select rows to do pagination on
 *         If no function is provided, checks for a config.table element and looks for rows in there to page
 *
 *     box : Empty element that will have page buttons added to it
 *         If no config.box is provided, but a config.table is, then the page buttons will be added using the table
 *
 *     table : table element to be paginated
 *         not required if a get_rows function is provided
 *
 *     rows_per_page : number of rows to display per page
 *         default number is 10
 *
 *     page: page to display
 *         default page is 1
 *
 *     box_mode: "list", "buttons", or function. determines how the page number buttons are built.
 *         "list" builds the page index in list format and adds class "pagination" to the ul element. Meant for use with bootstrap
 *         "buttons" builds the page index out of buttons
 *         if this field is a function, it will be passed the config object as its only param and assumed to build the page index buttons
 *
 *     page_options: false or [{text: , value: }, ... ] used to set what the dropdown menu options are available, resets rows_per_page value
 *         false prevents the options from being displayed
 *         [{text: , value: }, ... ] allows you to customize what values can be chosen, a value of 0 will display all the table's rows.
 *         the default setup is
 *           [
 *               { value: 5,  text: '5'   },
 *               { value: 10, text: '10'  },
 *               { value: 20, text: '20'  },
 *               { value: 50, text: '50'  },
 *               { value: 100,text: '100' },
 *               { value: 0,  text: 'All' }
 *           ]
 *
 *     active_class: set the class for page buttons to have when active.
 *          defaults to "active"
 *
 *     disable: true or false, shows all rows of the table and hides pagination controlls if set to true.
 *
 *     tail_call: function to be called after paginator is done.
 *
 * }
 */
_paginator(config) {
    // throw errors if insufficient parameters were given
    if (typeof config != "object")
        throw "Paginator was expecting a config object!";
    if (typeof config.get_rows != "function" && !(config.table instanceof Element))
        throw "Paginator was expecting a table or get_row function!";

    // get/set if things are disabled
    if (typeof config.disable == "undefined") {
        config.disable = false;
    }

    // get/make an element for storing the page numbers in
    var box;
    if (!(config.box instanceof Element)) {
        config.box = document.createElement("div");
    }
    box = config.box;

    // get/make function for getting table's rows
    if (typeof config.get_rows != "function") {
        config.get_rows = function () {
            var table = config.table
            var tbody = table.getElementsByTagName("tbody")[0]||table;

            // get all the possible rows for paging
            // exclude any rows that are just headers or empty
            children = tbody.children;
            var trs = [];
            for (var i=0;i<children.length;i++) {
                if (children[i].nodeType = "tr") {
                    if (children[i].getElementsByTagName("td").length > 0) {
                        trs.push(children[i]);
                    }
                }
            }

            return trs;
        }
    }
    var get_rows = config.get_rows;
    var trs = get_rows();

    // get/set rows per page
    if (typeof config.rows_per_page == "undefined") {
        var selects = box.getElementsByTagName("select");
        if (typeof selects != "undefined" && (selects.length > 0 && typeof selects[0].selectedIndex != "undefined")) {
            config.rows_per_page = selects[0].options[selects[0].selectedIndex].value;
        } else {
            config.rows_per_page = 10;
        }
    }
    var rows_per_page = config.rows_per_page;

    // get/set current page
    if (typeof config.page == "undefined") {
        config.page = 1;
    }
    var page = config.page;

    // get page count
    var pages = (rows_per_page > 0)? Math.ceil(trs.length / rows_per_page):1;

    // check that page and page count are sensible values
    if (pages < 1) {
        pages = 1;
    }
    if (page > pages) {
        page = pages;
    }
    if (page < 1) {
        page = 1;
    }
    config.page = page;
 
    // hide rows not on current page and show the rows that are
    for (var i=0;i<trs.length;i++) {
        if (typeof trs[i]["data-display"] == "undefined") {
            trs[i]["data-display"] = trs[i].style.display||"";
        }
        if (rows_per_page > 0) {
            if (i < page*rows_per_page && i >= (page-1)*rows_per_page) {
                trs[i].style.display = trs[i]["data-display"];
            } else {
                // Only hide if pagination is not disabled
                if (!config.disable) {
                    trs[i].style.display = "none";
                } else {
                    trs[i].style.display = trs[i]["data-display"];
                }
            }
        } else {
            trs[i].style.display = trs[i]["data-display"];
        }
    }

    // page button maker functions
    config.active_class = config.active_class||"active";
    if (typeof config.box_mode != "function" && config.box_mode != "list" && config.box_mode != "buttons") {
        config.box_mode = "button";
    }
    if (typeof config.box_mode == "function") {
        config.box_mode(config);
    } else {
        var make_button;
        if (config.box_mode == "list") {
            make_button = function (symbol, index, config, disabled, active) {
                var li = document.createElement("li");
                var a  = document.createElement("a");
                a.href = "#";
                a.innerHTML = symbol;
                a.addEventListener("click", function (event) {
                    event.preventDefault();
                    this.parentNode.click();
                    return false;
                }, false);
                li.appendChild(a);

                var classes = [];
                if (disabled) {
                    classes.push("disabled");
                }
                if (active) {
                    classes.push(config.active_class);
                }
                li.className = classes.join(" ");
                li.addEventListener("click", function () {
                    if (this.className.split(" ").indexOf("disabled") == -1) {
                        config.page = index;
                        paginator(config);
                    }
                }, false);
                return li;
            }
        } else {
            make_button = function (symbol, index, config, disabled, active) {
                var button = document.createElement("button");
                button.innerHTML = symbol;
                button.addEventListener("click", function (event) {
                    event.preventDefault();
                    if (this.disabled != true) {
                        config.page = index;
                        paginator(config);
                    }
                    return false;
                }, false);
                if (disabled) {
                    button.disabled = true;
                }
                if (active) {
                    button.className = config.active_class;
                }
                return button;
            }
        }

        // make page button collection
        var page_box = document.createElement(config.box_mode == "list"?"ul":"div");
        if (config.box_mode == "list") {
            page_box.className = "pagination";
        }

        var left = make_button("&laquo;", (page>1?page-1:1), config, (page == 1), false);
        page_box.appendChild(left);

        for (var i=1;i<=pages;i++) {
            var li = make_button(i, i, config, false, (page == i));
            page_box.appendChild(li);
        }

        var right = make_button("&raquo;", (pages>page?page+1:page), config, (page == pages), false);
        page_box.appendChild(right);
        if (box.childNodes.length) {
            while (box.childNodes.length > 1) {
                box.removeChild(box.childNodes[0]);
            }
            box.replaceChild(page_box, box.childNodes[0]);
        } else {
            box.appendChild(page_box);
        }
    }

    // make rows per page selector
    if (!(typeof config.page_options == "boolean" && !config.page_options)) {
        if (typeof config.page_options == "undefined") {
            config.page_options = [
                { value: 5,  text: '5'   },
                { value: 10, text: '10'  },
                { value: 20, text: '20'  },
                { value: 50, text: '50'  },
                { value: 100,text: '100' },
                { value: 0,  text: 'All' }
            ];
        }
        var options = config.page_options;
        var select = document.createElement("select");
        for (var i=0;i<options.length;i++) {
            var o = document.createElement("option");
            o.value = options[i].value;
            o.text = options[i].text;
            select.appendChild(o);
        }
        select.value = rows_per_page;
        select.addEventListener("change", function () {
            config.rows_per_page = this.value;
            paginator(config);
        }, false);
        box.appendChild(select);
    }

    // status message
    var stat = document.createElement("span");
    stat.innerHTML = "On page " + page + " of " + pages
        + ", showing rows " + (((page-1)*rows_per_page)+1)
        + " to " + (trs.length<page*rows_per_page||rows_per_page==0?trs.length:page*rows_per_page)
        + " of " + trs.length;
    box.appendChild(stat);

    // hide pagination if disabled
    if (config.disable) {
        if (typeof box["data-display"] == "undefined") {
            box["data-display"] = box.style.display||"";
        }
        box.style.display = "none";
    } else {
        if (box.style.display == "none") {
            box.style.display = box["data-display"]||"";
        }
    }

    // run tail function
    if (typeof config.tail_call == "function") {
        config.tail_call(config);
    }

    return box;
}


}
