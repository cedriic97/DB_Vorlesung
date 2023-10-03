function executeCustomQuery() {
    const sql = document.getElementById('customQuery').value;
    fetch('http://192.168.2.209:3000/api/customQuery', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sql })
        })
        .then(response => response.json())
        .then(data => {
            let datenTabelleHead = document.getElementById('datenTabelleHead');
            let datenTabelle = document.getElementById('datenTabelle');
            datenTabelle.innerHTML = ""; // Vorherige Daten löschen
            datenTabelleHead.innerHTML = "";

            if (data.length > 0) {
                let headers = Object.keys(data[0]);
                let trHead = document.createElement('tr');
                headers.forEach(header => {
                    let th = document.createElement('th');
                    th.textContent = header;
                    trHead.appendChild(th);
                });
                datenTabelleHead.appendChild(trHead);

                data.forEach(item => {
                    let tr = document.createElement('tr');
                    headers.forEach(header => {
                        let td = document.createElement('td');
                        td.textContent = item[header];
                        tr.appendChild(td);
                    });
                    datenTabelle.appendChild(tr);
                });
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

