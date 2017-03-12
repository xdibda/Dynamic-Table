var table;

window.onload = function () {
    addFiltering('wap-table');
}

function addFiltering(id) {
    table = document.getElementById(id);
    var columnsCount = 0;
    var firstLine;

    if (table.rows.length > 0) {
        firstLine = table.rows[0];
        columnsCount = firstLine.cells.length;
    }

    var newFirstLine = document.createElement('tr');

    for (var i = 0; i < columnsCount; i++) {
        var columnElement = document.createElement('td');
        var type = firstLine.cells[i].getAttribute('data-wap-type');
        var identifier = "input" + i;

        columnElement.innerHTML = '<div onclick="columnSort(' + i + ', \'' + type + '\', 1);" title="sort DESC">&and;</div> ';
        columnElement.innerHTML += '<div onclick="columnSort(' + i + ', \'' + type + '\', -1);" title="sort DESC">&or;</div> ';
        columnElement.innerHTML += '<input id="' + identifier + '" onkeyup="columnInput()"/>';

        newFirstLine.appendChild(columnElement)
    }

    table.tHead.insertBefore(newFirstLine, firstLine);
}

function columnInput() {
    var rows = table.tBodies[0].rows;

    for (var indexRow = 0; indexRow < rows.length; indexRow++) {
        var row = rows.item(indexRow);
        var filterFlag = false;

        for (var indexColumn = 0; indexColumn < row.cells.length; indexColumn++) {
            var inputValue = document.getElementById("input" + indexColumn).value;

            if (inputValue !== "") {
                var column = row.cells.item(indexColumn);
                var columnValue = column.innerHTML;

                if (columnValue.indexOf(inputValue) == -1) {
                    filterFlag = true;
                }
            }
        }

        if (!filterFlag) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    }
}

function columnSort(id, typeValue, typeSort) {
    var rows = Array.prototype.slice.call(table.tBodies[0].rows, 0);

    rows.sort(function (rowOne, rowTwo) {
        var valueOne = rowOne.cells[id].textContent.trim();
        var valueTwo = rowTwo.cells[id].textContent.trim();

        switch (typeValue) {
            case "integer":
                return ((parseInt(valueOne) > parseInt(valueTwo)) ? (1 * typeSort) : (-1 * typeSort));
            case "string":
                return (valueOne.localeCompare(valueTwo)) * typeSort;
        }
    });

    for (var i = 0; i < rows.length; ++i) {
        table.tBodies[0].appendChild(rows[i]);
    }
}