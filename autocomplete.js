export default class Autocomplete
{

    autocomplete(inputField, deityObjectArray) {
        inputField.addEventListener("input", function (event) {
            let dropDownParent, dropDownChild, searchVal = event.target.value;
            let { id, parentNode } = event.target
            closeAllLists();
            if (!searchVal) {
                return false;
            }
            dropDownParent = getDiv({ id: `${id}autocomplete-list`, className: `autocomplete-items` })
            parentNode.appendChild(dropDownParent);
            deityObjectArray.forEach(deityObject => {
                if (deityObject.name.substr(0, searchVal.length).toUpperCase() == searchVal.toUpperCase()) {
                    dropDownChild = getDiv()
                    let strongTextNode = getStrong()
                    dropDownChild.appendChild(strongTextNode)
                    let strongText = document.createTextNode(deityObject.name.substr(0, searchVal.length))
                    strongTextNode.appendChild(strongText)
                    dropDownChild.appendChild(document.createTextNode(deityObject.name.substr(searchVal.length)))
                    let inputNode = getInput({ type: `hidden`, value: `${deityObject.name}` })
                    dropDownChild.appendChild(inputNode)
                    dropDownChild.addEventListener("click", function (e) {
                        inputField.value = this.getElementsByTagName("input")[0].value;
                        document.getElementById(`deityId`).value = `${deityObject.id}`;
                        closeAllLists();
                    });
                    dropDownParent.appendChild(dropDownChild);
                }
            })
    
        });

    
        function closeAllLists(elmnt) {
            var x = document.getElementsByClassName("autocomplete-items");
            for (var i = 0; i < x.length; i++) {
                if (elmnt != x[i] && elmnt != inputField) {
                    x[i].parentNode.removeChild(x[i]);
                }
            }
        }
        document.addEventListener("click", function (e) {
            closeAllLists(e.target);
        });
    }
}