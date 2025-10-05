document.addEventListener("DOMContentLoaded", () => {
  Papa.parse("data.csv", {
    download: true,
    header: true,
    complete: function(results) {
      const data = results.data;
      const container = document.getElementById("table-container");

      if (data.length === 0) {
        container.innerHTML = "<p>No data found.</p>";
        return;
      }

      const table = document.createElement("table");
      const thead = document.createElement("thead");
      const tbody = document.createElement("tbody");

      // Header row
      const headers = Object.keys(data[0]);
      const headerRow = document.createElement("tr");
      headers.forEach(header => {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);

      // Data rows
      data.forEach(row => {
        const tr = document.createElement("tr");
        headers.forEach(header => {
          const td = document.createElement("td");
          td.textContent = row[header];
          tr.appendChild(td);
        });
        tbody.appendChild(tr);
      });

      table.appendChild(thead);
      table.appendChild(tbody);
      container.innerHTML = "";
      container.appendChild(table);
    }
  });
});
