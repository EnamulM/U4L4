let data = [];

async function getdata() {
    const response = await fetch("Apple_Financials.csv");
    const txt = await response.text();
    data = txt.split("\n").map(d => d.split(/,\"\$|","\$/).map(s => s.replaceAll(",", ""))).slice(1).reverse();
    console.log(data);
    return data;
}

getdata()
    .then(data => {
        new Chart(document.getElementById('myChart'), {
            type: 'line',
            data: {
                labels: data.map(d => d[0]),
                datasets: [{
                    label: 'Revenue (millions)',
                    data: data.map(d => d[2]),
                    borderWidth: 3,
                    backgroundColor: "#ff00d4",
                    borderColor: "#550370"
                },
                {
                    label: 'Profit (millions)',
                    data: data.map(d => d[3]),
                    borderWidth: 3,
                    backgroundColor: "#550370",
                    borderColor: "#ff00d4"
                },
                {
                    label: 'Spent (millions)',
                    data: data.map(d => d[2] - d[3]),
                    borderWidth: 3,
                    backgroundColor: "#ffffff",
                    borderColor: "#000000"
                }]
            }
        });
    })
    .catch(error => console.error('Error fetching data:', error));

